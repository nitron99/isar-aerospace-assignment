import React, { useEffect, useState, Suspense } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useWebSocket from 'react-use-websocket';
import { Canvas } from '@react-three/fiber';
import { useTranslation } from "react-i18next";
import { toast } from 'react-toastify';
import "../../translations/i18n";
import 'animate.css';

import { 
  Panel, 
  PanelGroup, 
} from 'react-resizable-panels';

import ControlBar from '../../components/controlBar/ControlBar';
import Spectrum3D from '../../components/canvas/Spectrum3D';
import ResizeHandle from '../../components/utils/ResizeHandle';
import Charts from '../../components/charts/Charts';
import ActionRequiredModal from '../../components/modal/ActionRequiredModal';
import StartupTutorialModal from '../../components/modal/StartupTutorialModal';

import { 
  GetSpectrumStatus 
} from '../../redux/actions/spectrumActions';

import { SPECTRUM_WEB_SOCKET } from '../../api';

import * as actionTypes from "../../redux/actionTypes";

import styles from "../../global.scss";
import "./styles.scss";

const HomePage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const state = useSelector(state => state.spectrum);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState();
  const [actionRequiredModalOpen, setActionRequiredModalOpen] = useState(false);
  const [startupTutorialModalOpen, setStatupTutorialModalOpen] = useState(localStorage.getItem("tutorial") ? false : true);
  const [webSocketConnet, setWebSocketConnect] = useState(false);

  const [statusMessagesList, setStatusMessagesList] = useState([]);
  const [oldStats, setOldStats] = useState({});
  const [newStats, setNewStats] = useState({});

  const [isAltitudeActive, setIsAltitudeActive] = useState(true);
  const [isTemperatureActive, setIsTemperatureActive] = useState(true);
  const [isVelocitActive, setIsVelocityActive] = useState(true);
  const [isSpectrum3DActive, setIsSpectrum3DActive] = useState(true);

  const { lastMessage} = useWebSocket(SPECTRUM_WEB_SOCKET,
    {
      onError: () => {
        toast.error("Error while connecting websocket");
        setWebSocketConnect(false);
      }
    }, webSocketConnet);

  useEffect(() => {
    if(lastMessage){
      dispatch({ type: actionTypes.GET_SPECTRUM_WEB_SOCKET_STATUS, payload: JSON.parse(lastMessage.data) });

      let obj = JSON.parse(lastMessage.data);
      formatStatusMessageList(obj);
      formatGrowthIndicator(obj);
      checkActionRequired(obj);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);
  

  useEffect(() => {
    try {
      if(state.data !== null){
        let obj = {
          "Velocity": state.data.velocity,
          "Altitude": state.data.altitude,
          "Temperature": state.data.temperature,
          "StatusMessage": state.data.statusMessage,
          "IsAscending": state.data.isAscending,
          "IsActionRequired": state.data.isActionRequired,
       }
        formatStatusMessageList(obj);
        formatGrowthIndicator(obj);
        checkActionRequired(obj);
        dispatch({ type: actionTypes.CLEAR_SPECTRUM_STATUS });
      }
    } catch (err) {
      console.log(err)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  const callManuallyRefresh = () => {
    dispatch(GetSpectrumStatus(setLoading)); 
  }

  // --------------------------- miscellanoues functions -----------------------------
  const formatStatusMessageList = (obj) => {
    let statusList = statusMessagesList;
    if(statusList.length > 5) statusList.pop();
    statusList.unshift(obj.StatusMessage);
    setStatusMessagesList(statusList);
  }

  const formatGrowthIndicator = (obj) => {
    setOldStats(newStats);
    setNewStats(obj);
  }

  const checkActionRequired = (obj) => {
    if(obj.IsActionRequired) setActionRequiredModalOpen(true);
  }

  return (
    <div className='dashboard flexCenter_Row'>

      <ActionRequiredModal
        open={actionRequiredModalOpen}
        setOpen={setActionRequiredModalOpen}
        />

      <StartupTutorialModal
        open={startupTutorialModalOpen}
        setOpen={setStatupTutorialModalOpen}
        />

      <ControlBar
        isAltitudeActive={isAltitudeActive}
        setIsAltitudeActive={setIsAltitudeActive}
        isTemperatureActive={isTemperatureActive}
        setIsTemperatureActive={setIsTemperatureActive}
        isVelocitActive={isVelocitActive}
        setIsVelocityActive={setIsVelocityActive}
        isSpectrum3DActive={isSpectrum3DActive}
        setIsSpectrum3DActive={setIsSpectrum3DActive}
        />

      <div 
        className='dashboard__box flexCenter_Row'>
        <div
          className='dashboard__box--left flexCenterSBColumn'
          >
          <div 
            style={{
              width: "100%"
            }}>
            <div
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "100px",
                backgroundColor: "#0c2a2a",
                marginBottom: "10px",
                cursor: "pointer"
              }}
              className='flexCenterCenterRow'
              onClick={() => {
                setWebSocketConnect(!webSocketConnet);
              }}>
              {
                webSocketConnet 
                ?
                (
                  <div className='flexCenterCenterRow' style={{ gap: "20px"}}>
                    <span className="material-symbols-outlined">
                      link_off
                    </span>
                    <div className='dashboard__box--text2'>
                      {t("DISCONNECT")}
                    </div>
                  </div>
                )
                :
                <div className='flexCenterCenterRow' style={{ gap: "20px"}}>
                  <span className="material-symbols-outlined">
                    link
                  </span>
                  <div className='dashboard__box--text2'>
                    {t("CONNECT")}
                  </div>
                </div>
              }
            </div>
            <div
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "100px",
                backgroundColor: webSocketConnet ? 'gray' : "#0c2a2a",
                color: webSocketConnet ? 'darkgray' : "white",
                cursor: webSocketConnet ? 'auto' : "pointer",
              }}
              className='flexCenterCenterRow'
              onClick={() =>  {
                if(!webSocketConnet) callManuallyRefresh()
              }}>
              <div className='dashboard__box--text2'>
                {t("REFRESH")}
              </div>
            </div>
          </div>
          <div className='flex_SAColumn' style={{ height: "40%", width: "100%" }}>
            <div>
              <div>{t("ALTITUDE")}</div>
              <div className='dashboard__box--text1' style={{ color: styles["altitude"] }}>
                {newStats.Altitude ? newStats.Altitude.toFixed(2) + "m" : "NA"}
              </div>
              {
                webSocketConnet &&
                <div className='flexCenter_Row'>
                  ({
                      <span className="material-symbols-outlined">
                      {(100 - (100 / oldStats.Altitude) * newStats.Altitude) > 0 
                        ? 'arrow_upward'  
                        : 'arrow_downward'}
                      </span>
                    }    
                    {(100 - (100 / oldStats.Altitude) * newStats.Altitude).toFixed(2) + "%"})
                </div>
              }
            </div>
            <div>
              <div>{t("TEMPERATURE")}</div>
              <div className='dashboard__box--text1' style={{ color: styles["temperature"] }}>
                {newStats.Temperature ? newStats.Temperature.toFixed(2) + "°C" : "NA"}
              </div>
              {
                webSocketConnet &&
                <div className='flexCenter_Row'>
                  ({
                      <span className="material-symbols-outlined">
                      {(100 - (100 / oldStats.Temperature) * newStats.Temperature) > 0 
                        ? 'arrow_upward'  
                        : 'arrow_downward'}
                      </span>
                    }  
                    {(100 - (100 / oldStats.Temperature) * newStats.Temperature).toFixed(2) + "%"})
                </div>
              }
            </div>
            <div>
              <div>{t("VELOCITY")}</div>
              <div className='dashboard__box--text1' style={{ color: styles["velocity"] }}>
                {newStats.Velocity ? newStats.Velocity.toFixed(2) + "m/s" : "NA"}
              </div>
              {
                webSocketConnet &&
                <div className='flexCenter_Row'>
                  ({
                      <span className="material-symbols-outlined">
                      {(100 - (100 / oldStats.Velocity) * newStats.Velocity) > 0 
                        ? 'arrow_upward'  
                        : 'arrow_downward'}
                      </span>
                    }
                    {(100 - (100 / oldStats.Velocity) * newStats.Velocity).toFixed(2) + "%"})
                </div>
              }
            </div>
          </div>  
          <div
            style={{
              borderRadius: "10px",
              width: "100%",
              height: "30%",
              backgroundColor: styles["background_panel"],
              padding: "10px"
            }}>
              {
                statusMessagesList.map((item, index) => (
                  <div 
                    key={index}
                    style={{ color: index === 0 ? "white" : "gray", 
                      marginBottom: "10px",
                      fontSize: index === 0 ? "15px" : "14px"
                    }}
                    className={`animate__animated animate__faster 
                      ${index === 0 && 'animate__bounceIn'} 
                      ${index > 4 && 'animate__slideOutDown'}`}>
                    {item}
                  </div>
                ))
              }
          </div>  
        </div>
        <PanelGroup 
          direction="horizontal" 
          style={{ padding: "10px" }} 
          autoSaveId="container">
          <Panel 
            defaultSizePercentage={80} 
            maxSizePercentage={100} 
            order={1}>
            <PanelGroup direction="vertical" autoSaveId="conditional">
              {
                isAltitudeActive
                &&
                (
                <>
                  <Panel order={2} minSizePixels={100} className='panel'>
                    <Charts name={"Altitude"}/>
                  </Panel>
                </>
                )
              }
              {
                (isTemperatureActive && isAltitudeActive) && 
                <ResizeHandle orientation="horizontal"/>
              }
              {
                isTemperatureActive
                &&
                <Panel order={3} minSizePixels={100} className='panel'>
                  <Charts name={"Temperature"}/>
                </Panel>
              }
              {
                (isTemperatureActive && isVelocitActive) && 
                <ResizeHandle orientation="horizontal"/>
              }
              {
                (isAltitudeActive && isVelocitActive && !isTemperatureActive) && 
                <ResizeHandle orientation="horizontal"/>
              }
              {
                isVelocitActive
                &&
                <Panel order={4} minSizePixels={100} className='panel'>
                  <Charts name={"Velocity"}/>
                </Panel>
              }
            </PanelGroup>
          </Panel>
          {
            isSpectrum3DActive
            &&
            <>
              <ResizeHandle orientation="vertical"/>
              <Panel 
                collapsible={true} 
                defaultSizePercentage={20} 
                maxSizePercentage={80} 
                order={2} 
                className='panel'>
                <div 
                  style={{ 
                    width: "18vw", 
                    minWidth: "0px", 
                    height: "100vh"
                    }}>
                    <Suspense fallback={<div style={{ width: "100%", height: "100%", backgroundColor: styles["background"]}}>loading</div>}>
                      <Canvas camera={{ fov: 75, position: [20, 0, 0]}}>
                        <Spectrum3D isAscending={newStats.IsAscending}/>
                      </Canvas>
                    </Suspense>
                </div> 
              </Panel>
            </>
          }
        </PanelGroup>
      </div>
    </div>
  )
}

export default HomePage;
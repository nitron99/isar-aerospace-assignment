import React from 'react'
import i18n from "i18next";
import { useTranslation } from "react-i18next";
import "../../translations/i18n";

import { 
  Tooltip 
} from '@mui/material';

import UKFlag from "../../assets/icons/united-kingdom.png";
import DEFlag from "../../assets/icons/germany.png";
import MiniLogo from "../../assets/icons/isar_mini_logo.png";

import styles from "../../global.scss";
import "./styles.scss";

const ControlBar = ({
  isAltitudeActive,
  setIsAltitudeActive,
  isTemperatureActive,
  setIsTemperatureActive,
  isVelocitActive,
  setIsVelocityActive,
  isSpectrum3DActive,
  setIsSpectrum3DActive,
}) => {
  const { t } = useTranslation();

  return (
    <div className='sidePanel'>
      <img  
        src={MiniLogo}
        alt='isar_mini_logo'
        style={{ width: "50px", height: "50px" }}
        />

      <div className='flexCenterSBColumn' style={{ height: "calc(100% - 50px)" }}>
        <div>
          <Tooltip title={<span style={{ fontSize: "15px" }}>{t("ALTITUDE")}</span>} placement="right">
            <div className={`sidePanel__icon ${isAltitudeActive && 'sidePanel__icon--active'} flexCenterCenterRow `}
              onClick={() => {
                setIsAltitudeActive(!isAltitudeActive);
              }}>
              <span className="material-symbols-outlined">
                altitude
              </span>
            </div>
          </Tooltip>
          <Tooltip title={<span style={{ fontSize: "15px" }}>{t("TEMPERATURE")}</span>} placement="right">
            <div className={`sidePanel__icon ${isTemperatureActive && 'sidePanel__icon--active'} flexCenterCenterRow `}
              onClick={() => {
                setIsTemperatureActive(!isTemperatureActive);
              }}>
              <span className="material-symbols-outlined">
                device_thermostat
              </span>
            </div>
          </Tooltip>
          <Tooltip title={<span style={{ fontSize: "15px" }}>{t("VELOCITY")}</span>} placement="right">
            <div className={`sidePanel__icon ${isVelocitActive && 'sidePanel__icon--active'} flexCenterCenterRow `}
              onClick={() => {
                setIsVelocityActive(!isVelocitActive);
              }}>
              <span className="material-symbols-outlined">
                speed
              </span>
            </div>
          </Tooltip>
          {/* <Tooltip title={<span style={{ fontSize: "15px" }}>{t("SPECTRUM_3D_VIEW")}</span>} placement="right">
            <div className={`sidePanel__icon ${isSpectrum3DActive && 'sidePanel__icon--active'} flexCenterCenterRow `}
              onClick={() => {
                setIsSpectrum3DActive(!isSpectrum3DActive);
              }}>
              <span className="material-symbols-outlined">
                3d_rotation
              </span>
            </div>
          </Tooltip> */}
        </div>
        <div> 
          <Tooltip
            title={<span style={{ fontSize: "15px" }}>English</span>} placement="right">
            <img  
              src={UKFlag}
              alt='UK-flag'
              className='sidePanel__icon'
              style={{ border: i18n.language === "en" && `solid 3px ${styles["white"]}` }}
              onClick={() => {
                i18n.changeLanguage("en")
              }}
              />
          </Tooltip>
          <Tooltip
            title={<span style={{ fontSize: "15px" }}>Deutsch</span>} placement="right">
            <img  
              src={DEFlag}
              alt='DE-flag'
              className='sidePanel__icon'
              style={{ border: i18n.language === "de" && `solid 3px ${styles["white"]}` }}
              onClick={() => {
                i18n.changeLanguage("de")
              }}
              />
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export default ControlBar
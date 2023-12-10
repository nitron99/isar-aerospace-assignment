import React, { useState, useEffect, useRef, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from "react-apexcharts";

import { useTranslation } from 'react-i18next';
import * as actionTypes from "../../redux/actionTypes";

import styles from "../../global.scss";

const Charts = (props) => {
  const { t } = useTranslation();
  const ref = useRef();
  const dispatch = useDispatch();
  const state = useSelector(state => state.spectrum);

  const [data, setData] = useState(
    props.name === "Altitude"
    ?
    {
      options: {
        chart: {
          redrawOnParentResize: true,
          redrawOnWindowResize: true,
          animations: {
            enabled: false,
            easing: 'linear',
            speed: 100,
            animateGradually: {
                enabled: true,
                delay: 10
            },
            dynamicAnimation: {
                enabled: true,
                speed: 500
            }
          },
          toolbar: {
            show: false
          },
          background: {
            color: "#ffffff00"
          }
        },
        stroke: {
          curve: 'smooth',
          width: 3,
          colors: [styles['altitude']]
        },
        grid: {
          show: true,
          borderColor: "#585378",
          strokeDashArray: 4,
          position: 'back',
        },
        xaxis: {
          type: 'category',
          categories: [],
          tickAmount: undefined,
          tickPlacement: 'between',
          min: undefined,
          max: undefined,
          range: undefined,
          floating: false,
          decimalsInFloat: undefined,
          overwriteCategories: undefined,
          position: 'bottom',
          labels: {
            show: false,
          },
          axisBorder: {
            show: true,
            color: '#b9b9b9',
            height: 3,
            width: '100%',
            offsetX: -3
          },
          axisTicks: {
            show: false,
          },
          title: {
            text: undefined,
            offsetX: 0,
            offsetY: 0,
            style: {
                color: undefined,
                fontSize: '12px',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 600,
                cssClass: 'apexcharts-xaxis-title',
            },
          },
        },
        yaxis: {
          show: true,
          showAlways: true,
          showForNullSeries: true,
          tickAmount: 6,
          min: -40000,
          max: 40000,
          forceNiceScale: false,
          floating: false,
          decimalsInFloat: undefined,
          labels: {
            show: true,
            align: 'right',
            minWidth: 90,
            maxWidth: 90,
            style: {
                colors: ["#ffffff"],
                fontSize: '12px',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
            },
            offsetX: 0,
            offsetY: 0,
            rotate: 0,
            formatter: (value) => { return value ? value.toFixed(0) + " m" : ""}
          },
          axisBorder: {
            show: true,
            color: '#b9b9b9',
            width: 3,
            offsetX: -3,
          },
          axisTicks: {
            show: false,
          },
          title: {
            text: t("ALTITUDE"),
            rotate: -90,
            offsetX: 0,
            offsetY: 0,
            style: {
                color: styles["white"],
                fontSize: '16px',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-title',
            },
          },
          crosshairs: {
              show: true,
              position: 'back',
              stroke: {
                  color: styles["black"],
                  width: 1,
                  dashArray: 0,
              },
          },
          tooltip: {
              enabled: true,
              offsetX: 0,
          },
        },
        markers: {
          size: 2,
          colors: [styles['altitude']],
          strokeColors: styles['altitude'],
          strokeWidth: 2,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          shape: "circle",
          radius: 2,
          offsetX: 0,
          offsetY: 0,
          onClick: undefined,
          onDblClick: undefined,
          showNullDataPoints: true,
          hover: {
            size: undefined,
            sizeOffset: 3
          }
        },
        theme: {
          mode: 'dark'
        }
      },
      series: [
        {
          name: t("ALTITUDE"),
          color: styles['altitude'],
          data: [],
        },
      ]
    }
    :
      props.name === "Temperature"
      ?
      {
        options: {
          chart: {
            id: "basic-bar",
            redrawOnParentResize: true,
            redrawOnWindowResize: true,
            animations: {
              enabled: false,
              easing: 'linear',
              speed: 100,
              animateGradually: {
                  enabled: true,
                  delay: 150
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 100
              }
            },
            toolbar: {
              show: false
            },
            background:{
              color: "#ffffff00"
            }
          },
          stroke: {
            curve: 'smooth',
            width: 3,
            colors: [styles["temperature"]]
          },
          grid: {
            show: true,
            borderColor: "#585378",
            strokeDashArray: 4,
            position: 'back',
          },
          xaxis: {
            type: 'category',
            categories: [],
            tickAmount: undefined,
            tickPlacement: 'between',
            min: undefined,
            max: undefined,
            range: undefined,
            floating: false,
            decimalsInFloat: undefined,
            overwriteCategories: undefined,
            position: 'bottom',
            labels: {
              show: false,
            },
            axisBorder: {
              show: true,
              color: '#b9b9b9',
              height: 3,
              width: '100%',
              offsetX: -3
            },
            axisTicks: {
              show: false,
            },
            title: {
              text: undefined,
              offsetX: 0,
              offsetY: 0,
              style: {
                  color: undefined,
                  fontSize: '12px',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 600,
                  cssClass: 'apexcharts-xaxis-title',
              },
            },
          },
          yaxis: {
            show: true,
            showAlways: true,
            showForNullSeries: true,
            tickAmount: 6,
            min: -90,
            max: 90,
            forceNiceScale: false,
            floating: false,
            decimalsInFloat: undefined,
            labels: {
              show: true,
              align: 'right',
              minWidth: 90,
              maxWidth: 90,
              style: {
                colors: [styles["white"]],
                fontSize: '12px',
                fontFamily: 'Raleway, sans-serif',
                fontWeight: 400,
                cssClass: 'apexcharts-yaxis-label',
              },
              offsetX: 0,
              offsetY: 0,
              rotate: 0,
              formatter: (value) => { return value + " °C" }
            },
            axisBorder: {
              show: true,
              color: '#b9b9b9',
              width: 3,
              offsetX: -3
            },
            axisTicks: {
              show: false,
            },
            title: {
              text: t("TEMPERATURE"),
              rotate: -90,
              offsetX: -15,
              offsetY: 0,
              style: {
                  color: styles["white"],
                  fontSize: '16px',
                  fontFamily: 'Raleway, sans-serif',
                  fontWeight: 400,
                  cssClass: 'apexcharts-yaxis-title',
              },
            },
            crosshairs: {
              show: true,
              position: 'back',
              stroke: {
                color: '#b6b6b6',
                width: 1,
                dashArray: 0,
              },
            },
            tooltip: {
              enabled: true,
              offsetX: 0,
            },
          },
          markers: {
            size: 2,
            colors: [styles["temperature"]],
            strokeColors: styles["temperature"],
            strokeWidth: 2,
            strokeOpacity: 0.9,
            strokeDashArray: 0,
            fillOpacity: 1,
            discrete: [],
            shape: "circle",
            radius: 2,
            offsetX: 0,
            offsetY: 0,
            onClick: undefined,
            onDblClick: undefined,
            showNullDataPoints: true,
            hover: {
              size: undefined,
              sizeOffset: 3
            }
          },
          theme: {
            mode: 'dark'
          }
        },
        series: [
          {
            name: t("TEMPERATURE"),
            color: styles["temperature"],
            data: [],
          },
        ]
      }
      :
        props.name === "Velocity"
        ?
        { 
          options: {
            chart: {
              id: "basic-bar",
              redrawOnParentResize: true,
              redrawOnWindowResize: true,
              animations: {
                enabled: false,
                easing: 'linear',
                speed: 100,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 100
                }
              },
              toolbar: {
                show: false
              },
              background: '#ffffff00'
            },
            stroke: {
              curve: 'smooth',
              width: 3,
              colors: [styles["velocity"]]
            },
            grid: {
              show: true,
              borderColor: "#585378",
              strokeDashArray: 4,
              position: 'back',
            },
            xaxis: {
              type: 'category',
              categories: [],
              tickAmount: undefined,
              tickPlacement: 'between',
              min: undefined,
              max: undefined,
              range: undefined,
              floating: false,
              decimalsInFloat: undefined,
              overwriteCategories: undefined,
              position: 'bottom',
              labels: {
                show: false,
              },
              group: {
                groups: [],
                style: {
                  colors: [],
                  fontSize: '12px',
                  fontWeight: 400,
                  fontFamily: undefined,
                  cssClass: ''
                }
              },
              axisBorder: {
                show: true,
                color: '#b9b9b9',
                height: 3,
                width: '100%',
                offsetX: -3
              },
              axisTicks: {
                show: false,
              },
              title: {
                text: undefined,
                offsetX: 0,
                offsetY: 0,
                style: {
                    color: undefined,
                    fontSize: '12px',
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 600,
                    cssClass: 'apexcharts-xaxis-title',
                },
              },
            },
            yaxis: {
              show: true,
              showAlways: true,
              showForNullSeries: true,
              tickAmount: 6,
              min: -150,
              max: 150,
              forceNiceScale: false,
              floating: false,
              decimalsInFloat: undefined,
              labels: {
                show: true,
                align: 'right',
                minWidth: 90,
                maxWidth: 90,
                style: {
                    colors: [styles["white"]],
                    fontSize: '12px',
                    fontFamily: 'Raleway, sans-serif',
                    fontWeight: 400,
                    cssClass: 'apexcharts-yaxis-label',
                },
                offsetX: 0,
                offsetY: 0,
                rotate: 0,
                formatter: (value) => {return value ? value + " m/s" : "0 m/s" }
              },
              axisBorder: {
                show: true,
                color: '#b9b9b9',
                width: 3,
                offsetX: -3,
              },
              axisTicks: {
                show: false
              },
              title: {
                  text: t("VELOCITY"),
                  rotate: -90,
                  offsetX: 0,
                  offsetY: 0,
                  style: {
                      color: styles["white"],
                      fontSize: '16px',
                      fontFamily: 'Raleway, sans-serif',
                      fontWeight: 400,
                      cssClass: 'apexcharts-yaxis-title',
                  },
              },
              crosshairs: {
                  show: true,
                  position: 'back',
                  stroke: {
                      color: styles["white"],
                      width: 1,
                      dashArray: 0,
                  },
              },
              tooltip: {
                enabled: true,
                enabledOnSeries: undefined,
              },
            },
            markers: {
              size: 2,
              colors: [styles["velocity"]],
              strokeColors: styles["velocity"],
              strokeWidth: 2,
              strokeOpacity: 0.9,
              strokeDashArray: 0,
              fillOpacity: 1,
              discrete: [],
              shape: "circle",
              radius: 2,
              offsetX: 0,
              offsetY: 0,
              onClick: undefined,
              onDblClick: undefined,
              showNullDataPoints: true,
              hover: {
                size: undefined,
                sizeOffset: 3
              }
            },
            theme: {
              mode: 'dark'
            }
          },
          series: [
            {
              name: t("VELOCITY"),
              color: styles["velocity"],
              data: [],
            },
          ]
        }
        :
        {}
  );

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
        formatSeriesData(obj);
        dispatch({ type: actionTypes.CLEAR_SPECTRUM_STATUS });
      }else{
        if(state.webSocket) formatSeriesData(state.webSocket)
      }
    } catch (err) {
      console.log(err);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  useEffect(() => {
    dispatch({ type: actionTypes.CLEAR_SPECTRUM_STATUS });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formatSeriesData = (obj) => {
    // update value - y axis
    let yaxis = data.series[0].data;
    if(yaxis.length > 53) yaxis.shift()
    yaxis.push(obj[props.name].toFixed(2));
    let tempSeries = data.series;
    tempSeries[0].data = yaxis;

    // series name
    if(props.name === "Altitude"){
      tempSeries[0].name = t("ALTITUDE")
    }else if(props.name === "Temperature"){
      tempSeries[0].name = t("TEMPERATURE")
    }else if(props.name === "Velocity"){
      tempSeries[0].name = t("VELOCITY")
    }

    // update time  - x axis
    let date = new Date().toJSON().slice(17,22)
    let xaxis = data.options.xaxis.categories;
    if(xaxis.length > 53) xaxis.shift();
    xaxis.push(date);

    let tempOptions = data.options;
    tempOptions.xaxis.categories = xaxis;
    
    // update y range limits
    if(props.name === "Altitude"){
      tempOptions.yaxis.max = Math.max(...yaxis)+30;
      tempOptions.yaxis.min = Math.min(...yaxis)-30;
    }

    // series name
    if(props.name === "Altitude"){
      tempOptions.yaxis.title.text = t("ALTITUDE")
    }else if(props.name === "Temperature"){
      tempOptions.yaxis.title.text = t("TEMPERATURE")
    }else if(props.name === "Velocity"){
      tempOptions.yaxis.title.text = t("VELOCITY")
    }

    setData({
      options: tempOptions,
      series: tempSeries
    });
  }

  return (
    <div
      ref={ref}
      style={{ height: "100%" }}
      >
      <Chart 
        key={Math.random()}
        options={data.options} 
        series={data.series} 
        type="line"
        height={ref.current && ref.current.offsetHeight}
        width='100%'
        />
    </div>
  )
}

export default memo(Charts);
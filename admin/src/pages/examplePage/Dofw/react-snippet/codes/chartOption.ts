export const code = `
<script>

// chartOption 里面有好多技巧。

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useSelector } from 'umi';
import * as echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';
import { thousands } from '@/utils/utils.js';
import ChartRankDefault from './ChartRankDefault';

export default function ChartRank(props) {
  const { chartData = {}, titleIndex = -1 } = props;

  // 处理title中数据无值函数
  function defaultValue(value) {
    return value === null || value === undefined ? '-' : value;
  }
  // 生成option的函数
  const optionRef = useRef({});
  useMemo(() => {
    let nameList = chartData.categoryAxis;
    let zbList = chartData.zcfzl;
    let boundaryValues = chartData.boundaryValues; // 预警感叹号

    // 获取最大值组成的数组
    let max1 = Math.max(...zbList);
    let max = max1 < 100 ? 100 : max1; // 产品说100
    let maxZbList = [];
    for (let index = 0; index < zbList.length; index++) {
      if (max == 0) {
        maxZbList.push(1);
      } else {
        maxZbList.push(max);
      }
    }

    let data = [];
    for (let i = 0; i < nameList.length; i++) {
      // 百分比 小数点保留两位。
      let value2;
      if (zbList[i]) {
        value2 = Number(zbList[i]).toFixed(2);
      } else {
        // 为null等...
        value2 = zbList[i];
      }

      data.push({
        name: nameList[i],
        value: value2,
      });
    }

    // bar渐变色
    let LinearGradient = [
      // 第一的颜色
      [
        {
          offset: 0,
          color: 'rgba(255, 226, 97, 1)',
        },
        {
          offset: 1,
          color: 'rgba(255, 247, 209, 1)',
          opacity: 1,
        },
      ],
      // 第二的颜色
      [
        {
          offset: 0,
          color: 'rgba(255, 174, 103, 1)',
        },
        {
          offset: 1,
          color: 'rgba(197, 177, 159, 1)',
          opacity: 1,
        },
      ],
      // 第三的颜色
      [
        {
          offset: 0,
          color: 'rgba(197, 133, 118, 1)',
        },
        {
          offset: 1,
          color: 'rgba(144, 125, 120, 1)',
        },
      ],
      // 第四的颜色
      [
        {
          offset: 0,
          color: 'rgba(61, 176, 255, 1)',
        },
        {
          offset: 1,
          color: 'rgba(2, 55, 100, 1)',
        },
      ],
    ];
    // option选项
    let option = {
      tooltip: {
        trigger: 'item',
        show: false,
      },
      grid: {
        // borderWidth: 0,
        top: '10%',
        left: '3%',
        right: 50,
        bottom: '10%',
        containLabel: true,
      },
      yAxis: [
        {
          type: 'category',
          inverse: true,
          // 坐标轴两边留白
          boundaryGap: false,
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          data: nameList,
          axisLabel: {
            inside: false,
            padding: [-8, 0, 15, 0],
            margin: 50,
            align: 'left',
            fontSize: 14,
            color: '#fff',
            rich: {
              a1: {
                fontSize: 18,
                fontFamily: 'DIN',
                fontWeight: 'bold',
                color: '#0C163A',
                // backgroundColor: colorList[0],
                backgroundColor: {
                  image: require('@/assets/screen/economy/bar_rank1.png'),
                },
                width: 30,
                height: 30,
                align: 'center',
                borderRadius: 2,
              },
              a2: {
                fontSize: 18,
                fontFamily: 'DIN',
                fontWeight: 'bold',
                color: '#0C163A',
                // backgroundColor: colorList[1],
                backgroundColor: {
                  image: require('@/assets/screen/economy/bar_rank2.png'),
                },
                width: 30,
                height: 30,
                align: 'center',
                borderRadius: 2,
              },
              a3: {
                fontSize: 18,
                fontFamily: 'DIN',
                fontWeight: 'bold',
                color: '#0C163A',
                // backgroundColor: colorList[2],
                backgroundColor: {
                  image: require('@/assets/screen/economy/bar_rank3.png'),
                },
                width: 30,
                height: 30,
                align: 'center',
                borderRadius: 2,
              },
              b: {
                fontSize: 18,
                fontFamily: 'DIN',
                fontWeight: 'bold',
                color: '#0C163A',
                // backgroundColor: colorList[3],
                backgroundColor: {
                  image: require('@/assets/screen/economy/bar_rank4.png'),
                },
                width: 30,
                height: 30,
                align: 'center',
                borderRadius: 2,
              },
            },
            formatter: function(params) {
              var index = nameList.indexOf(params);
              index = index + 1;
              if (index - 1 < 3) {
                return ['{a' + index + '|' + index + '}'].join('\n');
              } else {
                return ['{b|' + index + '}'].join('\n');
              }
            },
          },
        },
      ],
      xAxis: {
        type: 'value',
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      dataZoom: [
        {
          type: 'slider',
          yAxisIndex: [0],
          // filterMode: 'filter',

          startValue: 0,
          endValue: 5,

          top: 30,
          bottom: 17,

          width: 10,
          borderColor: 'transparent',
          backgroundColor: 'transparent',

          fillerColor: 'rgba(57, 163, 237, 1)', //滾動轴，背景色

          moveHandleStyle: {
            borderRadius: 5,
          },

          dataBackground: {
            lineStyle: {
              color: 'transparent',
              width: 0,
              opacity: 0,
            },
            areaStyle: {
              color: 'transparent',
              opacity: 0,
            },
          },

          handleSize: '50%', //
          handleStyle: {
            color: 'transparent',
            borderColor: 'transparent',
            borderRadius: 5,
            borderWidth: 0,
            borderType: 'solid',
            borderCap: 'round',
          },

          labelFormatter: '',
          textStyle: {
            color: 'red',
          },

          brushSelect: false, // 不知道干哈
          brushStyle: {
            color: 'transparent',
            borderWidth: 20,
            borderType: 'solid',
          },
        },
        {
          type: 'inside',
          yAxisIndex: [0],
          // filterMode: 'filter',
          zoomOnMouseWheel: false,
          moveOnMouseWheel: true,
          preventDefaultMouseMove: true,

          zoomLock: false,
          borderColor: 'transparent',
          backgroundColor: 'transparent',
          // fillerColor: 'transparent',
          // handleIcon: \`https://img0.baidu.com/it/u=3801842386,210036026&fm=26&fmt=auto\`,
          // handleSize: '50%',
          handleStyle: {
            color: '#fff',
            // borderColor: 'red',
            borderWidth: 2,
            borderType: 'solid',
            borderCap: 'round',
          },
          labelFormatter: '',
          textStyle: {
            color: 'transparent',
          },
          bottom: 17,

          // brushSelect: false,
          // brushStyle: {
          //   color: 'red',
          //   borderWidth: 1,
          //   borderType: 'solid',
          // },
        },
      ],
      series: [
        {
          //作为背景
          name: '',
          type: 'bar',
          zlevel: 1,
          data: maxZbList,
          animationDuration: 1500,
          barWidth: 20,
          // barGap: '-100%',

          itemStyle: {
            borderWidth: 2,
            borderColor: 'rgba(139, 130, 92, 0.8)',
            color: function(params) {
              if (params.dataIndex < 3) {
                return 'rgba(168, 141, 117, 0.5)';
              } else {
                return 'rgba(120, 200, 255, 0.5)';
              }
            },
          },
          label: {
            show: true,
            align: 'right',
            position: ['100%', '-24px'],
            fontSize: 20,
            fontFamily: 'DIN',
            fontWeight: 400,
            color: '#E8F6F8',
            formatter: function(a, b) {
              // 展示的数据数组值
              return \`{label|\${defaultValue(data[a.dataIndex].value) + ' %'}}\`;
            },
            rich: {
              label: {
                fontSize: 24,
                fontFamily: 'DIN',
                fontWeight: 'bold',
                color: '#E8F6F8',
              },
            },
          },
          tooltip: {
            show: false,
          },
        },
        {
          name: '企业负债排名',
          type: 'bar',
          zlevel: 2,
          data: data,
          animationDuration: 1500,
          barWidth: 10,
          barGap: '-75%',

          // showBackground: true,
          // backgroundStyle: {
          //   color: '#3B7AFB',
          //   opacity: 0.2
          // },
          label: {
            show: true,
            position: [0, '-30px'],
            fontSize: 20,
            fontFamily: 'Microsoft YaHei',
            fontWeight: 400,
            color: '#E8F6F8',
            formatter: function(a) {
              var index = nameList.indexOf(a.name);
              if (boundaryValues[index]) {
                return \`\${a.name} {wran| }\`;
              } else {
                return \`\${a.name}\`;
              }
            },
            rich: {
              wran: {
                // backgroundColor: colorList[0],
                backgroundColor: {
                  image: require('@/assets/screen/economy/warnning.png'),
                },
                width: 25,
                height: 25,
                align: 'center',
                verticalAlign: 'top',
                borderRadius: 2,
              },
            },
          },
          itemStyle: {
            show: true,
            color: function(params) {
              if (params.dataIndex < 3) {
                return new echarts.graphic.LinearGradient(
                  1,
                  0,
                  0,
                  0,
                  LinearGradient[params.dataIndex],
                  false,
                );
              } else {
                return new echarts.graphic.LinearGradient(
                  1,
                  0,
                  0,
                  0,
                  LinearGradient[3],
                  false,
                );
              }
            },
            // emphasis: {
            //   shadowBlur: 15,
            //   shadowColor: 'rgba(0, 0, 0, 0.1)'
            // }
          },
          emphasis: {
            focus: 'self',
            blurScope: 'coordinateSystem',
            label: {
              // color: 'red',
            },
          },
          select: {
            disabled: true,
          },
          selectedMode: true,
        },

        // {
        //   name: '头部样式',
        //   type: 'pictorialBar',
        //   symbol: 'rect',
        //   symbolSize: [3, 12],
        //   symbolOffset: [2, 0],
        //   symbolPosition: 'end',
        //   z: 12,
        //   itemStyle: {
        //       color: '#ffffff',
        //   },
        //   data: data,
        // },
      ],
      animationEasing: 'cubicOut',
    };

    optionRef.current = option;
    return option;
  }, [chartData]);

  //**************************************chart动效 */
  const myChart = useRef(null);
  const myChartInstance = useRef(null);
  const preIndex = useRef(-1);
  useEffect(() => {
    if (myChart.current && myChart.current.getEchartsInstance) {
      myChartInstance.current = myChart.current.getEchartsInstance();

      // 存在在设置
      if (titleIndex !== -1) {
        setHightStatus(myChartInstance.current, titleIndex);
        preIndex.current = titleIndex;
      } else {
        setHightStatus(myChartInstance.current, -1);
      }
    }

    return () => {};
  }, [myChartInstance.current, titleIndex]);

  // 承载上一次的echarts数据
  let timer = null;
  let delay = 500;
  const onEvents = useMemo(() => {
    return {
      mouseover: e => {
        // if (timer) {
        //   clearTimeout(timer);
        // }
        // setTimeout(() => {
        //   // 存在在设置
        //   if (titleIndex !== -1) {
        //     myChartInstance.current.dispatchAction({
        //       type: 'highlight',
        //       seriesIndex: [0, 1],
        //       dataIndex: titleIndex,
        //     });
        //   }
        // }, delay);

        // 存在在设置
        if (titleIndex !== -1) {
          myChartInstance.current.dispatchAction({
            type: 'highlight',
            seriesIndex: [0, 1],
            dataIndex: titleIndex,
          });
        }
      },
      mousemove: e => {
        // 存在在设置
        if (titleIndex !== -1) {
          myChartInstance.current.dispatchAction({
            type: 'highlight',
            seriesIndex: [0, 1],
            dataIndex: titleIndex,
          });
        }
      },

      mouseout: e => {
        // 存在在设置
        if (titleIndex !== -1) {
          myChartInstance.current.dispatchAction({
            type: 'highlight',
            seriesIndex: [0, 1],
            dataIndex: titleIndex,
          });
        }
      },
    };
  }, [titleIndex]);

  /**
   * 设置高亮状态
   * @param {*} instance echart实例
   * @param {*} titleIndex 匹配到的index
   */
  function setHightStatus(instance, titleIndex) {
    // 存在在设置
    if (titleIndex !== -1) {
      instance.dispatchAction({
        type: 'dataZoom',
        // 开始位置的数值
        startValue: titleIndex,
        // 结束位置的数值
        endValue: titleIndex + 5,
      });
      instance.dispatchAction({
        type: 'highlight',
        seriesIndex: [0, 1],
        dataIndex: titleIndex,
      });
    } else {
      // titleIndex === -1
      instance.dispatchAction({
        type: 'dataZoom',
        // 开始位置的数值
        startValue: titleIndex + 1,
        // 结束位置的数值
        endValue: titleIndex + 1 + 5,
      });
      instance.dispatchAction({
        type: 'downplay',
        seriesIndex: [0, 1],
        dataIndex: preIndex.current,
      });
    }
  }

  return (
    <ReactEcharts
      ref={myChart}
      option={optionRef.current}
      style={{ width: '100%', height: '100%' }}
      onEvents={onEvents}
    />
  );
  // try {
  //   return (
  //     <ReactEcharts
  //       ref={myChart}
  //       option={optionRef.current}
  //       style={{ width: '100%', height: '100%' }}
  //       onEvents={onEvents}
  //     />
  //   );
  // } catch (error) {
  //   return <ChartRankDefault></ChartRankDefault>;
  // }
}

</script>

`

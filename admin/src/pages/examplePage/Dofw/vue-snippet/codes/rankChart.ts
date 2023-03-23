export const code = `
<script>
import { computed } from "vue";
import * as echarts from "echarts";
import { CONST_FZ } from "@/utils/chartTool";

const rank1 = require("@/assets/synth/rank1.png");
const rank2 = require("@/assets/synth/rank2.png");
const rank3 = require("@/assets/synth/rank3.png");
const rank = require("@/assets/synth/rank.png");

// 处理数据无值函数
function defaultValue(value) {
  return value === null || value === undefined ? "-" : value;
}

/**
 * 根据computedData(Ref类型)，计算options
 * @param {import("vue").computed}  computed
 * @return {Object}
 */
export default function useCityChartOpt(compData) {
  // 计算options
  const options = computed(() => {
    const data = compData.value;
    let nameList = data.categoryAxis; // [name1， name2]
    let valueList = data.categoryValues; // [100, 200]
    let LinearGradient = [
      // 第一的颜色
      [
        {
          offset: 0,
          color: "rgba(255, 226, 97, 1)",
        },
        {
          offset: 1,
          color: "rgba(255, 247, 209, 1)",
        },
      ],
      // 第二的颜色
      [
        {
          offset: 0,
          color: "rgba(255, 174, 103, 1)",
        },
        {
          offset: 1,
          color: "rgba(197, 177, 159, 1)",
        },
      ],
      // 第三的颜色
      [
        {
          offset: 0,
          color: "rgba(197, 133, 118, 1)",
        },
        {
          offset: 1,
          color: "rgba(144, 125, 120, 1)",
        },
      ],
      // 第四的颜色
      [
        {
          offset: 0,
          color: "rgba(61, 176, 255, 1)",
        },
        {
          offset: 1,
          color: "rgba(2, 55, 100, 1)",
        },
      ],
    ];

    // 获取最大值组成的数组
    let max = Math.max(...valueList);
    let maxValueList = [];
    for (let index = 0; index < valueList.length; index++) {
      if (max == 0) {
        maxValueList.push(1);
      } else {
        maxValueList.push(max);
      }
    }

    // 解决 负值 造成的 图表显示起点的变化
    let min = Math.min(...valueList);
    let offset = 0;
    if (min < 0) {
      offset = Math.abs(min);

      //给原来的数据都加offset， 同事label 都减offest
      for (let index = 0; index < valueList.length; index++) {
        if (valueList[index] !== null) {
          valueList[index] = valueList[index] + offset;
        }
      }

      //背景数组也要加
      for (let index = 0; index < valueList.length; index++) {
        if (valueList[index] !== null) {
          maxValueList[index] = maxValueList[index] + offset;
        }
      }
    }

    let lineY = [];
    for (let i = 0; i < nameList.length; i++) {
      let data = {
        name: nameList[i],
        value: valueList[i],
      };
      lineY.push(data);
    }
    // option选项
    let options = {
      title: {
        show: true,
        text: "全市监管企业排名",
        textStyle: {
          color: "#FFFFFF",
          fontSize: CONST_FZ.title,
          fontFamily: "Microsoft YaHei",
          fontWeight: "bold",
          textAlign: "center",
        },

        top: 0,
        left: "35%",
        z: 100,
      },
      // tooltip: {
      //   trigger: 'item',
      // },
      grid: {
        // borderWidth: 0,
        top: "22%",
        left: -20,
        right: 30,
        bottom: "10%",
        containLabel: true,
      },
      yAxis: [
        {
          type: "category",
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
            align: "left",
            fontSize: CONST_FZ.label,
            color: "#fff",
            rich: {
              a1: {
                fontSize: CONST_FZ.label,
                fontFamily: "DIN",
                fontWeight: "bold",
                color: "#0C163A",
                backgroundColor: {
                  image: rank1,
                },
                width: 30,
                height: 30,
                align: "center",
                borderRadius: 2,
              },
              a2: {
                fontSize: CONST_FZ.label,
                fontFamily: "DIN",
                fontWeight: "bold",
                color: "#0C163A",
                backgroundColor: {
                  image: rank2,
                },
                width: 30,
                height: 30,
                align: "center",
                borderRadius: 2,
              },
              a3: {
                fontSize: CONST_FZ.label,
                fontFamily: "DIN",
                fontWeight: "bold",
                color: "#0C163A",
                backgroundColor: {
                  image: rank3,
                },
                width: 30,
                height: 30,
                align: "center",
                borderRadius: 2,
              },
              b: {
                fontSize: CONST_FZ.label,
                fontFamily: "DIN",
                fontWeight: "bold",
                color: "#0C163A",
                backgroundColor: {
                  image: rank,
                },
                width: 30,
                height: 30,
                align: "center",
                borderRadius: 2,
              },
            },
            formatter: function (params) {
              var index = nameList.indexOf(params);
              index = index + 1;
              if (index - 1 < 3) {
                return \`{a\${index}|\${index}}\`;
              } else {
                return \`{b|\${index}}\`;
              }
            },
          },
        },
      ],
      xAxis: {
        type: "value",
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
          type: "slider",
          yAxisIndex: [0],
          startValue: 0,
          endValue: 4,
          zoomLock: true,

          top: 30,
          bottom: 17,

          width: 7,
          borderColor: "transparent",
          backgroundColor: "transparent",

          dataBackground: {
            lineStyle: {
              cap: "butt",
              opacity: 0,
            },
            areaStyle: {
              opacity: 0,
            },
          },

          fillerColor: "rgba(57, 163, 237, 1)", //滾動轴，背景色
          handleSize: "50%",
          handleStyle: {
            color: "transparent",
            borderColor: "transparent",
            borderRadius: 2,

            borderWidth: 1,
            borderType: "solid",
            borderCap: "round",
          },

          labelFormatter: "",
          textStyle: {
            color: "transparent",
          },

          brushSelect: false, // 不知道干哈
          brushStyle: {
            color: "transparent",
            borderWidth: 20,
            borderType: "solid",
          },
        },
        {
          type: "inside",
          yAxisIndex: [0],
          zoomOnMouseWheel: false,
          moveOnMouseWheel: true,
          preventDefaultMouseMove: true,

          startValue: 0,
          endValue: 4,

          zoomLock: false,
          borderColor: "transparent",
          backgroundColor: "transparent",
          handleStyle: {
            color: "#fff",
            borderWidth: 2,
            borderType: "solid",
            borderCap: "round",
          },
          labelFormatter: "",
          textStyle: {
            color: "transparent",
          },
          bottom: 17,
          // orient: 'vertical',
          // brushSelect: true,
          // brushStyle: {
          //   color: 'red',
          //   borderWidth: 1,
          //   borderType: 'solid',
          // },
        },
      ],
      series: [
        {
          name: "",
          type: "bar",
          zlevel: 2,
          data: lineY,
          animationDuration: 1500,
          barWidth: 4,
          // showBackground: true,
          // backgroundStyle: {
          //   color: '#3B7AFB',
          //   opacity: 0.2
          // },
          label: {
            show: true,
            position: [0, "-24px"],
            fontSize: CONST_FZ.label,
            fontFamily: "Microsoft YaHei",
            fontWeight: 400,
            color: "#E8F6F8",
            formatter: function (a) {
              return a.name;
            },
          },
          itemStyle: {
            show: true,
            color: function (params) {
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
            borderRadius: 10,
          },
        },
        {
          //作为背景
          name: "",
          type: "bar",
          zlevel: 1,
          data: maxValueList,
          animationDuration: 1500,
          barWidth: 5,
          barGap: "-100%",
          itemStyle: {
            color: "rgba(59, 122, 251, 0.2)",
          },
          label: {
            show: true,
            align: "right",
            position: ["100%", "-24px"],
            fontSize: CONST_FZ.label,
            fontFamily: "DIN",
            fontWeight: 400,
            color: "#E8F6F8",
            formatter: function (a) {
              if (valueList[a.dataIndex] === null) {
                // 展示的数据数组值

                return defaultValue(valueList[a.dataIndex]) + " 万元";
              } else {
                return defaultValue(valueList[a.dataIndex] - offset) + " 万元";
              }
            },
          },
          tooltip: {
            show: false,
          },
        },
      ],
      animationEasing: "cubicOut",
    };

    return options;
  });

  return {
    options,
  };
}
</script>
`

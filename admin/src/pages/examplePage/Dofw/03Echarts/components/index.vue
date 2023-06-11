<template>
  <div style="width: 300px; height: 200px">
    <Echart ref="myChart" :options="options" />
  </div>
</template>

<script setup>
import Echart from "./Echart.vue"
// import useAutoPlay from "./useAutoPlay"
import { handlerDataFunc, generalAllSeries, tempTooltip, generalMax_Min, CONST_FZ, computedBarWidth } from "./bestPractice.ts"
import { onMounted, ref, computed } from "vue"

const myChart = ref({})

const data1 = ref([]) // 请求数据
onMounted(() => {
  setTimeout(() => {
    data1.value = [
      {
        name: "测试1",
        field1: 10,
        month: '1'
      },
      {
        name: "测试2",
        field1: 20,
        month: '2'
      },
      {
        name: "测试3",
        field1: 15,
        month: '3'
      }
    ]
  }, 3000)
})
const newData = computed(() => {
  return handlerDataFunc(data1.value, {
    sort: { isSort: false, sortField: "month", isAscending: true },
    categoryField: "month", // year | month
    fields: ["field1"]
  })
})

// 计算options
const options = computed(() => {
  const { categoryAxis, field1 } = newData.value

  let legend_itemGap = 45
  let title = "利润总额变化趋势"
  let title_left = "月度值"
  let title_right = "累计值"

  // 坐标轴刻度的min、max
  const { min: minY0, max: maxY0 } = generalMax_Min([field1])

  // series seriesName 映射 tooltip 使用。
  let configs = [
    {
      type: "bar",
      name: "本年累计",
      unit: "亿元",
      color: 'red',
      linearGradient: [
        { offset: 0, color: "rgba(225, 225, 225, 1)" },
        { offset: 0.1, color: "rgba(243, 203, 66, 1)" },
        { offset: 1, color: "rgba(243, 203, 66, 0)" }
      ],
      data: field1,
      formatter: "",
      customSeriesFunc: undefined // 不穿走默认。
    }
  ]

  return {
    title: [
      {
        show: true,
        text: `{bg|${title}}`,
        left: "center",
        top: "3%",
        textStyle: {
          rich: {
            bg: {
              color: "#fff",
              fontSize: CONST_FZ.title,
              fontFamily: "Microsoft YaHei",
              fontWeight: "bold"
            }
          }
        }
      },
      {
        show: true,
        text: `{bg|${title_left}}`,
        left: "left",
        top: "12%",
        left: "3%",
        textStyle: {
          rich: {
            bg: {
              fontSize: CONST_FZ.title_1,
              fontFamily: "Microsoft YaHei",
              color: "#D9EEFF",
              fontWeight: "bold"
            }
          }
        }
      },
      {
        show: true,
        text: `{bg|${title_right}}`,
        top: "12%",
        right: "3%",
        textStyle: {
          rich: {
            bg: {
              fontSize: CONST_FZ.title_1,
              fontFamily: "Microsoft YaHei",
              fontWeight: "400",
              color: "#D9EEFF",
              fontWeight: "bold"
            }
          }
        }
      }
    ],
    // 需要configs
    legend: {
      show: true,
      top: "16%",
      align: "auto",
      textStyle: {
        fontSize: CONST_FZ.legend,
        fontFamily: "Source Han Sans CN",
        fontWeight: 400,
        color: "#FFFFFF"
      },
      data: configs.map((config) => {
        return {
          ...config,
          itemStyle: {
            color: config.color
          }
        }
      }),
      itemGap: legend_itemGap
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow"
      },
      backgroundColor: "RGBA(0,10,54,.8)", // borderColor: '#228DC9',
      borderWidth: 0, // appendToBody: true,
      formatter: tempTooltip.generalFormatter(configs, CONST_FZ)
    },
    grid: {
      right: "36px",
      top: "30%",
      left: "3%",
      bottom: "5%",
      containLabel: true
    },
    xAxis: [{
      type: "category",
      boundaryGap: true,
      data: categoryAxis,
      axisLabel: {
        //坐标轴刻度标签的相关设置。
        interval: 0, //设置为 1，表示『隔一个标签显示一个标签』
        //	margin:15,

        color: "#FFF",
        fontStyle: "normal",
        fontSize: CONST_FZ.label,
        fontFamily: "Microsoft YaHei",
        fontWeight: 400
      },
      axisTick: {
        //坐标轴刻度相关设置。
        show: false
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#59809B"
        }
      },
      splitLine: {
        //坐标轴在 grid 区域中的分隔线。
        show: false
      }
    }],
    yAxis: [
      {
        type: "value",
        name: "单位(亿元)",
        position: "left",
        scale: true,
        min: minY0,
        max: maxY0,
        nameTextStyle: {
          color: "#FFF",
          fontStyle: "normal",
          fontSize: CONST_FZ.label_name,
          fontFamily: "Microsoft YaHei",
          fontWeight: 400,

          padding: [0, 0, 0, 25]
        },
        // 控制坐标轴数值的颜色
        axisLabel: {
          color: "#FFF",
          fontStyle: "normal",
          fontSize: CONST_FZ.label,
          fontFamily: "Microsoft YaHei",
          fontWeight: 400
        },
        //仅仅控制Y轴的颜色
        axisLine: {
          show: true,
          lineStyle: {
            color: "#59809B"
          }
        },
        axisTick: {
          show: true
        },
        //控制Y轴的分割线样式
        splitLine: {
          show: true,
          lineStyle: {
            color: "#384267",
            type: "solid"
          }
        }
      }
    ],
    series: generalAllSeries(configs)
  }
})
// const onEvents = {
//   // e echart传递的东西，start启动播放、end结束播放函数
//   click: (e, start, end) => {
//     console.log("click", e, start, end);
//     //可以操作dom
//   },
// };

// 开启动画
// useAutoPlay(myChart, {
//   data: data1, // 响应式数据
//   duration: 1000, // 间隔
//   index: 0, // 从第几项开始轮播
//   // onEvents,
//   // $seriesIndex: 1, // 默认 0 启动第一个serie, 例如: bar(0)、line(1), 启动line
//   cb: customFunc // 扩展功能(选填)-
// })

/**
 * 自动播放,添加额外dispatchAction功能
 * @param {*} instance
 * @param {*} data //useAutoPlay 传入的数据
 * @param {*} curIndex 当前index
 * @param {*} preIndex 前一个index
 */
// function customFunc(instance, data, curIndex, preIndex) {
//   // console.log(curIndex);
//   // preIndex、curIndex 由传入data决定。

//   // 先清除;
//   instance.dispatchAction({
//     type: "downplay",
//     seriesIndex: 0,
//     dataIndex: preIndex
//   })

//   // 在高亮
//   instance.dispatchAction({
//     type: "highlight",
//     seriesIndex: 0,
//     dataIndex: curIndex
//   })

//   // 设置text
//   instance.setOption(
//     {
//       title: {
//         show: true,
//         text: `${data[curIndex].value}{unit|个}`,
//         subtext: data[curIndex].name
//       }
//     },
//     false //merge
//   )
//   // 实例给你了, 可以做好多事
// }
</script>

<style lang="scss" scoped></style>

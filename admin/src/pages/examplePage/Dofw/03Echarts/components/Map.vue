<template>
  <div style="width: 100%; height: 100%">
    <Echart ref="myChart" :options="options" />
  </div>
</template>

<script setup>
import Echart from "./Echart.vue"
import geoJson from "./city.json"
import * as echarts from "echarts"
import { ref, computed } from "vue"

const myChart = ref({})

// 计算options
echarts.registerMap("咸阳", geoJson)
const options = computed(() => {
  // ...
  var mapData = [
    {
      name: "淳化县",
      value: 2000
    },
    {
      name: "武功县",
      value: 2000
    },
    {
      name: "兴平市",
      value: 2000
    },
    {
      name: "秦都区",
      value: 2000
    },
    {
      name: "杨陵区",
      value: 1000
    },
    {
      name: "渭城区",
      value: 3000
    },
    {
      name: "三原县",
      value: 2000
    },
    {
      name: "泾阳县",
      value: 3000
    },
    {
      name: "彬州市",
      value: 2000
    },
    {
      name: "乾县",
      value: 2000
    },
    {
      name: "礼泉县",
      value: 3000
    },
    {
      name: "永寿县",
      value: 1000
    },
    {
      name: "长武县",
      value: 1000
    },
    {
      name: "旬邑县",
      value: 2000
    }
  ]

  const zoom = 0.5

  return {
    backgroundColor: "#030528",
    tooltip: {
      trigger: "item",
      position: function (point, params, dom, rect, size) {
        var x = 0 // x坐标位置
        var y = 0 // y坐标位置
        // 当前鼠标位置
        var pointX = point[0]
        var pointY = point[1]
        // 提示框大小
        var boxWidth = size.contentSize[0]
        var boxHeight = size.contentSize[1]

        // boxWidth > pointX 说明鼠标左边放不下提示框
        if (boxWidth > pointX) {
          x = pointX + 10
        } else {
          // 左边放的下
          x = pointX - boxWidth - 10
        }

        // boxHeight > pointY 说明鼠标上边放不下提示框
        if (boxHeight > pointY) {
          y = 5
        } else {
          // 上边放得下
          y = pointY - boxHeight
        }
        return [x, y]
      },
      show: true,
      enterable: true,
      textStyle: {
        fontSize: 13,
        color: "#fff"
      },
      backgroundColor: "rgba(0,2,89,0.8)",
      formatter: function (params) {
        var tipHtml = ""
        tipHtml = `
                    <div class="ui-map-img">
                        <div class='ui-maptxt'>${params.name}</div>
                    </div>
                `
        return tipHtml
      }
    },
    visualMap: {
      left: "right",
      min: 0,
      max: 5000,
      inRange: {
        color: ["#ffffbf", "#fee090", "#fdae61", "#f46d43", "#d73027"]
      },
      text: ["High", "Low"],
      calculable: true
    },
    geo: [
      {
        map: "咸阳",
        aspectScale: 1,
        zoom: zoom,
        layoutCenter: ["50%", "50%"],
        layoutSize: "180%",
        show: true,
        roam: false,
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            borderColor: "#c0f3fb",
            borderWidth: 1,
            shadowColor: "#8cd3ef",
            shadowOffsetY: 10,
            shadowBlur: 120,
            areaColor: "transparent"
          }
        }
      },
      // 重影
      {
        type: "map",
        map: "咸阳",
        zlevel: -1,
        aspectScale: 1,
        zoom: zoom,
        layoutCenter: ["50%", "51%"],
        layoutSize: "180%",
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 1,
            // borderColor:"rgba(17, 149, 216,0.6)",
            borderColor: "rgba(58,149,253,0.8)",
            shadowColor: "rgba(172, 122, 255,0.5)",
            shadowOffsetY: 5,
            shadowBlur: 15,
            areaColor: "rgba(5,21,35,0.1)"
          }
        }
      },
      {
        type: "map",
        map: "咸阳",
        zlevel: -2,
        aspectScale: 1,
        zoom: zoom,
        layoutCenter: ["50%", "53%"],
        layoutSize: "180%",
        roam: false,
        silent: true,
        itemStyle: {
          normal: {
            borderWidth: 1,
            // borderColor: "rgba(11, 43, 97,0.8)",
            borderColor: "rgba(58,149,253,0.4)",
            shadowColor: "rgba(58,149,253,1)",
            shadowOffsetY: 15,
            shadowBlur: 10,
            areaColor: "transpercent"
          }
        }
      }
    ],
    grid: {
      left: "10%",
      right: "10%",
      bottom: "10%",
      top: "10%"
    },
    series: [
      {
        name: "咸阳市数据",
        type: "map",
        map: "咸阳", // 自定义扩展图表类型
        aspectScale: 1,
        zoom: zoom, // 缩放
        showLegendSymbol: true,
        label: {
          normal: {
            show: true,
            textStyle: {
              color: "#fff",
              fontSize: "120%"
            }
          },
          emphasis: {
            // show: false,
          }
        },
        itemStyle: {
          normal: {
            areaColor: {
              type: "linear",
              x: 1200,
              y: 0,
              x2: 0,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: "rgba(3,27,78,0.75)" // 0% 处的颜色
                },
                {
                  offset: 1,
                  color: "rgba(58,149,253,0.75)" // 50% 处的颜色
                }
              ],
              global: true // 缺省为 false
            },
            borderColor: "#fff",
            borderWidth: 0.2
          },
          emphasis: {
            show: false,
            color: "#fff",
            areaColor: "rgba(0,254,233,0.6)"
          }
        },
        layoutCenter: ["50%", "50%"],
        layoutSize: "180%",
        markPoint: {
          symbol: "none"
        },
        data: mapData
      }
    ]
  }
})
</script>

<style lang="scss" scoped></style>

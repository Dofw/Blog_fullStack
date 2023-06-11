import * as echarts from "echarts"
import { SeriesType } from "./type"
import type { SeriesOption, GeneralSeriesFunc, BarConfigType, LineConfigType } from "./type"

// 图标 字体大小级别。
export const CONST_FZ = {
  // axis
  label_name: "18px", //坐标轴单位
  label: "18px", //坐标轴label
  label_2: "22px",

  legend: "22px",

  tooltip_title: "30px", // 例如: 1月
  tooltip_content: "28px", // 例如: 项目xxx

  title: "26px", // 标题
  title_1: "20px",
  title_2: "28px"
}

// ---------------------------------------------series
export function generalAllSeries(configs) {
  const series: SeriesOption[] = []
  configs.forEach((config) => {
    const item = generalOneSeries(config, config.customSeriesFunc)
    series.push(item)
  })

  return series
}
export function generalOneSeries(config, customSeriesFunc: GeneralSeriesFunc) {
  const { type } = config
  return tempSeries[type](config, customSeriesFunc)
}

const tempSeries = {
  [SeriesType.BAR]: (config: BarConfigType, customSeriesFunc: GeneralSeriesFunc) => {
    // user自定义，传入GeneralSeriesFunc。
    const result = executeCustomFunc(config, customSeriesFunc)
    if (result) return result

    // 默认配置，只需要定义 seires type 里面需要东西。
    const {
      data = [],
      seriesName = "",
      unit = "",
      color = "",

      xAxisIndex = 0,
      yAxisIndex = 0,
      barGap,
      barWidth,
      linearGradient = [],
      formatter = ""
    } = config

    return {
      name: seriesName,
      type: "bar",
      xAxisIndex: xAxisIndex,
      yAxisIndex: yAxisIndex,
      barGap: barGap,
      barWidth: barWidth,
      itemStyle: {
        color: function (param) {
          if (linearGradient) {
            let position: [number, number, number, number] // a tuple type 元组类型
            if (param.value < 0) {
              position = [0, 1, 0, 0]
            } else {
              position = [0, 0, 0, 1]
            }
            return new echarts.graphic.LinearGradient(...position, linearGradient)
          } else {
            return color
          }
        }
      },
      z: 20,
      data: data,
      label: {
        show: false,
        position: "top",
        verticalAlign: "top"
      }
    }
  },
  [SeriesType.LINE]: (config: LineConfigType, customSeriesFunc: GeneralSeriesFunc) => {
    // user自定义，传入GeneralSeriesFunc。
    const result = executeCustomFunc(config, customSeriesFunc)
    if (result) return result

    // 默认配置，只需要定义 seires type 里面需要东西。
    const {
      data = [],
      seriesName = "",
      unit = "",
      color = "",

      xAxisIndex = 0,
      yAxisIndex = 0,
      formatter = ""
    } = config

    return {
      name: seriesName,
      type: "line",
      xAxisIndex: xAxisIndex,
      yAxisIndex: yAxisIndex,
      showSymbol: true,
      symbol: "emptyCircle",
      symbolSize: 10,
      symbolAllSymbol: true,
      itemStyle: {
        color: color
      },
      z: 21,
      data: data,
      label: {
        show: false,
        position: "top",
        verticalAlign: "top"
      }
    }
  }
}

function executeCustomFunc(config, customSeriesFunc: GeneralSeriesFunc) {
  if (customSeriesFunc) {
    if (typeof customSeriesFunc === "function") {
      const result = customSeriesFunc(config)
      if (Object.prototype.toString.call(result) !== "[object Object]")
        throw "config.customSeriesFunc: The return is not an object"
      return customSeriesFunc(config)
    } else {
      throw "customSeriesFunc argument must be Function in tempSeries"
    }
  } else {
    return false // false 代表不是函数。
  }
}

// ---------------------------------------------------------tooltip
export const tempTooltip = {
  generalFormatter: generalTootipFormatter, // 使用现有的一套。
  contentStr: getTooltipContentStr,
  titleStr: getTooltipTitleStr
}

/**
 * CONST_FZ, 需不需要做为第二个参数. 不做就该文件下的CONST_FZ闭包.
 * 暂时不作为第二个参数使用.
 * @param configs
 * @returns
 */
function generalTootipFormatter(configs, CONST_FZ) {
  // formater传入的参数
  return (e) => {
    let str = ""
    const category = getTooltipTitleStr(CONST_FZ, e[0].axisValue)
    e.forEach((item) => {
      const config = configs.find((config) => {
        return item.seriesName === config.name
      })

      if (config) {
        str += getTooltipContentStr(CONST_FZ, item, config)
      } else {
        str += ""
      }
    })
    return category + str
  }
}

/**
 * 获取tooltip的str_content。
 */
function getTooltipContentStr(CONST_FZ, item, config, legendType = "bar") {
  return `
  <div style='display: flex; align-items: center; min-width:500px; height: 55px; padding: 0 25px' >
  ${
    item.componentSubType === legendType
      ? `<span style="flex-grow:0;font-family:Microsoft YaHei;margin-right:5px;
    width:15px;height:15px;left:5px;background-color:${config.color || ""}"></span> 
    `
      : `<span style="flex-grow:0;font-family:Microsoft YaHei;margin-right:5px;
    width:15px;height:2px;left:5px;background-color:${config.color || ""}"></span> 
    `
  }
   <span style="flex-grow:0;font-family:Microsoft YaHei;font-size:${
     CONST_FZ.tooltip_content
   };color:#fff;line-height:25px">
   ${item.seriesName}
   &nbsp
   </span> 
   <span style="flex-grow:1;text-align:right;color:#96D5FF;font-family:Microsoft YaHei;line-height:25px;font-size:${
     CONST_FZ.tooltip_content
   }">
   ${defaultValue(item.data, config.formatter)}&nbsp${config.unit || "亿"}<br /></span>
  </div>
  `
}

/**
 * 获取tooltip的str_title。
 */
function getTooltipTitleStr(CONST_FZ, axisValue) {
  return `<span style="font-size:${CONST_FZ.tooltip_title}; font-family:Microsoft YaHei;color:#fff;line-height:25px; display:block; padding: 0 25px">
  ${axisValue}
  <br/></span>`
}

/**
 * 计算 bar 图的 barWidth
 * @param {Array} category 类目轴数据长度
 * @param {Number} base 基础宽度
 * @param {Number} total 分母总数
 * @returns {Number}
 */
export function computedBarWidth(category, base = 14, total = 12) {
  let len = 0
  if (!category) {
    len = 0
  } else {
    len = category.length
  }

  const percent = len === 0 ? 1 : len / total
  return Math.floor((base / percent) * 0.8) // 0.8 为缩小比例
}

/**
 * Tool - 数据展示格式 (同src/pages/DataAnalysis/EconomyRun/MainIndicator/components/index.js  一起维护)
 * @param {*} value
 * @param {string | Object} format thousands千分位、toFixed-num保留num个小数点。(可扩展)。
 * @param {string} defaultVal 默认展示的字符串,默认'-'。
 * @returns
 */

const formatOption = {
  thousands: "thousands",
  toFixed: {
    type: "toFixed",
    separate: "-"
  }
}
export function defaultValue(value, format, defaultVal = "-") {
  if (value === null || value === undefined) {
    return defaultVal
  }

  let option: any = {}

  // 对象类型
  if (typeof format === "object") {
    option = format
  } else {
    // 字符串类型
    option.type = format

    // toFixed-num -> format=toFiexd num = num
    const isToFixed =
      format && format.includes(`${formatOption.toFixed.type}${formatOption.toFixed.separate}`)
    if (isToFixed) {
      const parseArr = format.split(formatOption.toFixed.separate)
      // 处理toFixed
      option.type = formatOption.toFixed.type
      option.num = Number(parseArr[1]) || 2
    }
  }

  let newVal
  switch (option.type) {
    // 千分位
    case formatOption.thousands:
      console.log("千分位处理方式")
      break
    // toFixed
    case formatOption.toFixed.type:
      // 兼容传递的是string数字
      if (option.num === 4) {
        newVal = Number(String(value).replace(/^(.*\..{4}).*$/, "$1"))
      } else {
        newVal = Number(String(value).replace(/^(.*\..{2}).*$/, "$1"))
      }
      // newVal = Number(value).toFixed(num);

      if (option.removalZero) {
        newVal = newVal.replace(/(\.0+)/g, () => {
          return ""
        })
      }
      break

    default:
      newVal = value
      break
  }

  return newVal
}

/**
 * chart 图标坐标轴 min、max
 * 每个series 对应的数据值 数组， 公用同一个坐标轴。
 * @param {*} arr [number | null | undefined [],]
 * @returns
 */
export function generalMax_Min(arr) {
  const allVals = [].concat(...arr)
  const allFilterVals = allVals.filter((item) => item !== undefined)

  const maxVal = Math.max(...allFilterVals)
  const minVal = Math.min(...allFilterVals)

  const isHas = allFilterVals.some((item) => !!item)
  return {
    min: `${isHas ? (minVal < 0 ? "dataMin" : 0) : 0}`,
    max: `${isHas ? (maxVal > 0 ? "dataMax" : 0) : 100}`
  }
}

/**
 * 处理数据函数。
 * @param data
 * @param option
 * @returns
 * 使用如下。
 * handlerDataFunc(data1.value, {
    sort: { isSort: false, sortField: "month", isAscending: true },
    categoryField: "month", // year | month
    fields: ["field1"]
  })
 */
export function handlerDataFunc(data, option) {
  const {
    sort: { isSort, sortField, isAscending = true },
    categoryField,
    fields = []
  } = option

  const categoryAxis: any = [] //类目轴

  const dataAll = {
    categoryAxis
  }

  fields.forEach((field) => {
    dataAll[field] = []
  })

  //健壮性判断
  if (!Array.isArray(data)) {
    return dataAll
  }
  // 对sortField字段进行排序 isAscending: true 升序。
  isSort &&
    data.sort((a, b) => {
      if (isAscending) {
        return Number(a[sortField]) - Number(b[sortField])
      } else {
        return Number(b[sortField]) - Number(a[sortField])
      }
    })

  data.forEach((item) => {
    if (item[categoryField]) {
      // 后端返回 存在categoryField为null, 也就意味着数据存在问题。
    }

    const categoryVal =
      categoryField === "month"
        ? item[categoryField].slice(item[categoryField].length - 2).replace(/^0/g, "") + "月"
        : item[categoryField]

    dataAll.categoryAxis.push(categoryVal)

    fields.forEach((field) => {
      dataAll[field].push(item[field])
    })
  })

  return dataAll
}

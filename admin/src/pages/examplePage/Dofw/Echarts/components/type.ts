import type { RegisteredSeriesOption } from "echarts"

export enum SeriesType {
  BAR = "bar",
  LINE = "line"
}

type Values<T> = T[keyof T]
export type SeriesOption = Values<RegisteredSeriesOption>
export interface GeneralSeriesFunc {
  (config): SeriesOption
}

export interface BarConfigType {
  type: "bar"
  seriesName: string
  unit: string
  color: string
  data: any

  xAxisIndex?: number
  yAxisIndex?: number
  barGap?: string | number
  barWidth?: string | number
  linearGradient?: any[]
  formatter?: string
  customSeriesFunc?: (config) => SeriesOption
}
export interface LineConfigType {
  type: "line"
  seriesName: string
  unit: string
  color: string
  data: any

  xAxisIndex?: number
  yAxisIndex?: number
  formatter?: string
  customSeriesFunc?: (config) => SeriesOption
}

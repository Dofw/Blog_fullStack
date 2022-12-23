import type { ComponentPublicInstance } from "vue"

// 问题1. 2 个 interface的融合，问题2.如何组件内获取组件实例自己

// 参数类型
export interface Params {
  field: string
  noPage: number
  pageSize: number
}

export interface pageParams {
  noPage: number
  pageSize: number
}

export interface conditionsParams {
  field: string
}

// 数据类型
export type ArrListType = ListType[]
export interface ListType {
  field1: string
  field2: string
  field3: string
  field4: string
}

// 组件实例增加属性
export interface CustomVm extends ComponentPublicInstance {
  list: ArrListType
  loading: boolean
  total: number
}

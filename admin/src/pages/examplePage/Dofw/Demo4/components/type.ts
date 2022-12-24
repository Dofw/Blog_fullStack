import type { Ref } from "vue"

// 参数类型
export interface Params extends PageParams, ConditionsParams {}

export interface PageParams {
  noPage: number
  pageSize: number
}

export interface ConditionsParams {
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

export interface ExposeType {
  loading: Ref<boolean>
  list: Ref<ArrListType>
  total: Ref<number>
}

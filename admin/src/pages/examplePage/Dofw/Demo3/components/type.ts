import type { Ref } from "vue"

// 参数类型
export type Params = PageParams & ConditionsParams

export type PageParams = Record<string, number>
export type ConditionsParams = Omit<Record<string, any>, keyof PageParams>

// 数据类型
export type ArrListType = any[]

//暴露属性
export interface ExposeType {
  loading: Ref<boolean>
  total: Ref<number>
  list: Ref<ArrListType>
  updateList: () => void
}

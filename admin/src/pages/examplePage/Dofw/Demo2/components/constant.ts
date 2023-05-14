import type { FormData } from "./type"

export function _clone(value: FormData) {
  if (!value) throw "value is undefined"
  return JSON.parse(JSON.stringify(value))
}
// 表单-默认值
export const defaultFormValue: FormData = {
  pass: "",
  checkPass: "",
  age: ""
}

export const code = `
import type { FormData } from "./type"

// 表单-默认值
export const defaultFormValue: FormData = {
  pass: "",
  checkPass: "",
  age: ""
}

export function _clone(value: FormData) {
  if (!value) throw "value is undefined"
  return JSON.parse(JSON.stringify(value))
}

`
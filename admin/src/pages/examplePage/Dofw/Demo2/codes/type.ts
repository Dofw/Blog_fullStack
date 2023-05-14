export const code = `
<script>
import type { Ref } from "vue"
import type { FormInstance } from "element-plus"

export interface FormData {
  pass: string
  checkPass: string
  age: string
}

// 组件实例添加额外baseForm实例
export interface BaseFormInstance extends Ref {
  formInstance: FormInstance // BaseForm组件抛出的form实例。
}

// AddForm、EditForm 添加reset方法
export interface ComponentsAddRest extends Ref {
  reset: () => void
}
</script>

`

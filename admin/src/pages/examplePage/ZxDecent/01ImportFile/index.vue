<template>
  <PreviewCodes :codeOptions="codeOptions" description="导入功能">
    <template #demo>
      <Example />
    </template>
    <template #summary>
      <v-md-editor :model-value="mdCode" mode="preview" />
    </template>
  </PreviewCodes>
</template>

<script lang="ts">
export default {
  name: "Import-File"
}
</script>

<script setup lang="ts">
import PreviewCodes from "@/components/PreviewCodes/index.vue"
import Example from "./components/index.vue"
import { codeOptions } from "./codes/_code"
import { ref } from "vue"

const mdCode = ref(`
### BaseForm 组件 (样式、验证等, 复杂逻辑可以通过 hook 方式分离。)

1. add 同 edit 模式一样
  - 外界不传入 formData 默认值，在 props 定义中 设置了默认值。故同编辑逻辑一样。

2. useFormInit 提供 ruleForm 、 resetData。 作用如下：
  1. ruleForm 响应式状态定义
  2. 外界传入的值，根据定义的 defaultFormData 的 keys 进行回填。而不是将无用的字段都传入给 ruleForm 保持提交时数据的清晰。
  3. 记录要 reset 的值，为什么不直接使用 props[propKey], 如下：
     - 一般性数据，可以直接使用props[propKey]
     - 包含特殊的 json数据，就不能直接赋值，要转换为 object， 否则表单可能会报错。
  4. 提供 jsonField2Parse 方法。回填 json 装换成 object

3. 设置 rules 验证规则；修改样式。

4. defineExpose 暴露 form 实例 、 cancel 供 dialog X close 恢复初始状态 。

`)
</script>

<style scoped lang="scss"></style>

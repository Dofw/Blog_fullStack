<template>
  <PreviewCodes :codeOptions="codeOptions" description="form 表单封装 实践总结。">
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
  name: "Form-add-edit"
}
</script>
<script setup lang="ts">
import PreviewCodes from "@/components/PreviewCodes/index.vue"
import Example from "./components/index.vue"
import { codeOptions } from "./codes/_code"
import { ref } from "vue"

const mdCode = ref(`
### BaseForm 组件 (样式、验证等, 复杂逻辑可以通过 hook 方式分离。)

1. 设置 formData 的默认 ref，watchEffect 监听外界提供的 formData，并对此深拷贝；原因 v-model = "props.formData.xxx" 同一个引用，不符合开发规范子组件改动 props；同时对外部组件可能造成一定的影响。故深拷贝解决此问题，只需要接受值，将新的结果返回。

2. 部分 Select 选项后台数据的获取(API、store)。

3. 设置 rules 验证规则；修改样式。

4. defineExpose 暴露 form 实例 、 close供 dialog X close 恢复初始状态 。
`)
</script>

<style scoped lang="scss"></style>

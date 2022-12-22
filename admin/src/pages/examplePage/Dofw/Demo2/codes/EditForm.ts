export const code = `
<template>
  <BaseForm ref="baseForm" :formData="_formData" @submit="onSubmit" @cancle="onCancle" />
</template>

<script setup lang="ts">
import type { FormData, BaseFormInstance } from "./type"
import BaseForm from "@/pages/examplePage/Dofw/Demo2/components/BaseForm.vue"
import { ref, watchEffect, defineExpose, defineProps, withDefaults } from "vue"

interface Props {
  formData: FormData
}

const props = withDefaults(defineProps<Props>(), {
  formData() {
    return {
      pass: "",
      checkPass: "",
      age: ""
    }
  }
})

// 维持自己的状态。不影响外界
const _formData = ref<FormData>({
  pass: "",
  checkPass: "",
  age: ""
})

watchEffect(() => {
  _formData.value = JSON.parse(JSON.stringify(props.formData))
})

const onSubmit = (data: FormData) => {
  console.log(data)
  reset()
}

const onCancle = () => {
  reset()
}

// 恢复初始不能使用resetFields，原因watchEffect同步执行，第一次传递的pass为""
const baseForm = ref<BaseFormInstance>({} as BaseFormInstance)
const reset = () => {
  baseForm.value.formInstance.clearValidate()
  _formData.value = JSON.parse(JSON.stringify(props.formData)) // 回填最新的props
}

// 取消功能暴露, 为dialog x 提供。
defineExpose({
  reset
})
</script>

<style scoped></style>

`

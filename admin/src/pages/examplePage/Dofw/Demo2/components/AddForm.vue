<template>
  <BaseForm ref="baseForm" :formData="formData" @submit="onSubmit" @cancle="onCancle" />
</template>

<script setup lang="ts">
import type { FormData, BaseFormInstance } from "./type"
import BaseForm from "@/pages/examplePage/Dofw/Demo2/components/BaseForm.vue"
import { ref, onMounted, watchEffect, defineExpose } from "vue"

const formData = ref<FormData>({
  pass: "default", //该属性由接口数据回填
  checkPass: "default",
  age: "default"
})

const passData = ref<string>("")
onMounted(async () => {
  passData.value = await Promise.resolve("api獲取")
})

watchEffect(() => {
  formData.value.pass = passData.value
})

const onSubmit = (data: FormData) => {
  console.log(data)
  reset()
}

const onCancle = (data: FormData) => {
  console.log(data)
  reset()
}

// 恢复初始不能使用resetFields，原因watchEffect同步执行，第一次传递的pass为""
const baseForm = ref<BaseFormInstance>({} as BaseFormInstance)
const reset = () => {
  baseForm.value.formInstance.clearValidate()
  // baseForm.value.formInstance.resetFields()
  // formData.value.pass = passData.value

  formData.value = {
    ...formData.value,
    pass: passData.value // 获取数据后的值。
  }
}

// 取消功能暴露, 为dialog x 提供。
defineExpose({
  reset
})
</script>

<style scoped></style>

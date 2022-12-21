<template>
  <BaseForm ref="baseForm" :formData="formData" @submit="onSubmit" @cancle="onCancle" />
</template>

<script setup lang="ts">
import type { FormData } from "./type"
import type { FormInstance } from "element-plus"
import type { Ref } from "vue"
import BaseForm from "@/pages/examplePage/Dofw/Demo2/components/BaseForm.vue"
import { ref, onMounted, watchEffect, defineExpose } from "vue"

interface BaseFormInstance extends Ref {
  formInstance: FormInstance // BaseForm组件抛出的form实例。
}

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
  formData.value = {
    ...formData.value,
    pass: passData.value // 获取数据后的值。
  }
}

// 取消功能暴露
defineExpose({
  reset
})
</script>

<style scoped></style>

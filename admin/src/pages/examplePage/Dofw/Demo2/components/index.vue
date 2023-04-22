<template>
  <div class="form-container">
    <div style="width: 100%">
      <BaseFormNew></BaseFormNew>
    </div>

    <el-divider></el-divider>

    <el-button @click="dialogVisible = true"> 编辑 </el-button>
    <el-dialog v-model="dialogVisible" title="编辑" width="30%" draggable @close="onCancle">
      <BaseFormNew ref="baseForm" model="edit" :formData="formData"></BaseFormNew>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { FormData, ComponentsAddRest } from "./type"

import { ref } from "vue"
import BaseFormNew from "./BaseForm.vue"

const baseForm = ref<ComponentsAddRest>({} as ComponentsAddRest)

const formData = ref<FormData>({
  pass: "edit",
  checkPass: "edit",
  age: "edit"
})

const dialogVisible = ref(false)

const onCancle = () => {
  baseForm.value.cancle()
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
}
</style>

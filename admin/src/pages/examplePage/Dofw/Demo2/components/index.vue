<template>
  <div class="form-container">
    <div style="width: 100%">
      <AddForm ref="addForm"></AddForm>
    </div>

    <el-divider></el-divider>

    <el-button @click="dialogVisible = true"> 编辑 </el-button>
    <el-dialog v-model="dialogVisible" title="编辑" width="30%" draggable @close="onCancle">
      <EditForm ref="editForm" :formData="formData"></EditForm>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { FormData, ComponentsAddRest } from "./type"
import AddForm from "@/pages/examplePage/Dofw/Demo2/components/AddForm.vue"
import EditForm from "@/pages/examplePage/Dofw/Demo2/components/EditForm.vue"

import { ref } from "vue"

const addForm = ref<ComponentsAddRest>({} as ComponentsAddRest)
const editForm = ref<ComponentsAddRest>({} as ComponentsAddRest)

const formData = ref<FormData>({
  pass: "edit",
  checkPass: "edit",
  age: "edit"
})

const dialogVisible = ref(false)

const onCancle = () => {
  editForm.value.reset()
}
</script>

<style scoped>
.form-container {
  display: flex;
  flex-wrap: wrap;

  justify-content: center;
}
</style>

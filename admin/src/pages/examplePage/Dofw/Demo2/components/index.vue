<template>
  <div class="form-container">
    <AddForm ref="addForm"></AddForm>
    <EditForm ref="editForm" :formData="formData"></EditForm>
  </div>
</template>

<script setup lang="ts">
import type { FormData, BaseFormInstance } from "./type"
import AddForm from "@/pages/examplePage/Dofw/Demo2/components/AddForm.vue"
import EditForm from "@/pages/examplePage/Dofw/Demo2/components/EditForm.vue"

import { ref } from "vue"

const addForm = ref<BaseFormInstance>({} as BaseFormInstance)
const editForm = ref<BaseFormInstance>({} as BaseFormInstance)

const formData = ref<FormData>({
  pass: "edit",
  checkPass: "edit",
  age: "edit"
})
</script>

<style scoped></style>

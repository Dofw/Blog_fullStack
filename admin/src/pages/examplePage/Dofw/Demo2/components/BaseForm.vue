<template>
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
    <el-form-item label="Password" prop="pass">
      <el-input v-model="ruleForm.pass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Confirm" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Age" prop="age">
      <el-input v-model.number="ruleForm.age" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit(ruleFormRef)">Submit</el-button>
      <el-button @click="cancle(ruleFormRef)">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import type { FormInstance } from "element-plus"

const ruleFormRef = ref<FormInstance>({})
const ruleForm = reactive({
  pass: "",
  checkPass: "",
  age: ""
})

// async-validator
const rules = reactive({
  pass: [{ require: true, trigger: "blur" }],
  checkPass: [{ require: true, trigger: "blur" }],
  age: [{ require: true, trigger: "blur" }]
})

// 提交、撤销
const submit = (instance: FormInstance): void => {}
const cancle = (instance: FormInstance): void => {}
</script>

<style scoped></style>

<template>
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="100px">
    <el-form-item label="Password" prop="pass">
      <el-input v-model="ruleForm.pass" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Confirm" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" autocomplete="off" />
    </el-form-item>
    <el-form-item label="Age" prop="age">
      <el-input v-model.number="ruleForm.age" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">Submit</el-button>
      <el-button @click="cancle">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, defineEmits, withDefaults, watchEffect, defineExpose } from "vue"
import type { FormInstance } from "element-plus"
import type { FormData } from "./type"

export interface Props {
  formData: FormData
}

// form实例
const ruleFormRef = ref<FormInstance>({} as FormInstance)
// form实例提升，做clear等相关处理
defineExpose({
  formInstance: ruleFormRef
})

const $emits = defineEmits(["submit", "cancle"])

// props 默认值
const props = withDefaults(defineProps<Props>(), {
  formData() {
    return {
      pass: "",
      checkPass: "",
      age: ""
    }
  }
})

// 表单数据
const ruleForm = ref<FormData>({
  pass: "",
  checkPass: "",
  age: ""
})

watchEffect(() => {
  // 深克隆一下。
  ruleForm.value = props.formData
})

// 验证规则：async-validator
const rules = reactive({
  pass: [{ require: true, trigger: "blur" }],
  checkPass: [{ require: true, trigger: "blur" }],
  age: [{ require: true, trigger: "blur" }]
})

// 提交、撤销
const submit = (): void => {
  $emits("submit", ruleForm)
}
const cancle = (): void => {
  $emits("cancle", ruleForm)
}
</script>

<style scoped></style>

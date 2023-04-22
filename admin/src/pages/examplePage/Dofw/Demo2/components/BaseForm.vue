<template>
  <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="100px">
    <el-form-item label="Password" prop="pass">
      <el-input v-model="ruleForm.pass" />
    </el-form-item>
    <el-form-item label="Confirm" prop="checkPass">
      <el-input v-model="ruleForm.checkPass" />
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
import { ref, reactive, defineProps, withDefaults, watchEffect, defineExpose } from "vue"
import type { FormInstance, FormRules } from "element-plus"
import type { FormData } from "./type"
import { defaultFormValue, _clone } from "./util"

export interface Props {
  formData?: FormData
  model: "add" | "edit"
}

// form实例
const ruleFormRef = ref<FormInstance>({} as FormInstance)

// props 默认值
const props = withDefaults(defineProps<Props>(), {
  formData() {
    return _clone(defaultFormValue)
  },
  model: "add"
})

// 隔离外部数据。
const ruleForm = ref<FormData>(_clone(defaultFormValue))
watchEffect(() => {
  // 新增有默认值，编辑有传入的值。 props.fromData 作为 init。
  initOrBackFormData()
})

// 验证规则：async-validator, 传值的方式必须使用blur的验证方式。
const rules = reactive<FormRules>({
  pass: [{ required: true, trigger: "blur", message: "pass错误" }],
  checkPass: [{ required: true, trigger: "blur", message: "checkPass错误" }],
  age: [{ required: true, type: "number", trigger: "blur", message: "age错误" }]
})

// 提交 - 区别 编辑 和 新增
const operateOption = {
  add: (formData: FormData) => {
    console.log("新增操作", formData)
  },
  edit: (formData: FormData) => {
    console.log("编辑操作", formData)
  }
}
const submit = async (): Promise<void> => {
  await ruleFormRef.value.validate()
  operateOption[props.model](ruleForm.value)
}

const cancle = (): void => {
  ruleFormRef.value.clearValidate()
  initOrBackFormData()
}

// init or back to init
function initOrBackFormData() {
  ruleForm.value = _clone(props.formData)
}

// 取消功能暴露, 为dialog x 提供。
defineExpose({
  formInstance: ruleFormRef,
  cancle
})
</script>

<style scoped></style>

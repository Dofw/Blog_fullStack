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
      <el-button @click="cancel">Reset</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, defineProps, withDefaults, defineExpose } from "vue"
import { defaultFormValue, _clone } from "./useFormInit"
import useFormInit from "./useFormInit"
import type { FormInstance, FormRules } from "element-plus"
import type { FormData } from "./useFormInit"

export interface Props {
  formData?: FormData
  model: "add" | "edit" | "detail"
}

// props 默认值
const props = withDefaults(defineProps<Props>(), {
  formData() {
    return _clone(defaultFormValue) // 这样就可以将 add/同edit 按相同的思路处理了
  },
  model: "add"
})

const emits = defineEmits(["close", "update-list"])

// form实例
const ruleFormRef = ref<FormInstance>({} as FormInstance)

// 隔离外部数据。
// const ruleForm = useFormInit(props, "formData", defaultFormValue)
const ruleForm = useFormInit(
  props,
  "formData",
  { pass: "1231", checkPass: "", age: "" },
  (key, value) => {
    console.log(key, value)
    return value
  }
)
// 验证规则：async-validator, 传值的方式必须使用blur的验证方式。
const rules = reactive<FormRules>({
  pass: [{ required: true, trigger: "blur", message: "pass错误" }],
  checkPass: [{ required: true, trigger: "blur", message: "checkPass错误" }],
  age: [{ required: true, type: "number", trigger: "blur", message: "age错误" }]
})

// 提交 - 区别 编辑 和 新增
const operateOption = {
  add: async (formData: FormData) => {
    console.log("新增操作", formData)
    await Promise.resolve("新增完成")
    finishOperate()
  },
  edit: async (formData: FormData) => {
    console.log("编辑操作", formData)
    await Promise.resolve("更新完成")
    finishOperate()
  },
  detail: () => {
    return
  }
}
const submit = async (): Promise<void> => {
  await ruleFormRef.value.validate()
  operateOption[props.model](ruleForm.value)
}

const cancel = (): void => {
  ruleFormRef.value.clearValidate()
  ruleForm.value = _clone(props["formData"])
}

// 取消功能暴露, 为dialog x 提供。
defineExpose({
  formInstance: ruleFormRef,
  cancel
})

function finishOperate() {
  emits("close", false)
  emits("update-list")
  cancel()
}
</script>

<style scoped></style>

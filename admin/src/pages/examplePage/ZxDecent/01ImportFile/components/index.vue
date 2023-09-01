<template>
  <div>
    <el-button @click="handleImport"> 文件导入 </el-button>
    <ImportForm
      ref="importFormRef"
      title="文件导入"
      @download-template="downloadTemplate"
      :uploadFile="uploadFile"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"
import ImportForm from "./ImportForm.vue"
import download from "@/utils/download"
import type { UploadRequestHandler } from "element-plus"

const importFormRef = ref()
const handleImport = () => {
  importFormRef.value.open()
}

// 下载模板
const downloadTemplate = async () => {
  const res = await Promise.resolve("stream")
  download.zip(res, "就业登记信息.zip")
}

// 导入上传接口
const uploadFile: UploadRequestHandler = async (option) => {
  var formData = new FormData()
  formData.append("file", option.file)
  await Promise.resolve("formData->result")
  ElMessage({
    showClose: true,
    message: "上传成功",
    type: "success"
  })
  //更新分页列表
  // updateList()
}
</script>

<style scoped></style>

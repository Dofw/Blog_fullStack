<template>
  <Dialog v-model="dialogVisible" :title="title" @close="onCancel" width="400">
    <el-upload
      ref="uploadRef"
      v-model:file-list="fileList"
      :http-request="uploadFile"
      :auto-upload="false"
      :disabled="formLoading"
      :headers="uploadHeaders"
      :limit="1"
      :on-error="submitFormError"
      :on-exceed="handleExceed"
      :on-success="submitFormSuccess"
      accept=".xlsx, .xls"
      drag
    >
      <Icon icon="ep:upload" />
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      <template #tip>
        <div class="el-upload__tip text-center">
          <span>仅允许导入 xls、xlsx 格式文件。</span>
          <el-link
            :underline="false"
            style="font-size: 12px; vertical-align: baseline"
            type="primary"
            @click="importTemplate"
          >
            下载模板
          </el-link>
        </div>
      </template>
    </el-upload>
    <template #footer>
      <el-button :disabled="formLoading" type="primary" @click="submitForm">确 定</el-button>
      <el-button @click="onCancel">取 消</el-button>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import { ref } from "vue"
// import { getAccessToken, getTenantId } from '@/utils/auth'
import { type UploadRequestHandler, ElMessage } from "element-plus"
import Dialog from "./Dialog.vue"

interface Props {
  // uploadUrl: string
  title: string
  uploadFile: UploadRequestHandler
}

withDefaults(defineProps<Props>(), {
  // uploadUrl: '',
  title: "",
  uploadFile: undefined
})

const dialogVisible = ref(false) // 弹窗的是否展示
const formLoading = ref(false) // 表单的加载中
const uploadRef = ref()

const uploadHeaders = ref() // 上传 Header 头
const fileList = ref([]) // 文件列表

/** 打开弹窗 */
const open = () => {
  dialogVisible.value = true
  resetForm()
}
defineExpose({ open }) // 提供 open 方法，用于打开弹窗

//************** 权限 token
const AccessTokenKey = "ACCESS_TOKEN"
const getAccessToken = () => {
  return localStorage.getItem(AccessTokenKey) ? localStorage.getItem(AccessTokenKey) : ""
}
// *************

/** 提交表单 */
const submitForm = async () => {
  if (fileList.value.length == 0) {
    ElMessage.error("请上传文件")
    return
  }
  // 提交请求
  uploadHeaders.value = {
    Authorization: "Bearer " + getAccessToken(),
    "Content-Type": "application/x-www-form-urlencoded"
  }
  formLoading.value = true
  uploadRef.value.submit()
  dialogVisible.value = false
  fileList.value = []
}

// 取消
const onCancel = () => {
  dialogVisible.value = false
  fileList.value = []
}

/** 文件上传成功 */
const emits = defineEmits(["success", "downloadTemplate"])
const submitFormSuccess = (response: any) => {
  // console.log('打印呀')
  if (response.code !== 0) {
    ElMessage.error(response.msg)
    formLoading.value = false
    return
  }
  // 拼接提示语
  const data = response.data
  let text = "上传成功数量：" + data.createUsernames.length + ";"
  for (let username of data.createUsernames) {
    text += "< " + username + " >"
  }
  text += "更新成功数量：" + data.updateUsernames.length + ";"
  for (const username of data.updateUsernames) {
    text += "< " + username + " >"
  }
  text += "更新失败数量：" + Object.keys(data.failureUsernames).length + ";"
  for (const username in data.failureUsernames) {
    text += "< " + username + ": " + data.failureUsernames[username] + " >"
  }
  ElMessage.alert(text)
  // 发送操作成功的事件
  emits("success")
}

/** 上传错误提示 */
const submitFormError = (): void => {
  ElMessage.error("上传失败，请您重新上传！")
  formLoading.value = false
}

/** 重置表单 */
const resetForm = () => {
  // 重置上传状态和文件
  formLoading.value = false
  uploadRef.value?.clearFiles()
}

/** 文件数超出提示 */
const handleExceed = (): void => {
  ElMessage.error("最多只能上传一个文件！")
}

/** 下载模板操作 */
const importTemplate = () => {
  emits("downloadTemplate")
}
</script>

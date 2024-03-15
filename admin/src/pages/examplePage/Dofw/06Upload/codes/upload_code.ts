export const code = `
<template>
  <el-upload
    ref="uploadRef"
    :multiple="props.limit > 1"
    name="file"
    :file-list="modelValue"
    :show-file-list="true"
    :list-type="listType"
    :auto-upload="autoUpload"
    :action="updateUrl"
    :headers="uploadHeaders"
    :limit="props.limit"
    :drag="drag"
    :before-upload="beforeUpload"
    :on-exceed="handleExceed"
    :on-success="handleFileSuccess"
    :on-error="excelUploadError"
    :on-remove="handleRemove"
    :on-preview="handlePreview"
    :disabled="disabled"
    class="me-upload-files-uploader myupload"
  >
    <slot :fileConfig="fileConfig">
      <el-tag class="flex items-center ml-2"
        ><Icon class="mr-1" icon="ep:upload-filled" />上传文件</el-tag
      >
    </slot>
    <template v-if="isShowTip" #tip>
      <slot name="tip" :fileConfig="fileConfig">
        <div style="font-size: 12px">
          大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
        </div>
        <div style="font-size: 12px">
          格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b> 的文件
        </div>
      </slot>
    </template>
  </el-upload>
</template>
<script setup lang="ts" name="UploadFile">
import { PropType } from "vue"
import { propTypes } from "@/utils/propTypes"
import type { UploadInstance, UploadUserFile, UploadProps, UploadRawFile } from "element-plus"

const message = useMessage() // 消息弹窗
const emit = defineEmits(["update:modelValue"])

const props = defineProps({
  modelValue: {
    type: Array as PropType<UploadUserFile[]>,
    required: true
  },
  title: propTypes.string.def("文件上传"),
  updateUrl: propTypes.string.def(import.meta.env.VITE_UPLOAD_URL),
  fileType: propTypes.array.def(["pdf", "xls", "xlsx", "doc", "docx", "rar", "zip", "jpg", "jpeg"]), // 文件类型, 例如['png', 'jpg', 'jpeg']
  fileSize: propTypes.number.def(100), // 大小限制(MB)
  limit: propTypes.number.def(5), // 数量限制
  autoUpload: propTypes.bool.def(true), // 自动上传
  disabled: propTypes.bool.def(false), // 自动上传
  drag: propTypes.bool.def(false), // 拖拽上传
  isShowTip: propTypes.bool.def(true), // 是否显示提示
  listType: {
    type: String as PropType<"text" | "picture" | "picture-card">,
    default: "text"
  } // 文件列表的类型
})
// 文件上传说明 配置
const fileConfig: any = ref({
  fileSize: props.fileSize,
  fileType: props.fileType,
  limit: props.limit
})

// ========== 上传相关 ==========
const uploadRef = ref<UploadInstance>()

const uploadHeaders = ref({
  Authorization: "Bearer ",
  "tenant-id": 1
})

// 初始回填
let newList: any = ref([])
let oldNum = 0 // 记录每次更新成功后的数量
watchEffect(() => {
  newList.value = [...props.modelValue]
  oldNum = props.modelValue.length // 记录每次更新成功后的数量
})
// 文件上传成功
let countRef = ref(0) // 成功数
let failCountRef = ref(0) // 失败数
/**
 * 成功回调、失败回调都要执行，因为不确定那个最后执行完。
 * @param filesLen 传入，每次上传的文件总数；非累计数
 */
const triggerEmit = (filesLen) => {
  const count = countRef.value
  const failCount = failCountRef.value

  if (count + failCount === filesLen) {
    // 完成一组，重置计数
    countRef.value = 0
    failCountRef.value = 0
    emit("update:modelValue", newList.value)
    if (failCount > 0) {
      message.warning(\`上传成功 \${count} 个, 提醒:上传失败 \${failCount} 个\`)
    } else {
      message.success("上传成功")
    }
  }
}
const handleFileSuccess: UploadProps["onSuccess"] = (res: any, file, files): void => {
  const { code, data } = res || {}
  if (code !== 0) {
    // 上传无效
    message.warning("上传无效")
    handleRemove(file)
    return
  }
  // 上传成功
  const { name } = file
  let newItem
  if (typeof data === "string") {
    newItem = { name, url: data }
  } else {
    newItem = data
  }

  countRef.value++
  newList.value.push(newItem)
  triggerEmit(files.length - oldNum)
}
// 上传错误提示
const excelUploadError: UploadProps["onError"] = (error, file, files): void => {
  failCountRef.value++
  triggerEmit(files.length - oldNum)
}
// 文件数超出提示
const handleExceed: UploadProps["onExceed"] = (): void => {
  message.error(\`上传文件数量不能超过\${props.limit}个!\`)
}
// 文件上传之前判断
const beforeUpload: UploadProps["beforeUpload"] = (file: UploadRawFile) => {
  let fileExtension = ""
  if (file.name.lastIndexOf(".") > -1) {
    fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1)
  }
  const isImg = props.fileType.some((type: string) => {
    if (file.type.indexOf(type) > -1) return true
    return !!(fileExtension && fileExtension.indexOf(type) > -1)
  })
  const isLimit = file.size < props.fileSize * 1024 * 1024
  if (!isImg) {
    message.error(\`文件格式不正确, 请上传\${props.fileType.join("/")}格式!\`)
    return false
  }
  if (!isLimit) {
    message.error(\`上传文件大小不能超过\${props.fileSize}MB!\`)
    return false
  }
}
// 删除上传文件
const handleRemove = (file) => {
  const list = JSON.parse(JSON.stringify(props.modelValue)) // clone
  const findex = list.findIndex((f) => f.name === file.name)
  if (findex > -1) list.splice(findex, 1)
  // 出发fileList更新
  emit("update:modelValue", list)
}
const handlePreview: UploadProps["onPreview"] = (file) => {
  // 回填 新增内部属性不一样。
  fetch(file.url)
    .then((res) => {
      return res.blob()
    })
    .then((blob) => {
      const a: any = document.createElement("a")
      a.download = file.name
      // const blobUrl = window.URL.createObjectURL()
      const blobUrl = window.URL.createObjectURL(new Blob([blob]))
      a.href = blobUrl
      document.body.appendChild(a)
      a.click()
      a.remove()
      window.URL.revokeObjectURL(blobUrl)
    })
}
</script>

`

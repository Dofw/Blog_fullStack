<template>
  <div class="upload-container">
    <!-- 上传控件 -->
    <div class="upload-wrapper">
      <span>选择上传的文件</span>
      <input ref="inputRef" type="file" @change="onChange" accept="image/*, .mp4" multiple />
    </div>

    <div
      class="upload-drag-wrapper"
      @dragenter="onDragEnter"
      @dragover="onDragEnter"
      @drop="onDrop"
    >
      <span>拖拽上传的文件</span>
      <!-- input 本身默认就支持拖拽，这里只使用点击打开文件框的功能 -->
      <input ref="inputRef" type="file" accept="image/*, .mp4" multiple />
    </div>

    <el-table :data="data">
      <el-table-column prop="filename" label="文件名" />
      <el-table-column prop="success" label="上传状态">
        <template #default="{ row }">
          <div>
            {{ row.success ? "成功" : "-" }}
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="percent" label="进度" />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button size="small" type="info" @click="row.cancel && row.cancel()">取消</el-button>
          <el-button size="small" type="success" @click="row.callAgain && row.callAgain()"
            >重新</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-button @click="onStart">开始上传</el-button>
  </div>
</template>

<script setup lang="ts">
import { executeQueues } from "./utils"
import type { UploadItemOption } from "./utils"
import { ref } from "vue"
import type { Ref } from "vue"

const inputRef: Ref<HTMLInputElement> = ref({} as Ref<HTMLInputElement>)

const data = ref<UploadItemOption[]>([])
const onDragEnter = (e) => {
  e.preventDefault()
}
const onDrop = (e) => {
  e.preventDefault()
  console.log(e.dataTransfer.files)
  // 处理文件夹逻辑。
  inputRef.value.files = e.dataTransfer.files

  // 走后续的上传流程
  onChange()
}
const onChange = async () => {
  const files = inputRef.value.files
  if (files) {
    for (let file of files) {
      const formData = new FormData()
      formData.append("files", file, file.name)

      let option = {
        url: "http://localhost:3300/admin/uploads",
        body: formData,
        headers: {}
      }

      data.value.push({
        filename: file.name,
        fileSize: file.size,

        percent: 0,
        result: null,
        success: false,
        cancel: null,
        callAgain: null,
        option
      })
    }
  }
}
const onStart = () => {
  executeQueues(data.value as UploadItemOption[], 3)
}
</script>

<style scoped lang="scss">
.upload-container {
  width: 100%;
  .upload-wrapper {
    position: relative;
    height: 50px;
    margin: 20px 0;

    display: flex;
    justify-content: center;
    align-items: center;

    // 新拟态
    border-radius: 10px;
    @include glass-blur();
    border: 1px solid var(--el-color-primary-dark-2);

    > svg {
      width: 80%;
      height: 80%;
    }

    > input {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }

  .upload-drag-wrapper {
    width: 100%;
    height: 100px;
    border-radius: 10px;
    @include glass-blur();
    border: 1px solid var(--el-color-primary-dark-2);

    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    > input {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  }
}
</style>

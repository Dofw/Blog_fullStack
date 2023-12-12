<template>
  <div class="upload-container">
    <!-- 上传控件 -->
    <div class="upload-wrapper">
      <!-- <Upload /> -->
      <span>选择上传的文件</span>
      <input ref="inputRef" type="file" @change="onChange1" accept="image/*, .mp4" multiple />
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
          <el-button type="info" @click="row.cancel && row.cancel()">取消</el-button>
          <el-button type="success" @click="row.callAgain && row.callAgain()">重新</el-button>
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
const onChange1 = async (e: Event) => {
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
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow: 5px 5px 40px #9d9d9d, 0px 0px 40px #ffffff;

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
}
</style>

<template>
  <div>
    <!-- 上传控件 -->
    <div class="upload-wrapper">
      <Upload />
      <input ref="inputRef" type="file" @change="onChange1" accept=".pdf" />
    </div>

    <UploadItem v-for="item in data" :data="item" :key="item.index"></UploadItem>
  </div>
</template>

<script setup lang="ts">
import { executeQueues } from "./utils"

import type { Option, RequestItem } from "./utils"
import UploadItem from "./UploadItem.vue"
import { Upload } from "@element-plus/icons-vue"
import { ref } from "vue"
import type { Ref } from "vue"

const inputRef: Ref<HTMLInputElement> = ref({} as HTMLInputElement)

const data: Ref<RequestItem[]> = ref([])
const onChange1 = (e: Event) => {
  const files = inputRef.value.files

  const file = files && files[0]
  if (file) {
    console.log(files && files[0])
    const formData = new FormData()
    console.log("name1", file, file.name)
    formData.append("name1", file, file.name)
    console.log(formData)
  }

  // {
  //   url:xxx, // 用户提供
  //   percent, // 用户提供
  //   success, // 用户提供
  //   error, // 用户提供

  //   // 上传文件信息
  //   fileName: xxx,
  //   size: xxx,
  //   body:xxx,
  // }

  // data.value = executeQueues(arr, 3)
}
</script>

<style scoped lang="scss">
.upload-wrapper {
  position: relative;
  width: 100px;
  height: 100px;

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
</style>

<template>
  <div>
    <!-- 上传控件 -->
    <div class="upload-wrapper">
      <Upload />
      <input ref="inputRef" type="file" @change="onChange1" accept="image/*, .mp4" multiple />
    </div>

    <UploadItem v-for="(item, index) in data" :data="item" :key="index"></UploadItem>
  </div>
</template>

<script setup lang="ts">
import { executeQueues } from "./utils"

import type { RequestItem } from "./utils"
import UploadItem from "./UploadItem.vue"
import { Upload } from "@element-plus/icons-vue"
import { ref } from "vue"
import type { Ref } from "vue"

const inputRef: Ref<HTMLInputElement> = ref({} as Ref<HTMLInputElement>)

const data: Ref<RequestItem[]> = ref([])
const onChange1 = async (e: Event) => {
  const files = inputRef.value.files

  console.log(files)

  let allItems: RequestItem[] = []
  if (files) {
    for (let file of files) {
      const formData = new FormData()
      formData.append("files", file, file.name)

      let option = {
        url: "http://localhost:3300/uploads",
        body: formData,
        headers: {}
      }

      allItems.push({
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

  data.value = executeQueues(allItems, 3)
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

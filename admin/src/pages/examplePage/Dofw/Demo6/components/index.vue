<template>
  <div>
    <iframe src="http://localhost:3300/assets/728cd14c83bede21cc82dd2da80ce931" type="pdf" style="width: 500px; height: 300px" frameborder="0"></iframe>
    <img :src="url" alt="" style="border: 1px solid green; width: 100px; height: 100px" />
    <!-- 上传控件 -->
    <div class="upload-wrapper">
      <Upload />
      <input ref="inputRef" type="file" @change="onChange1" accept="image/*" />
    </div>

    <UploadItem v-for="item in data" :data="item" :key="item.index"></UploadItem>
  </div>
</template>

<script setup lang="ts">
import { executeQueues, requestTest } from "./utils"

import type { RequestItem } from "./utils"
import UploadItem from "./UploadItem.vue"
import { Upload } from "@element-plus/icons-vue"
import { ref } from "vue"
import type { Ref } from "vue"

const url: Ref<string> = ref("")

const inputRef: Ref<HTMLInputElement> = ref({} as HTMLInputElement)

const data: Ref<RequestItem[]> = ref([])
const onChange1 = async (e: Event) => {
  const files = inputRef.value.files

  const file = files && files[0]
  if (file) {
    const formData = new FormData()
    formData.append("files", file, file.name)

    const res = await requestTest({
      url: "/admin/uploads",
      body: formData
    })

    url.value = res.url
  }

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

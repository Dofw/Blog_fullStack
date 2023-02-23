<template>
  <div>
    <!-- 上传控件 -->
    <div class="upload-wrapper">
      <Upload />
      <input ref="inputRef" type="file" @change="onChange" accept=".pdf" />
    </div>

    <!-- <UploadItem :data="data"></UploadItem> -->
  </div>
</template>

<script setup lang="ts">
import UploadItem from "./UploadItem.vue"
import { Upload } from "@element-plus/icons-vue"
import { ref } from "vue"
import type { Ref } from "vue"
const data = ref({
  fileName: "文件1",
  percent: 1
})

const inputRef: Ref<HTMLInputElement> = ref({} as HTMLInputElement)

const onChange = (e: Event) => {
  const files = inputRef.value.files

  const file = files && files[0]
  if (file) {
    console.log(files && files[0])
    const formData = new FormData()
    console.log("name1", file, file.name)
    formData.append("name1", file, file.name)
    console.log(formData)
  }
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

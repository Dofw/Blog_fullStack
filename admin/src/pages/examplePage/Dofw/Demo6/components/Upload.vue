<template>
  <div>
    <!-- 上传控件 -->
    <div></div>

    <UploadItem :data="data"></UploadItem>
  </div>
</template>

<script setup lang="ts">
import UploadItem from "./UploadItem.vue"
import { ref } from "vue"
const data = ref({
  fileName: "文件1",
  percent: 1
})
</script>

<style scoped></style>

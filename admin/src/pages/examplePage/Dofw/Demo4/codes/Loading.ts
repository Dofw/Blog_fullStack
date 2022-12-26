export const code = `
<template>
  <div class="my-loading-container">
    <el-icon class="is-loading" :size="25" color="rgb(21, 95, 62)">
      <Loading />
    </el-icon>
    <span>Loading...</span>
  </div>
</template>

<script setup lang="ts">
import { Loading } from "@element-plus/icons-vue"
</script>

<style scoped lang="scss">
.my-loading-container {
  position: absolute;
  left: 0;
  top: 0;

  width: 100%;
  height: 100%;

  background-color: orange;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  > span {
    padding-left: 10px;
    width: 100%;
    text-align: center;
  }
}
</style>


`

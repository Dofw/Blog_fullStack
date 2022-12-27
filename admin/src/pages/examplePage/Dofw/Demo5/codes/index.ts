export const code = `
<template>
  <div class="directive-container">
    <el-button @click="onChange">改变</el-button>
    <div class="test" v-myLoading="loading1"></div>
    <div class="test" v-myLoading="loading2"></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"

const loading1 = ref(true)
const loading2 = ref(true)

const onChange = () => {
  loading1.value = !loading1.value
  setTimeout(() => {
    loading2.value = !loading2.value
  }, 3000)
}
</script>

<style lang="scss" scoped>
.directive-container {
  position: relative;

  width: 400px;
  height: 300px;

  display: flex;

  .test {
    z-index: 100;
    width: 200px;
    height: 150px;
    border: 1px solid green;
  }
}
</style>

`

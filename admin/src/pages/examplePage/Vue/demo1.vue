<template>
  <div>
    vue-demo-1
    {{ JSON.stringify(test1) }}
    <el-button type="primary" @click="onClick">測試</el-button>
    <el-button type="primary" @click="onClick1">改变内部 </el-button>
  </div>
</template>
<script lang="ts">
export default {
  name: 'vue-demo-1'
}
</script>
<script setup lang="ts">
import { reactive } from 'vue'
let test1 = reactive<{ [key: string]: any }>({
  a: 1,
  b: 2
})

const onClick = () => {
  test1 = {}
}
const onClick1 = () => {
  test1.b = '121'
}
</script>

<style scoped>
</style>
export const tempCode = `
<template>
  <div class="container" > 
    <el-button @click="onChangeText">Default</el-button>
    <div>block</div>
  </div>
</template>

<script setup>
  import {ElButton} from 'element-plus'
  import { ref, onMounted } from 'vue'
    onMounted(() => {
    })
  const text = ref('测试, style为添加')
  let i = 1
  const onChangeText = () => {
    text.value = text.value + i++
  }
</script>
`

export const tempCode = `
<template>
<div @click="onChangeText">{{text}}</div>
<el-button>Default</el-button>
  </template>

  <script setup>
import {ElButton} from 'element-plus'
    import { ref, onMounted } from 'vue'
      onMounted(() => {
      })
    const text = ref('init')
    let i = 1
    const onChangeText = () => {
      text.value = text.value + i++
    }
  </script>

  <style scoped>
      .container{
          color: green
      }
  </style>
`

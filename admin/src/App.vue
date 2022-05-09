<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

//初始设置[data-theme_light]
onMounted(() => {
  const htmlDom = document.documentElement
  htmlDom.dataset.theme_light = ''
})
</script>

<style scoped>
</style>
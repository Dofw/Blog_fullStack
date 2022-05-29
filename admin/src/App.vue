<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
const obj= {
  a: 123,
  c: '1321'
}

//初始设置[data-theme_light]
onMounted(() => {
  const htmlDom = document.documentElement
  htmlDom.dataset.theme_light = ''
})
</script>

<style scoped lang="scss">
:global(#app){
  width: 100%;
  height: 100%;
}
</style>
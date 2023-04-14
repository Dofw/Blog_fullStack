<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { onMounted } from "vue"

onMounted(() => {
  const htmlDom = document.documentElement
  htmlDom.className = "light"
})
</script>

<style scoped lang="scss">
:global(#app) {
  width: 100%;
  height: 100%;
}
</style>

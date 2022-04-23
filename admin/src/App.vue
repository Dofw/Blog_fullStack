<script setup lang="ts">
import { triggerTheme } from '@/utils';
import { onMounted } from 'vue'
//初始设置[data-theme_light]
onMounted(() => {
  const htmlDom = document.documentElement
  htmlDom.dataset.theme_light = ''
})
</script>

<template>
  <div class="wrapper" @click="triggerTheme">
    <div class="child">1231232</div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  width: 100vh;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  .child {
    width: 200px;
    height: 200px;
    @include theme-bg(vt-c-bg-mute);
    @include theme-bShadow(vt-c-shadow-2);
    @include theme-borderColor(vt-c-borderColor);
    border: 1px solid;
  }
}
</style>

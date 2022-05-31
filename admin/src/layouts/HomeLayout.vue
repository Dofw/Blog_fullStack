<template>
  <LayoutHome>
    <template v-slot:aside>
      <LeftMenu />
    </template>

    <template v-slot:header>
      header
    </template>

    <template v-slot:main>
      <router-view />
    </template>
  </LayoutHome>
</template>

<script setup lang="ts">
import LayoutHome from '@/components/LayoutHome/index.vue'
import LeftMenu from './components/LeftMenu.vue'
const a = 123
</script>

<style scoped lang="scss">
:global(#app) {
  width: 100%;
  height: 100%;
}
</style>
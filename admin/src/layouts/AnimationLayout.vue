<template>
  <el-container>
    <el-aside width="auto">
      <LeftMenu />
    </el-aside>
    <el-container class="container-box">
      <el-header style="padding: 0">
        <Header />
      </el-header>
      <el-main style="padding: 0">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import LeftMenu from "./components/LeftMenu.vue"
import Header from "@/layouts/components/Header.vue"
</script>

<style scoped lang="scss">
.container-box {
  position: relative;

  > canvas.content-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

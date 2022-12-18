<template>
  <el-container>
    <el-aside width="auto">
      <LeftMenu />
    </el-aside>
    <el-container>
      <el-header style="padding: 0">
        <Header />
      </el-header>
      <el-main style="padding: 0 15px">
        <div class="main-wrapper">
          <router-view />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import LeftMenu from "./components/LeftMenu.vue"
import Header from "@/layouts/components/Header.vue"
</script>

<style scoped lang="scss">
.main-wrapper {
  height: 100%;
  border: $border;

  width: 1500px;
  margin: 0 auto;
}
</style>

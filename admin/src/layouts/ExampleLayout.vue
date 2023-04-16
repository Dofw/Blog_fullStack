<template>
  <el-container>
    <el-aside width="auto">
      <LeftMenu />
    </el-aside>
    <el-container class="container-box">
      <canvas class="content-bg" ref="canvasBgRef" width="1920" height="1080"></canvas>
      <el-header style="padding: 0">
        <Header />
      </el-header>
      <el-main style="padding: 0">
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
import { onMounted, ref } from "vue"
import type { Ref } from "vue"
import collision from "@dofw/Demo5/components/collision"

const canvasBgRef: Ref<HTMLCanvasElement> = ref({} as HTMLCanvasElement)
onMounted(() => {
  collision(canvasBgRef)
})
</script>

<style scoped lang="scss">
.container-box {
  position: relative;

  .main-wrapper {
    height: 100%;
    width: 1200px;
    margin: 0 auto;
  }

  > canvas.content-bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

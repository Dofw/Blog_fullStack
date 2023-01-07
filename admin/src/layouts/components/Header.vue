<template>
  <el-row class="header-container" align="middle">
    <el-col :span="4"> </el-col>
    <el-col :span="16">
      <div>LOLLAPALOOZA</div>
    </el-col>
    <el-col :span="4">
      <el-switch v-model="isCollapse" @change="onChangeCollapse" inline-prompt active-text="展开" inactive-text="隐藏" />
      用户信息
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { ref } from "vue"
import useGlobalStore from "@/stores/useGlobalStore"

const globalStore = useGlobalStore()

const isCollapse = ref(globalStore.isCollapse)

const onChangeCollapse = (value: any) => {
  globalStore.isCollapse = value
}
</script>

<style lang="scss" scoped>
.header-container {
  height: 100%;
  background-color: olivedrab;
}
</style>

<template>
  <el-container>
    <el-aside width="auto">
      <LeftMenu :isCollapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header>
        <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">折叠</el-radio-button>
        </el-radio-group>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import LeftMenu from './components/LeftMenu.vue'

const isCollapse = ref(true)

</script>

<style scoped lang="scss">
</style>
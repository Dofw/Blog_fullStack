<template>
  <div class="homeLayoutContainer">
    <el-container>
      <el-aside>
        <slot name="aside" width="200px"></slot>
      </el-aside>
      <el-container>
        <el-header>
          <slot name="header"></slot>
        </el-header>
        <el-main>
          <slot name="main"></slot>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
// 位于app中
.homeLayoutContainer {
  width: 100%;
  height: 100%;
}
</style>
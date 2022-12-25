<template>
  <div class="directive-container">
    <el-button v-myloading:foo.isShow="true">组件</el-button>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.directive-container {
  position: relative;

  width: 400px;
  height: 300px;
  border: 1px solid olivedrab;

  .my-loading-container {
    position: absolute;
    left: 0;
    top: 0;

    width: 100%;
    height: 100%;

    border: 1px solid orange;

    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

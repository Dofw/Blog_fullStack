<template>
  <div class="parallax-container">
    <div class="item" v-for="index in 5" :key="index">
      {{ index }}
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
  .parallax-container {
    overflow-y: scroll;
    height: 100%;
    border: $border;
    .item{
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100vh;

      color: blueviolet;
      font-size: 100px;
      border: $border;
    }
  }
</style>
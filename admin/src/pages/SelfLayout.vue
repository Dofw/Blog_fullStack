<template>
  <div class="home-one ">
    <div class="content-title">
      <span>{{ title }}</span>
      <slot name="operation"></slot>
    </div>
    <div class="conditions-box">
      <slot name="conditions">
      </slot>
    </div>
    <div class="list-box">
      <slot name="content">
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'SelfLayout',
}
</script>

<script lang="ts" setup>
import { defineProps } from 'vue'

// 泛型声明
const props = defineProps<{
  title: string
}>()
</script>

<style lang="scss" scoped>
$border: 1px solid green;

.home-one {
  width: 100%;
  height: 100%;

  border: $border;

  .content-title {
    height: 50px;
    border: $border;
  }

  .conditions-box {
    width: 100%;
    height: 100px;
    border: $border;
  }

  .list-box {
    width: 100%;
    height: 500px;
    border: $border;
  }
}
</style>

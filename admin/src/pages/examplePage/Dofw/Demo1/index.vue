<template>
  <div class="demo1-container">
    <PreviewCodes :codeOptions="codeOptions">
      <template #demo>demo</template>
      <template #summary>summary</template>
    </PreviewCodes>
  </div>
</template>
./codes/code
<script lang="ts">
export default {
  name: "example-demo"
}
</script>
<script setup lang="ts">
import { codeOptions } from "./codes/_code"
</script>

<style scoped lang="scss">
.demo1-container {
  width: 100%;
  height: 100%;
  overflow-y: auto;

  border: $border;
  padding: 10px;
  background: transparent;
}
</style>

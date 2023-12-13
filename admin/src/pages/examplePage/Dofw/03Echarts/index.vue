<template>
  <PreviewCodes :codeOptions="[]" description="简介: upload 相关知识汇总">
    <template #demo>
      <Example />
    </template>
    <template #summary>
      <v-md-editor :model-value="mdCode" mode="preview" />
    </template>
  </PreviewCodes>
</template>
<script lang="ts">
export default {
  name: "Echart-Practice"
}
</script>
<script setup lang="ts">
import PreviewCodes from "@/components/PreviewCodes/index.vue"
import Example from "./components/Map.vue"
import { ref } from "vue"

const mdCode = ref(`
## Echart-Practice
`)
</script>

<style scoped lang="scss"></style>

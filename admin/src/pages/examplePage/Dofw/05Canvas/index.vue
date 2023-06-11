<template>
  <PreviewCodes :codeOptions="codeOptions" description="简介: canvas 练习">
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
  name: "canvas-demo"
}
</script>
<script setup lang="ts">
import PreviewCodes from "@/components/PreviewCodes/index.vue"
import Example from "./components/index.vue"
import { codeOptions } from "./codes/_code"
import { ref } from "vue"

const mdCode = ref(`
## canvas
`)
</script>

<style scoped lang="scss"></style>

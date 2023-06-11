<template>
  <PreviewCodes :codeOptions="codeOptions" description="简介: vue 封装汇总"> </PreviewCodes>
</template>
<script lang="ts">
export default {
  name: "Vue-Snippet"
}
</script>
<script setup lang="ts">
import PreviewCodes from "@/components/PreviewCodes/index.vue"
import { codeOptions } from "./codes/_code"
</script>

<style scoped lang="scss"></style>

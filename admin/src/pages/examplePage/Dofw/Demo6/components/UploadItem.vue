<template>
  <div>{{ data.option.url }} - {{ data.percent }}</div>
</template>

<script setup lang="ts">
import type { RequestItem } from "./utils"

import { defineProps, withDefaults } from "vue"

interface Props {
  data: RequestItem
}

const props = withDefaults(defineProps<Props>(), {})
</script>

<style scoped></style>

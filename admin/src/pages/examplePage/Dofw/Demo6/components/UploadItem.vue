<template>
  <div>{{ data.fileName }} - {{ data.percent }}</div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue"
interface Props {
  data: {
    [K: string]: string | number
  }
}
withDefaults(defineProps<Props>(), {
  data() {
    return {
      percent: 0
    }
  }
})
</script>

<style scoped></style>

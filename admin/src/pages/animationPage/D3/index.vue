<template>
  <div ref="d3Ref"></div>
</template>

<script>
export default {
  name: "D3"
}
</script>

<script setup>
import { ref, onMounted } from "vue"
import * as d3 from "d3"

const d3Ref = ref({})

onMounted(() => {
  console.log(d3)
})
</script>

<style lang="scss" scoped></style>

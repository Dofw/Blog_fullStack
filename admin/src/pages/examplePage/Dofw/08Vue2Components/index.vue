<template>
  <div>vue2components 使用</div>
  <DynamicComponent />
</template>
<script lang="ts">
export default {
  name: "vue2-components"
}
</script>

<script setup lang="ts">
import DynamicComponent from "./components/DynamicComponent.vue"
</script>

<style scoped></style>

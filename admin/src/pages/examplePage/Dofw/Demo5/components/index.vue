<template>
  <div class="canvas-container">
    <canvas ref="instance"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
const instance = ref<HTMLCanvasElement>({} as HTMLCanvasElement)

onMounted(() => {
  const cs = instance.value
  if (!cs) return

  const ctx = cs.getContext("2d")

  bubble(ctx, 1)
  bubble(ctx, 3)
})

function bubble(ctx, pos) {
  ctx.beginPath()
  ctx.arc(50, 50, 30, 0, Math.PI * 2, true)
  ctx.arc(50, 50, 15, 0, Math.PI * 2, true)
  ctx.arc(50, 50, 5, 0, Math.PI * 2, true)
  ctx.fill("evenodd")
}
</script>

<style lang="scss" scoped>
.canvas-container {
  position: relative;

  width: 95%;
  height: 95%;

  border: 1px solid orange;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>

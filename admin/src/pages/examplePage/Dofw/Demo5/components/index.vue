<template>
  <div class="canvas-container">
    <canvas id="canvas-instance" width="739" height="335" style="width: 739px; height: 335px"></canvas>
    <canvas id="canvas-instance2" width="739" height="335" style="width: 739px; height: 335px; background-color: #000"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import imgUrl from "@/assets/vue_bg.jpeg"
import snowUrl from "@/assets/snow.png"

onMounted(() => {
  initBg()
  snow()
})

/**
 *  背景轮播效果
 */
function initBg() {
  const cs: HTMLCanvasElement = document.getElementById("canvas-instance") as HTMLCanvasElement
  const ctx: CanvasRenderingContext2D = cs.getContext("2d") as CanvasRenderingContext2D

  const img = new Image()
  let imgW = 0
  let imgH = 0
  let csW = 800
  let clearW = 0
  let clearH = 0

  img.onload = function (e: any) {
    imgW = e.path[0].naturalWidth
    imgH = e.path[0].naturalHeight

    cs.style.width = imgW + "px"
    cs.style.height = imgH + "px"

    cs.width = csW
    cs.height = clearH = imgH

    if (csW >= imgW) {
      clearW = csW
    } else {
      clearW = imgW
    }

    // draw()

    setInterval(() => {
      draw()
    }, 10)
  }

  img.src = imgUrl

  let offsetX = 0
  function draw() {
    ctx.clearRect(0, 0, clearW, clearH)

    // canvas > imgW
    const gap = 800 - imgW

    if (offsetX >= imgW) {
      offsetX = 0
    }

    // 只要偏移左侧就有。
    ctx.drawImage(img, -imgW + offsetX, 0, imgW, imgH)

    // 在gap区间，右侧有空白
    if (gap >= offsetX) {
      ctx.drawImage(img, 2 * imgW - (800 - offsetX), 0, imgW, imgH)
    }

    ctx.drawImage(img, offsetX, 0, imgW, imgH)
    offsetX += 0.75
  }
}

/**
 * snow
 */
function snow() {
  const canvas: HTMLCanvasElement = document.getElementById("canvas-instance2") as HTMLCanvasElement
  const ctx: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D

  // Set the canvas dimensions to match the window size
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // Set up the snowflakes
  const snowflakes = []
  const numSnowflakes = 200
  const snowflakeSize = 10
  const snowflakeSpeed = 0.5

  // Create the snowflakes
  for (let i = 0; i < numSnowflakes; i++) {
    snowflakes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * snowflakeSize,
      speed: snowflakeSpeed + Math.random()
    })
  }

  // Animate the snowfall
  function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw each snowflake
    for (let i = 0; i < numSnowflakes; i++) {
      const snowflake = snowflakes[i]

      // Update the snowflake's position
      snowflake.y += snowflake.speed

      // If the snowflake has fallen off the bottom of the screen, reset its position
      if (snowflake.y > canvas.height) {
        snowflake.y = 0
      }

      // Draw the snowflake
      ctx.beginPath()
      ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2)
      ctx.fillStyle = "white"
      ctx.fill()
    }

    // Animate again
    requestAnimationFrame(animate)
  }

  // Start the animation
  animate()
}
</script>

<style lang="scss" scoped>
.canvas-container {
  position: relative;

  width: 95%;
  height: 95%;

  border: 1px solid orange;

  canvas {
    position: absolute;
    height: 100%;
    &:nth-of-type(2) {
      left: 740px;
    }
  }
}
</style>

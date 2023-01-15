<template>
  <div class="canvas-container">
    <canvas id="canvas-instance" width="400" height="200"></canvas>
    <canvas id="canvas-instance2" width="500" height="200" style="background-color: #000"></canvas>
    <canvas ref="collisionCanvasRef" width="500" height="200" style="background-color: #000"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"
import type { Ref } from "vue"
import imgUrl from "@/assets/vue_bg.jpeg"
import collision from "@dofw/Demo5/components/collision"
// import snowUrl from "@/assets/snow.png"

const collisionCanvasRef: Ref<HTMLCanvasElement> = ref({} as HTMLCanvasElement)
onMounted(() => {
  initBg()
  snow()

  collision(collisionCanvasRef)
})

/**
 *  背景轮播效果
 */
function initBg() {
  const cs = document.getElementById("canvas-instance")
  const ctx = cs.getContext("2d")

  const img = new Image()
  let imgW = 0
  let imgH = 0
  let csW = 800 // csw 宽度，img宽度不一样。
  let clearW = 0
  let clearH = 0

  img.onload = function (e) {
    imgW = this.naturalWidth
    imgH = this.naturalHeight

    cs.style.width = imgW - 300 + "px"
    cs.style.height = imgH - 200 + "px"

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
  const canvas = document.getElementById("canvas-instance2")
  const ctx = canvas.getContext("2d")

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
      speed: snowflakeSpeed + Math.random(),

      draw: function () {
        // Update the snowflake's position
        this.y += this.speed

        // If the has fallen off the bottom of the screen, reset its position
        if (this.y > canvas.height) {
          this.y = 0
        }

        // Draw the
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = "white"
        ctx.fill()
      }
    })
  }

  // Animate the snowfall
  function animate() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw each snowflake
    for (let i = 0; i < numSnowflakes; i++) {
      const snowflake = snowflakes[i]
      snowflake.draw()
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

  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-content: space-evenly;
  flex-wrap: wrap;

  canvas {
    width: 100% !important;
    height: 33% !important;
  }
}
</style>

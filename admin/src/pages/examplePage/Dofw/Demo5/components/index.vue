<template>
  <div class="canvas-container">
    <canvas id="canvas-instance" width="739" height="335" style="width: 739px; height: 335px"></canvas>
    <canvas id="canvas-instance2" width="739" height="335" style="width: 739px; height: 335px; background-color: #000"></canvas>

    <canvas id="canvas-instance3" width="739" height="335" style="width: 739px; height: 335px; background-color: #000"></canvas>
    <canvas id="canvas-instance4" width="739" height="335" style="width: 739px; height: 335px; background-color: #000"></canvas>
  </div>
</template>

<script setup>
import { onMounted } from "vue"
import imgUrl from "@/assets/vue_bg.jpeg"
// import snowUrl from "@/assets/snow.png"

onMounted(() => {
  initBg()
  snow()
  motion()
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
  let csW = 800
  let clearW = 0
  let clearH = 0

  img.onload = function (e) {
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

/**
 * 单个球的运用
 */
function motion() {
  const canvas = document.getElementById("canvas-instance3")
  const ctx = canvas.getContext("2d")

  // 所有小球配置对样、ctx、速度v、时间t、
  const itemsOption = [] // 记录options
  const itemNums = 1 // 模型个数
  const itemSize = 30 // 单个模型的大小

  for (let i = 0; i < itemNums; i++) {
    itemsOption.push({
      // 样式相关
      size: itemSize,
      color: "#fff",

      // 拥有自己的速度、运动方向
      speed: 10,
      tangent: Math.random() * 2, // 切线y/x的值

      // 记录前一个点
      sx: Math.random() * (canvas.width - 2 * itemSize) + itemSize,
      sy: Math.random() * (canvas.height - 2 * itemSize) + itemSize,
      sTime: 0,

      // 目标点
      x: Math.random() * (canvas.width - 2 * itemSize) + itemSize,
      y: Math.random() * (canvas.height - 2 * itemSize) + itemSize,
      time: 0
    })
  }

  function run() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let i = 0; i < itemsOption.length; i++) {
      const option = itemsOption[i]

      ctx.beginPath()
      ctx.arc(option.x, option.y, option.size, 0, Math.PI * 2)
      ctx.fillStyle = option.color
      ctx.fill()

      // 跟新当前坐标
      option.sx = option.x
      option.sy = option.y

      // update目标点
      if (option.sx > canvas.width - option.size) {
        // 当前切线
        let curAngle = Math.atan(option.tangent)
        curAngle = (curAngle * 180) / Math.PI

        let resultAngle
        // 计算发射角度,
        if (curAngle <= 0) {
          resultAngle = 180 - curAngle
        } else {
          resultAngle = 180 - curAngle
        }

        option.tangent = (resultAngle * Math.PI) / 180
      }

      if (option.sx < option.size) {
        // 当前切线
        let curAngle = Math.atan(option.tangent)
        curAngle = (curAngle * 180) / Math.PI

        let resultAngle
        // 计算发射角度
        if (curAngle < 0) {
          resultAngle = -curAngle
        } else {
          resultAngle = -curAngle
        }
        option.tangent = (resultAngle * Math.PI) / 180
      }

      if (option.sy > canvas.height - option.size) {
        // 当前切线
        let curAngle = Math.atan(option.tangent)
        curAngle = (curAngle * 180) / Math.PI

        let resultAngle
        console.log("下", curAngle)

        // 计算发射角度
        if (curAngle <= 0) {
          resultAngle = -curAngle
        } else {
          resultAngle = 180 - curAngle
        }

        option.tangent = (resultAngle * Math.PI) / 180
      }

      if (option.sy <= option.size) {
        // 当前切线
        let curAngle = Math.atan(option.tangent)
        curAngle = (curAngle * 180) / Math.PI

        let resultAngle
        console.log("上", curAngle)
        // 计算发射角度
        if (curAngle <= 0) {
          resultAngle = 180 - curAngle
        } else {
          resultAngle = -curAngle
        }

        option.tangent = (resultAngle * Math.PI) / 180
      }

      // 时间间隔
      const curTime = Date.now()
      // const spaceTime = curTime - option.sTime
      const spaceTime = 0.2
      option.sTime = curTime

      // 根据运动函数，起点、运动间隔、速度、加速度等，计算出下一个点。
      const end = uniformMotion(option.sx, option.sy, spaceTime, option.speed, option.tangent)
      option.x = end.x
      option.y = end.y
    }

    requestAnimationFrame(run)
  }

  run()
}

function uniformMotion(sx, sy, spaceTime, v, angle) {
  // 时间按照ms
  const offsetX = spaceTime * v * Math.cos(angle)
  const offsetY = -(spaceTime * v * Math.sin(angle))

  return {
    x: sx + offsetX,
    y: sy + offsetY
  }
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
    &:nth-of-type(3) {
      top: 330px;
    }
    &:nth-of-type(4) {
      top: 330px;
      left: 740px;
    }
  }
}
</style>

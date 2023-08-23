<template>
  <div class="container">
    <h1>解决问题: 初始状态、终止状态，中间环节的复杂状态交给浏览器处理。就要用到延迟动画。</h1>
    <input type="range" @input="onChange" min="0" max="2" step="0.01" />
    <div class="ball" ref="ballRef"></div>
  </div>
</template>
<script lang="ts">
export default {
  name: "延迟动画"
}
</script>
<script setup lang="ts">
import { ref } from "vue"
const ballRef: any = ref()
const delay = ref(0)
const onChange = (e) => {
  ballRef.value.style.setProperty("--delay", "-" + e.target.value + "s")
  console.log(ballRef.value.style.getPropertyValue("--delay"))
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    position: absolute;
  }
  input {
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
  }
  .ball {
    --delay: 0s; // -2s代表终态

    width: 100%;
    height: 100%;
    border: $border;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: rgba(random() * 255, random() * 255, random() * 255, 1);
    animation: move 2s var(--delay);
    animation-play-state: paused;
    animation-timing-function: ease;
    animation-iteration-count: infinite;
  }

  @keyframes move {
    0% {
      opacity: 0.5;
      width: scalc(0.5);
      transform: translateX(0px);
    }
    25% {
      opacity: 0.5;
      width: scalc(0.5);
      transform: translateX(200px);
    }
    75% {
      opacity: 0.5;
      width: scalc(0.5);
      transform: translateX(-200px);
    }
    100% {
      opacity: 1;
      width: scalc(1);
      transform: translateX(0px); // 通过贝塞尔曲线的幅度，来控制。
    }
  }
}
</style>

<template>
  <div class="container">
    <div class="ball"></div>
  </div>
</template>
<script>
export default {
  name: "贝赛尔曲线动画"
}
</script>
<script setup lang="ts"></script>

<style lang="scss" scoped>
// 知识点，将 变量 变成 属性
@property --x {
  syntax: "<length>";
  initial-value: 0px;
  inherits: false;
}
@property --y {
  syntax: "<length>";
  initial-value: 0px;
  inherits: false;
}

.container {
  border: $border;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  .ball {
    --x: 0px;
    --y: 0px;

    width: 100px;
    height: 100px;
    border-radius: 50%;
    transform: translate(var(--x), var(--y));
    background-color: rgba(random() * 255, random() * 255, random() * 255, 1);

    animation: moveX 2s, moveY 1s;
    animation-timing-function: cubic-bezier(0.5, -400, 0.5, 300);
    animation-iteration-count: infinite;
  }
}

// 将transform同时拆分为 x，y 是不行的。故使用到 hounidi api
// 利用cubic-bezier的能力。
@keyframes moveX {
  0% {
    --x: 0;
    // transform: translateY(0);
  }
  100% {
    --x: 3px;
    // transform: translateY(1px); // 通过贝塞尔曲线的幅度，来控制。
  }
}

@keyframes moveY {
  0% {
    --y: 0;
    // transform: translateY(0);
  }
  100% {
    --y: 1px;
    // transform: translateY(1px); // 通过贝塞尔曲线的幅度，来控制。
  }
}
</style>

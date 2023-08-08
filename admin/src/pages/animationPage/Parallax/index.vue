<template>
  <div class="parallax-container">
    <div class="item" :data-index="index" v-for="index in 5" :key="index">
      {{ index }}
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "视差滚动-API"
}
</script>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue"

const animationMaps = new WeakMap()
const intersection = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    const animation = animationMaps.get(entry.target)
    // 不在视口之下。
    if (entry.isIntersecting && animation) {
      animation.play()
      // 只管下面的
      intersection.unobserve(entry.target)
    }
  }
})

// 判断是否在视口之下
function isBelowViewPort(el) {
  const rect = el.getBoundingClientRect()
  return rect.top > window.innerHeight
}

onMounted(() => {
  const items = document.querySelectorAll(".parallax-container .item")
  for (const item of items) {
    if (!isBelowViewPort(item)) continue // 不在视口之下的，不绑定不监听。
    // 监听item
    intersection.observe(item)
    // 建立动画map
    const animation = item.animate(
      [
        {
          opacity: 0.5,
          transform: `translateY(50px)`
        },
        {
          opacity: 1,
          transform: `translateY(0)`
        }
      ],
      {
        duration: 1000
      }
    )
    animation.pause() // 创建后，先暂停。等到进入视口在进行。
    animationMaps.set(item, animation)
  }
})
onUnmounted(() => {
  const items = document.querySelectorAll(".parallax-container .item")
  for (const item of items) {
    intersection.unobserve(item)
  }
})
</script>

<style scoped lang="scss">
.parallax-container {
  overflow-y: scroll;
  height: 100%;
  border: $border;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  .item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 85vh;
    font-size: 100px;
    margin: 20px 0;
    border-radius: 20px;

    @for $i from 1 through 5 {
      &:nth-of-type(#{$i}) {
        color: rgba(random() * 125, random() * 125, random() * 125, 1);
        background-color: rgba(random() * 255, random() * 255, random() * 255, 1);
      }
    }
  }
}
</style>

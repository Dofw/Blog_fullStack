<template>
  <div class="container">
    <!-- <div class="item" v-for="num in 20">
      <span>加载中...</span>
    </div> -->
  </div>
</template>

<script lang="ts">
export default {
  name: "抖音-已看过"
}
</script>
<script setup lang="ts">
import { onMounted } from "vue"
onMounted(() => {
  /**
   * 编写原生代码
   *
   * 需求：跳转到已看过的视屏位置。
   * 拆解
   * 1. 跳转按钮，不在视口所在视屏的范围中，才可显示。
   * 2. 点击后，才生产已看位置之前的所有页的数据总和，仅仅创建一个壳，只加载视口范围内页码数据，并打上标记。
   * 3. 进入视口处理，记录视口的对应数据范围，在第1条中使用。
   *
   */

  const container: any = document.querySelector(".container")

  /**
   * 记录
   */
  const inScreen = new Set()
  const ob = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const index = entry.target.dataset.index
      if (entry.isIntersecting) {
        inScreen.add(index)
      } else {
        inScreen.delete(index)
      }
    }

    // 懒加载调佣资源
  })

  createElements(1)

  /**
   * 根据页码生产相应的容器，不加载数据。
   * @param page
   */
  function createElements(page, pageSize = 8) {
    const total = page * pageSize
    const oldLen = container.children.length

    const newLen = total - oldLen
    for (let index = 1; index <= newLen; index++) {
      const dom = document.createElement("div")
      dom.className = "item"
      dom.dataset.index = oldLen + index + ""
      ob.observe(dom) // 对该dom进行observe
      container.appendChild(dom)
    }
  }

  /**
   * 加载资源，解决不能重复加载
   * @param page
   * @param pageSize
   */
  function loadedSource(page, pageSize) {
    return []
  }
})
</script>

<style scoped lang="scss">
.container {
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;

  > :deep(div) {
    display: flex;
    justify-content: center;
    align-items: center;

    height: 400px;
    border-radius: 20px;
    @for $i from 1 to 20 {
      &:nth-of-type(#{$i}) {
        background-color: rgba(random() * 255, random() * 255, random() * 255, 1);
      }
    }
  }
}
</style>

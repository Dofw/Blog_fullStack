<template>
  <div class="container"></div>
</template>

<script lang="ts">
export default {
  name: "抖音-已看过"
}
</script>
<script setup lang="ts">
import { onMounted } from "vue"
import { debounce } from "@/utils/index"
onMounted(() => {
  /**
   * 编写原生代码 ( 袁教头牛逼！ )
   *
   * 需求：跳转到已看过的视屏位置。
   * 拆解
   * 1. 跳转按钮，不在视口所在视屏的范围中，才可显示。
   * 2. 点击后，才生产已看位置之前的所有页的数据总和，仅仅创建一个壳，只加载视口范围内页码数据，并打上标记。
   * 3. 进入视口处理，记录视口的对应数据范围，在第1条中使用。
   *
   */

  const container: any = document.querySelector(".container")
  const debounceLoadedSource = debounce(loadedSource, 300)
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
    debounceLoadedSource(8)
  })

  createElements(10)

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
  async function loadedSource(pageSize) {
    // 全局inScreen，计算出获取的page
    const pages = computedPages(8)

    // 先判断 page 页是否加载过了
    const allItems = container.children
    for (const page of pages) {
      const [minIndex, maxIndex] = pageToIndex(page, pageSize)
      console.log(111, page, minIndex, maxIndex, allItems[minIndex])
      const oneStatus = allItems[minIndex].dataset.loaded
      // 已经加载过了，继续
      if (oneStatus) {
        continue
      }

      const data: any[] = await getApi(page, pageSize)
      // 这里就是 下标
      for (let i = minIndex; i <= maxIndex; i++) {
        const itemInfo = data.find((item) => {
          return item.index === +i
        })
        const dom = allItems[i - 1]
        const content = `
        <span>
          ${itemInfo?.text + itemInfo?.index}
        </span>
      `
        dom.dataset.loaded = true
        dom.style.backgroundColor = itemInfo.bgColor
        dom.innerHTML = content
      }
    }
  }

  function pageToIndex(page, pageSize) {
    return [(page - 1) * pageSize + 1, page * pageSize]
  }

  /**
   * 模拟假数据
   */
  function getApi(page, pageSize) {
    return new Promise<any[]>((resolve, reject) => {
      // 1: 1-8 2: 9-16
      const data: any = []
      for (let i = 1; i <= pageSize; i++) {
        data.push({
          index: (page - 1) * pageSize + i,
          text: `模拟数据QaQ`,
          bgColor: `rgba(${Math.random() * 255},${Math.random() * 255},${Math.random() * 255},1)`
        })
      }

      setTimeout(() => {
        resolve(data)
      }, 1000)
    })
  }

  /**
   * 在视口的 下表范围。
   * @param nums
   */
  function computedMinMax() {
    const nums: any[] = [...inScreen]
    if (!nums.length) return [0, 0]
    const min = Math.min(...nums)
    const max = Math.max(...nums)
    return [min, max]
  }

  // 在视口数据，所属页码
  function computedPages(pageSize = 8) {
    const pageSet = new Set()
    const [min, max] = computedMinMax()
    for (let i = min; i <= max; i++) {
      const page = Math.ceil(i / pageSize)
      pageSet.add(page)
    }
    return [...pageSet]
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
  }
}
</style>

<template>
  <div class="x-animation-container" ref="scrollRef">
    <div class="x-animation-content">
      <div class="top"></div>
      <div class="center" ref="centerRef">
        <div class="sticky" ref="boxRef">
          <template v-for="row in 2">
            <div class="item" v-for="col in 5" :data-index="`${row}-${col}`">
              {{ `${row}-${col}` }}
            </div>
          </template>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "钉钉官网"
}
</script>
<script setup lang="ts">
import { ref, onMounted } from "vue"
import { updateItemsStatus, initAnimationMaps } from "."

const boxRef: any = ref(null)
const scrollRef: any = ref(null)
const centerRef: any = ref(null)
onMounted(() => {
  const allItems = document.querySelectorAll(".sticky .item")

  const { top, height } = centerRef.value.getBoundingClientRect()
  const { top: boxTop } = scrollRef.value.getBoundingClientRect()
  const clientHeight = document.documentElement.clientHeight

  // top-boxtop = scrollTop + top
  const scrollStart = top - boxTop
  const scrollEnd = top - boxTop + height + 0 - clientHeight

  const globalCtx = {
    areaBox: boxRef.value,
    items: allItems,
    centerDom: centerRef.value,
    delaySize: 400, // 延迟距离
    scrollStart, // 该动画模块范围起点
    scrollEnd // 该动画模块范围结束点
  }

  // 初始化4个状态。
  initAnimationMaps(globalCtx)

  scrollRef.value.addEventListener(
    "scroll",
    function (e) {
      const scroll = e.target.scrollTop

      updateItemsStatus(scroll, globalCtx)
    },
    true
  )

  window.addEventListener("resize", () => {
    // 初始化4个状态。
    initAnimationMaps(globalCtx)
  })
})
</script>

<style scoped lang="scss">
.x-animation-container {
  width: 100%;
  height: 100%;
  border: $border;

  overflow-y: scroll;

  .x-animation-content {
    width: 100%;
    height: 600%;

    position: relative;

    .top {
      width: 100%;
      height: 17%;
      background-color: rgb(206, 227, 206);
    }
    .center {
      width: 100%;
      height: 66%;
      background-color: #000;
      display: flex;
      justify-content: center;

      .sticky {
        position: sticky;
        top: 20%;
        background-color: #f1f1f1;
        width: 80%;
        height: 500px;

        // display: grid;
        // grid-template-columns: repeat(5, 100px);
        // grid-template-rows: repeat(2, 100px);

        // justify-content: center;
        // align-content: center;

        // align-items: center;
        // justify-items: center;

        .item {
          position: absolute;
          background-color: #fff;
          width: 50px;
          height: 50px;
          line-height: 50px;
          border-radius: 7px;
          text-align: center;
          @for $i from 1 through 10 {
            &:nth-of-type(#{$i}) {
              background-color: rgb(random() * 255, random() * 255, random() * 255);
            }
          }
        }
      }
    }
    .footer {
      width: 100%;
      height: 17%;
      background-color: yellow;
    }
  }
}
</style>

<template>
  <div>
    <div v-if="!isPass" class="verify-img--container" ref="containerDom">
      <div class="img-area" ref="imgAreaDom"></div>
      <div class="drag-area">
        <div class="drag-area--btn" ref="dragDom" @mousedown="mousedownFunc"></div>
      </div>
    </div>
    <div v-else>通过</div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, withDefaults, defineEmits } from "vue"
interface Props {
  isPass: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isPass: false
})

const emits = defineEmits(["update-pass"])

const containerDom = ref<HTMLDivElement>()
const dragDom = ref<HTMLDivElement>()
const imgAreaDom = ref<HTMLDivElement>()

function showImg() {
  containerDom.value!.classList.add('showImg') 
}
function hiddenImg() {
  containerDom.value!.classList.remove('showImg')
}

let initMove = 0 // 恢复初始move
let startPoint = 0 // 记录当前的鼠标移动的位置
let moveSpace = 0 // 记录计算的move间距
function mousedownFunc(e) {
  // 显示img
  showImg()
  // 记录当前start
  startPoint = e.clientX
  // 绑定window的move事件
  window.addEventListener("mousemove", mousemoveFunc)
  window.addEventListener("mouseup", mouseupFunc)
}

function mousemoveFunc(e) {
  const curPoint = e.clientX
  const { left, right } = containerDom.value!.getBoundingClientRect()
  let offset

  if (curPoint < left) {
    offset = left - startPoint
    startPoint = left
  } else if (curPoint > right) {
    offset = right - startPoint
    startPoint = right
  } else {
    offset = curPoint - startPoint
    startPoint = curPoint
  }
  moveSpace = moveSpace + offset

  containerDom.value!.style.setProperty("--move", moveSpace + "px")
}

function mouseupFunc(e) {

  const offset = computedDragSpace()
  console.log(offset)
  // 校验成功，样式隐藏。
  if (isInRange(offset)) {
    alert("通过")
    emits("update-pass", true)
  } else {
    startPoint = 0
    moveSpace = 0
    containerDom.value?.style.setProperty("--move", initMove + "px")
  }

  hiddenImg()
  window.removeEventListener("mousemove", mousemoveFunc)
  window.removeEventListener("mouseup", mouseupFunc)
}

/**
 * 计算drag左侧距离img左侧的间距。
 */
function computedDragSpace() {
  const { left } = containerDom.value!.getBoundingClientRect()
  const { left: left2 } = dragDom.value!.getBoundingClientRect()
  return left2 - left
}

/**
 * 计算值是否符合通过范围
 * @param value
 */
function isInRange(value) {
  const computedStyle = getComputedStyle(containerDom.value!)
  let imgWVar = +computedStyle.getPropertyValue("--image-w").replace("px", "")
  let puzzleWVar = +computedStyle.getPropertyValue("--puzzle-w").replace("px", "")
  const num = 15
  const leftNum = Number(-num + imgWVar - 2 * puzzleWVar)
  const rightNum = Number(num + imgWVar - 2 * puzzleWVar)
  return value >= leftNum && value <= rightNum
}
</script>

<style scoped lang="scss">
.verify-img--container {
  --puzzle-w: 50px;
  --puzzle-h: 50px;
  --image-w: 400px;
  --image-h: 300px;
  --move: 0px;

  position: relative;
  width: var(--image-w);
  height: 50px;
  border: $border;

  .drag-area {
    .drag-area--btn {
      cursor: pointer;
      width: var(--puzzle-w);
      height: var(--puzzle-h);
      background-color: green;
      transform: translateX(clamp(0px, var(--move), calc(var(--image-w) - var(--puzzle-w))));
    }
  }

  &.showImg {
    .img-area {
      display: block;
    }
  }

  &:hover{
    .img-area {
      display: block;
    }
  }

  .img-area {
    position: absolute;
    bottom: 60px;
    width: var(--image-w);
    height: 300px;
    display: none;
    transition: all .5s;

    background-image: url("@/assets/verify.jpg");
    background-size: cover;
    background-repeat: no-repeat;

    border: $border;
    border-radius: 10px;
    z-index: 1;

    &::before {
      content: "";
      position: absolute;
      width: inherit;
      height: inherit;
      z-index: 2;

      background-image: inherit;
      background-color: rgba(0, 0, 0, 0.7);
      background-blend-mode: multiply;

      background-size: inherit;
      background-repeat: inherit;

      clip-path: inset(
        calc((var(--image-h) - var(--puzzle-h)) / 2) calc(var(--puzzle-h))
          calc((var(--image-h) - var(--puzzle-h)) / 2) calc(var(--image-w) - var(--puzzle-h) * 2)
      );
    }

    &::after {
      content: "";
      position: absolute;
      transform: translateX(
        // 限制 图片滑块 的范围
        clamp(
            calc(var(--image-w) * -1 + 2 * var(--puzzle-w)),
            calc(var(--image-w) * -1 + 2 * var(--puzzle-w) + var(--move)),
            var(--puzzle-w)
          )
      );
      width: inherit;
      height: inherit;
      z-index: 3;

      background-image: inherit;
      background-size: inherit;
      background-repeat: inherit;

      clip-path: inset(
        calc((var(--image-h) - var(--puzzle-h)) / 2) calc(var(--puzzle-h))
          calc((var(--image-h) - var(--puzzle-h)) / 2) calc(var(--image-w) - var(--puzzle-h) * 2)
      );
    }
  }
}
</style>

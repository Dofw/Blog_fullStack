<template>
  <div class="verify-img--container">
    <div class="img-area">
      <div class="img-area--btn"></div>
    </div>
    <div class="drag-area">
      <div class="drag-area--btn" @mousedown="mousedown"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

const imgBtn = ref(null)
const dragBtn = ref<HTMLDivElement>()

const mousedown = () => {
  console.log("点击")
  window.addEventListener("mousemove", mousemoveFunc)
  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", mousemoveFunc)
  })
}

function mousemoveFunc(e) {
  console.log(e)
}
</script>

<style scoped lang="scss">
.verify-img--container {
  position: relative;
  width: 100%;
  height: 50px;
  border: $border;

  .drag-area {
    height: 100%;
    .drag-area--btn {
      cursor: pointer;
      width: 60px;
      height: 100%;
      background-color: green;
      border: 5px;
    }
  }
  .img-area {
    position: absolute;
    bottom: 60px;
    width: 100%;
    height: 300px;

    background-image: url("@/assets/verify.jpg");
    background-size: cover;
    background-repeat: no-repeat;

    border: $border;
    border-radius: 10px;
    z-index: 100;

    &::before {
      content: "";
      position: absolute;
      top: 30%;
      right: 10%;

      width: 50px;
      height: 50px;
      background-color: rgba(0, 0, 0, 0.5);
      border: $border;
    }

    .img-area--btn {
      width: 50px;
      height: 50px;
      border: $border;

      background-image: inherit;
      background-repeat: inherit;
      background-size: 1200px 800px;
      background-position: center center;
      position: absolute;
      top: 30%;
      left: 10%;
    }
  }
}
</style>

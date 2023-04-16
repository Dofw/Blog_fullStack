<template>
  <div class="monaco-editor-container">
    <div class="monaco-editor-wrapper" ref="instanceDom"></div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted } from "vue"
import monaco from "./monaco"

const props = defineProps({
  tempCode: {
    type: String,
    default: ""
  }
})
const instanceDom = ref(null)
const instance = ref(null)

onMounted(() => {
  init()
})

function init() {
  instance.value = monaco.editor.create(instanceDom.value, {
    value: props.tempCode,
    language: "html",
    lineNumbers: "on", // 行数
    roundedSelection: true, // ?
    scrollBeyondLastLine: false, //滚动到最后一行
    readOnly: false,
    minimap: {
      // 关闭小地图
      enabled: false
    },
    theme: "vs-dark"
  })
}
</script>

<style lang="scss" scoped>
.monaco-editor-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  .monaco-editor-wrapper {
    width: 100%;
    height: 100%;
  }

  .btns {
    position: absolute;
    z-index: 10;
    right: 10px;
    top: 10px;

    display: flex;
  }
}
</style>

<template>
  <div @click="onCompiler">点击编译</div>
  <div class="monaco-editor-container">
    <div class="editor-wrapper">
      <div ref="test" class="instance"></div>
    </div>
    <div class="preview-wrapper">
      <div id="example-app"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import monaco from "./monaco"

const test = ref(null)
const instance = ref(null)

const onCompiler = () => {
  // console.log(1232131, instance.value)
  // instance.value.setValue("123")
  // const template = instance.value.getValue()
  // console.log(111, template)
}

onMounted(() => {
  instance.value = monaco.editor.create(test.value, {
    value: `
    <template>
      <div>测试代码</div>
    </template>
`,
    language: "javascript",
    lineNumbers: "on", // 行数
    roundedSelection: true, // ?
    scrollBeyondLastLine: false, //滚动到最后一行
    readOnly: false,
    minimap: {
      // 关闭小地图
      enabled: false
    },
    theme: "vs-light"
  })
})
</script>

<style lang="scss" scoped>
.monaco-editor-container {
  display: flex;
  height: 100%;
  height: 800px;
  > div {
    width: 50%;
    height: 100%;
    &.editor-wrapper {
      border: 1px solid orange;
      .instance {
        width: 100%;
        height: 100%;
      }
    }

    &.preview-wrapper {
      border: 1px solid green;
      display: flex;
      justify-content: center;
      align-items: center;
      #example-app {
        width: 50%;
        height: 50%;
        border: 1px solid red;
      }
    }
  }
}
</style>

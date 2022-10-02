<template>
  <div @click="onCompiler">点击编译</div>
  <div class="monaco-editor-container">
    <div class="editor-wrapper">
      <div ref="test" class="instance"></div>
    </div>
    <div class="preview-wrapper">
      <div id="example-app" style="color: red"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, createApp, onMounted } from "vue"
import { parse, compileTemplate, compileScript } from "vue/compiler-sfc"
import monaco from "./monaco"
import { compilerJS, compilerTemp } from "./util"
const test = ref(null)
let instance = ref(null)
const unwarp = (obj) => {
  // __v_raw在v3中，取原始对象的作用。
  return obj && (obj.__v_raw || obj.valueOf() || obj)
}

const onCompiler = () => {
  const newInstance = unwarp(instance.value)
  const template = newInstance.getValue()
  const result = parse(template)
  console.log(result)

  //Template编译为render
  const templateObj = compileTemplate({
    id: "Demo",
    filename: "Demo.vue",
    source: result.descriptor.template.content
  })
  console.log("temp", templateObj)
  const render = compilerTemp(templateObj.code)
  console.log(render)

  //JS作用域全局变量引入Vue
  const scriptObj = compileScript(result.descriptor, {
    id: "Demo",
    filename: "Demo.vue"
  })
  const scriptContent = compilerJS(scriptObj.content)
  console.log(scriptContent)

  createApp({
    setup: scriptContent.setup,
    render: render
  }).mount("#example-app")
}

onMounted(() => {
  instance.value = monaco.editor.create(test.value, {
    value: "",
    language: "html",
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

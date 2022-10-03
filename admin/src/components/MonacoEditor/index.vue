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
import { ref, onMounted } from "vue"
import { parse, compileTemplate, compileScript } from "vue/compiler-sfc"
import monaco from "./monaco"
import { compilerJS, compilerTemp } from "./util"
const test = ref(null)
let instance = ref(null)
const unwarp = (obj) => {
  // __v_raw在v3中，取原始对象的作用。
  return obj && (obj.__v_raw || obj.valueOf() || obj)
}

// Todo: 这里必须统一用全局的Vue。
// Todo: 这里必须统一用全局的ElementPlus。
const onCompiler = () => {
  const unMountTemp = `
    console.log(window.appInstance)
    if(window.appInstance) {window.appInstance.unmount()}
  `
  eval(unMountTemp)

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
  console.log(templateObj.code)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const render = compilerTemp(templateObj.code)

  //JS作用域全局变量引入Vue
  const scriptObj = compileScript(result.descriptor, {
    id: "Demo",
    filename: "Demo.vue"
  })
  console.log(scriptObj.content)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const scriptContent = compilerJS(scriptObj.content)

  const mountTemp = `
    const createApp = Vue.createApp
    window.appInstance = createApp({
      setup: scriptContent.setup,
      render: render
    })

    window.appInstance
      .use(ElementPlus)
      .mount("#example-app")
  `
  eval(mountTemp)
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

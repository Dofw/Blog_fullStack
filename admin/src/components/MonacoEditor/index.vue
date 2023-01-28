<template>
  <div class="monaco-editor-container">
    <div v-if="showBtn" class="btns">
      <el-button @click="run" type="primary">运行</el-button>
    </div>
    <div class="monaco-editor-wrapper" ref="instanceDom"></div>
  </div>
</template>

<script setup>
// import { useEventListener } from "@vueuse/core"
import { defineProps, ref, onMounted, watch } from "vue"
import { parse, compileTemplate, compileScript } from "vue/compiler-sfc"
import monaco from "./monaco"
import { compilerJS, compilerTemp } from "./util"
// import { debounce } from "@/utils"

const props = defineProps({
  tempCode: {
    type: String,
    default: ""
  },
  previewDom: {
    type: [Object],
    default() {
      return null
    }
  },

  showBtn: {
    type: Boolean,
    default: false
  }
})
const instanceDom = ref(null)
const instance = ref(null)
const unwarp = (obj) => {
  // __v_raw在v3中，取原始对象的作用。
  return obj && (obj.__v_raw || obj.valueOf() || obj)
}

// Todo: 这里必须统一用全局的Vue。
// Todo: 这里必须统一用全局的ElementPlus。
// 1. html 全局引入， 2. 修改app.use(xxx) eval, 3. 修改compilerJS 正则。如何实现运行时完成这一系列操作？？？
const onCompiler = () => {
  const unMountTemp = `
    if(window.appInstance) {window.appInstance.unmount()}
  `
  eval(unMountTemp)

  const newInstance = unwarp(instance.value)
  const template = newInstance.getValue()
  const result = parse(template)

  //Template编译为render
  const templateObj = compileTemplate({
    id: "Demo",
    filename: "Demo.vue",
    source: result.descriptor.template.content
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const render = compilerTemp(templateObj.code)

  //JS作用域全局变量引入Vue
  const scriptObj = compileScript(result.descriptor, {
    id: "Demo",
    filename: "Demo.vue"
  })

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
      .mount(props.previewDom)
  `
  eval(mountTemp)
}

const handler = (previewDom) => {
  if (previewDom) {
    onCompiler()
  }
}

const run = () => {
  handler(props.previewDom)
}

onMounted(() => {
  init(props.previewDom)
})

// 初始阶段，dom 为 null
watch(
  () => props.previewDom,
  () => {
    handler(props.previewDom)
  },
  { deep: true }
)

// AnthonyFu:事件监听-销毁
// useEventListener(
//   window,
//   "resize",
//   debounce(() => {
//     //重新创建实例，适配容器变化。
//   }, 200)
// )

function init(previewDom) {
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

  handler(previewDom)
}
</script>

<style lang="scss" scoped>
.monaco-editor-container {
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  @include theme-bShadow(vt-c-shadow-5);
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

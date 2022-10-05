<template>
  <div class="monaco-editor-container" v-bind="$attrs" :style="{ width, height }">
    <!-- 布局一 -->
    <div class="editor-wrapper" ref="resizeDom">
      <div ref="instanceDom" class="instance"></div>
    </div>
    <!-- 布局二 -->
    <div class="preview-wrapper">
      <el-tabs v-model="activeName" class="demo-tabs">
        <el-tab-pane label="编辑预览" name="first">
          <!-- editor-preview-dom -->
          <div ref="previewDom" class="preview"></div>
        </el-tab-pane>
        <el-tab-pane label="示例效果" name="second">
          <!-- example -->
          <slot name="example">添加示例...</slot>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, onMounted, onUnmounted } from "vue"
import { parse, compileTemplate, compileScript } from "vue/compiler-sfc"
import monaco from "./monaco"
import { compilerJS, compilerTemp } from "./util"
// import { debounce } from "@/utils"

const props = defineProps({
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "100%"
  },
  tempCode: {
    type: String,
    default: ""
  }
})
const activeName = ref("first") // 默认
const resizeDom = ref(null)
const instanceDom = ref(null)
const previewDom = ref(null)
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
    console.log(window.appInstance)
    if(window.appInstance) {window.appInstance.unmount()}
  `
  eval(unMountTemp)

  const newInstance = unwarp(instance.value)
  const template = newInstance.getValue()
  const result = parse(template)
  // console.log(result)

  //Template编译为render
  const templateObj = compileTemplate({
    id: "Demo",
    filename: "Demo.vue",
    source: result.descriptor.template.content
  })
  // console.log(templateObj.code)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const render = compilerTemp(templateObj.code)

  //JS作用域全局变量引入Vue
  const scriptObj = compileScript(result.descriptor, {
    id: "Demo",
    filename: "Demo.vue"
  })
  // console.log(scriptObj.content)
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
      .mount(previewDom.value)
  `
  eval(mountTemp)
}

// const resizeFunc = debounce((e) => {
//   init()
// }, 200)
onMounted(() => {
  // window.addEventListener("resize", resizeFunc)
  init()
})

onUnmounted(() => {
  // window.removeEventListener("resize", resizeFunc)
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
    theme: "vs-light"
  })
  onCompiler()
}
</script>

<style lang="scss" scoped>
.monaco-editor-container {
  display: flex;
  width: 100%;
  height: 100%;
  > div {
    width: 50%;
    height: 100%;
    &.editor-wrapper {
      @include theme-bShadow(vt-c-shadow-5);
      .instance {
        width: 100%;
        height: 100%;
      }
    }

    &.preview-wrapper {
      margin-left: 5px;
      @include theme-bShadow(vt-c-shadow-5);
      .preview {
        width: 100%;
        height: 100%;
      }
    }
  }
}

//tabs标签页
.demo-tabs {
  width: 100%;
  height: 100%;
  padding: 0 10px;

  :deep(.el-tabs__content) {
    height: 91%;

    .el-tab-pane {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>

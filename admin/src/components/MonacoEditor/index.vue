<template>
  <div ref="test" style="height: 800px"></div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"

self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker()
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker()
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker()
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker()
    }
    return new editorWorker()
  }
}

const test = ref(null)
onMounted(() => {
  monaco.editor.create(test.value, {
    value: "// First line\nfunction hello() {\n\talert('Hello world!');\n}\n// Last line",
    language: "javascript",
    lineNumbers: "on", // 行数
    roundedSelection: true, // ?
    scrollBeyondLastLine: false, //滚动到最后一行
    readOnly: true,
    minimap: {
      // 关闭小地图
      enabled: false
    },
    theme: "vs-light"
  })
})
</script>

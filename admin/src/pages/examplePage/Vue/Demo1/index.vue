<template>
  <div class="demo1-container">
    <!-- 描述 -->
    <div class="description">vue-compiler-sfc 实现编译效果</div>
    <!-- 预览-示例 -->
    <div class="preview-wrapper">
      <MonacoEditor class="code" :tempCode="tempCode" :previewDom="previewDom"></MonacoEditor>

      <el-tabs class="view" type="border-card">
        <el-tab-pane label="demo">
          <div ref="previewDom" class="view-dom"></div>
        </el-tab-pane>
        <el-tab-pane label="summary"> 总结： 1.基于compiler-sfc，实现Vue模板编译例子。2. 了解monaco-editor的基本使用。 </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "vue-demo-1"
}
</script>
<script setup lang="ts">
import { ref } from "vue"
import MonacoEditor from "@/components/MonacoEditor/index.vue"
import { tempCode } from "./code"

const previewDom = ref(null)
</script>

<style scoped lang="scss">
.demo1-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .description {
    height: 60px;
    background-color: teal;
  }

  .preview-wrapper {
    display: flex;
    height: 100%;
    > div {
      width: 50% !important;
      &.code {
        height: 100%;
      }

      &.view {
        border: $border;
        margin-left: 15px;
        height: 100%;
        flex: none;
        .view-dom {
          width: 100%;
          height: 100%;
          background-color: goldenrod;
        }
      }
    }
  }
}
</style>

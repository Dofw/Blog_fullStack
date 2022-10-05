<template>
  <div class="demo1-container">
    <!-- 描述 -->
    <div class="description">
      <el-descriptions title="vue-compiler-xxx" size="small">
        <el-descriptions-item class-name="my-content" label="简介:">1.基于compiler-sfc，实现Vue模板编译例子。2. 了解monaco-editor的基本使用。</el-descriptions-item>
      </el-descriptions>
    </div>
    <!-- 编辑-预览-示例 -->
    <div style="margin-top: 5px; width: 100%; height: calc(100% - 60px)">
      <MonacoEditor :tempCode="tempCode"></MonacoEditor>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "vue-demo-1"
}
</script>
<script setup lang="ts">
import MonacoEditor from "@/components/MonacoEditor/index.vue"
import { tempCode } from "@/pages/examplePage/_sourceCode/demo1"
</script>

<style scoped lang="scss">
.my-content {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.demo1-container {
  width: 100%;
  height: 99%;
  overflow: hidden;
  .description {
    height: 60px;
  }
}
</style>

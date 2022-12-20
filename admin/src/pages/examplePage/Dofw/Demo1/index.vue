<template>
  <div class="demo1-container">
    <!-- title -->
    <div class="description">简介: vue-compiler-sfc 实现编译效果。全局引入ElementPlus、Vue3的CDN。</div>
    <!-- code-preview -->
    <div class="preview-wrapper">
      <MonacoEditor class="code" :tempCode="tempCode" :previewDom="previewDom"></MonacoEditor>

      <el-tabs class="view" type="border-card">
        <el-tab-pane label="demo">
          <div ref="previewDom" class="view-dome__wrapper"></div>
        </el-tab-pane>
        <el-tab-pane label="summary"> 总结： 1.基于compiler-sfc，实现Vue模板编译例子。2. 了解monaco-editor的基本使用。 </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "compiler-demo"
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
  height: 99%;
  padding: 10px;
  background: transparent;

  $titleHeight: 60px;
  $radius: 10px;
  .description {
    height: $titleHeight;
    display: flex;
    align-items: center;

    // border
    position: relative;

    &::before {
      content: "";
      display: block;
      width: 5px;
      height: 70%;
      position: absolute;
      top: 50%;
      left: -15px;
      transform: translateY(-50%);
      border-left: 10px solid;
      border-radius: 2px;
      @include theme-borderColor(vt-c-borderColor-light);
    }
  }

  .preview-wrapper {
    display: flex;
    height: calc(100% - #{$titleHeight});
    background: transparent;

    > div {
      border-radius: $radius;
      height: 100%;
      width: 50% !important;
      &.code {
      }

      &.view {
        .view-dome__wrapper {
          display: flex;
          align-items: center;
          justify-content: center;

          height: 100%;
          // 新拟态
          border-radius: 10px;
          background: linear-gradient(145deg, #cacaca, #f0f0f0);
          box-shadow: 5px 5px 40px #9d9d9d, 0px 0px 40px #ffffff;
        }

        :deep() {
          $tabsHeaderH: 40px;
          .el-tabs__content {
            height: calc(100% - #{$tabsHeaderH});
            background: transparent;

            .el-tab-pane {
              height: 100%;
              border-radius: $radius;
            }
          }

          .el-tabs__header {
            height: $tabsHeaderH;
            border-top-left-radius: $radius;
            border-top-right-radius: $radius;
            .el-tabs__item {
              border-top-left-radius: $radius;
              border-top-right-radius: $radius;
            }
          }
        }
      }
    }
  }
}
</style>

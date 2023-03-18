<template>
  <div class="demo1-container">
    <div class="description">简介: Vue-封装汇总</div>
    <div class="preview-wrapper">
      <!-- 组件集合 -->
      <el-tabs class="view" type="border-card">
        <el-tab-pane lazy :label="itemCode.componentName" v-for="itemCode in codeOptions" :key="itemCode.componentName">
          <MonacoEditor :tempCode="itemCode.code"></MonacoEditor>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "Vue-Snippet"
}
</script>
<script setup lang="ts">
import MonacoEditor from "@/components/MonacoEditor/index.vue"
import { codeOptions } from "./codes/_code"
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
      width: 100% !important;

      &.view {
        .view-dome__wrapper {
          display: flex;
          align-items: center;
          justify-content: center;

          height: 765px;
          overflow: auto;
          // 新拟态
          border-radius: 10px;
          background: linear-gradient(145deg, #cacaca, #f0f0f0);
          box-shadow: 5px 5px 40px #9d9d9d, 0px 0px 40px #ffffff;
        }

        .summary-container {
          height: 765px;
          overflow: auto;
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

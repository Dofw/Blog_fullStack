<template>
  <div class="preview-container">
    <div class="description">描述</div>

    <div class="content">
      <el-tabs class="view" type="border-card">
        <el-tab-pane lazy :label="itemCode.componentName" v-for="itemCode in codeOptions" :key="itemCode.componentName">
          <MonacoEditor :tempCode="itemCode.code"></MonacoEditor>
        </el-tab-pane>
      </el-tabs>

      <el-tabs class="view" type="border-card">
        <el-tab-pane label="demo">
          <div class="view-dome__wrapper">
            <slot name="demo"></slot>
          </div>
        </el-tab-pane>
        <el-tab-pane label="summary">
          <div class="view-summary__wrapper">
            <slot name="summary"></slot>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue"

interface CodeOption {
  componentName: string
  code: string
}

interface Props {
  codeOptions: CodeOption[] | []
}
withDefaults(defineProps<Props>(), {
  codeOptions: () => {
    return []
  }
})
</script>

<style scoped lang="scss">
.preview-container {
  width: 100%;
  height: 100%;
  border: 1px solid red;

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

      border-color: var(--el-color-primary) !important;
      border-left: 10px solid;
      border-radius: 2px;
    }
  }
  .content {
    width: 100%;
    height: calc(100% - $titleHeight);
    display: flex;
    flex-wrap: nowrap;

    > div {
      border-radius: 10px;
      height: 100%;
      width: 50% !important;

      &.view {
        .view-dome__wrapper {
          display: flex;
          align-items: flex-start;
          justify-content: center;

          height: 100%;
          // 新拟态
          border-radius: 10px;
          background: linear-gradient(145deg, #cacaca, #f0f0f0);
          box-shadow: 5px 5px 40px #9d9d9d, 0px 0px 40px #ffffff;
        }
        .view-summary__wrapper {
          height: 100%;
          border: 1px solid red;
        }

        :deep() {
          $tabsHeaderH: 40px;
          .el-tabs__content {
            height: calc(100% - $tabsHeaderH);
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

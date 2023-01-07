<template>
  <div class="demo1-container">
    <div class="description">简介: 分页需求统一视图样式、重复操作逻辑封装在内部，外部只提供getList、conditions</div>
    <div class="preview-wrapper">
      <!-- 组件集合 -->
      <el-tabs class="view" type="border-card">
        <el-tab-pane lazy :label="itemCode.componentName" v-for="itemCode in codeOptions" :key="itemCode.componentName">
          <MonacoEditor :tempCode="itemCode.code"></MonacoEditor>
        </el-tab-pane>
      </el-tabs>

      <!-- 效果及总结 -->
      <el-tabs class="view" type="border-card">
        <el-tab-pane label="demo">
          <div class="view-dome__wrapper">
            <Example />
          </div>
        </el-tab-pane>
        <el-tab-pane label="summary">
          <div class="summary-container">
            <v-md-editor :model-value="mdCode" mode="preview" />
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "pagination-demo"
}
</script>
<script setup lang="ts">
import MonacoEditor from "@/components/MonacoEditor/index.vue"
import Example from "./components/index.vue"
import { codeOptions } from "./codes/_code"
import { ref } from "vue"

const mdCode = ref(`
## 总结分页业务

### 解决的问题

1. 重复的组合 pagination、和数据区的布局样式问题。

- 分析：共性是渲染一对数据、加分页。从布局上来看，整个应用应该保持统一。

2. 重复的监听，pageParams、conditions 触发 getList 的逻辑组合。

- 分析：pageParams 一般是相同风格属于共性，conditions 可能有变化设计为用户输入，getList 接口也应该是用户提供。

### 需要做到的点

1. 使用用户提供的 getList 是在父组件，这里就需要解决子组件调用的过程中，传递{pageParams、conditions}合并参数 1、子组件需要暴露的响应式数据 exposed,包含内部 list、loading、total(均为 ref)。

::: tip

// 见接口类型
export interface ExposeType {
  loading: Ref<boolean>
  list: Ref<ArrListType>
  total: Ref<number>
}

:::

2. 空数据展示，设置为外部使用者提供，均插入到插槽 content 的位置。空数据的分页展示在封装组件内部控制。

### 解决的重复的工作

1. 深度监听 conoditions、深度监听 pageParams

2. onMounted 初始调用

3. 定义对应的响应式数据 list、total、loading

4. 分页改变事件的逻辑编写。

### props 属性

conditions：外界传递

getList： 接口函数外界传递

pagaStyle： 分页容器的样式对象

contentStyle： 内容容器的样式对象

`)
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

      &.view {
        .view-dome__wrapper {
          display: flex;
          align-items: center;
          justify-content: center;

          height: 765px;
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

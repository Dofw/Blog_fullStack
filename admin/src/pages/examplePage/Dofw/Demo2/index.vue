<template>
  <div class="demo1-container">
    <div class="description">简介: Form表单实现 视图、逻辑分离。</div>
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
  name: "Form-add-edit"
}
</script>
<script setup lang="ts">
import MonacoEditor from "@/components/MonacoEditor/index.vue"
import Example from "./components/index.vue"
import { codeOptions } from "./codes/_code"
import { ref } from "vue"

const mdCode = ref(`
### BaseForm 组件 (样式、验证等, 复杂逻辑可以通过 hook 方式分离。)

1. 设置 formData 的默认 ref，watchEffect 监听外界提供的 formData，并对此深拷贝；原因 v-model = "props.formData.xxx" 同一个引用，不符合开发规范子组件改动 props；同时对外部组件可能造成一定的影响。故深拷贝解决此问题，只需要接受值，将新的结果返回。

2. 部分 Select 选项后台数据的获取(API、store)。

3. 设置 rules 验证规则；修改样式。

4. defineExpose 暴露 form 实例 、 close供 dialog X close 恢复初始状态 。
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

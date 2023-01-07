<template>
  <div class="demo1-container">
    <div class="description">简介: 了解vue 指令的使用。</div>
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
  name: "vue-directive"
}
</script>
<script setup lang="ts">
import MonacoEditor from "@/components/MonacoEditor/index.vue"
import Example from "./components/index.vue"
import { codeOptions } from "./codes/_code"
import { ref } from "vue"

const mdCode = ref(`
## 指令应用

### 为什么 当同一个组件中多次使用了同一个 v-myloading="diffValue", 改变其中一个值 updated 钩子函数执行两次。

::: details
  // vue/core 源码提取
 
  ... ... 

  const patchElement = (
    n1: VNode,
    n2: VNode,
    parentComponent: ComponentInternalInstance | null,
    parentSuspense: SuspenseBoundary | null,
    isSVG: boolean,
    slotScopeIds: string[] | null,
    optimized: boolean
  ) => {

    ... ... 

    const el = (n2.el = n1.el!)
    let { patchFlag, dynamicChildren, dirs } = n2

    patchFlag |= n1.patchFlag & PatchFlags.FULL_PROPS
    const oldProps = n1.props || EMPTY_OBJ
    const newProps = n2.props || EMPTY_OBJ
    let vnodeHook: VNodeHook | undefined | null // 另外的功能

    ... ... 

    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1)
        dirs && invokeDirectiveHook(n2, n1, parentComponent, 'updated')
      }, parentSuspense)
    }
  }

  // 即只要触发组件 render 那么diff更新的过程中，每个 绑定v-myloading的 VNode 都会被patchElement到，只要dirs存在就会执行invokeDirectiveHook。

  ... ... 

:::

处理方法:

::: tip
// 第一个改变，调用该函数，传入自己的的参数。即oldValue !== value
// patchElement到第二个 v-myloading 时，传入自己的值。由于oldValue === value。故不做操作。element-plus中也是这样做的。
if (binding.oldValue !== binding.value) {
  ... ...
}
:::

### 技巧

1. 使用 vue 的 createApp()

::: tip
const _root: HTMLElement = document.createElement("div")
const app = createApp(Loading) // app应用，使用unmount
const vm = app.mount(_root) // 获取vm.$el loading domTree
_root.remove() //保持纯净环境
:::

2. mounted 中 生成一个 loading-instance, 将 app、vm 绑定到该指令下的全局上下文中 el 上, 供整个声明周期使用。 使用 Symbol, 解决不覆盖 el 已有属性。

::: tip
el[LOADING_INSTANCE] = {
  vm: instance.vm,
  app: instance.app
}
:::

3. VUE 官网 directive 使用中，提到：除了 el 外，其他参数都是只读的，不要更改它们。若你需要在不同的钩子间共享信息，推荐通过元素的 dataset attribute 实现。

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

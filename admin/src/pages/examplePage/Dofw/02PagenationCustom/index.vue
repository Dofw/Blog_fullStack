<template>
  <PreviewCodes
    :codeOptions="codeOptions"
    description="简介: 分页需求统一视图样式、重复操作逻辑封装在内部，外部只提供getList、conditions"
  >
    <template #demo>
      <Example />
    </template>
    <template #summary>
      <v-md-editor :model-value="mdCode" mode="preview" />
    </template>
  </PreviewCodes>
</template>
<script lang="ts">
import PreviewCodes from "@/components/PreviewCodes/index.vue"
export default {
  name: "pagination-demo"
}
</script>
<script setup lang="ts">
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

<style scoped lang="scss"></style>

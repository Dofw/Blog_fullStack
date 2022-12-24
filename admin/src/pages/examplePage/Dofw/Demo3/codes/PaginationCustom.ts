export const code = `
<template>
  <div class="custom-pagination-container">
    <div class="content-wrapper" :style="contentStyle" v-loading="loading" element-loading-text="Loading..." element-loading-spinner="el-icon-loading">
      <!-- 空数据外侧提供 -->
      <slot name="content" :data="list"></slot>
    </div>

    <div class="page-wrapper" :style="pageStyle" v-show="isEmpty">
      <el-pagination
        v-bind="$attrs"
        layout="prev, pager, next"
        background
        :total="total"
        v-model:current-page="pageParams.noPage"
        v-model:page-size="pageParams.pageSize"
        @size-change="_sizeChange"
        @current-change="_currentChange"
        @prev-click="_prevChange"
        @next-click="_nextChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ArrListType, Params, PageParams, ConditionsParams, ExposeType } from "./type"
import type { Ref, ComponentInternalInstance } from "vue"
import { defineProps, withDefaults, ref, computed, onMounted, watch, defineExpose, getCurrentInstance } from "vue"

interface Props {
  conditions: ConditionsParams
  pageStyle?: any
  contentStyle?: any
  getList: (params: Params, exposed: ExposeType) => Promise<void>
}

const props = withDefaults(defineProps<Props>(), {
  pageStyle: {},
  contentStyle: {}
})

const list: Ref<ArrListType> = ref([] as ArrListType)
const pageParams: Ref<PageParams> = ref({
  noPage: 1,
  pageSize: 10
})
const total: Ref<number> = ref(0)
const loading: Ref<boolean> = ref(false)

const isEmpty = computed(() => {
  console.log("computed", list.value)
  return list.value && list.value.length > 0
})

onMounted(() => {
  wrapperGetList()
})
watch(
  () => pageParams.value,
  () => {
    console.log("watch-PageParams")
    wrapperGetList()
  },
  { deep: true }
)
watch(
  () => props.conditions,
  () => {
    console.log("watch-conditions")
    // 如果保持页码不变,则直接调用。
    // this.wrapperGetList();

    //重置页码为初始，调用pageParams监听。否则重复调用了。
    pageParams.value = {
      noPage: 1,
      pageSize: 10
    }
  },
  { deep: true }
)

defineExpose({
  total,
  list,
  loading
})

// 组件实例, 将暴露的响应式数据传递给getList
const instanceComp: ComponentInternalInstance | null = getCurrentInstance()

// console.log('组件实例', instanceComp)
function wrapperGetList() {
  const params = { ...props.conditions, ...pageParams.value }
  if (instanceComp) {
    props.getList(params, instanceComp.exposed as ExposeType)
  }
}
function _currentChange(value: number) {
  pageParams.value.noPage = value
}
function _prevChange(value: number) {
  pageParams.value.noPage = value
}
function _nextChange(value: number) {
  pageParams.value.noPage = value
}
function _sizeChange(value: number) {
  pageParams.value.pageSize = value
}
</script>

<style lang="scss" scoped>
.custom-pagination-container {
  width: 100%;
  height: 100%;

  $marginTop: 15px;
  .content-wrapper {
    width: 100%;
    // height: calc(90% - $marginTop);
  }

  .page-wrapper {
    width: 100%;
    margin-top: $marginTop;

    display: flex;
    justify-content: flex-end;
    align-items: center;

    ::v-deep .el-pagination {
      border: 2px solid orange;
    }
  }

  //loading 的样式
  ::v-deep .el-loading-spinner {
    .el-icon-loading {
      font-size: 35px;
    }
    .el-loading-text {
      font-size: 16px;
    }
  }
}
</style>



`

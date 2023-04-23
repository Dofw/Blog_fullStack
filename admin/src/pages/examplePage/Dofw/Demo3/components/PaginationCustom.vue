<template>
  <div class="custom-pagination-container">
    <div class="content-wrapper" :style="contentStyle" v-loading="loading" element-loading-text="Loading...">
      <!-- 空数据外侧提供 -->
      <slot name="content" :data="list"></slot>
    </div>

    <div class="page-wrapper" :style="pageStyle" v-show="isEmpty">
      <el-pagination
        layout="sizes, prev, pager, next"
        :page-sizes="[10, 20, 40, 50, 100]"
        background
        :total="total"
        v-model:current-page="pageParams[fields.noPage]"
        v-model:page-size="pageParams[fields.pageSize]"
        @size-change="_sizeChange"
        @current-change="_currentChange"
        v-bind="$attrs"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script lang="ts">
const defauldFields = {
  noPage: "noPage",
  pageSize: "pageSize"
}
</script>

<script setup lang="ts">
import type { ArrListType, Params, PageParams, ConditionsParams, ExposeType } from "./type"
import type { Ref, ComponentInternalInstance } from "vue"
import { defineProps, withDefaults, ref, computed, onMounted, watch, defineExpose, getCurrentInstance } from "vue"

interface PageFieldsType {
  noPage?: string
  pageSize?: string
}

interface Props {
  conditions?: ConditionsParams
  pageFields?: PageFieldsType
  defaultPageSize?: number
  getList: (params: Params, exposed: ExposeType) => Promise<void>
  pageStyle?: any
  contentStyle?: any
}

const props = withDefaults(defineProps<Props>(), {
  conditions: () => {
    return {}
  },
  pageFields: () => {
    return { ...defauldFields }
  },
  pageStyle: {},
  contentStyle: {},
  defaultPageSize: 10
})

const fields = computed(() => {
  return {
    ...defauldFields,
    ...props.pageFields
  }
})
const pageParams: Ref<PageParams> = ref({
  [fields.value.noPage]: 1,
  [fields.value.pageSize]: props.defaultPageSize
})
const total: Ref<number> = ref(0)
const loading: Ref<boolean> = ref(false)

const list: Ref<ArrListType> = ref([] as ArrListType)
const isEmpty = computed(() => {
  return list.value && list.value.length > 0
})

onMounted(() => {
  wrapperGetList()
})
watch(
  () => pageParams.value,
  () => {
    console.log("watch-PageParams", pageParams.value)
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
      [fields.value.noPage]: 1,
      [fields.value.pageSize]: props.defaultPageSize || 10
    }
  },
  { deep: true }
)

defineExpose({
  total,
  list,
  loading,
  updateList
})

// 组件实例, 将暴露的响应式数据传递给getList
const instanceComp: ComponentInternalInstance | null = getCurrentInstance()

function wrapperGetList() {
  const params = { ...props.conditions, ...pageParams.value }
  _getList(params)
}
// 父组件出发更新。当前页面恢复 1。
function updateList() {
  const params = {
    ...props.conditions,
    ...pageParams.value,
    [fields.value.noPage]: 1
  }
  _getList(params)
}
function _getList(params: Params) {
  if (instanceComp) {
    props.getList(params, instanceComp.exposed as ExposeType)
  }
}

function _currentChange(value: number) {
  pageParams.value[fields.value.noPage] = value
}
// function _prevChange(value: number) {
//   pageParams.value[fields.value.noPage] = value - 1
// }
// function _nextChange(value: number) {
//   pageParams.value[fields.value.noPage] = value + 1
// }
function _sizeChange(value: number) {
  pageParams.value[fields.value.pageSize] = value
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

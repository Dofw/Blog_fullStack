<template>
  <div class="custom-pagination-container">
    <div class="content-wrapper" v-loading="loading" element-loading-text="Loading...">
      <!-- 空数据外侧提供 -->
      <slot name="content" :data="list"></slot>
    </div>

    <div class="page-wrapper" v-show="isEmpty">
      <el-pagination
        layout="sizes, prev, pager, next"
        :page-sizes="[10, 20, 40, 50, 100]"
        background
        :total="total"
        v-model:current-page="pageParams[pageFields.pageNo]"
        v-model:page-size="pageParams[pageFields.pageSize]"
        v-bind="$attrs"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Ref, ComponentInternalInstance } from "vue"
import {
  defineProps,
  withDefaults,
  ref,
  computed,
  onMounted,
  watch,
  defineExpose,
  getCurrentInstance
} from "vue"

export type PageFieldsType = {
  pageNo: string
  pageSize: string
}

//暴露属性
export interface ExposeType {
  loading: Ref<boolean>
  total: Ref<number>
  list: Ref<any[]>
  updateList: () => void
}
export interface Props {
  conditions: object
  pageFields: PageFieldsType
  defaultPageSize?: number
  mountedRun?: boolean
  getList: GetListType
}

export type GetListType<T extends object = { [K in string]: any }> = (
  params: T,
  exposed: { [K in keyof ExposeType]: ExposeType[K] }
) => void

const props = withDefaults(defineProps<Props>(), {
  conditions: () => {
    return {}
  },
  pageFields: () => {
    return {
      pageNo: "pageNo",
      pageSize: "pageSize"
    }
  },
  mountedRun: true,
  defaultPageSize: 10
})

const pageParams = ref({
  [props.pageFields.pageNo]: 1,
  [props.pageFields.pageSize]: props.defaultPageSize
})

// 正常逻辑
const total: Ref<number> = ref(0)
const loading: Ref<boolean> = ref(false)
const list: Ref<any[]> = ref([] as any[])
const isEmpty = computed(() => {
  return list.value && list.value.length > 0
})

onMounted(() => {
  props.mountedRun && wrapperGetList()
})
watch(
  () => pageParams.value,
  () => {
    wrapperGetList()
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
  if (instanceComp) {
    props.getList(params, instanceComp.exposed as ExposeType)
  }
}

/**
 * 父组件出发更新。当前页码恢复 1。
 * 1.出发watch，调用wrapperGetList
 */
function updateList() {
  // 改变 pageParams 触发 watch
  pageParams.value = {
    [props.pageFields.pageNo]: 1,
    [props.pageFields.pageSize]: props.defaultPageSize
  }
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

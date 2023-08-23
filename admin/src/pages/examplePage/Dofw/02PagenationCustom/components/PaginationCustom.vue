<template>
  <div class="custom-pagination-container">
    <div
      class="content-wrapper"
      :style="contentStyle"
      v-loading="loading"
      element-loading-text="Loading..."
    >
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
    [fields.value.noPage]: 1,
    [fields.value.pageSize]: props.defaultPageSize
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

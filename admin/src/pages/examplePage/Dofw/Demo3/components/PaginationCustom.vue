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
import type { ArrListType, Params, CustomVm } from "./type"
import type { Ref } from "vue"
import { defineProps, ref, computed, onMounted, watch, defineExpose } from "vue"

interface Props {
  conditions: any
  defaultValue?: any
  pageStyle?: any
  contentStyle?: any
  getList: (params: Params, vm: CustomVm) => void
}

const props = defineProps<Props>()

const list: Ref<ArrListType> = ref([] as ArrListType)
const pageParams: any = ref({
  noPage: 1,
  pageSize: 10
})
const total: Ref<number> = ref(0)
const loading: Ref<boolean> = ref(false)

const isEmpty = computed(() => {
  return list.value && list.value.length > 0
})

onMounted(() => {
  wrapperGetList()
})
watch(
  pageParams.value,
  () => {
    wrapperGetList()
  },
  { deep: true }
)
watch(
  props.conditions,
  () => {
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

function wrapperGetList() {
  const params = { ...props.conditions, ...pageParams.value }
  // this 组件实例
  props.getList(params, {})
}
function _currentChange(value: any) {
  pageParams.value.noPage = value
}
function _prevChange(value: any) {
  pageParams.value.noPage = value
}
function _nextChange(value: any) {
  pageParams.value.noPage = value
}
function _sizeChange(value: any) {
  pageParams.value.pageSize = value
}
</script>

<style lang="scss" scoped>
.custom-pagination-container {
  width: 100%;
  height: 100%;

  .content-wrapper {
    width: 100%;
    height: 90%;
    // border: 1px solid red;
  }

  .page-wrapper {
    width: 100%;
    height: 10%;
    margin-top: 15px;

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

<template>

      <el-table  :data="data" style="width: 100%">
        <el-table-column prop="field1" label="field1" width="180" />
        <el-table-column prop="field2" label="field2" width="180" />
        <el-table-column prop="field3" label="field3" />
      </el-table>


</template>

<script setup lang="ts">
import type { Params, ExposeType } from "./type"
import { ref } from "vue"
import {filterCurrent} from '.'

const pageInstance = ref({} as ExposeType)

const defaultConditions = {
  field: "init"
}
const conditions = ref({ ...defaultConditions })

const onSearch = () => {
  pageInstance.value.updateList() // 重新改变页码，自动就会带入新的 conditions
}

async function getList(params: Params, exposed: ExposeType) {
  if (!exposed) return
  exposed.loading.value = true
  setTimeout(() => {
    exposed.list.value = [
      {
        field1: `${params.curPage}数据1`,
        field2: `${params.curPage}功能1-1`,
        field3: `${params.pageSize}功能1-2`
      }
    ]
    exposed.total.value = 1000
    exposed.loading.value = false
  }, 1000)
}
</script>

<style lang="scss" scoped></style>

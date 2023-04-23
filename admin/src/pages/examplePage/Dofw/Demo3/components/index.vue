<template>
  <CustomPagination
    ref="pageInstance"
    :conditions="conditions"
    :getList="getList"
    :pageFields="{
      noPage: 'curPage'
    }"
  >
    <template v-slot:content="{ data }">
      <el-table v-if="data.length !== 0" :data="data" style="width: 100%">
        <el-table-column prop="field1" label="field1" width="180" />
        <el-table-column prop="field2" label="field2" width="180" />
        <el-table-column prop="field3" label="field3" />
      </el-table>
      <el-empty v-else></el-empty>
    </template>
  </CustomPagination>
</template>

<script setup lang="ts">
import type { Params, ExposeType } from "./type"
import CustomPagination from "./PaginationCustom.vue"
import { ref, onMounted } from "vue"

const pageInstance = ref({} as ExposeType)

const conditions = ref({
  field: "init"
})

onMounted(() => {
  setTimeout(() => {
    conditions.value.field = "reset"
  }, 10000)
})

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

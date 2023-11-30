<template>
  <!-- condition -->
  <div>
    <el-form :model="conditions">
      <el-row>
        <el-col :span="8">
          <el-form-item label="测试:">
            <el-input size="default" v-model="conditions.field" placeholder="请输入企业名称" />
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <el-form-item>
            <el-button size="default" type="primary" @click="onSearch">查询</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <CustomPagination
      ref="pageInstance"
      :conditions="conditions"
      :getList="getList"
      :pageFields="{
        pageNo: 'curPage',
        pageSize: 'pageSize'
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
  </div>
</template>

<script setup lang="ts">
import CustomPagination, { type GetListType, type ExposeType } from "./PaginationCustom.vue"
import { ref } from "vue"

export type ConditionsParams = {
  [K in string]: any
}

const pageInstance = ref({} as ExposeType)

const defaultConditions = {
  field: "init"
}
const conditions = ref({ ...defaultConditions })

const onSearch = () => {
  pageInstance.value.updateList() // 重新改变页码，自动就会带入新的 conditions
}
const getList: GetListType = async (params, exposed) => {
  if (!exposed) return
  exposed.loading.value = true
  setTimeout(() => {
    exposed.list.value = [
      {
        field1: `${params.pageNo}数据1`,
        field2: `${params.pageNo}功能1-1`,
        field3: `${params.pageSize}功能1-2`
      }
    ]
    exposed.total.value = 1000
    exposed.loading.value = false
  }, 1000)
}
</script>

<style lang="scss" scoped></style>

<template>
  <div>
    <CustomPagination :conditions="conditions" :getList="getList">
      <template v-slot:content="{ data }">
        <ul style="height: 100px">
          <li v-for="item in data" :key="item.field1">
            {{ item }}
          </li>
        </ul>
      </template>
    </CustomPagination>
  </div>
</template>

<script setup lang="ts">
import type { Params, CustomVm } from "./type"
import CustomPagination from "./PaginationCustom.vue"
import { ref } from "vue"

const conditions = ref({
  a: "init"
})

function getList(params: Params, vm: CustomVm) {
  vm.loading = true
  setTimeout(() => {
    vm.list = [
      {
        field1: "数据1",
        field2: "功能1-1",
        field3: "功能1-2",
        field4: "功能1-3"
      }
    ]
    vm.total = 1000
    // vm.loading = false;
  }, 5000)
}
</script>

<style lang="scss" scoped></style>

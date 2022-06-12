<template>
  <SelfLayout title="标题">
    <template #conditions="conditions">
      conditions
    </template>

    <template #content="content">
      <el-table :data="list" size="mini" style="width: 100%" row-class-name="data-source-items">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="userName" label="用户名"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column label="参数-指标">
          <template #default="scope">
            <div>
              Json
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Description" min-width="100">
          <template #default="scope">
            <span>{{ "scope.row.note" }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150">
          <template #default="scope">
            <el-tooltip content="编辑" placement="top" :enterable="true">
              <span>
                <el-button type="primary" circle>
                  Add
                </el-button>
              </span>
            </el-tooltip>

            <el-tooltip content="删除" placement="bottom" :enterable="true">
              <div>
                <el-popconfirm confirmButtonText="confirm" cancelButtonText="Cancel" icon-color="red" title="Delete">
                  <template #reference>
                    <el-button type="danger" circle>
                      Delete
                    </el-button>
                  </template>
                </el-popconfirm>
              </div>

            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </template>
  </SelfLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SelfLayout from './SelfLayout.vue'
const list = ref([
  {
    name: 'name1',
    userName: 'user1',
    type: 1,

  }
])
</script>

<style scoped>
</style>
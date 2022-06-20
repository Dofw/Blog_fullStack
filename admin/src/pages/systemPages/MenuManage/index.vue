<template>
  <div>
    <div>
      <CreateForm type="add" #default="scope">
        <el-button>{{ scope.type2name }}</el-button>
      </CreateForm>
    </div>

    <el-table :data="tableData1" style="width: 100%" row-key="id" border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }" @row-click="rowClickFunc">
      <el-table-column prop="menuName" label="菜单名称" width="180" />
      <el-table-column prop="icon" label="图标" width="180">
        <template #default="scope">
          <el-icon>
            <message />
          </el-icon>
        </template>
      </el-table-column>

      <el-table-column prop="sort" label="排序" width="180" />
      <el-table-column prop="auth" label="权限" width="180" />
      <el-table-column prop="component" label="组件路径" width="180" />
      <el-table-column prop="isHidden" label="显示状态" width="180" />
      <el-table-column prop="createTime" label="创建时间" width="180" />

      <!-- 操作 -->
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { watch, watchEffect } from 'vue'
import { Message } from "@element-plus/icons-vue";
import { useRouter } from 'vue-router'
import CreateForm from './components/CreateForm.vue'

interface Menu {
  id: number
  pid: number
  menuName: string // 菜单名
  hasChildren?: boolean
  children?: Menu[]

  icon: string // 图标
  sort: number // 菜单排序
  auth: string[] // 权限
  component: string // 异步组件路径
  isHidden: number // 0 1 表示 false true
  createTime: number // 时间戳
}

const router = useRouter()

const tableData1: Menu[] = [
  {
    id: 1,
    pid: 0,
    menuName: '系统管理', // 菜单名
    icon: 'string', // 图标
    sort: 1, // 菜单排序
    auth: [], // 权限
    component: '/system', // 异步组件路径
    isHidden: 1, // 0 1 表示 false true
    createTime: Date.now(), // 时间戳

    children: [
      {
        pid: 1,
        id: 11,
        menuName: '菜单管理', // 菜单名
        icon: 'string', // 图标
        sort: 1, // 菜单排序
        auth: [], // 权限
        component: '/system', // 异步组件路径
        isHidden: 1, // 0 1 表示 false true
        createTime: Date.now(), // 时间戳

      }
    ]
  },
]

const handleEdit = (...data: any[]) => {
  console.log(data)
}

const handleDelete = (...data: any[]) => {
  console.log(data)
}

const rowClickFunc = (row: any) => {
  console.log(row)
  router.push(
    {
      name: 'menu-manage-id',
      params: {
        id: '123'
      }
    }
  )
}

</script>

<style scoped>
</style>
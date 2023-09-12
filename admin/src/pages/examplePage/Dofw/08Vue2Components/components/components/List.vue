<template>
  <div>
    <HeaderTitle title="算法管理" />
    <div>
      <el-button size="mini" type="primary" @click="onAdd">新增</el-button>
      <el-table style="margin-top: 20px;" :data="tableData" stripe>
        <el-table-column
          width="100"
          align="center"
          label="序号"
          type="index"
          size="mini"
        />
        <el-table-column :label="'名称'">
          <template slot-scope="scope">
            <span :title="scope.row.note">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" :label="'创建时间'" sortable />
        <el-table-column prop="status" :label="'状态'">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              @change="onStatusChange(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column :label="'操作'">
          <template slot-scope="scope">
            <el-link :underline="false" type="primary" @click="onEdit(scope.row.id)">编辑</el-link>
            <span style="padding: 0 10px">|</span>
            <el-link :underline="false" type="primary" @click="handleDelete(scope.row.id)">删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { compConfigs, COMP_NAME_KEY } from './utils.js'
const curConfig = compConfigs[COMP_NAME_KEY.LIST]

import HeaderTitle from '@/components/Headertitle'

export default {
  name: curConfig.name,
  components: { HeaderTitle },
  props: {
    algorithmType: {
      type: String,
      default: 'warn'
    }
  },
  data() {
    return {
      tableData: [
        {
          id: 1,
          name: '测试1',
          note: '测试1',
          createTime: '2020-01-01'
        },
        {
          id: 2,
          name: '测试2',
          note: '测试2',
          createTime: '2020-01-01'
        }
      ]
    }
  },
  methods: {
    async handleDelete(id) {
      await this.$http.delete(`/api/comp/${id}`)
    },
    onAdd() {
      this.changeAddOrEditComp()
    },
    onEdit(id) {
      this.changeAddOrEditComp()
    },
    changeAddOrEditComp() {
      switch (this.algorithmType) {
        case 'warn':
          this.$emit('changeComponent', COMP_NAME_KEY.ADD_WARN)
          break
        default:
          this.$emit('changeComponent', COMP_NAME_KEY.ADD_ANALYSIS)
      }
    },
    onStatusChange(row) {
      console.log(row)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

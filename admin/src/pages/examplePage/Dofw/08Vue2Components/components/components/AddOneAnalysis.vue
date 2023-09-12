<template>
  <div class="add-container">
    <div class="title">
      <span>新增分析类算法</span>
      <el-link type="primary" @click="onPrev">取消</el-link>
    </div>
    <!-- 表单内容 -->
    <el-form
      ref="form"
      style="margin-top: 20px; width: 70%;"
      :model="formData"
      label-width="120px"
      :rules="rules
      "
    >
      <el-row>
        <el-col :span="12">
          <el-form-item label="中文名称:" prop="name">
            <el-input v-model="formData.name" placeholder="请输入API名称" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="英文名称:" prop="englishName">
            <el-input v-model="formData.englishName" placeholder="请输入API名称" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="算法说明:" prop="explain">
            <el-input
              v-model="formData.explain"
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="12">
          <el-form-item label="数据源:" prop="datasourceId">
            <el-select
              v-model="formData.datasourceId"
              size="mini"
              :disabled="$route.params.id ? true: false"
              placeholder="请选择数据源"
            >
              <el-option
                v-for="item in datasources"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <!-- sqlCode -->
      <el-row>
        <el-col :span="24">
          <el-form-item label="SQL编辑:" prop="sqlCode">
            <SqlCode
              ref="sqlCode"
              :sql-text="formData.sqlCode"
            />
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="结果表名称:">
            {{ formData.englishName }}
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="结果存储位置:" prop="cachePosition">
            <el-select
              v-model="formData.cachePosition"
              size="mini"
              placeholder="请选择存储位置"
            >
              <el-option
                v-for="item in datasources"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!-- footer -->
      <el-row>
        <el-col :span="24">
          <div class="footer">
            <el-button size="mini" type="primary" @click="onNext">下一步</el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { compConfigs, COMP_NAME_KEY } from './utils.js'
const curConfig = compConfigs[COMP_NAME_KEY.ADD_ANALYSIS]

import SqlCode from '../_sql/SqlCode.vue'
import {
  getAllDataSource
} from '@/api/service'
import { mapState, mapMutations } from 'vuex'

const initFormData = {
  name: '测试',
  englishName: '',
  explain: '',
  datasourceId: null,
  sqlCode: '',
  tableName: '',
  cachePosition: ''
}

export default {
  name: curConfig.name,
  components: {
    SqlCode
  },
  data() {
    return {
      datasourceId: null,
      datasources: [],

      formData: JSON.parse(JSON.stringify(initFormData)),
      rules: {
        name: [
          { required: true, message: '请输入分析名称', trigger: 'blur' }
        ],
        englishName: [
          { required: true, message: '请输入英文名称', trigger: 'blur' }
        ],
        explain: [
          { required: true, message: '请输入分析说明', trigger: 'blur' }
        ],
        datasourceId: [
          { required: true, message: '请选择数据源', trigger: 'change' }
        ],
        sqlCode: [
          { required: true, message: '请输入sql', trigger: 'blur' }
        ],
        cachePosition: [
          { required: true, message: '请输入缓存位置', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapState('algorithmManage', {
      isEditing: (state) => state[COMP_NAME_KEY.ADD_ANALYSIS].isEditing,
      result: (state) => state[COMP_NAME_KEY.ADD_ANALYSIS].result
    })
  },
  watch: {
    // 切换组件，就会重新更新
    formData: {
      handler(newValue) {
        this.updateAnalysisOrIndestyIsEditingState(true) // 表示此次编辑开启进行中。
        this.updateAnalysisOrIndestyResultState({ ...newValue })
      },
      deep: true
    }
  },
  mounted() {
    switch (this.mode) {
      case 'edit':
        this.editMounted()
        break
      default:
        this.addMounted()
        break
    }
  },
  methods: {
    // 都是同步更改
    ...mapMutations('algorithmManage', [
      'updateAnalysisOrIndestyResultState',
      'updateAnalysisOrIndestyIsEditingState',
      'closeAllEditing'
    ]),
    async getAllSource() {
      try {
        const response = await getAllDataSource()
        this.datasources = response
      } catch (error) {
        console.log(error)
        this.$message.error('查询所有数据源失败')
      }
    },
    addMounted() {
      if (!this.isEditing) {
        // mode=add，只更新result为初始formData。
        this.updateAnalysisOrIndestyResultState({ ...this.formData })
      } else {
        // 每次上一步时，将result clone给 formData
        this.formData = JSON.parse(JSON.stringify(this.result))
      }
    },
    editMounted() {
      if (!this.isEditing) {
      // mode=edit，更新fromData，进而会触发watch-formData，进而也更新了result结果
        this.formData = {}
      } else {
      // 每次上一步时，将result clone给 formData
        this.formData = JSON.parse(JSON.stringify(this.result))
      }
    },
    onPrev() {
      this.closeAllEditing() // 将所有创建的模块，isEditing 状态置为false
      this.$emit('changeComponent', curConfig.prevCompName)
    },
    onNext() {
      this.$emit('changeComponent', curConfig.nextCompName)
    }
  }
}
</script>

<style lang="scss" scoped>
.add-container{
  width: 100%;
  height: calc(100% - 100px);

  .title{
    display: flex;
    justify-content: space-between;
  }

  .footer{
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>

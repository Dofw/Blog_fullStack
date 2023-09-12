import { COMP_NAME_KEY } from '@/views/arithmetic/Manage/components/utils'

// 算法管理
const algorithmManage = {
  namespaced: true,
  state: {
    mode: 'add', // 模式

    // 分析类型 和 产业类型 共用 AddOne init
    [COMP_NAME_KEY.ADD_ANALYSIS]: {
      result: {}, // 表单修改。
      isEditing: false // 是否正在编辑
    },

    // 预警 AddOne init
    [COMP_NAME_KEY.ADD_WARN]: {
      result: {}, // 表单修改。
      isEditing: false // 是否正在编辑
    },

    // 只有推荐类 第二步 init
    [COMP_NAME_KEY.ADD_TWO]: {
      result: [],
      isEditing: false // 是否正在编辑
    },

    // 所有新增共用统一个 最后一步 init
    [COMP_NAME_KEY.ADD_LAST]: {
      result: [],
      isEditing: false // 是否正在编辑
    }
  },
  mutations: {
    setMode(state, payload) {
      state.mode = payload
    },
    // 分析类型 和 产业类型 结果更新 和 重置
    updateAnalysisOrIndestyResultState(state, payload) {
      state[COMP_NAME_KEY.ADD_ANALYSIS].result = payload
    },
    updateAnalysisOrIndestyIsEditingState(state, payload) {
      state[COMP_NAME_KEY.ADD_ANALYSIS].isEditing = payload
    },

    // 预警类型 结果更新和 重置
    updateWarnResultState(state, payload) {
      state[COMP_NAME_KEY.ADD_WARN].result = payload
    },

    // 推荐类 第二步 结果更新和 重置
    updateTwoResultState(state, payload) {
      state[COMP_NAME_KEY.ADD_TWO].result = payload
    },

    // 所有新增共用统一个 最后一步 结果更新和 重置
    updateLastResultState(state, payload) {
      state[COMP_NAME_KEY.ADD_LAST].result = payload
    },

    // 取消编辑，关闭所有的
    closeAllEditing(state) {
      state[COMP_NAME_KEY.ADD_ANALYSIS].isEditing = false
      state[COMP_NAME_KEY.ADD_WARN].isEditing = false
      state[COMP_NAME_KEY.ADD_TWO].isEditing = false
      state[COMP_NAME_KEY.ADD_LAST].isEditing = false
    }
  }
}

export default algorithmManage

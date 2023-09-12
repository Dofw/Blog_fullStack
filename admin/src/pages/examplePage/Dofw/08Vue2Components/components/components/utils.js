// 名称统一管理
export const COMP_NAME_KEY = {
  // 组件名称
  ADD_ANALYSIS: "add_analysis",
  ADD_WARN: "add_warn",
  ADD_LAST: "add_last",
  LIST: "list"
}

// 统一管理 component 组件 切换关系
export const compConfigs = {
  // 分析新增
  [COMP_NAME_KEY.ADD_ANALYSIS]: {
    name: COMP_NAME_KEY.ADD_ANALYSIS,
    prevCompName: COMP_NAME_KEY.LIST,
    nextCompName: COMP_NAME_KEY.ADD_LAST
  },
  // 预警新增 同 分析新增
  [COMP_NAME_KEY.ADD_WARN]: {
    name: COMP_NAME_KEY.ADD_WARN,
    prevCompName: COMP_NAME_KEY.LIST,
    nextCompName: COMP_NAME_KEY.ADD_LAST
  }
}

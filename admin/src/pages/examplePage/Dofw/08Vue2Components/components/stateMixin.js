// 每个 dynamicComponent 对应的state处理公性逻辑抽离。
export default { 
  props: {
    state: { 
      type: [Object,Array, String], 
      default() {
        return undefined
      }
    }
  },
  data() {
    return {
      // 内部使用的state, watch-immediate回调执行在created之前; 故使用时都已经为父组件的复制数据了。
      inState: undefined, 
    }
  },
  watch: {
    state: {
      handler(val) {
        if(!val) return 
        this.inState = JSON.parse(JSON.stringify(val)) //保持数据父子隔离，避免违反单项数据流约定。
      },
      deep: true,
      immediate: true,
    }
  },
}
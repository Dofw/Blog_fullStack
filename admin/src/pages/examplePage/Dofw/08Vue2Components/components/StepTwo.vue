<template>
  <div>
    {{inState}}
    <el-button @click="onSubmit">two-submit</el-button>
  </div>
</template>

<script>
  import {OPERATE_TYPE} from './DynamicComponent.vue'
  import stateCloneMixin from './stateMixin.js'

  export default {
    name: "StepTwo",
    mixins: [stateCloneMixin], // 将外界state克隆到组件内部inState状态。
    methods: {
      onSubmit() {
        this.inState = 'StepTwo'
        this.$emit('onOperate', {
          compId: 2,
          operate: OPERATE_TYPE.UPDATE_STATE,
          data: this.inState
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
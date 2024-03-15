<template>
  <div>
    {{inState}}
    <el-button @click="onSubmit">one-submit</el-button>
  </div>
</template>

<script>
  import {OPERATE_TYPE} from './DynamicComponent.vue'
  import stateCloneMixin from './stateMixin.js'
  export default {
    name: "StepOne",
    mixins: [stateCloneMixin], // 将外界state克隆到组件内部inState状态。
    methods: {
      onSubmit() {
        this.inState.b = 2;
        this.$emit('onOperate', {
          compId: 1,
          operate: OPERATE_TYPE.UPDATE_STATE,
          data: this._clone(this.inState)
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
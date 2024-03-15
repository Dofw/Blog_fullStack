<template>
  <div>
    {{inState}}
    <el-button @click="onSubmit">two-submit</el-button>
  </div>
</template>

<script>
  import {OPERATE_TYPE} from './DynamicComponent.vue'
  export default {
    name: "StepTwo",
    props: {
      state: {
        type: [Object, Array, String],
        default: () => {}
      }
    },
    watch: {
      state: {
        handler(newValue) {
          this.inState = JSON.parse(JSON.stringify(newValue));
        },
        immediate: true
      }
    },
    data() {
      return {
        inState: 'StepTwo'
      }
    },
    methods: {
      onSubmit() {
        this.inState = 'StepTwo'

        this.$emit('onOperate', {
          compId: 2,
          operate: OPERATE_TYPE.CANCEL,
          data: this.inState
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
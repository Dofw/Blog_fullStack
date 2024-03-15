<template>
  <div>
    {{inState}}
    <el-button @click="onSubmit">one-submit</el-button>
  </div>
</template>

<script>
  import {OPERATE_TYPE} from './DynamicComponent.vue'
  export default {
    name: "StepOne",
    props: {
      state: {
        required: true,
        type: [Object, Array, String],
      }
    },
    watch: {
      state: {
        handler(newValue) {
          this.inState = JSON.parse(JSON.stringify(newValue));
        },
        immediate: true,
        deep: true
      }
    },
    data() {
      return {
        inState: {}
      }
    },
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
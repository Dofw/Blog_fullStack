<template>
  <div>
    <el-button @click="onPrev">返回</el-button>
  </div>
</template>

<script>
import { compConfigs, COMP_NAME_KEY } from './utils.js'
const curConfig = compConfigs[COMP_NAME_KEY.ADD_LAST]
export default {
  name: curConfig.name,
  data() {
    return {
      curConfig
    }
  },
  methods: {
    onPrev() {
      this.$emit('changeComponent', curConfig.prevCompName)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

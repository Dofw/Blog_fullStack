<template>
  <div>
    预警
    <el-button @click="onPrev">预警上一步</el-button>
    <el-button @click="onNext">预警下一步</el-button>
  </div>
</template>

<script>
import { compConfigs, COMP_NAME_KEY } from './utils.js'
const curConfig = compConfigs[COMP_NAME_KEY.ADD_WARN]

export default {
  name: curConfig.name,
  data() {
    return {
    }
  },
  methods: {
    onPrev() {
      this.$emit('changeComponent', curConfig.prevCompName)
    },
    onNext() {
      this.$emit('changeComponent', curConfig.nextCompName)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>

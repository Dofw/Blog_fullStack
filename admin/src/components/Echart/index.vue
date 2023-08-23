<template>
  <div class="xxxxx" ref="chart" :style="{ width, height }"></div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch, defineExpose } from "vue"
import * as echarts from "echarts"

const props = defineProps({
  className: {
    type: String,
    default: ""
  },
  width: {
    type: String,
    default: "100%"
  },
  height: {
    type: String,
    default: "100%"
  },
  options: {
    type: Object,
    default: () => {
      return {}
    }
  }
})

const chart = ref(null) // dom
const instance = ref(null) // 实例
defineExpose({
  instance
})

onMounted(() => {
  let myChart = echarts.init(chart.value)
  myChart.setOption(props.options)
  instance.value = myChart
})

watch(
  () => {
    return props.options
  },
  (options) => {
    instance.value.setOption(options)
  }
)
</script>

<style lang="scss" scoped></style>

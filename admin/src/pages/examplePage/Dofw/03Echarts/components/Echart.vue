<template>
  <div class="echart-container" ref="chart" :style="{ width, height }"></div>
</template>

<script setup>
import { defineProps, ref, onMounted, watch, defineExpose, nextTick } from "vue"
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
  nextTick(() => {
    const { width, height } = chart.value.getBoundingClientRect()
    myChart.resize({
      width,
      height
    })
  })
  instance.value = myChart
})

watch(
  () => {
    return props.options
  },
  (options) => {
    unwarp(instance.value).setOption(options, {
      notMerge: true,
      replaceMerge: ["title"]
    })
  }
)

//echarts5 vue3 tootip 不显示问题，拆箱
const unwarp = (obj) => obj && (obj.__v_raw || obj.valueOf() || obj)
</script>

<style lang="scss" scoped>
.echart-container {
  > div {
    border: 1px solid green;
    &:nth-of-type(1) {
      border: 1px solid green;
      width: 100% !important;
      height: 100% !important;
    }
  }
}
</style>

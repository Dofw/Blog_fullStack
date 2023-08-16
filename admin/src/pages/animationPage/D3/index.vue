<template>
  <div id="d3"></div>
</template>

<script lang="ts">
export default {
  name: "D3"
}
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as d3 from "d3"

const d3Ref = ref({})
const data = {
  name: "root",
  children: [
    {
      name: "name-1",
      value: 10
    },
    {
      name: "name-2",
      value: 10
    }
  ]
}

onMounted(() => {
  const container: HTMLElement = d3.select("#d3").node() as HTMLElement
  const margin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
  }
  const { width, height } = container.getBoundingClientRect()
  const innerW = width - margin.right - margin.left
  const innerH = height - margin.top - margin.bottom

  const svg = d3
    .select("#d3")
    .append("svg")
    .attr("class", "svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `0 0 ${innerW} ${innerH}`)

  // g 分组元素，给g设置的属性，会统一到他下面的所有的元素。故实现了margin-top/margin-left
  const g1 = svg
    .append("g")
    .attr("class", "level-group-1")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
})
</script>

<style lang="scss" scoped>
#d3 {
  width: 100%;
  height: 100%;
}
</style>

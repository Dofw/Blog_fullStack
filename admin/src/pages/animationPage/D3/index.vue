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
import D3Model from "./index"

const data = {
  name: "root",
  children: [
    {
      name: "root-1",
      value: 10,
      children: [
        {
          name: "root-1-1",
          value: 10
        },
        {
          name: "root-1-2",
          value: 10
        }
      ]
    },
    {
      name: "root-2",
      value: 10,
      children: [
        {
          name: "root-1-11",
          value: 10
        }
      ]
    }
  ]
}

onMounted(() => {
  new D3Model({
    $el: "#d3",
    data,
    config: {
      margin: [20, 20, 20, 20],
      fontSize: 14,
      boxSize: [200, 100]
    }
  })
})
</script>

<style lang="scss" scoped>
#d3 {
  width: 100%;
  height: 100%;
}
</style>

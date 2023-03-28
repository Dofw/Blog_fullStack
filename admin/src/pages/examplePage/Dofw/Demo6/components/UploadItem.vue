<template>
  <div>
    {{ data.filename }} - {{ data.percent }}
    <el-button type="info" @click="onCancel">取消</el-button>
    <el-button type="success" @click="onCallAgain">重新</el-button>
  </div>
</template>

<script setup lang="ts">
import type { RequestItem } from "./utils"

import { defineProps, withDefaults } from "vue"

interface Props {
  data: RequestItem
}

const props = withDefaults(defineProps<Props>(), {})

const onCancel = () => {
  console.log(123)
  props.data.cancel && props.data.cancel()
}

const onCallAgain = () => {
  props.data.callAgain && props.data.callAgain()
}
</script>

<style scoped></style>

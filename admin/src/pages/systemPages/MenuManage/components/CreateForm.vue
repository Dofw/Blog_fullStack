<template>
  <div>
    <div @click="openDialog">
      <slot :type2name="type2name"></slot>
    </div>
    <el-dialog :title="type2name" v-model="dialogVisible" :before-close="dialogBeforeClose">
      <el-form :model="form">
        <el-form-item label="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
//vite.config.js 添加配置。 withDefaults - Api见官网
const { type } = defineProps<{
  type: string
}>()

const type2name = computed(() => {
  return type === 'add' ? ' 创建菜单' : "更新菜单"
})

const dialogVisible = ref(false)
const form = reactive({
  name: '',
})

const dialogBeforeClose = () => {
}
const openDialog = () => {
  console.log('切换')
  dialogVisible.value = !dialogVisible.value
}


</script>

<style scoped>
</style>
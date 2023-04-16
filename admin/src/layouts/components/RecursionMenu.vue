<template>
  <template v-for="item in data" :key="String(item)">
    <!-- 将按钮归分组 -->
    <el-menu-item-group v-if="item.group">
      <template #title>{{ item.group }}</template>
      <RecursionMenu v-if="item.children" :data="item.children" />
    </el-menu-item-group>

    <!-- 按钮存在children -->
    <el-sub-menu v-if="!item.group && item.children" :index="item.path || ''">
      <template #title>
        <el-icon>
          <message />
        </el-icon>
        <router-link custom :to="item.path || ''" v-slot="{ navigate }">
          <span @click="navigate">
            {{ item.title }}
          </span>
        </router-link>
      </template>
      <RecursionMenu v-if="item.children" :data="item.children" />
    </el-sub-menu>

    <!-- 按钮下，不存在children -->
    <el-menu-item v-if="!item.group && !item.children" :index="item.path || ''">
      <template #title>
        <el-icon>
          <message />
        </el-icon>
        <router-link custom :to="item.path || ''" v-slot="{ navigate }">
          <span @click="navigate">
            {{ item.title }}
          </span>
        </router-link>
      </template>
    </el-menu-item>
  </template>
</template>

<script lang="ts">
export default {
  name: "RecursionMenu"
}
</script>

<script lang="ts" setup>
import { computed } from "vue"
import { useRoute } from "vue-router"
import { Message } from "@element-plus/icons-vue"
import type { ResultType } from "../utils"

defineProps<{
  data: ResultType[]
}>()

const curRoute = useRoute()

const curRoutePath = computed(() => {
  return curRoute.path
})
</script>

<style scoped lang="scss"></style>

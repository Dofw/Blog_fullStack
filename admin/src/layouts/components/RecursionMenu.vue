<template>
  <template v-for="item in data" :key="String(item)">
    <!-- 将按钮归分组 -->
    <el-menu-item-group class="recursion-menu" v-if="item.group">
      <template #title>{{ item.group }}</template>
      <RecursionMenu v-if="item.children" :data="item.children" />
    </el-menu-item-group>

    <!-- 按钮存在children -->
    <!-- noArrow: !item.children || item.children.length === 0 -->
    <el-sub-menu
      :class="{
        menu_active: curRoutePath.indexOf(item.path || '') > -1 && curRoutePath !== item.path,
        menu_exact: curRoutePath === item.path
      }"
      v-if="!item.group && item.children"
      :index="item.path || ''"
    >
      <template #title>
        <el-icon>
          <message />
        </el-icon>
        <router-link custom :to="item.path || ''" v-slot="{ navigate }">
          <span class="menu_text" @click="navigate">
            {{ item.title }}
          </span>
        </router-link>
      </template>
      <RecursionMenu v-if="item.children" :data="item.children" />
    </el-sub-menu>

    <!-- 按钮下，不存在children -->
    <el-menu-item
      :class="{
        menu_item_active: curRoutePath.indexOf(item.path || '') > -1 && curRoutePath !== item.path,
        menu_item_exact: curRoutePath === item.path
      }"
      v-if="!item.group && !item.children"
      :index="item.path || ''"
    >
      <template #title>
        <el-icon>
          <message />
        </el-icon>
        <router-link custom :to="item.path || ''" v-slot="{ navigate }">
          <span class="menu_text" @click="navigate">
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

<style scoped lang="scss">
.recursion-menu {
  :deep() > ul {
    .el-sub-menu__title {
      i {
        margin-left: 20px;
      }
    }
  }
}

.menu_exact :deep() {
  @include el-sub-menu__title;
}

.menu_active :deep() {
  @include el-sub-menu__title;
}

// .menu_item_exact.el-menu-item
.menu_item_exact {
  @include el-menu-item;
}

// .menu_item_active.el-menu-item
.menu_item_active {
  @include el-menu-item;
}
</style>

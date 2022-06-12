<template>
  <template v-for="(item, index) in data" :key="String(item)">
    <!-- 将按钮归分组 -->
    <el-menu-item-group class="recursion-menu" v-if="item.group">
      <template #title>{{ item.group }}</template>
      <RecursionMenuChild v-if="item.children" :data="item.children" />
    </el-menu-item-group>

    <!-- 按钮 -->
    <el-sub-menu :class="{
      menu_active: curRoutePath === item.path,
      noArrow: !item.children || item.children.length === 0
    }" v-if="!item.group" :index="item.path">
      <template #title>
        <el-icon>
          <message />
        </el-icon>
        <router-link custom :to="item.path" v-slot="{ navigate, isExactActive }">
          <span class="menu_text" @click="navigate">
            {{ item.title }}
          </span>
        </router-link>
      </template>
      <RecursionMenuChild v-if="item.children" :data="item.children" />
    </el-sub-menu>
  </template>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import RecursionMenuChild from './RecursionMenu.vue'
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
const props = defineProps<{
  data: ResultType[]
}>()

//123
type ResultType = {
  tier: number,
  group?: string,
  path?: string;
  title?: string;
  children?: ResultType[];
}


const curRoute = useRoute()

const curRoutePath = computed(() => {
  console.log('路由变化，跟着变化')
  return curRoute.path
})

</script>

<style scoped lang="scss">
.recursion-menu {
  :deep()>ul {
    .el-sub-menu__title {
      i {
        margin-left: 20px;
      }
    }
  }
}

// active时的样式。
.noArrow :deep() {
  .el-sub-menu__icon-arrow {
    display: none !important;
  }
}

.menu_active :deep() {
  >.el-sub-menu__title {

    >.el-icon {
      @include theme-hoverFc(vt-c-hover-fc);
    }

    background-color: transparent !important;
    @include theme-hoverBg($start: vt-c-hover-bg-start, $end: vt-c-hover-bg-end);
    @include theme-hoverFc(vt-c-hover-fc);

    .menu_text {
      //字体
      @include theme-hoverFc(vt-c-hover-fc);
    }
  }
}
</style>
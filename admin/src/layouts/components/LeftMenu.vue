<template>
  <div class="asideContent">
    <div class="title" @click="onClick"></div>
    <el-scrollbar>
      <el-menu :default-openeds="curRoutePath" :collapse="isCollapse">
        <RecursionMenu :data="data" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed, withDefaults } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { triggerTheme } from "@/utils";
import RecursionMenu from './RecursionMenu.vue';
import { routers2MenuList, addTier } from '../utils/index'

interface Props {
  isCollapse: boolean
}
withDefaults(defineProps<Props>(), {
  isCollapse: true
})

const routes = useRouter().options.routes;
const result = routers2MenuList(routes)
const data = addTier(result, null)
console.log(data)

const curRoute = useRoute()

const curRoutePath = computed(() => {
  return curRoute.matched.map((item) => {
    return item.path
  })
})

//切换theme
function onClick() {
  triggerTheme();
}
</script>

<style scoped lang="scss">
// 主题切换
.asideContent {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  @include theme-bg(vt-c-bg);

  .title {
    width: 100%;
    height: 60px;
    border: 1px solid green;
  }

  //ui库
  :deep(.el-scrollbar) {
    @include theme-bg(vt-c-bg);

    .el-menu:not(.el-menu--collapse) {
      width: 200px;
    }

    .el-menu {
      border: none;
      @include theme-bg(vt-c-bg);
    }

    .el-sub-menu__title,
    .el-menu-item-group {
      @include theme-fc(vt-c-text-1);
    }

    .el-sub-menu__title {
      &:hover {
        background-color: transparent !important;
        @include theme-hoverFc(vt-c-hover-fc);
        // @include theme-hoverBg($start: vt-c-hover-bg-start, $end: vt-c-hover-bg-end);

      }
    }

    .el-menu-item-group__title {
      @include theme-fc(vt-c-brand);
      opacity: 0.7;
    }

  }
}
</style>

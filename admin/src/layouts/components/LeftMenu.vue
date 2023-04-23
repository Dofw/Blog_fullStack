<template>
  <div class="asideContent">
    <div class="title" :class="{ collapse: globalStore.isCollapse }" @click="onClick">
      <div></div>
      <transition name="fade">
        <span v-if="!globalStore.isCollapse">FullStack_Blog</span>
      </transition>
    </div>

    <el-scrollbar>
      <el-menu :default-openeds="curRoutePath" :collapse="globalStore.isCollapse">
        <RecursionMenu :data="data" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue"
import { useRouter, useRoute } from "vue-router"
import { triggerTheme } from "@/utils"
import RecursionMenu from "./RecursionMenu.vue"
import { routers2MenuList, addTier } from "../utils/index"
import useGlobalStore from "@/stores/useGlobalStore"

const globalStore = useGlobalStore()

const routes = useRouter().options.routes
const result = routers2MenuList(routes)
const data = addTier(result, null)
// console.log(data)

const curRoute = useRoute()

const curRoutePath = computed(() => {
  return curRoute.matched.map((item) => {
    return item.path
  })
})

//切换theme
function onClick() {
  triggerTheme()
}
</script>

<style scoped lang="scss">
// 主题切换
.asideContent {
  height: 100vh;
  overflow: hidden;

  $common-width: 200px;
  $common-collapse-width: 65px;

  $titleHeight: 60px;
  $logoWidth: 50px;
  .title {
    width: $common-width;
    height: $titleHeight;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    transition: width 1s;
    &.collapse {
      width: $common-collapse-width;
    }

    > div {
      width: $logoWidth;
      height: $logoWidth;
      border-radius: 50%;
      animation: logAnimation 3s ease infinite alternate;

      margin: 0 7px;

      background-image: url("@/assets/vue_logo.jpg");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .menu-container {
    padding: 10px 0;
  }
  :deep() {
    .el-scrollbar {
      padding: 10px 0;
    }

    .el-menu {
      border: none;
      width: $common-width;

      .el-menu-item-group__title {
        color: var(--el-color-primary-light-3);
      }

      &.el-menu--collapse {
        width: $common-collapse-width;
      }
    }
  }

  // transition 动画。
  .fade-enter-active,
  .fade-leave-active {
    transition: all 1s;
  }

  .fade-enter-to,
  .fade-leave-from {
    opacity: 1;
  }

  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    width: 0;
  }

  // menu的动画
  .v-leave-to {
    width: 50px;
  }

  @keyframes logAnimation {
    0% {
      scale: 1;
    }

    100% {
      scale: 1.1;
    }
  }
}
</style>

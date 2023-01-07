<template>
  <div class="asideContent">
    <div class="title" @click="onClick">
      <div></div>
      <transition>
        <span v-if="!globalStore.isCollapse">FullStack_Blog</span>
      </transition>
    </div>

    <el-scrollbar class="menu-container">
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
  width: 100%;
  height: 100vh;

  overflow: hidden;
  @include theme-bg(vt-c-bg);

  .title {
    width: 100%;
    height: 60px;

    display: flex;
    justify-content: flex-start;
    align-items: center;

    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);

    > div {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: $border;
      animation: logAnimation 3s ease infinite alternate;

      margin: 0 7px;

      background-image: url("@/assets/vue_logo.jpg");
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  }

  .menu-container {
    padding: 10px 0;
  }
  //ui库
  :deep(.el-scrollbar) {
    @include theme-bg(vt-c-bg);

    .el-menu:not(.el-menu--collapse) {
      width: 200px;
    }

    @include elMenu;
  }

  @keyframes logAnimation {
    0% {
      scale: 1;
    }

    100% {
      scale: 1.1;
    }
  }

  .v-enter-active,
  .v-leave-active {
    transition: all 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    width: 0;
    opacity: 0;
  }

  .v-enter-to,
  .v-leave-from {
    width: 50px;
    opacity: 1;
  }
}
</style>

<template>
  <template v-for="(item, index) in data" :key="String(item)">
    <!-- 将按钮归分组 -->
    <el-menu-item-group class="recursion-menu" v-if="item.group">
      <template #title>{{ item.group }}</template>
      <RecursionMenuChild v-if="item.children" :data="item.children" />
    </el-menu-item-group>

    <!-- 按钮 -->
    <el-sub-menu :class="{
      menu_active: curRoutePath.indexOf(item.path || '') > -1 && curRoutePath !== item.path,
      menu_exact: curRoutePath === item.path,
      noArrow: !item.children || item.children.length === 0
    }" v-if="!item.group" :index="item.path || ''">
      <template #title>
        <el-icon>
          <message />
        </el-icon>
        <router-link custom :to="item.path || ''" v-slot="{ navigate, isExactActive }">
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
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import RecursionMenuChild from './RecursionMenu.vue'
import { Message } from "@element-plus/icons-vue";
import type { ResultType } from '../utils'

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

.menu_exact :deep() {
  >.el-sub-menu__title {
    >span {
      position: relative;

      &::before {
        content: '';
        display: block;
        width: 5px;
        height: 100%;
        position: absolute;
        top: 0;
        left: -49px;
        border-left: 10px solid;
        border-radius: 5px 0 0 5px;
        @include theme-borderColor(vt-c-borderColor-light);
      }
    }

    >.el-icon {
      @include theme-hoverFc(vt-c-hover-fc);
    }

    .menu_text {
      //字体
      @include theme-hoverFc(vt-c-hover-fc);
    }
  }
}

.menu_active :deep() {
  >.el-sub-menu__title {
    >span {
      position: relative;

      &::before {
        content: '';
        display: block;
        width: 5px;
        height: 100%;
        position: absolute;
        top: 0;
        left: -49px;
        border-left: 10px solid;
        border-radius: 5px 0 0 5px;
        @include theme-borderColor(vt-c-borderColor-light);
      }
    }

    >.el-icon {
      @include theme-hoverFc(vt-c-hover-fc);
    }

    .menu_text {
      //字体
      @include theme-hoverFc(vt-c-hover-fc);
    }
  }
}
</style>
<template>
  <div class="asideContent">
    <div class="title" @click="onClick"></div>
    <el-scrollbar>
      <el-menu :default-openeds="['1']">
        <el-sub-menu index="1">
          <template #title>
            <el-icon>
              <message />
            </el-icon>Navigator One
          </template>
          <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="1-1">Option 1</el-menu-item>
            <el-menu-item index="1-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="1-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="1-4">
            <template #title>Option4</template>
            <el-menu-item index="1-4-1">Option 4-1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="2">
          <template #title>
            <el-icon>
              <icon-menu />
            </el-icon>Navigator Two
          </template>
          <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="2-1">Option 1</el-menu-item>
            <el-menu-item index="2-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="2-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="2-4">
            <template #title>Option 4</template>
            <el-menu-item index="2-4-1">Option 4-1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon>
              <setting />
            </el-icon>Navigator Three
          </template>
          <el-menu-item-group>
            <template #title>Group 1</template>
            <el-menu-item index="3-1">Option 1</el-menu-item>
            <el-menu-item index="3-2">Option 2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group 2">
            <el-menu-item index="3-3">Option 3</el-menu-item>
          </el-menu-item-group>
          <el-sub-menu index="3-4">
            <template #title>Option 4</template>
            <el-menu-item index="3-4-1">Option 4-1</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { useRouter, useRoute } from "vue-router";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { triggerTheme } from "@/utils";

type Record<K extends keyof any, T> = {
  [P in K]: T;
};

type MenuGroupRaw = {
  group: string,
  children: MenuItemRaw[]
}

type MenuNoGroupRaw = {
  path: string;
  title: string;
  children: MenuItemRaw[];
};
type MenuItemRaw = (MenuNoGroupRaw | MenuGroupRaw)
type MenuListRaw = MenuItemRaw[]

const routes = useRouter().options.routes;

console.log(routes);
console.log(routers2MenuList(routes));

function routers2MenuList(routes: RouteRecordRaw[]): MenuListRaw {
  if (routes.length === 0) return []

  const arr: MenuItemRaw[] = [];
  const mapGroup = new Map()
  for (let i = 0; i < routes.length; i++) {
    if (!routes[i].meta) {
      // 没有meta，也就没有收集的必要
      continue
    }

    const metaItem: RouteMeta = routes[i].meta as RouteMeta
    if (!isExist(metaItem, 'title')) {
      // 父级没有title，子路由就没有必要继续了
      continue
    }

    // 完成一项 重构属性
    const item: Record<string | number | symbol, string | MenuItemRaw[]> = {}
    item.path = routes[i].path as string
    item.title = metaItem.title as string
    if (routes[i].children) {
      const result = routers2MenuList(routes[i].children as RouteRecordRaw[])
      item.children = result
    }

    //先分组
    if (isExist(metaItem, 'group')) {
      const Group = mapGroup.get(metaItem.group as string)
      if (Group) {
        Group.push(item)
      } else {
        mapGroup.set(metaItem.group, [item])
        //一个Group只执行一次
        arr.push({
          group: metaItem.group as string,
          children: mapGroup.get(metaItem.group)
        })
      }
    } else {
      arr.push(item as MenuNoGroupRaw)
    }
  }
  return arr;
}


function isExist(route: RouteMeta, key: string): boolean {
  const keys: string[] = Object.keys(route)
  return keys.includes(key)
}


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
    height: 100px;
    border: 1px solid green;
  }

  //ui库
  :deep(.el-scrollbar) {
    @include theme-bg(vt-c-bg);

    .el-menu {
      @include theme-bg(vt-c-bg);
    }

    .el-sub-menu__title,
    .el-menu-item-group,
    .el-menu-item {
      @include theme-fc(vt-c-text-1);
    }

    .el-sub-menu__title,
    .el-menu-item {
      &:hover {
        background-color: transparent !important;
        @include theme-hoverBg($start: vt-c-hover-bg-start, $end: vt-c-hover-bg-end);
        @include theme-hoverFc(vt-c-hover-fc);
      }
    }

    .el-menu-item-group__title {
      @include theme-fc(vt-c-brand);
      opacity: 0.7;
    }

    .el-menu {
      border: none;
    }
  }
}
</style>

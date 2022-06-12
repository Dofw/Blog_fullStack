<template>
  <div class="asideContent">
    <div class="title" @click="onClick"></div>
    <el-scrollbar>
      <el-menu :default-openeds="['/home/1', '/home']">
        <RecursionMenu :data="data" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts" setup>
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { useRouter, useRoute } from "vue-router";
import { Menu as IconMenu, Message, Setting } from "@element-plus/icons-vue";
import { triggerTheme } from "@/utils";
import RecursionMenu from './RecursionMenu.vue'

type MenuItemRaw = {
  group?: string,
  path?: string, //group中不需要，保持统一
  title?: string,//group中不需要，保持统一
  children?: MenuItemRaw[]
}
type ResultType = {
  tier: number,
  group?: string,
  path?: string,
  title?: string,
  children?: ResultType[],
}
type MenuListRaw = MenuItemRaw[]

const routes = useRouter().options.routes;
const result = routers2MenuList(routes)
const data = addTier(result, null)
console.log(data)

/**
 * 处理routes为特定数据结构
 * @param routes 
 */
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
    const item: MenuItemRaw = {}
    item.path = routes[i].path as string
    item.title = metaItem.title as string

    //这里放前面，是因为后面group条件中结构了。
    //结构后，给item.children重新赋值已经不是同一个引用了。
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
      arr.push(item)
    }

  }
  return arr;
}

/**
 * 添加层级
 */
function addTier(resource: MenuListRaw, tier: number | null): ResultType[] {
  if (!resource || resource.length === 0) {
    return []
  }
  const arr: ResultType[] = []
  let insideTier = tier || 0

  for (let i = 0; i < resource.length; i++) {
    const element = resource[i];
    if (!element.children) {
      arr.push({ ...element, tier: insideTier } as ResultType)
    } else {
      const newChildren = addTier(element.children, insideTier + 1)
      arr.push({ ...element, tier: insideTier, children: newChildren })
    }
  }

  return arr
}

/**
 * 判断RouteMeta中是否包含指定属性
 */
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

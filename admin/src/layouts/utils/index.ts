import type { RouteMeta, RouteRecordRaw } from "vue-router"

type MenuItemRaw = {
  group?: string
  path?: string //group中不需要，保持统一
  title?: string //group中不需要，保持统一
  children?: MenuItemRaw[]
}
export type ResultType = {
  tier: number
  group?: string
  path?: string
  title?: string
  children?: ResultType[]
}
type MenuListRaw = MenuItemRaw[]

/**
 * 处理routes为特定数据结构
 * @param routes
 */
export function routers2MenuList(routes: RouteRecordRaw[]): MenuListRaw {
  if (routes.length === 0) return []

  const arr: MenuItemRaw[] = []
  const mapGroup = new Map()
  for (let i = 0; i < routes.length; i++) {
    if (!routes[i].meta) {
      // 没有meta，没有收集的必要
      continue
    }

    const metaItem: RouteMeta = routes[i].meta as RouteMeta
    if (!isExist(metaItem, "title")) {
      // 没有title，子路由就没有必要继续了
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
    if (isExist(metaItem, "group")) {
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
  return arr
}

/**
 * 添加层级
 */
export function addTier(resource: MenuListRaw, tier: number | null): ResultType[] {
  if (!resource || resource.length === 0) {
    return []
  }
  const arr: ResultType[] = []
  const insideTier = tier || 0

  for (let i = 0; i < resource.length; i++) {
    const element = resource[i]
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

import type { RouteRecordRaw } from "vue-router"
import HomeLayout from "@/layouts/HomeLayout.vue"

const systemPages: RouteRecordRaw = {
  path: "/system",
  name: "system",
  component: HomeLayout,
  redirect: "/system/menu",
  meta: {
    title: "系统管理"
  },
  children: [
    {
      path: "/system/menu",
      name: "menu-manage",
      component: () => import("@/pages/systemPages/MenuManage/index.vue"),
      meta: {
        title: "菜单管理"
      }
    },
    {
      path: "/system/menu/id",
      name: "menu-manage-id",
      component: () => import("@/pages/systemPages/MenuManage/index.vue"),
      meta: {
        title: "动态路由"
      }
    }
  ]
}

export default systemPages

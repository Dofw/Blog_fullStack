import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import HomeLayout from "@/layouts/HomeLayout.vue"
import HomeOne from "@/pages/HomeOne.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home"
  },
  {
    path: "/home",
    component: HomeLayout,
    redirect: "/home/one",
    meta: {
      title: "首页"
    },
    children: [
      {
        path: "/home/one",
        component: HomeOne,
        meta: {
          title: "首页one"
        }
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

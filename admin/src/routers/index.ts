import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import HomeLayout from "@/layouts/HomeLayout.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home"
  },

  {
    path: "/home",
    component: HomeLayout
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

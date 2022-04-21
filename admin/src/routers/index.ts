import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: {}
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

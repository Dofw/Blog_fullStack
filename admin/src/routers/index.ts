import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import examplePage from "./modules/examplePage"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/example"
  },
  examplePage
]

export default createRouter({
  history: createWebHistory(),
  routes
})

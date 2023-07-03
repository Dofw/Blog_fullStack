import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import examplePage from "./modules/examplePage"
import Login from "@/pages/Login/index.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login,
    meta: {
      hidden: true
    }
  },
  examplePage
]

export default createRouter({
  history: createWebHistory(),
  routes
})

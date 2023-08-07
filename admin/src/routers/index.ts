import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import examplePage from "./modules/examplePage"
import animationPage from "./modules/animationPage"
import Login from "@/pages/Login/index.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/animation"
  },
  {
    path: "/login",
    component: Login,
    meta: {
      hidden: true
    }
  },
  examplePage,
  animationPage
]

export default createRouter({
  history: createWebHistory(),
  routes
})

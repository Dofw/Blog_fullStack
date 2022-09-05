import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import examplePage from "./modules/examplePage"
import HomeLayout from "@/layouts/HomeLayout.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/example"
  },
  examplePage,
  {
    path: "/test",
    component: HomeLayout,
    meta: {
      title: "Test"
    }
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

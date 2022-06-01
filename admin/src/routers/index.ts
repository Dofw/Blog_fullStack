import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import dataEditorPages from "./modules/dataEditorPages"
import testPages from "./modules/testPages"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home"
  },
  dataEditorPages,
  testPages
]

export default createRouter({
  history: createWebHistory(),
  routes
})

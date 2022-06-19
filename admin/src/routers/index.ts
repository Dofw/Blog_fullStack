import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import dataEditorPages from "./modules/dataEditorPages"
import systemPages from "./modules/systemPages"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/system"
  },
  systemPages
  // dataEditorPages
]

export default createRouter({
  history: createWebHistory(),
  routes
})

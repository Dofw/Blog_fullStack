import type { RouteRecordRaw } from "vue-router"
import HomeLayout from "@/layouts/HomeLayout.vue"

const dataEditorPage: RouteRecordRaw = {
  path: "/dataeditor",
  component: HomeLayout,
  redirect: "/dataeditor/1",
  meta: {
    title: "数据编辑"
  },
  children: []
}

export default dataEditorPage

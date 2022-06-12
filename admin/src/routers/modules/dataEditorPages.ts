import type { RouteRecordRaw } from "vue-router"
import HomeLayout from "@/layouts/HomeLayout.vue"
import HomeOne from "@/pages/HomeOne.vue"

const dataEditorPage: RouteRecordRaw = {
  path: "/dataeditor",
  component: HomeLayout,
  redirect: "/dataeditor/1",
  meta: {
    title: "数据编辑"
  },
  children: [
    {
      path: "/dataeditor/1",
      component: HomeOne,
      meta: {
        title: "编辑测试1",
        group: "editor"
      }
    },
    {
      path: "/dataeditor/2",
      component: HomeOne,
      meta: {
        title: "编辑测试2",
        group: "editor"
      }
    }
  ]
}

export default dataEditorPage

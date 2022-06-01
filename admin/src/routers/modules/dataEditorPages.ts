import type { RouteRecordRaw } from "vue-router"
import HomeLayout from "@/layouts/HomeLayout.vue"
import HomeOne from "@/pages/HomeOne.vue"

const dataEditorPage: RouteRecordRaw = {
  path: "/home",
  component: HomeLayout,
  redirect: "/home/1",
  meta: {
    title: "首页"
  },
  children: [
    {
      path: "/home/1",
      component: HomeOne,
      meta: {
        title: "首页1",
        group: "xxx"
      }
    },
    {
      path: "/home/2",
      component: HomeOne,
      meta: {
        title: "首页2",
        group: "xxx"
      }
    },
    {
      path: "/home/3",
      component: HomeOne,
      meta: {
        title: "首页3"
      }
    },
    {
      path: "/home/4",
      component: HomeOne,
      meta: {
        title: "首页4"
      },
      children: [
        {
          path: "/home/4-1",
          component: HomeOne,
          meta: {
            title: "首页4-1"
          }
        }
      ]
    }
  ]
}

export default dataEditorPage

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
      },
      children: [
        {
          path: "/home/1/1",
          component: HomeOne,
          meta: {
            title: "首页1/1",
            group: "xxxx"
          }
        },
        {
          path: "/home/1/2",
          component: HomeOne,
          meta: {
            title: "首页1/2",
            group: "xxxx"
          }
        },
        {
          path: "/home/1/3",
          component: HomeOne,
          meta: {
            title: "首页1/3"
          }
        }
      ]
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
      path: "/home/4",
      component: HomeOne,
      meta: {
        title: "首页4",
        group: "YYYY"
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

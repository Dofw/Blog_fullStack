import { createRouter, createWebHistory } from "vue-router"
import type { RouteRecordRaw } from "vue-router"
import HomeLayout from "@/layouts/HomeLayout.vue"
import HomeOne from "@/pages/HomeOne.vue"

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: "/home"
  },
  {
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
          title: "首页2"
        }
      },
      {
        path: "/home/3",
        component: HomeOne,
        meta: {
          title: "首页3",
          group: "xxx"
        }
      },
      {
        path: "/home/4",
        component: HomeOne,
        meta: {
          title: "首页4",
          group: "yyy"
        }
      },
      {
        path: "/home/5",
        component: HomeOne,
        meta: {
          title: "首页5",
          group: "yyy"
        }
      }
    ]
  },
  {
    path: "/home1",
    component: HomeLayout,
    redirect: "/home1/1",
    meta: {
      title: "其它页"
    },
    children: [
      {
        path: "/home1/1",
        component: HomeOne,
        meta: {
          title: "其它页1"
        }
      }
    ]
  }
]

export default createRouter({
  history: createWebHistory(),
  routes
})

import type { RouteRecordRaw } from "vue-router"
import HomeLayout from "@/layouts/HomeLayout.vue"
import HomeOne from "@/pages/HomeOne.vue"

const testPages: RouteRecordRaw = {
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

export default testPages

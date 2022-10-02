import type { RouteRecordRaw } from "vue-router"
import HomeLayout from "@/layouts/HomeLayout.vue"

const modules = import.meta.globEager("/src/pages/examplePage/Vue/*.vue")
const VueRoutes = importMetaGlobEager(modules)
console.log(modules, VueRoutes)

const examplePage: RouteRecordRaw = {
  path: "/example",
  component: HomeLayout,
  meta: {
    title: "Examples"
  },
  children: [
    // Vue
    ...VueRoutes,
    // React
    {
      path: "/example/React/1",
      component: () => import("@/pages/examplePage/Vue/demo1.vue"),
      meta: {
        group: "React",
        title: "react-demo1"
      }
    }
  ]
}

// tool
function importMetaGlobEager(modules: any) {
  const Comps = []
  for (const key in modules) {
    const paths = key.split("/")
    const fileType = paths[paths.length - 2] // 分类Vue、React
    let endName = paths[paths.length - 1] // xxx.vue
    endName = endName.substring(0, endName.length - 4)
    // route 格式
    Comps.push({
      path: `/example/vue/${endName}`,
      component: modules[key].default,
      meta: {
        group: fileType,
        title: modules[key].default.name
      }
      // childre: null
    })
  }

  return Comps
}

export default examplePage

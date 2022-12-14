import type { RouteRecordRaw } from "vue-router"
import HomeLayout from "@/layouts/HomeLayout.vue"

const modules = import.meta.globEager("/src/pages/examplePage/Vue/**/*.vue")
const VueRoutes = parseModules(modules)
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
function parseModules(modules: any) {
  const Comps = []
  for (const key in modules) {
    const paths = key.split("/")
    const fileType = paths[paths.length - 3] // xxx/Demo1/index.vue
    const endName = paths[paths.length - 2] // xxx/index.vue

    // route 格式
    Comps.push({
      path: `/example/vue/${endName}`,
      component: modules[key].default,
      meta: {
        group: fileType,
        title: modules[key].default.name // 组件名称
      }
      // childre: null
    })
  }

  return Comps
}

export default examplePage

import type { RouteRecordRaw } from "vue-router"
import ExampleLayout from "@/layouts/ExampleLayout.vue"

const modules = import.meta.globEager("/src/pages/examplePage/**/*.vue")
const VueRoutes = parseModules(modules)
console.log(modules, VueRoutes)

const examplePage: RouteRecordRaw = {
  path: "/example",
  redirect: "/example/Dofw/Demo1",
  component: ExampleLayout,
  meta: {
    title: "Examples"
  },
  children: [
    // Vue
    ...VueRoutes
  ]
}

// tool
function parseModules(modules: any) {
  const Comps = []
  for (const key in modules) {
    const paths = key.split("/")

    // 过滤掉examplePage/*.vue, examplePage/*/*.vue
    if (paths.length === 5 || paths.length === 6) continue

    // componnets 下的vue过滤掉
    if (paths.includes("componnets")) continue

    const fileType = paths[paths.length - 3] // xxx/Demo1/index.vue
    const endName = paths[paths.length - 2] // xxx/index.vue

    // route 格式
    Comps.push({
      path: `/example/${fileType}/${endName}`,
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

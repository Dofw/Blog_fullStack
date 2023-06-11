import type { RouteRecordRaw } from "vue-router"
import ExampleLayout from "@/layouts/ExampleLayout.vue"

const modules = import.meta.globEager("/src/pages/examplePage/**/*.vue")
// const modules = import.meta.glob("/src/pages/examplePage/**/*.vue")
// console.log(modules)
const VueRoutes = parseModules(modules)

const examplePage: RouteRecordRaw = {
  path: "/example",
  redirect: "/example/Dofw/01BaseForm",
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
    if (paths.includes("components")) continue

    const fileType = paths[paths.length - 3] // xxx/Demo1/index.vue
    const endName = paths[paths.length - 2] // xxx/index.vue

    // route 格式
    Comps.push({
      path: `/example/${fileType}/${endName}`,
      component: modules[key].default,
      // component: modules[key], // 懒加载
      meta: {
        group: fileType,
        title: modules[key].default?.name || "demo" // 组件名称
      }
      // childre: null
    })
  }

  return Comps
}

export default examplePage

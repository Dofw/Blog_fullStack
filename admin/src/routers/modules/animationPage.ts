import type { RouteRecordRaw } from "vue-router"
import AnimationLayout from "@/layouts/AnimationLayout.vue"

const modules = import.meta.globEager("/src/pages/animationPage/**/*.vue")
const VueRoutes = parseModules(modules)

const animationPage: RouteRecordRaw = {
  path: "/animation",
  redirect: "/animation/DingDing",
  component: AnimationLayout,
  meta: {
    title: "Animation"
  },
  children: [
    // Vue
    ...VueRoutes
  ]
}

// tool
function parseModules(modules: any) {
  const Comps: any[] = []
  for (const key in modules) {
    const paths = key.split("/")

    // 只要 pages/animationPage/xxx/index.vue
    if (paths.length !== 6) continue

    const fileType = paths[paths.length - 2]
    // route 格式
    Comps.push({
      path: `/animation/${fileType}`,
      component: modules[key].default,
      meta: {
        title: modules[key].default?.name || "demo" // 组件名称
      }
      // childre: null
    })
  }

  return Comps
}

export default animationPage

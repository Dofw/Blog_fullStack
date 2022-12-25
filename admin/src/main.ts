import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "@/routers"
import App from "./App.vue"
import "@/assets/scss/reset.scss"
import "element-plus/dist/index.css"

import VMdEditor from "@kangc/v-md-editor"
import "@kangc/v-md-editor/lib/style/base-editor.css"
// import githubTheme from "@kangc/v-md-editor/lib/theme/github.js"
// import "@kangc/v-md-editor/lib/theme/style/github.css"
// import hljs from "highlight.js"

import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js"
import "@kangc/v-md-editor/lib/theme/style/vuepress.css"
import Prism from "prismjs"

// 指令
import myLoading from "@dofw/Demo4/components/directive"

VMdEditor.use(vuepressTheme, {
  Hljs: Prism
})

createApp(App).use(router).use(createPinia()).use(VMdEditor).directive("myloading", myLoading).mount("#app")

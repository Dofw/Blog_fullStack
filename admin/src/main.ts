import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "@/routers"
import App from "./App.vue"
import "@/assets/scss/reset.scss"

// 指令
import myLoading from "@dofw/04VDirective/components/directive"

// tool-libs
import { VMdEditor } from "@/toolLibs"

createApp(App)
  .use(router)
  .use(createPinia())
  .use(VMdEditor)
  .directive("myLoading", myLoading)
  .mount("#app")

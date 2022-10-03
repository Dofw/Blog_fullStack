import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "@/routers"
import App from "./App.vue"
import "@/assets/scss/reset.scss"
import "element-plus/dist/index.css"

createApp(App).use(router).use(createPinia()).mount("#app")

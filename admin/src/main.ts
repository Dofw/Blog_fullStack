import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import "@/assets/scss/reset.scss"

document.getElementsByTagName("html")[0].setAttribute("class", "data-theme-dark")

createApp(App).use(createPinia()).mount("#app")

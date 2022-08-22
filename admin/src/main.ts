import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "@/routers"
import App from "./App.vue"
import "@/assets/scss/reset.scss"
import "element-plus/dist/index.css"
import Io from "@/utils/io"

const io = new Io({
  baseURL: "http://baidu.com"
})

io.addReqInterceptor([
 (config:any) => {
  // config.url = 'taobao.com'
  console.log(config, '拦截器1')
  return config
 },
 (config:any) => {
  // config.url = 'jd.com'
  console.log(config, '拦截器2')
  return config
 }
])

io.addResInterceptor([
  (res:any) => {
   console.log(res, '响应1')
   return res
  },
  (res:any) => {
   console.log(res, '响应2')
   return res
  }
 ])

const request = io.instance

request({
  url: '/admin'
})


createApp(App).use(router).use(createPinia()).mount("#app")

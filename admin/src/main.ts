import { createApp } from "vue"
import { createPinia } from "pinia"
import router from "@/routers"
import App from "./App.vue"
import "@/assets/scss/reset.scss"
import "element-plus/dist/index.css"
import Io from "@/utils/io"




const io = new Io({
  baseURL: "/"
},{
  _isCancle: false
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

io.addResInterceptor((res:any) => {
    console.log(res, '响应1')
    return res
  },(erorr) => {
    console.console.log(111, erorr);
})

const request = io.instance

request({
  url: '/admin/0',
  _isCancle: true
})

request({
  url: '/admin/1',
  _isCancle: true
})

request({
  url: '/admin/2',
  _isCancle: true
}).then(() => {
  io.removeAllCancle()
})



createApp(App).use(router).use(createPinia()).mount("#app")

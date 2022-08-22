import axios from "axios"

/**
 * 1. 前后台约定，返回格式
 */
let res = {
  code: 200, //非外层
  data: [],
  msg: "message",
  success: true
}

/**
 * 2. 状态码含义
 */
let codeNum = {
  200: "成功"
}

/**
 * 3. 设计功能，例如：取消功能，可以由用户控制开启。
 *    拦截器说明，由于拦截器实现机制：请求拦截器的执行循序是后use的先执行；响应拦截器的执行顺序是后use的后执行。需要封装处理一下。
 */
export default class Io {
  constructor(globalBaseConf, globalCustomConf) {
    // 基本配置
    this.instance = axios.create(globalBaseConf)
  }

  // add req Interceptor
  addReqInterceptor(reqInterceptor) {
    const arrReq = this.handlerInterceptorParams(reqInterceptor)
    // install revser arrReq
    arrReq.reverse()
    arrReq.forEach((fn) => {
      this.instance.interceptors.request.use(fn)
    })
  }
  // add res Interceptor
  addResInterceptor(resInterceptor) {
    const arrRes = this.handlerInterceptorParams(resInterceptor)
    arrRes.forEach((fn) => {
      this.instance.interceptors.response.use(fn)
    })
  }

  // tools
  handlerInterceptorParams(params) {
    let arr
    if (typeof arr === "function") {
      arr = [params]
    } else if (Array.isArray(params)) {
      arr = params
    } else {
      throw "parameter type is function or [func, func, ...]"
    }
    return arr
  }
}

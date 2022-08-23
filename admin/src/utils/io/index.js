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
 * 3.1 保存所有url:cancleFunc
 */
const cancelMaps = new Map()

/**
 * 3. 设计功能，例如：取消功能，可以由用户控制开启。
 *    - 拦截器说明，由于拦截器实现机制：请求拦截器的执行循序是后use的先执行；响应拦截器的执行顺序是后use的后执行。需要封装处理一下。
 *    - customConf: 字段命名使用 _ 代表设置配置属性。
 */
export default class Io {
  constructor(baseConf, customConf) {
    // 基本配置
    this.instance = axios.create({ baseConf, ...customConf })

    /**
     * 控制内置功能开启 - interceptor
     * 1. req: 机制导致它优先级最高。
     * 2. res: 机制优先级最低
     */
    this.instance.interceptors.request.use((config) => {
      // 是否开启, 取消请求功能。
      if (config._isCancle) {
        const signal = this.addCancle(config.url)
        config.signal = signal
      }
      return config
    })
    this.instance.interceptors.response.use(
      (response) => {
        // 是否开启, 取消请求功能。
        if (response.config._isCancle) {
          // this.removeCancle(response.config.url)
        }
        return response
      },
      (error) => {
        return error
      }
    )
  }

  // addCancle
  addCancle(url) {
    console.log("开启取消功能!")
    // 取消上一次
    this.removeCancle(url)
    const controller = new AbortController()
    cancelMaps.set(url, () => {
      controller.abort()
    })
    return controller.signal
  }

  // removeCancle
  removeCancle(url) {
    const preCancel = cancelMaps.get(url)
    if (preCancel) {
      preCancel()
      cancelMaps.delete(url)
    }
  }

  // removeAllCancle
  removeAllCancle() {
    for (const [key, preCancel] of cancelMaps) {
      preCancel()
    }
    cancelMaps.clear()
  }

  // add req Interceptor(根据功能分离到不同的interceptor)
  addReqInterceptor(reqInterceptor) {
    const arrReq = this.handlerInterceptorParams(reqInterceptor)
    // install revser arrReq
    arrReq.reverse()
    arrReq.forEach((fn) => {
      this.instance.interceptors.request.use(fn)
    })
  }

  // add res Interceptor(响应一组就可以)
  addResInterceptor(successFunc, errorFunc) {
    if (typeof successFunc !== "function") {
      throw "the first param type is function"
    }
    if (errorFunc && typeof successFunc !== "function") {
      throw "the first param type is function"
    }
    this.instance.interceptors.response.use(successFunc, errorFunc)
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

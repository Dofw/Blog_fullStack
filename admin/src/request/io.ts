import axios from "axios"
import type { AxiosInstance, AxiosRequestConfig } from "axios"
import type { CustomConfig } from "./type"

/**
 * 1. 前后台约定，返回格式
 * {
 *    code: 200, //非外层
 *    data: [],
 *    msg: 'message',
 *    success: true,
 * };
 */

/**
 * 3.1 保存所有url:cancleFunc
 */
const cancelMaps = new Map()

/**
 * 3. 功能设计
 *    - 拦截器说明，由于拦截器实现机制：请求拦截器的执行循序是后use的先执行；响应拦截器的执行顺序是后use的后执行。需要封装处理一下。
 *    - customConf: 字段命名使用 _ 代表设置配置属性。
 *    - 1. 多次请求,只需要最后一次请求结果
 */
export default class Io {
  public instance: AxiosInstance

  constructor(
    baseConf: AxiosRequestConfig = {},
    customConf: CustomConfig = { _isCancel: false, _isToken: true }
  ) {
    // 实例
    this.instance = axios.create({
      ...baseConf,
      ...customConf
    })
    /**
     * 控制内置功能开启 - interceptor
     * 1. req: 机制导致它优先级最高。
     * 2. res: 机制优先级最低
     */
    this.instance.interceptors.request.use((config) => {
      // 是否开启, 取消请求功能。
      this.addCancelFunctional(config)
      return config
    })
    this.instance.interceptors.response.use(
      (response) => {
        // 取消请求功能。
        this.removeCancelFunctional(response.config)
        return response
      },
      (error) => {
        return error
      }
    )
  }

  addCancelFunctional(config) {
    if (config._isCancel) {
      // 取消上一次
      this.removeCancelFunctional(config)
      const controller = new AbortController()
      cancelMaps.set(config.url, () => {
        controller.abort()
      })
      config.signal = controller.signal
    }
    return config
  }

  removeCancelFunctional(config) {
    if (config._isCancel) {
      const preCancel = cancelMaps.get(config.url)
      if (preCancel) {
        preCancel()
        cancelMaps.delete(config.url)
      }
    }
  }

  // cancel&clear cancelMaps
  removeAllCancel() {
    // eslint-disable-next-line no-unused-vars
    for (const [key, preCancel] of cancelMaps) {
      preCancel()
    }
    cancelMaps.clear()
  }

  // add req Interceptor(separate module interceptor)
  addReqInterceptor(reqInterceptor) {
    const arrReq = this.handlerInterceptorParams(reqInterceptor)
    // install revser arrReq
    arrReq.reverse()
    arrReq.forEach((fn) => {
      this.instance.interceptors.request.use(fn)
    })
  }

  // add res Interceptor(only one)
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
    if (typeof params === "function") {
      arr = [params]
    } else if (Array.isArray(params)) {
      arr = params
    } else {
      throw "parameter type is function or [func, func, ...]"
    }
    return arr
  }
}

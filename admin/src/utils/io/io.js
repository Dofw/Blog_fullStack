import axios from "axios"

/**
 * 1. 前后台约定，返回格式
 */
// let res = {
//   code: 200, //非外层
//   data: [],
//   msg: 'message',
//   success: true,
// };

/**
 * 2. 状态码含义
 */
// let codeMessage = {
//   200: '服务器成功返回请求的数据。',
//   201: '新建或修改数据成功。',
//   202: '一个请求已经进入后台排队（异步任务）。',
//   204: '删除数据成功。',
//   400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
//   401: '用户没有权限（令牌、用户名、密码错误）。',
//   402: '',
//   403: '用户得到授权，但是访问是被禁止的。',
//   404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
//   406: '请求的格式不可得。',
//   410: '请求的资源被永久删除，且不会再得到的。',
//   422: '当创建一个对象时，发生一个验证错误。',
//   500: '服务器发生错误，请检查服务器。',
//   502: '网关错误。',
//   503: '服务不可用，服务器暂时过载或维护。',
//   504: '网关超时。',
// };

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
  constructor(baseConf, customConf) {
    // 实例
    this.instance = axios.create({ baseConf, ...customConf })
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
    if (config._isCancle) {
      // 取消上一次
      this.removeCancel(config)
      const controller = new AbortController()
      cancelMaps.set(config.url, () => {
        controller.abort()
      })
      config.signal = controller.signal
    }
    return config
  }

  removeCancelFunctional(config) {
    if (config._isCancle) {
      const preCancel = cancelMaps.get(config.url)
      if (preCancel) {
        preCancel()
        cancelMaps.delete(config.url)
      }
    }
  }

  // cancel&clear cancelMaps
  removeAllCancel() {
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

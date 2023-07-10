import type { CustomConfig } from "./type"

import Io from "./io"
import { useCache, CACHE_KEY } from "@/hooks/useCache"
import { ElMessage } from "element-plus"

const { wsCache } = useCache()

const io = new Io(
  {
    baseURL: import.meta.env.VITE_APP_PREFIX as string,
    timeout: 1000
  },
  {
    _isCancel: false, // 默认取消上次请求
    _isToken: true // 默认需要token
  } as CustomConfig
)

let requestList = [] // 请求队列
let isRefreshToken = false // 是否正在刷新中
const maxReqCount = 5 // 最大重新请求数
let reqCount = 0 // 重新请求数

export async function refreshToken() {
  return io.instance("xxxx", {
    method: "GET",
    _isToken: false,
    headers: {
      "tenant-id": 963
    }
  })
}

// 请求拦截,可使用数组。
io.addReqInterceptor((config) => {
  if (config._isToken) config.headers.token = `${wsCache.get(CACHE_KEY.API_TOKEN)}` || null
  return config
})

// 响应拦截
io.addResInterceptor(
  async (res) => {
    const { data, config, status } = res
    console.log(data)
    // 状态为200
    const isSuccessCode = [200, 201]
    if (isSuccessCode.includes(status)) {
      return data
    }
    // const { response } = res
    // if (response.status !== 200) {
    //   // 未设置状态码则默认成功状态
    //   let code = response.status || 200

    //   if (code === 401) {
    //     reqCount += 1
    //     if (reqCount === maxReqCount) {
    //       reqCount = 0
    //       requestList = []
    //       return Promise.reject("重复刷新次数达到极限")
    //     }
    //     // 如果未认证，并且未进行刷新令牌，说明可能是访问令牌过期了
    //     if (!isRefreshToken) {
    //       isRefreshToken = true
    //       // 1. 如果获取不到刷新令牌，则只能执行登出操作
    //       if (!getToken()) {
    //         return null
    //       }
    //       // 2. 进行刷新访问令牌
    //       try {
    //         const refreshTokenRes = await refreshToken()
    //         // console.log("结果：", refreshTokenRes.data.token);
    //         // 2.1 刷新成功，则回放队列的请求 + 当前请求 设置apiToken
    //         setToken(refreshTokenRes.data.token)
    //         requestList.forEach((cb) => cb())
    //         return io.instance(response.config)
    //       } catch (e) {
    //         // 为什么需要 catch 异常呢？刷新失败时，请求因为 Promise.reject 触发异常。
    //         // 2.2 刷新失败，只回放队列的请求
    //         requestList.forEach((cb) => cb())
    //         // 提示是否要登出。即不回放当前请求！不然会形成递归
    //         return null
    //       } finally {
    //         requestList = []
    //         isRefreshToken = false
    //       }
    //     } else {
    //       // 添加到队列，等待刷新获取到新的令牌
    //       return new Promise((resolve) => {
    //         requestList.push(() => {
    //           config.headers.Authorization = `${getToken()}` || null // 让每个请求携带自定义token 请根据实际情况自行修改
    //           resolve(io.instance(response.config))
    //         })
    //       })
    //     }
    //   } else {
    //     return data
    //   }
    // }
  },
  (error) => {
    let { message } = error

    if (message === "Network Error") {
      message = "网络出错"
    } else if (message.includes("timeout")) {
      message = "接口超时"
    } else if (message.includes("Request failed with status code")) {
      message = "请求状态码" + message.substr(message.length - 3)
    }
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default io.instance

import { reactive } from "vue"
// import axios from "axios"
// import type { AxiosRequestConfig } from "axios"

// const res = axios("abc.com", {
//   abc: 1
// } as AxiosRequestConfig)

// fetch("abc.com", {} as RequestInit)

export interface UploadRequestHeaders {
  [k: string]: string
}

export interface Option {
  url: string
  signal?: AbortSignal
  headers?: UploadRequestHeaders
  body: Document | XMLHttpRequestBodyInit | null | FormData
}

export interface RequestItem {
  index: number
  percent: number
  option: Option
  request: () => Promise<string>
  cancel: () => void
  result: null | any
  success: boolean
}

export function executeQueues(queues: Option[], max: number) {
  const queue: RequestItem[] = []

  let flagIndex = 0 // 标记顺序
  let curNum = 0
  let finishNum = 0

  // 先生成同步的信息: 名称等等。
  queues.forEach((option) => {
    const item = createRequestItem(option)
    queue.push(item)
  })

  const minMax = Math.min(max, queues.length) // 传入的max太大。
  for (let i = 0; i < minMax; i++) {
    run() //每次的请求
  }

  return queue

  async function run() {
    // 控制请求上线
    if (curNum >= queue.length) {
      return
    }
    const item = queue[curNum]
    curNum++

    try {
      // success
      const res = await item.request()
      item.result = res
      item.success = true
    } catch (error) {
      // error
      item.result = error
      item.success = false
    } finally {
      // 一个请求完成后
      finishNum++

      // 异步等待所有请求完成后，resolve
      if (finishNum === queue.length) {
        console.log("over")
      }

      run()
    }
  }

  /**
   * 创建一个请求对象
   * @param option 请求配置
   */
  function createRequestItem(option: Option): RequestItem {
    const controller = new AbortController()
    option.signal = controller.signal

    const index = flagIndex++
    const item: RequestItem = reactive({
      index, // 为每次的请求打上顺序标记。
      option,
      percent: 0,
      result: null,
      success: false,
      request: async () => {
        // 错误会从内部一直向外不断传递
        const res = await request(item)
        return res
      },
      cancel: controller.abort
    })

    return item
  }
}

/**
 * 请求
 * @param option
 * @returns
 */
const CONTENT_TYPES = {
  default: "multipart/form-data",
  blob: "application/octet-stream"
}

export function request(item: RequestItem): Promise<string> {
  return new Promise((resolve, reject) => {
    const option = item.option
    const headers = option.headers || ({} as UploadRequestHeaders)

    let xml = new XMLHttpRequest()
    xml.open("POST", option.url)
    // 设置header
    if (!headers.contentType) {
      // 默认:传统
      headers.contentType = CONTENT_TYPES.default
    }
    for (const key in headers) {
      const value = headers[key]
      if (value === CONTENT_TYPES.blob) {
        // xml.setRequestHeader("X-Ext", file.extension) // 二进制格式,看后端需要。
      }
      xml.setRequestHeader(key, value)
    }

    /**
     * signal: 添加事件
     */
    let onCanceled: (cancel: any) => void
    if (option.signal) {
      onCanceled = function onCanceled(cancel: any) {
        if (!xml) {
          return
        }
        reject(!cancel ? "abort" : cancel) // reject
        xml.abort()
        xml = null
      }
      option.signal.aborted ? onCanceled(undefined) : option.signal.addEventListener("abort", onCanceled)
    }

    /**
     * 清除副作用
     * @returns
     */
    function clean() {
      if (!xml) {
        return
      }
      option.signal && option.signal.removeEventListener("abort", onCanceled)
      xml = null
    }

    /**
     * state: 完成清空 xml = null, 垃圾回收掉。
     * @returns
     */
    xml.onreadystatechange = (e) => {
      if (!xml || xml.readyState !== 4) {
        return
      }

      if (xml.status === 0 && !(xml.responseURL && xml.responseURL.indexOf("file:") === 0)) {
        return
      }

      resolve(xml.response)
      setTimeout(clean, 0)
    }

    xml.onerror = (error) => {
      reject(error) // reject
    }
    xml.onprogress = (e) => {}
    xml.send("上传的数据")
  })
}

/**
 * 测试接口
 * @param item
 * @returns
 */
export function requestTest(item: Option): Promise<{ url: string }> {
  return new Promise((resolve, reject) => {
    const option = item
    const headers = option.headers || ({} as UploadRequestHeaders)

    const xml = new XMLHttpRequest()
    xml.open("POST", option.url)
    // 设置header
    if (!headers.contentType) {
      // 默认:传统
      headers.contentType = CONTENT_TYPES.default
    }
    for (const key in headers) {
      const value = headers[key]
      if (value === CONTENT_TYPES.blob) {
        // xml.setRequestHeader("X-Ext", file.extension) // 二进制格式,看后端需要。
      }
      xml.setRequestHeader(key, value)
    }

    /**
     * state: 完成清空 xml = null, 垃圾回收掉。
     * @returns
     */
    xml.onreadystatechange = (e) => {
      if (!xml || xml.readyState !== 4) {
        return
      }

      if (xml.status === 0 && !(xml.responseURL && xml.responseURL.indexOf("file:") === 0)) {
        return
      }

      resolve(JSON.parse(xml.response))
    }

    xml.onerror = (error) => {
      reject(error) // reject
    }

    xml.send(option.body)
  })
}

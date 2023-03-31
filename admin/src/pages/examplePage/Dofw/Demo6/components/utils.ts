import { reactive } from "vue"
import type { Ref, UnwrapNestedRefs } from "vue"

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
  filename?: string
  fileSize?: number

  percent: number
  option: Option
  cancel: (() => void) | null
  callAgain: (() => void) | null
  result: null | any
  success: boolean
}

export function executeQueues(allItems: RequestItem[], max: number) {
  // 将用户传入对象设置为响应式
  const newAllItems: UnwrapNestedRefs<RequestItem[]> = reactive(allItems)

  let curNum = 0
  let finishNum = 0

  // 先生成同步的信息: 名称等等。
  newAllItems.forEach((item) => {
    expandRequestItem(item)
  })

  const minMax = Math.min(max, allItems.length) // 传入的max太大。
  for (let i = 0; i < minMax; i++) {
    run() //每次的请求
  }

  return newAllItems

  async function run() {
    // 控制请求上线
    if (curNum >= newAllItems.length) {
      return
    }
    const item = newAllItems[curNum]
    curNum++

    try {
      // success
      const res = await request(item)
      item.result = JSON.parse(res)
      item.success = true
    } catch (error) {
      // error
      item.result = error
      item.success = false
    } finally {
      // 一个请求完成后
      finishNum++

      // 异步等待所有请求完成后，resolve
      if (finishNum === newAllItems.length) {
        console.log("over")
      }

      run()
    }
  }

  /**
   * 扩展一个请求对象，属性。
   * @param option 请求配置
   */
  function expandRequestItem(item: RequestItem): void {
    const controller = new AbortController()
    item.option.signal = controller.signal
    item.cancel = controller.abort.bind(controller)

    item.callAgain = async () => {
      const controller = new AbortController()
      item.option.signal = controller.signal
      item.cancel = controller.abort.bind(controller)

      try {
        // success
        const res = await request(item)
        item.result = JSON.parse(res)
        item.success = true
      } catch (error) {
        // error
        item.result = error
        item.success = false
      }
    }
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
      headers.contentType = CONTENT_TYPES.default
    }
    for (const key in headers) {
      const value = headers[key]
      if (value === CONTENT_TYPES.blob) {
        // xml.setRequestHeader("X-Ext", file.extension) // 二进制格式,看后端需要。
      }
      xml.setRequestHeader(key, value)
    }

    //signal: 添加事件
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

    //清除副作用
    function clean() {
      if (!xml) {
        return
      }
      option.signal && option.signal.removeEventListener("abort", onCanceled)
      xml = null
    }

    // state: 完成清空 xml = null, 垃圾回收掉。
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
    xml.upload.onprogress = (e) => {
      item.percent = Number((e.loaded / e.total).toFixed(2))
    }
    xml.send(option.body)
  })
}

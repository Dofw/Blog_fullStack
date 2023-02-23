interface Option {
  url: string
  signal: any
  max?: number
}

interface RequestItem {
  request: () => Promise<void>
  cancel: () => void
}

/**
 * 解决请求的并发
 * 1. 同时请求个数 max: 5
 * 2. 同时支持请求的取消功能
 */

const queue: RequestItem[] = []
// const cancelMap = new Map()

const defaultMax = 5
let curNum = 0

function io(option: Option) {
  const item = createRequestItem(option)
  queue.unshift(item)

  run()
}

async function run() {
  if (curNum <= defaultMax) {
    const item = queue.pop()
    item && item.request()
    curNum++
  }
}

/**
 * 创建一个请求对象
 * @param option 请求配置
 */
function createRequestItem(option: Option): RequestItem {
  const controller = new AbortController()
  option.signal = controller.signal

  const item = {
    request: async () => {
      try {
        const res = await request(option)
        curNum--
        return res
      } catch (error) {
        curNum--
        throw error
      }
    },
    cancel: controller.abort
  }
  return item
}

/**
 * 请求
 * @param option
 * @returns
 */
export async function request(option: Option) {
  await delay(1000)
  run()
  return option.url
}

/**
 * delay-tool
 */
function delay(duration: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined)
    }, duration)
  })
}

export { triggerTheme } from "./triggerTheme"

export function debounce(fn: (...arg: any) => void, delay: number) {
  let timer: any = null
  return function (this: any, ...args: any) {
    const self = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      fn.apply(self, args)
    }, delay)
  }
}

// // 懒加载
// const modulesAsync = import.meta.glob("./utils/*.js")

// // 直接引入所有的模块
// const modulesSync = import.meta.globEager("./dir/*.js")

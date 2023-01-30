import type { ObjectDirective } from "vue"
import { createApp } from "vue"
import Loading from "./Loading.vue"

const LOADING_INSTANCE = Symbol("loading初始化，避免冲突")

const vLoading: ObjectDirective = {
  mounted(el, binding) {
    // 初始化、创建loading绑定在全局作用域el上。
    el.style.position = "relative"

    const instance = createLoading()
    el[LOADING_INSTANCE] = {
      vm: instance.vm,
      app: instance.app
    }

    if (binding.value) {
      el.appendChild(instance.vm.$el)
    }
  },

  // 更新后才运行。true -> false, 需要在mounted做一次append。
  updated(el, binding) {
    const instance = el[LOADING_INSTANCE]
    if (binding.oldValue !== binding.value) {
      if (binding.value) {
        el.appendChild(instance.vm.$el)
      } else {
        // el.removeChild(instance.vm.$el)
        const $el = instance.vm.$el
        $el?.parentNode?.removeChild($el)
      }
    }
  },

  unmounted(el) {
    const instance = el[LOADING_INSTANCE]

    const $el = instance.vm.$el
    $el?.parentNode?.removeChild($el) // bug, 父组件销毁了，在使用el.removeChild会报错，已经销毁过了。
    instance.app.unmount() // 再卸载应用
  }
}

function createLoading() {
  const _root: HTMLElement = document.createElement("div")
  const app = createApp(Loading) // app应用，使用unmount
  const vm = app.mount(_root) // mout后的vm实例对象，获取$el
  _root.remove() //保持纯净环境

  return {
    app,
    vm
  }
}

export default vLoading

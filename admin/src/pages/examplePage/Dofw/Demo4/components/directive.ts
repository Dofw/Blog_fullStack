import type { ObjectDirective } from "vue"
import { createApp } from "vue"

import Loading from "./Loading.vue"
import styles from "./style.module.scss"
const _root = document.createElement("div")
const loadingInstance = createApp(Loading).mount(_root)

console.log(111, loadingInstance, loadingInstance.unmount)

const test: ObjectDirective = {
  mounted(el, binding) {
    console.log("mounted", el, binding, styles)
    const curDom = el
    curDom.style.position = "relative"

    curDom.appendChild(loadingInstance.$el)
  },

  // updated(el, binding, vnode, prevVnode) {},

  unmounted() {
    loadingInstance.unmount()
    _root.remove()
  }
}

export default test

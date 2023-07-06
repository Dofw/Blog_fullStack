import { computed } from "vue"

type EmitFunc = (event: any, ...arg: any[]) => void

/**
 * 使用场景：传入子组件，子组件通过 v-model改变父组件的方式违背了单项数据流。
 * 此方法就是解决 保证单项数据流的问题。
 * @param props
 * @param propName props 中传入的双向绑定属性，例如 modelValue/自定义的属性。
 * @param $emits
 * @returns
 */
export default function useVmodel(props: any, propName: string, $emits: EmitFunc) {
  return computed({
    get() {
      if (typeof props[propName] !== "object") return props[propName]

      return new Proxy(props[propName], {
        // 修改自身之内的属性值。奇招
        set(target, name, val) {
          $emits(`update:${propName}`, {
            ...target,
            [name]: val
          })
          return true
        }
      })
    },
    // 修改本身
    set(val) {
      $emits(`update:${propName}`, val)
    }
  })
}

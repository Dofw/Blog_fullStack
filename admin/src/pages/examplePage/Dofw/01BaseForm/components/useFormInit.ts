import { ref, watch, type Ref, type UnwrapRef } from "vue"

/**
 *
 * @param props
 * @param propKey
 * @param defaultFormData 只定义确定的字段，像createTime等无意义字段不对ruleForm填充。无论 add（id:null）、edit 都需要包含id。
 * @param {Function} keyHandler 第一个参数为key prop，第二参数为回填的值 propValue; 不需要处理的 直接返回propValue; 需要处理的将处理结果返回。
 * @returns
 */

export default function useFormInit<
  V extends S,
  P,
  K extends string & keyof P,
  S extends P[K] extends object ? P[K] : never // 约束 S 是对象
>(
  props: P,
  propKey: K,
  defaultFormData: V,
  keyHandler?: <R extends keyof UnwrapRef<V>>(prop: R, propValue: any) => any
): Ref<UnwrapRef<V>> {
  const ruleForm = ref<V>({
    ...defaultFormData
  })
  const isFunc = keyHandler && typeof keyHandler === "function"

  watch(
    () => props[propKey],
    () => {
      // 表单数据监听
      if (!props[propKey] || typeof props[propKey] !== "object") return // S 的 never 在这里结束了。

      Object.keys(defaultFormData as object).forEach((key: any) => {
        const propKeyValue = props[propKey] // 原因 defaultFormData 小类型（子集），props[propKey] 大类型。这里就 as 为 V
        ruleForm.value[key] = isFunc ? keyHandler(key, propKeyValue[key]) : propKeyValue[key]
      })
    },
    {
      immediate: true,
      deep: true
    }
  )

  return ruleForm
}

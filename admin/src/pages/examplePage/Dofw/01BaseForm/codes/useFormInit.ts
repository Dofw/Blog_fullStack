export const code = `
  <script>
  import { ref, watch, type Ref } from "vue"

  // 对数据进行组合：baseData、newAddData
  export default function useFormInit(props: any, propKey: string, defaultFormData: any) {
    // reset使用
    const resetData = ref({ ...defaultFormData })
    // 全部表单数据，包括id(否则回填不到id)
    const ruleForm = ref({ ...defaultFormData })
  
    /**
     * add/edit
     * 1. 记录要 reset 的值，为什么不直接使用 props[propKey], 如下：
     *    - 一般性数据，可以直接使用props[propKey]
     *    - 包含特殊的 json数据，就不能直接赋值，要转换为 object， 否则表单可能会报错。
     * 2. 回填 defaultFormData 对应的字段。
     */
    watch(
      () => props[propKey],
      () => {
        // 默认值回填
        const _resetData = props[propKey] || defaultFormData
        Object.keys(defaultFormData).forEach((key) => {
          jsonField2Parse(resetData, _resetData, key)
        })
  
        // 表单数据监听
        if (!props[propKey]) return
        Object.keys(defaultFormData).forEach((key) => {
          jsonField2Parse(ruleForm, props[propKey], key)
        })
      },
      {
        immediate: true,
        deep: true
      }
    )
  
    /**
     * 处理含有json的字段。不传jsonKey，正常赋值。
     * @param dataRef
     * @param inputData 输入数据
     * @param key
     * @param jsonKey 需要转换的 json key
     */
    function jsonField2Parse(dataRef: Ref<any>, inputData: any, key: string, jsonKeys?: string[]) {
      const input = inputData || defaultFormData // 传入null等空数据。inputData[key]就报错了
      // 注意事项： json 串 字段单独处理。
      if (Array.isArray(jsonKeys) && jsonKeys.includes(key)) {
        // 默认状态 设置的是数组；返回数据是可能是json。
        let value = input[key]
        if (!value) value = []
        // throw 'cadre-appoint: jsonField2Parse Function parsing json data reported an error in useMergeDataInit, appointRemoveFileId or fammilyAdress undefined!  '
        dataRef.value[key] = Array.isArray(value) ? value : JSON.parse(input[key])
      } else {
        dataRef.value[key] = input[key]
      }
    }
  
    return {
      ruleForm,
      resetData
    }
  }
  
  </script>
`

const options = {
  value: "", // 编辑器初始显示文字
  language: "javascript", // 语言javascript | json
  automaticLayout: true, // 自动布局
  theme: "vs", // 官方自带三种主题vs, hc-black, or vs-dark
  foldingStrategy: "indentation", // 代码可分小段折叠
  overviewRulerBorder: false, // 不要滚动条的边框
  lineNumbers: "off", // 控制行号的出现on | off
  scrollbar: {
    // 滚动条设置
    verticalScrollbarSize: 4, // 竖滚动条
    horizontalScrollbarSize: 6 // 横滚动条
  },
  readOnly: false, // 是否只读 Defaults to false | true
  minimap: {
    // 关闭小地图
    enabled: false
  },
  cursorStyle: "line", // 光标样式
  fontSize: 14, // 字体大小
  tabSize: 2, // tab缩进长度
  autoIndent: true // 自动布局
}

export default options

// const temp = `import{}from'vue'        import{ ref ,onMounted}from "vue"
//   const testRef = ref(0)
//   const test2 = ref.a
//   onMounted(() => {
//     console.log(123)
//   })
// `
export function compilerJS(tempJS: any) {
  // import-Reg
  const reg = /\bimport\s*\{([^{]*)\}\s*from\s*("|')vue\2/g

  //vue属性集合
  const vueProps: string[] = []
  //收集完将导入语法置空
  let newTemp = tempJS.replace(reg, function ($: string, $1: string) {
    if ($1) {
      //错误处理

      vueProps.push(...$1.split(","))
    }
    return ""
  })

  // 变量替换，例如 ref 替换成 vue.ref。
  vueProps.forEach((prop) => {
    // `=?\\s*(${trimProp})(?=[.(]{1})` 正向断言(预查)，例如：后面满足是. 或则 ( 条件的。prop. prop(
    const trimProp = prop.trim()
    newTemp = newTemp.replace(new RegExp(`=?\\s*(${trimProp})(?=[.(]{1})`, "g"), function (match: string, $1: string) {
      return match.replace($1, `vue.${trimProp}`)
    })
  })

  console.log(newTemp)
  console.log(vueProps)

  return newTemp
}

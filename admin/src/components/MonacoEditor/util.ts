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

export function compilerJS(tempJS: any) {
  //import-Reg
  const reg = /\bimport\s*\{([^{]*)\}\s*from\s*("|')vue\2/g
  //将import，编译成const ...
  const newTemp = tempJS.replace(reg, function ($: string, $1: string) {
    let str = ""
    if ($1) {
      str = `const {${$1}} = Vue`
    }
    return str
  })
  console.log(newTemp)

  //替换export default, 执行eval
  let scriptContent
  const temp = newTemp.replace(/export\s+default/, "scriptContent =")
  eval(temp)

  console.log(temp)

  return scriptContent || {}
}

export function compilerTemp(temp: any) {
  //import-Reg
  const reg = /\bimport\s*\{([^{]*)\}\s*from\s*("|')vue\2/g
  //将import，编译成const ...
  const newTemp = temp.replace(reg, function ($: string, $1: string) {
    let str = ""
    if ($1) {
      str = `const {${$1}} = Vue`
      str = str.replace(/\bas\b/g, ":")
    }
    return str
  })

  //替换export default, 执行eval
  let render
  const temp2 = newTemp.replace(/export /, "render =")
  eval(temp2)

  console.log("temp", temp2)

  return render
}

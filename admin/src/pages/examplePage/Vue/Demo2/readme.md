## 约定

1. Demo 文件夹下建立 codes 文件夹，\_code.ts 复制过来不需要改动。(约定)

2. codes 文件夹下的其余 ts 文件名将转换成 componentName: 'xxx.vue'

```js
//_code.ts 文件处理成如下格式数组
[
  {
    componentName: "index.vue",
    code: ` source `
  },
  ...
]

```

3. compoenents 文件夹下编写功能组件，将其主入口 vue 文件导入

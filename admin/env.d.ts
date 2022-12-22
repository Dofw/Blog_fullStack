/// <reference types="vite/client" />
/// <reference types="node" />

// 需要进一步了解, 解决引入组件，报找不到类型定义文件的红线。
declare module "*.vue"
declare module "@kangc/v-md-editor"
declare module "@kangc/v-md-editor/lib/theme/github.js"
declare module "@kangc/v-md-editor/lib/theme/vuepress.js"
declare module "prismjs"

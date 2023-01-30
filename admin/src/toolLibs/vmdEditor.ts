import VMdEditor from "@kangc/v-md-editor"
import "@kangc/v-md-editor/lib/style/base-editor.css"
// import githubTheme from "@kangc/v-md-editor/lib/theme/github.js"
// import "@kangc/v-md-editor/lib/theme/style/github.css"
// import hljs from "highlight.js"

import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js"
import "@kangc/v-md-editor/lib/theme/style/vuepress.css"
import Prism from "prismjs"

VMdEditor.use(vuepressTheme, {
  Hljs: Prism
})

export default VMdEditor

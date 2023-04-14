// 设置theme
export function triggerTheme() {
  const htmlDom = document.documentElement
  const curClass = htmlDom.className

  curClass === "dark" ? (htmlDom.className = "light") : (htmlDom.className = "dark")
}

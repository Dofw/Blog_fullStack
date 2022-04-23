// 设置theme
export function triggerTheme() {
  const htmlDom = document.documentElement
  if (htmlDom.dataset.theme_dark !== undefined) {
    delete htmlDom.dataset.theme_dark
    htmlDom.dataset.theme_light = ""
  } else if (htmlDom.dataset.theme_light !== undefined) {
    delete htmlDom.dataset.theme_light
    htmlDom.dataset.theme_dark = ""
  }
}

const modules = import.meta.glob("../codes/*.ts", { eager: true })
export const codeOptions = parseModules(modules)
// console.log(modules)

// tool
function parseModules(modules: any) {
  const codeOptions = []
  for (const key in modules) {
    if (key.includes("_code")) continue

    const paths = key.split("/")
    let endName = paths[paths.length - 1]
    endName = endName.split(".")[0]

    codeOptions.push({
      componentName: endName,
      code: modules[key].code
    })
  }
  return codeOptions
}

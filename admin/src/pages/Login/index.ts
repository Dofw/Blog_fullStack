interface Option {
  width?: number
  height?: number
  offset?: number | [number, number]
  rowNum?: number
  colNum?: number
}
export function getItemsPos(container, option?: Option) {
  const { clientWidth, clientHeight } = container
  let { width = 100, height = 100, offset = 10, rowNum = 2, colNum = 5 } = option || {}

  if (!Array.isArray(offset)) {
    offset = [offset, offset]
  }

  // 计算左上起点
  const innerWidth = width * colNum + offset[0] * (colNum - 1)
  const innerHeight = height * rowNum + offset[1] * (rowNum - 1)

  const startLeft = (clientWidth - innerWidth) / 2
  const startTop = (clientHeight - innerHeight) / 2
  const result: any = []
  for (let col = 1; col <= colNum; col++) {
    for (let row = 1; row <= rowNum; row++) {
      const left = startLeft + (col - 1) * (width + offset[0])
      const top = startTop + (row - 1) * (height + offset[1])
      result.push({
        index: `${row}-${col}`,
        left,
        top
      })
    }
  }

  return result
}

export function setPosStyles(dom, option) {
  const attrs = generateAttrMap(option)
  attrs.forEach((attr) => {
    dom.style[attr.key] = attr.value + "px"
  })
}

function generateAttrMap(option) {
  const keys = Object.keys(option)
  const result: any = []

  keys.forEach((key) => {
    result.push({
      key,
      value: option[key]
    })
  })

  return result
}

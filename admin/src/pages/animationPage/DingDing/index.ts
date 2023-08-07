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
export function getItemsCenterPos(container, width, height) {
  const { clientWidth, clientHeight } = container
  const left = clientWidth / 2 - width / 2
  const top = clientHeight / 2 - height / 2
  return {
    left,
    top
  }
}

// dom - status 对象的map
const animationMaps = new Map()

// 根据初始预期状态，设置每个dom的animation配置
export function initAnimationMaps(context) {
  animationMaps.clear()
  // 这里设置动画的滚动区域。
  const { items, areaBox, delaySize, scrollStart, scrollEnd } = context
  const posInfos = getItemsPos(areaBox, { width: 50, height: 50, offset: 80 })
  const centerPos = getItemsCenterPos(areaBox, 50, 50)

  for (const item of items) {
    const index = item.dataset.index
    const colNum = index.split("-")[1]
    const centerNum = Math.ceil(items.length / 4)
    const a = Math.abs(centerNum - colNum)
    const pos = findPosInfo(index, posInfos)
    animationMaps.set(
      item,
      createAnimationConf(
        scrollStart,
        scrollEnd,
        item,
        pos,
        centerPos,
        delaySize * centerNum - delaySize * a
      )
    )
  }
}

function findPosInfo(index, posInfos) {
  return posInfos.find((item) => {
    return item.index === index
  })
}

function createAnimationConf(scrollStart, scrollEnd, item, pos, centerPos, delaySize) {
  // 可以获取dom的额外属性。
  const index = item.dataset.index

  // opacity
  const opacity = createComputedVal(scrollStart + delaySize, scrollEnd, 0, 1)

  // left-top
  const leftComp = createComputedVal(scrollStart + delaySize, scrollEnd, centerPos.left, pos.left) // (初始化计算器)只需要init执行一次。不需要scroll变化触发一致生成。
  const topComp = createComputedVal(scrollStart + delaySize, scrollEnd, centerPos.top, pos.top)
  const left = function (scroll) {
    return leftComp(scroll) + "px" // 包一层，是将数字处理成合理的数值。
  }
  const top = function (scroll) {
    return topComp(scroll) + "px"
  }

  // scale
  const scaleComp = createComputedVal(scrollStart + delaySize, scrollEnd, 0, 1.5)
  const transform = function (scroll) {
    return `scale(${scaleComp(scroll)})`
  }

  return {
    opacity,
    left,
    top,
    transform
  }
}

export function updateItemsStatus(scroll, context) {
  const { items } = context
  for (const item of items) {
    const animationObj = animationMaps.get(item)

    for (const key in animationObj) {
      const execute = animationObj[key]

      item.style[key] = execute(scroll)
    }
  }
}

// 设置动画起始、终止状态。
function createComputedVal(scrollStart, scrollEnd, statusStart, statusEnd) {
  return function (scroll) {
    return computedVal(scroll, scrollStart, scrollEnd, statusStart, statusEnd)
  }
}
// baseVal
function computedVal(scroll, scrollStart, scrollEnd, statusStart, statusEnd) {
  if (scroll <= scrollStart) {
    return statusStart
  }
  if (scroll >= scrollEnd) {
    return statusEnd
  }

  return (
    ((scroll - scrollStart) * (statusEnd - statusStart)) / (scrollEnd - scrollStart) + statusStart
  )
}

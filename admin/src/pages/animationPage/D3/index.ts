import type {
  HierarchyCircularNode,
  HierarchyCircularLink,
  HierarchyNode,
  HierarchyLink,
  Selection
} from "d3"
import * as d3 from "d3"
interface Config {
  margin?: number[]
  fontSize?: number
  boxSize?: [number, number] // node节点的宽高
}

interface Option {
  $el: string
  data: any
  config: Config
}

// TODO: d3实践
export default class D3Model {
  option: any

  // 初始化一些全局属性。
  svg: any = null
  g1: any = null // 最外层的 group
  treeLayout: any = null
  dataPoint: any = null
  oldNodeGs: any = null
  constructor(option: Option) {
    // 平级化
    this.option = {
      $el: option.$el,
      data: option.data,

      margin: option?.config?.margin || [0, 0, 0, 0],
      boxSize: option?.config?.boxSize || [200, 100],
      fontSize: option?.config?.fontSize || 14
    }

    this.init()
  }

  // TODO:init
  init() {
    const { $el, boxSize, margin, data } = this.option

    const container: HTMLElement = d3.select($el).node() as HTMLElement
    if (!container) throw "容器不存在"

    const { width, height } = container.getBoundingClientRect()

    const innerW = width - margin[1] - margin[3]
    const innerH = height - margin[0] - margin[2]

    const svg = d3
      .select("#d3")
      .append("svg")
      .attr("class", "svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `${0} ${-height / 2} ${width} ${height}`) // 调整视图 居中。
      .attr("cursor", "pointer")

    this.svg = svg

    // g 分组元素，给g设置的属性，会统一到他下面的所有的元素。故实现了margin-top/margin-left
    // TODO: 最外层组， 会应用到下面的所有。也是 zoom 移动的关键点！！！
    const g1 = svg
      .append("g")
      .attr("class", "level-group-1")
      .attr("transform", `translate(${margin[3]}, ${margin[0]})`)

    this.g1 = g1
    // 定义layout, 通过 hierarchy 根据布局定义好point位置
    const treeLayout = (this.treeLayout = d3
      .tree()
      .size([innerH - boxSize[1], innerW - boxSize[0]])
      .nodeSize([300, 500]))

    // TODO: 控制展示多少层
    const dataDeep = d3.hierarchy(data)
    // TODO: 打上坐标点
    const dataPoint = (this.dataPoint = treeLayout(dataDeep))

    // TODO: 初始化时，控制层级展示
    dataPoint.descendants().forEach((node: any) => {
      node._children = node.children
      // if(层级)
      node.children = undefined
    })

    // svg 的 zoom事件
    svg
      .call(
        d3
          .zoom()
          .scaleExtent([0, 5])
          .on("zoom", (e) => {
            // TODO: 最外层 group 组， 会应用到下面的所有。
            g1.attr("transform", () => {
              return `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`
            })
          })
      )
      .on("dblclick.zoom", null) // 取消默认的双击放大事件

    this.update()
  }

  // TODO:update
  update() {
    const { boxSize, fontSize, data } = this.option

    // this.clearSvg()

    // TODO: 控制展示多少层
    const dataDeep = d3.hierarchy(data)
    // TODO: 打上坐标点
    this.dataPoint = this.treeLayout(dataDeep)

    this.g1.selectAll(".lines-g").remove()
    // TODO: 1,划线
    const linesG = this.g1!.append("g").attr("class", "lines-g") // 先分组

    const lines = linesG.selectAll(".broken-line").data(this.dataPoint.links(), (d) => {
      return d.source.data.name + d.target.data.name
    })
    this.lineJoin(lines)

    /**
     * TODO: 绘制 NODE， 这里使用所有node归为一个组。 ( TODO:分组的重要行！！！ )
     * 1. 按照每个node分组。g1.selectAll(".node-g").data(dataPoint.descendants()).join("g").attr("class", "node-g")
     * 2. 将所有node归为一个组。
     */
    // const nodeG = g1.append("g").attr("class", "node-g")
    console.log(
      this.dataPoint.descendants().map((node) => {
        return [node.data.name, node.x, node.y]
      })
    )
    const nodes = this.g1!.selectAll(".node-g").data(this.dataPoint.descendants(), (d) => {
      return d.data.name + d.x + d.y
    })
    this.nodeJoin(nodes)
  }

  clearSvg() {
    this.g1.selectAll("*").remove()
  }

  nodeJoin(nodes) {
    const { boxSize } = this.option
    const myTransition = this.svg.transition().duration(1000)
    const nodeClick = (e, d) => {
      d.parent.children.forEach((node, index) => {
        if (d.data.name === node.data.name) {
          d.parent.data.children.splice(index, 1)
        }
      })

      // ;(d.data.children = d.data.children || []).push({
      //   name: "root-1-3" + Math.random()
      // })
      // if (d.children) {
      //   d._children = d.children
      //   d.children = null
      // } else {
      //   d.children = d._children
      // }
      this.update()
    }
    // 进入
    const enterNodeGs = nodes.enter().append("g").attr("class", "node-g").on("click", nodeClick) // 一个 node 作为一个group，注册事件，充分利用事件冒泡可以。
    enterNodeGs
      .append("rect")
      .transition(myTransition)
      .attr("class", "node")
      .attr("z-index", -1)
      .attr("fill", "rgba(0, 0, 0, .3)")
      .attr("stroke", "green")
      .attr("stroke-width", 3)
      .attr("x", (d: any) => {
        return d.y
      })
      .attr("y", (d: any) => d.x - boxSize[1] / 2)
      .attr("rx", 10)
      .attr("width", boxSize[0])
      .attr("height", boxSize[1])

    // 更新
    nodes
      .attr("x", (d: any) => {
        return d.y
      })
      .attr("y", (d: any) => d.x - boxSize[1] / 2)
    // 移除
    nodes.exit().remove()

    this.nodeAppendText(enterNodeGs, nodes)
  }

  lineJoin(lines) {
    const myTransition = this.svg.transition().duration(1000)
    lines
      .enter()
      .append("path")
      .transition(myTransition)
      .attr("class", "broken-line")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .style("opacity", 1)
      .attr("d", this.generalBrokenLine)

    lines
      .attr("class", "broken-line")
      .attr("fill", "none")
      .attr("stroke", "black")
      .attr("stroke-width", 1)
      .style("opacity", 1)
      .attr("d", this.generalBrokenLine)

    lines.exit().remove()
  }

  nodeAppendText(enterNodeGs, nodes) {
    const { boxSize, fontSize } = this.option
    // 进入
    enterNodeGs
      .append("text")
      .attr("class", "text")
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("y", (d) => d.x)
      .attr("x", (d) => {
        return d.y
      })
      .attr("dx", (d) => {
        const name = d.data.name
        const center = boxSize[0] / 2
        const textLen = name.length * fontSize
        return center - textLen / 2
      })
      .style("text-anchor", (d) => "start")
      .text((d) => d.data.name)

    // 更新
    nodes
      .selectAll("text")
      .attr("class", "text")
      .attr("fill", "none")
      .attr("stroke", "green")
      .attr("y", (d) => d.x)
      .attr("x", (d) => {
        return d.y
      })
      .attr("dx", (d) => {
        const name = d.data.name
        const center = boxSize[0] / 2
        const textLen = name.length * fontSize
        return center - textLen / 2
      })
      .style("text-anchor", (d) => "start")
      .text((d) => d.data.name)
  }

  // TODO:生成折线
  generalBrokenLine = (d) => {
    const { boxSize } = this.option

    let { source, target } = d

    // x, y 互换。
    source = exchange(source)
    target = exchange(target)
    const halfDistance = (target.x - source.x) / 2
    const halfX = source.x + halfDistance
    return `M${source.x + boxSize[0]},${source.y} L${halfX},${source.y} L${halfX},${target.y} L${
      target.x
    },${target.y}`
    function exchange(source) {
      return {
        ...source,
        y: source.x,
        x: source.y
      }
    }
  }
}

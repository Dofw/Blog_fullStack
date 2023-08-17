<template>
  <div id="d3"></div>
</template>

<script lang="ts">
export default {
  name: "D3"
}
</script>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as d3 from "d3"

const d3Ref = ref({})
const data = {
  name: "root",
  children: [
    {
      name: "root-1",
      value: 10,
      children: [
        {
          name: "root-1-1",
          value: 10
        },
        {
          name: "root-1-2",
          value: 10
        }
      ]
    },
    {
      name: "root-2",
      value: 10
    }
  ]
}

onMounted(() => {
  const container: HTMLElement = d3.select("#d3").node() as HTMLElement
  const rectSize = {
    width: 200,
    height: 100
  }
  const fontSize = {
    small: 12,
    normal: 14,
    large: 16
  }
  const margin = {
    top: 20,
    bottom: 20,
    left: 20,
    right: 20
  }
  const { width, height } = container.getBoundingClientRect()
  const innerW = width - margin.right - margin.left
  const innerH = height - margin.top - margin.bottom
  const dx = 20
  const dy = 20

  const svg = d3
    .select("#d3")
    .append("svg")
    .attr("class", "svg")
    .attr("width", width)
    .attr("height", height)
    .attr("viewBox", `${0} ${0} ${innerW} ${innerH}`)
    .attr("cursor", "pointer")

  // g 分组元素，给g设置的属性，会统一到他下面的所有的元素。故实现了margin-top/margin-left
  // TODO: 最外层组， 会应用到下面的所有。也是 zoom 移动的关键点！！！
  const g1 = svg
    .append("g")
    .attr("class", "level-group-1")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)

  // svg 的 zoom事件
  svg
    .call(
      d3
        .zoom()
        .scaleExtent([0.5, 5])
        .on("zoom", (e) => {
          // TODO: 最外层组， 会应用到下面的所有。
          g1.attr("transform", () => {
            return `translate(${e.transform.x},${e.transform.y}) scale(${e.transform.k})`
          })
        })
    )
    .on("dblclick.zoom", null) // 取消默认的双击放大事件

  // 定义layout, 通过 hierarchy 根据布局定义好point位置
  const dataLayout = d3.tree().size([innerH - 200, innerW - 300])
  const dataDeep = d3.hierarchy(data)

  const dataPoint = dataLayout(dataDeep)

  // TODO: 生成线
  function generalBrokenLien(d) {
    let { source, target } = d
    // x, y 互换。
    source = exchange(source)
    target = exchange(target)

    const halfDistance = (target.x - source.x) / 2
    const halfX = source.x + halfDistance

    return `M${source.x + rectSize.width},${source.y} L${halfX},${source.y} L${halfX},${
      target.y
    } L${target.x},${target.y}`

    function exchange(source) {
      return {
        ...source,
        y: source.x,
        x: source.y
      }
    }
  }

  const linesG = g1.append("g").attr("class", "lines-g") // 先分组
  linesG
    .selectAll(".broken-line")
    .data(dataPoint.links())
    .join("path")
    .attr("class", "broken-line")
    .attr("fill", "none")
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("d", generalBrokenLien)

  /**
   * TODO: 绘制 NODE， 这里使用所有node归为一个组。 ( TODO:分组的重要行！！！ )
   * 1. 按照每个node分组。g1.selectAll(".node-g").data(dataPoint.descendants()).join("g").attr("class", "node-g")
   * 2. 将所有node归为一个组。
   */
  const nodeG = g1.append("g").attr("class", "node-g")

  // 2. 给每个node添加rect
  nodeG
    .selectAll(".node")
    .data(dataPoint.descendants())
    .join("rect")
    .attr("class", "node")
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("stroke-width", 3)
    .style("z-index", 1)
    .attr("x", (d) => {
      return d.y
    })
    .attr("y", (d) => d.x - rectSize.height / 2)
    .attr("rx", 10)
    .attr("width", rectSize.width)
    .attr("height", rectSize.height)

  nodeG
    .selectAll(".text")
    .data(dataPoint.descendants())
    .join("text")
    .attr("class", "text")
    .attr("fill", "none")
    .attr("stroke", "green")
    .attr("y", (d) => d.x)
    .attr("x", (d) => {
      return d.y
    })
    .attr("dx", (d) => {
      const name = d.data.name
      const center = rectSize.width / 2
      const textLen = name.length * fontSize.normal
      return center - textLen / 2
    })
    .style("text-anchor", (d) => "start")
    .text((d) => d.data.name)

  //   // 创建一个左右层次布局
  // var treeLayout = d3.tree()
  //     .size([height, width]); // 注意这里的 width 和 height 互换，以实现左右布局

  // // 构建层次数据
  // var root = d3.hierarchy(treeData);

  // // 计算树状布局
  // var treeDataLayout = treeLayout(root);

  // // 创建连接线生成器
  // var linkGenerator = d3.linkHorizontal()
  //     .x(d => d.y)
  //     .y(d => d.x);

  // // 创建节点和连接线
  // var nodes = treeDataLayout.descendants();
  // var links = treeDataLayout.links();

  // // 创建 SVG 元素并绘制树状图
  // var svg = d3.select("body").append("svg")
  //     .attr("width", width + margin.left + margin.right)
  //     .attr("height", height + margin.top + margin.bottom)
  //   .append("g")
  //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // // 绘制连接线
  // svg.selectAll(".link")
  //     .data(links)
  //   .enter().append("path")
  //     .attr("class", "link")
  //     .attr("d", linkGenerator);

  // // 绘制节点
  // var node = svg.selectAll(".node")
  //     .data(nodes)
  //   .enter().append("g")
  //     .attr("class", "node")
  //     .attr("transform", d => "translate(" + d.y + "," + d.x + ")");

  // node.append("circle")
  //     .attr("r", 5);

  // node.append("text")
  //     .attr("dy", 3)
  //     .attr("x", d => d.children ? -8 : 8)
  //     .style("text-anchor", d => d.children ? "end" : "start")
  //     .text(d => d.data.name);
})
</script>

<style lang="scss" scoped>
#d3 {
  width: 100%;
  height: 100%;
}
</style>

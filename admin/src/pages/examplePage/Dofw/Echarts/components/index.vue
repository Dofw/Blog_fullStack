<template>
  <div style="width: 300px; height: 200px; border: 1px solid green">
    <Echart ref="myChart" :options="options" />
  </div>
</template>

<script setup>
import Echart from "./Echart"
// import useAutoPlay from "./useAutoPlay"
import { handlerDataFunc } from "./bestPratice.ts"
import { onMounted, ref, computed } from "vue"

const myChart = ref({})
const data1 = ref([]) // 请求数据
onMounted(() => {
  setTimeout(() => {
    data1.value = [
      {
        name: "测试1",
        field1: 10,
        month: 1
      },
      {
        name: "测试2",
        field1: 20,
        month: 2
      },
      {
        name: "测试3",
        field1: 15,
        month: 3
      }
    ]
  }, 3000)
})
const newData = computed(() => {
  return handlerDataFunc(data1.value, {
    sort: { isSort: false, sortField: "month", isAscending: true },
    categoryField: "month", // year | month
    fields: ["field1"]
  })
})

// 计算options
const options = computed(() => {
  const { categoryAxis, field1 } = newData.value

  let options = {}

  return options
})
// const onEvents = {
//   // e echart传递的东西，start启动播放、end结束播放函数
//   click: (e, start, end) => {
//     console.log("click", e, start, end);
//     //可以操作dom
//   },
// };

// 开启动画
// useAutoPlay(myChart, {
//   data: data1, // 响应式数据
//   duration: 1000, // 间隔
//   index: 0, // 从第几项开始轮播
//   // onEvents,
//   // $seriesIndex: 1, // 默认 0 启动第一个serie, 例如: bar(0)、line(1), 启动line
//   cb: customFunc // 扩展功能(选填)-
// })

/**
 * 自动播放,添加额外dispatchAction功能
 * @param {*} instance
 * @param {*} data //useAutoPlay 传入的数据
 * @param {*} curIndex 当前index
 * @param {*} preIndex 前一个index
 */
// function customFunc(instance, data, curIndex, preIndex) {
//   // console.log(curIndex);
//   // preIndex、curIndex 由传入data决定。

//   // 先清除;
//   instance.dispatchAction({
//     type: "downplay",
//     seriesIndex: 0,
//     dataIndex: preIndex
//   })

//   // 在高亮
//   instance.dispatchAction({
//     type: "highlight",
//     seriesIndex: 0,
//     dataIndex: curIndex
//   })

//   // 设置text
//   instance.setOption(
//     {
//       title: {
//         show: true,
//         text: `${data[curIndex].value}{unit|个}`,
//         subtext: data[curIndex].name
//       }
//     },
//     false //merge
//   )
//   // 实例给你了, 可以做好多事
// }
</script>

<style lang="scss" scoped></style>

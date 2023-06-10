<template>
  <div style="width: 300px; height: 200px; border: 1px solid green">
    <Echart ref="myChart" :options="options" />
  </div>
</template>

<script setup>
import Echart from "@/components/Echart";
import useAutoPlay from "@/components/Echart/composable/useAutoPlay";
import { onMounted, ref, computed } from "vue";

const myChart = ref(null); // Echart组件ref实例
const data1 = ref([]); // 请求数据
onMounted(() => {
  setTimeout(() => {
    data1.value = [
      {
        name: "测试1",
        value: 10,
      },
      {
        name: "测试2",
        value: 20,
      },
      {
        name: "测试3",
        value: 15,
      },
    ];
  }, 3000);
});

// 计算options
const options = computed(() => {
  const data = data1.value;
  let colorList = ["red", "blue", "green"];
  // 公用调整
  let itemStyle = {
    borderColor: "rgba(12, 22, 58, 1)",
    borderWidth: 5,
    shadowBlur: 1,
    color: function (params) {
      return colorList[params.dataIndex];
    },
  };

  let options = {
    backgroundColor: "#000",
    tooltip: {
      trigger: "item",
      axisPointer: {
        type: "shadow",
      },
      backgroundColor: "RGBA(0,10,54,.8)", // borderColor: '#228DC9',
      borderWidth: 0, // appendToBody: true,
      formatter(e) {
        let str;
        let unit = "个";

        str = `
            <div style='display: flex; align-items: center'>
            <span style="flex-grow:0;font-family:Microsoft YaHei;margin-right:5px;width:15px;height:15px;left:5px;background-color:
            ${colorList[e.dataIndex]}
             "></span> 
             <span style="flex-grow:0;font-family:Microsoft YaHei;font-size:22px;color:#fff;line-height:25px">
             ${e.name}
             &nbsp
             </span> 
             <span style="flex-grow:1;text-align:right;color:#96D5FF;font-family:Microsoft YaHei;line-height:25px;font-size:22px">
             ${e.value}&nbsp${unit}<br /></span>
            </div>
            `;

        return str;
      },
    },
    title: {
      show: true,
      text: `${data[0]?.value}{unit|个}`,
      textAlign: "center",
      itemGap: 20,
      textStyle: {
        width: 200,

        color: "#ffffff",
        fontSize: 40,
        fontFamily: "DIN",
        fontWeight: "bold",

        align: "center",
        overflow: "truncate",
        ellipsis: "...",

        rich: {
          unit: {
            color: "rgba(15, 207, 255, 0.7)",
            padding: [5, 0, 0, 0],
            fontSize: 20,
          },
        },
      },
      left: "48%",
      top: "29%",
      subtext: data[0]?.name,

      subtextStyle: {
        width: 200,

        color: "#ffffff",
        fontSize: 22,
        fontFamily: "Microsoft YaHei",
        fontWeight: 400,

        align: "center",
        overflow: "truncate",
        ellipsis: "...",
      },
      zlevel: 100,
    },
    series: [
      {
        // 饼图圈
        name: "饼图",
        hoverAnimation: false,
        type: "pie",
        zlevel: 3,
        radius: ["65%", "90%"],
        center: ["50%", "50%"],
        itemStyle: itemStyle,
        labelLine: {
          show: false,
          length: 5,
          length2: 0,
          lineStyle: {
            color: "transparent",
          },
        },
        emphasis: {
          scale: true,
          scaleSize: 10,
        },
        label: {
          show: false,
        },
        data: data,
      },
    ],
  };

  return options;
});
// const onEvents = {
//   // e echart传递的东西，start启动播放、end结束播放函数
//   click: (e, start, end) => {
//     console.log("click", e, start, end);
//     //可以操作dom
//   },
// };

// 开启动画
useAutoPlay(myChart, {
  data: data1, // 响应式数据
  duration: 1000, // 间隔
  index: 0, // 从第几项开始轮播
  // onEvents,
  // $seriesIndex: 1, // 默认 0 启动第一个serie, 例如: bar(0)、line(1), 启动line
  cb: customFunc, // 扩展功能(选填)-
});

/**
 * 自动播放,添加额外dispatchAction功能
 * @param {*} instance
 * @param {*} data //useAutoPlay 传入的数据
 * @param {*} curIndex 当前index
 * @param {*} preIndex 前一个index
 */
function customFunc(instance, data, curIndex, preIndex) {
  // console.log(curIndex);
  // preIndex、curIndex 由传入data决定。

  // 先清除;
  instance.dispatchAction({
    type: "downplay",
    seriesIndex: 0,
    dataIndex: preIndex,
  });

  // 在高亮
  instance.dispatchAction({
    type: "highlight",
    seriesIndex: 0,
    dataIndex: curIndex,
  });

  // 设置text
  instance.setOption(
    {
      title: {
        show: true,
        text: `${data[curIndex].value}{unit|个}`,
        subtext: data[curIndex].name,
      },
    },
    false, //merge
  );
  // 实例给你了, 可以做好多事
}
</script>

<style lang="scss" scoped></style>

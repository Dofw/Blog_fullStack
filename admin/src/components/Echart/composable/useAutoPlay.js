import { onMounted, onUnmounted, ref, watch } from "vue";

/**
 *
 * @param {Ref} componentInstance Echart组件实例
 * @param {Object} options data(数据要求为响应式数据Ref)、duration(间隔)、index(初始第几个), seriesIndex(指定series中某一个serie)、cb(扩展函数)接受2个参数(echartInstance, data)
 */
export default function useAutoPlay(componentInstance, options) {
  const { duration, index, seriesIndex, data, cb } = options;
  // setup环境中只运行一次
  const myChartInstance = ref(null);
  const playDuration = duration || 5000;
  const $seriesIndex = seriesIndex || 0;
  let autoIndex = index || 0;
  let autoPreIndex = index || 0;
  let autoPlayTimer = null;

  onMounted(() => {
    myChartInstance.value = componentInstance.value.instance;
    start(data.value, cb);
  });

  watch(
    () => {
      return data.value;
    },
    (val) => {
      start(val, cb);
    },
  );

  onUnmounted(() => {
    clearInterval(autoPlayTimer);
  });

  /**
   * 调用时机在mounted、watch, 实例存在。
   */
  function start(data, cb) {
    myChartInstance.value.dispatchAction({
      type: "highlight",
      seriesIndex: $seriesIndex,
      dataIndex: autoIndex,
    });

    if (Array.isArray(data) && data.length > 0) {
      autoPlay(data, cb);
    }
  }

  /**
   * 自动播放
   * @param {*} data useAutoPlay的第二个参数
   * @param {*} fn 扩展函数
   */
  function autoPlay(data, fn) {
    if (!myChartInstance.value) {
      return;
    }

    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
    }

    autoPlayTimer = setInterval(() => {
      if (data.length === 0) {
        return;
      }

      if (autoIndex > data.length - 1) {
        autoIndex = 0;
      }
      // 先清除
      myChartInstance.value.dispatchAction({
        type: "downplay",
        seriesIndex: $seriesIndex,
        dataIndex: autoPreIndex,
      });

      // 扩展功能由使用者定义
      if (typeof fn === "function") {
        fn(myChartInstance.value, data, autoIndex, autoPreIndex);
      }

      myChartInstance.value.dispatchAction({
        type: "highlight",
        seriesIndex: $seriesIndex,
        dataIndex: autoIndex,
      });
      autoPreIndex = autoIndex++;
    }, playDuration);
  }
}

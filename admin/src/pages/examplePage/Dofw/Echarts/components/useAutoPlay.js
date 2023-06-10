import { onMounted, onUnmounted, ref, watch } from "vue";
// import { debounce2 } from "@/utils/utils";

/**
 *
 * @param {Ref} componentInstance Echart组件实例
 * @param {Object} options data(数据要求为响应式数据Ref)、duration(间隔)、index(初始第几个), seriesIndex(指定series中某一个serie)、cb(扩展函数)接受2个参数(echartInstance, data)
 */
export default function useAutoPlay(componentInstance, options) {
  const { duration, index, seriesIndex, data, cb, onEvents, isPlay } = options;
  // setup环境中只运行一次
  const myChartInstance = ref(null);
  const playDuration = duration || 5000;
  const $seriesIndex = seriesIndex || 0;
  const $onEvents = onEvents || {};
  const $isPlay = isPlay || false;
  let autoIndex = index || 0;
  let autoPreIndex = index || 0;
  let autoPlayTimer = null;

  onMounted(() => {
    myChartInstance.value = componentInstance.value.instance;
    // 绑定事件
    bindEvent($onEvents, start2, end2);
    // 开启播放
    if ($isPlay) {
      start(data.value, cb);
    }
  });

  onUnmounted(() => {
    //解绑事件
    unBindEvent();
    //清楚定时器
    clearInterval(autoPlayTimer);
  });

  watch(
    () => {
      return data.value;
    },
    (val) => {
      if ($isPlay) {
        start(val, cb);
      }
    },
  );

  const wrapperEvents = {};
  /**
   * 绑定事件
   */
  function bindEvent(events, start2, end2) {
    if (Object.prototype.toString.call(events) !== "[object Object]") {
      console.warn(
        "useAutoPlay的options.onEvents 是如下格式 {eventName: func}",
      );
      return;
    }

    if (myChartInstance.value) {
      // event的函数包装成高阶函数，传递额外参数
      const names = Object.keys(events);
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        if (typeof events[name] !== "function") {
          console.error("useAutoPlay中传递的onEvent内部事件不是函数！");
        }

        // //加防抖的事件
        // if (name === "mouseout") {
        //   const debounceFunc = debounce2(events[name], 120);
        //   wrapperEvents[name] = (e) => {
        //     return debounceFunc(e, start2, end2);
        //   };
        // } else {
        //   wrapperEvents[name] = (e) => {
        //     return events[name](e, start2, end2);
        //   };
        // }

        wrapperEvents[name] = (e) => {
          return events[name](e, start2, end2);
        };

        myChartInstance.value.on(name, wrapperEvents[name]);
      }
    }
  }

  /**
   * 解绑事件
   */
  function unBindEvent() {
    if (myChartInstance.value) {
      const names = Object.keys(wrapperEvents);
      for (let i = 0; i < names.length; i++) {
        myChartInstance.value.off(names[i], wrapperEvents[names[i]]);
      }
    }
  }

  /**
   * 调用时机在mounted、watch, 实例存在。
   */
  function start(data, cb) {
    myChartInstance.value.dispatchAction({
      type: "highlight",
      seriesIndex: $seriesIndex,
      dataIndex: autoIndex,
    });

    if (Array.isArray(data)) {
      autoPlay(data, cb);
    }
  }

  /**
   * 外部开启自动播放函数
   */
  function start2() {
    if ($isPlay) {
      autoPlay(data.value, cb);
    }
  }

  /**
   * 外部结束自动播放
   */
  function end2() {
    clearInterval(autoPlayTimer);
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
      if (!data || data.length === 0) {
        clearInterval(autoPlayTimer);
        return;
      }

      if (autoIndex > data.length - 1) {
        autoIndex = 0;
      }

      // 扩展功能由使用者定义
      if (typeof fn === "function") {
        fn(myChartInstance.value, data, autoIndex, autoPreIndex);
      }

      autoPreIndex = autoIndex++;
    }, playDuration);
  }
}

import { defineStore } from "pinia"

export const useTestStore = defineStore("test", {
  //这里使用箭头函数，否则ts提示state.count不存在
  state: () => {
    return {
      count: 1
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  },
  actions: {
    reset() {
      this.count
    }
  }
})

// 使用setup模式定义
import { ref } from "vue"
export const useCounterStoreForSetup = defineStore("counterForSetup", () => {
  const count = ref<number>(1)
  function increment() {
    count.value++
  }

  function doubleCount() {
    return count.value * 2
  }

  return { count, increment, doubleCount }
})

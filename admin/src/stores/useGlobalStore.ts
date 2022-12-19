import { defineStore } from "pinia"
import { ref } from "vue"

export default defineStore("globalStore", () => {
  // menu 缩放
  const isCollapse = ref(false)

  return {
    isCollapse
  }
})

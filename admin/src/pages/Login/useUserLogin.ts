import { ref } from "vue"
import { loginApi } from "@/api/login"
import { ElMessage } from "element-plus"

/**
 * 1.登录后，保存相关信息
 * 2.退出后，清除
 */
const userInfo = ref()

export default function useUserLogin() {
  // menu 缩放
  const loading = ref(false)
  const login = async (params) => {
    try {
      loading.value = true
      const res = await loginApi(params)
      loading.value = false
      userInfo.value = res.data
      ElMessage.success("登录成功")
    } catch (error) {
      ElMessage.error("登录异常")
    }
  }

  const logout = async () => {
    userInfo.value = null
  }

  return {
    userInfo,
    login,
    logout,
    loading
  }
}

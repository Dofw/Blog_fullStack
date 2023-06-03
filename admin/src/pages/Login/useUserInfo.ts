import { ref } from "vue"

interface UserInfo {
  username: string
}

const userInfoRef = ref<UserInfo>({
  username: ""
})

export function useUserInfo() {
  const setUser = (payload: UserInfo) => {
    userInfoRef.value = payload
  }

  return {
    userInfoRef,
    setUser
  }
}

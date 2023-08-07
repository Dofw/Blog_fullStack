<template>
  <div class="x-ground--glass">
    <div class="x-login--wrapper">
      <p>
        TopFullStack:
        <span v-if="loading">loading...</span>
        <span v-if="!loading && !userInfo">请登录</span>
        <span v-if="!loading && userInfo">{{ userInfo.username }}</span>
      </p>
      <el-form>
        <el-row>
          <el-col>
            <el-form-item>
              <XInput label="username" v-model="loginFormRef.username" />
            </el-form-item>
          </el-col>

          <el-col class="mt-4">
            <el-form-item>
              <XInput label="password" v-model="loginFormRef.password" :showPassword="true" />
            </el-form-item>
          </el-col>

          <el-col class="mt-4">
            <el-form-item>
              <VerifyImg :isPass="isPassRef" @update-pass="updatePass" />
            </el-form-item>
          </el-col>

          <el-col class="mt-4">
            <el-button @click="wrapLogin" size="large">登录</el-button>
            <el-button @click="logout" size="large">退出</el-button>
          </el-col>

          <el-col class="mt-5 auth2-img">
            <p>微信、QQ授权登录</p>
            <img src="@/assets/imgs/QQ.png" alt="" />
            <img src="@/assets/imgs/weixin.png" alt="" />
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import useUserLogin from "@/pages/Login/useUserLogin"
import { ref, watch } from "vue"
import XInput from "@/components/XInput/index.vue"
import VerifyImg from "./VerifyImg.vue"
import { ElMessage } from "element-plus"

const loginFormRef = ref({
  username: "admin1",
  password: "admin1"
})

const { userInfo, loading, login, logout } = useUserLogin()

const isPassRef = ref(false)
function resetPass() {
  isPassRef.value = false
}
const updatePass = (val) => {
  isPassRef.value = val
}

const wrapLogin = async () => {
  if (!isPassRef.value) ElMessage.warning("请先验证图片!")
  try {
    await login(loginFormRef.value)
  } catch (error) {
    resetPass()
  }
}
watch(loginFormRef.value, () => {
  resetPass()
})
</script>

<style scoped lang="scss">
.x-ground--glass {
  position: fixed;
  top: 15px;
  right: 20px;

  width: 40%;
  height: calc(100vh - 30px);

  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(2px);
  -webkit-backdrop-filter: blur(2px);
  border-radius: 10px;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  > .x-login--wrapper {
    width: 55%;
    height: 70%;
    // border: $border;

    > p {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 60px;
      color: #fff;
      font-weight: bold;
      font-size: 20px;
    }

    .auth2-img {
      > p {
        margin-bottom: 14px;
      }
      > img {
        // border: $border;
        width: 40px !important;
        margin-right: 15px;

        cursor: pointer;
      }
    }
  }
}
</style>

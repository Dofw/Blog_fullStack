<template>
  <div class="x-animation-container" ref="scrollRef">
    <div class="x-animation-content">
      <div class="top"></div>
      <div class="center">
        <div class="sticky" ref="boxRef">
          <template v-for="row in 2">
            <div class="item" v-for="col in 5" :data-index="`${row}-${col}`">
              {{ `${row}-${col}` }}
            </div>
          </template>
        </div>
      </div>
      <div class="footer"></div>
    </div>
  </div>
  <!-- <div class="x-ground--glass">
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
  </div> -->
</template>

<script setup lang="ts">
import useUserLogin from "@/pages/Login/useUserLogin"
import { ref, watch, onMounted } from "vue"
import XInput from "@/components/XInput/index.vue"
import VerifyImg from "./VerifyImg.vue"
import { ElMessage } from "element-plus"
import { getItemsPos, getItemsCenterPos, updateItemsStatus, initAnimationMaps } from "."

const loginFormRef = ref({
  username: "admin1",
  password: "admin1"
})
const boxRef = ref(null)
const scrollRef: any = ref(null)
onMounted(() => {
  const allItems = document.querySelectorAll(".sticky .item")
  const globalCtx = {
    areaBox: boxRef.value,
    items: allItems
  }

  // 初始化4个状态。
  initAnimationMaps(globalCtx)

  scrollRef.value.addEventListener(
    "scroll",
    function (e) {
      const scroll = e.target.scrollTop
      updateItemsStatus(scroll, globalCtx)
    },
    true
  )

  window.addEventListener("resize", () => {
    // 初始化4个状态。
    initAnimationMaps(globalCtx)
  })
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

.x-animation-container {
  width: 100%;
  height: 100%;
  border: $border;

  // overflow-y: scroll;
  overflow: scroll;

  .x-animation-content {
    width: 100%;
    height: 600%;

    position: relative;

    .top {
      width: 100%;
      height: 17%;
      background-color: rgb(206, 227, 206);
    }
    .center {
      width: 100%;
      height: 66%;
      background-color: #000;
      display: flex;
      justify-content: center;

      .sticky {
        position: sticky;
        top: 20%;
        background-color: #f1f1f1;
        width: 80%;
        height: 500px;

        // display: grid;
        // grid-template-columns: repeat(5, 100px);
        // grid-template-rows: repeat(2, 100px);

        // justify-content: center;
        // align-content: center;

        // align-items: center;
        // justify-items: center;

        .item {
          position: absolute;
          background-color: #fff;
          width: 50px;
          height: 50px;
          line-height: 50px;
          border-radius: 7px;
          text-align: center;
        }
      }
    }
    .footer {
      width: 100%;
      height: 17%;
      background-color: yellow;
    }
  }
}
</style>

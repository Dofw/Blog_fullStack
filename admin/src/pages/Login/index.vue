<template>
  <div class="x-login--pager">
    <div class="x-ground--glass">
      <div class="x-login--wrapper">
        <p>TopFullStack</p>
        <el-form>
          <el-row>
            <el-col>
              <el-form-item>
                <XInput label="username" v-model.lazy="loginFormRef.username" />
              </el-form-item>
            </el-col>

            <el-col style="margin-top: 20px">
              <el-form-item>
                <XInput label="password" v-model="loginFormRef.password" :showPassword="true" />
              </el-form-item>
            </el-col>

            <el-col style="margin-top: 20px">
              <el-form-item>
                <XInput label="验证码" v-model="loginFormRef.password" :showPassword="true" />
              </el-form-item>
            </el-col>

            <el-col>
              <el-button @click="onLogin" size="large">登录</el-button>
            </el-col>

            <el-col> 代理 </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import { loginApi } from "@/api/login"

import { ref } from "vue"
import { ElMessageBox } from "element-plus"
import XInput from "@/components/XInput/index.vue"

const loginFormRef = ref({
  username: "admin",
  password: "admin"
})

const onLogin = async () => {
  try {
    await loginApi(loginFormRef.value)
    ElMessage.success("登录成功!")
  } catch (error) {
    console.log("错误", error)
    ElMessage.error("登录失败!")
  }
}
</script>

<style scoped lang="scss">
.x-login--pager {
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: end;
  align-items: center;

  .x-ground--glass {
    position: absolute;
    top: 15px;
    right: 0;

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
    }
  }
}
</style>

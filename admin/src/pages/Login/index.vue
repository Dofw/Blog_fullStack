<template>
  <div class="login-container">
    <el-button>所有的按钮</el-button>
    <el-button>所有的按钮</el-button>
    <el-button>所有的按钮</el-button>
    <div class="ground-glass">
      <el-form>
        <el-row>
          <el-col>
            <el-form-item label="自定义Input">
              <XInput />
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="账号">
              <el-input v-model="loginFormRef.username"></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-form-item label="密码">
              <el-input v-model="loginFormRef.password"></el-input>
            </el-form-item>
          </el-col>

          <el-col>
            <el-button @click="onLogin">登录</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus"
import { loginApi } from "@/api/login"

import { ref } from "vue"
import { ElMessageBox } from "element-plus"
import XInput from "@/components/XInput/index.vue"

const drawer2 = ref(true)
const radio1 = ref("Option 1")
const handleClose = (done: () => void) => {
  ElMessageBox.confirm("Are you sure you want to close this?")
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
function cancelClick() {
  drawer2.value = false
}
function confirmClick() {
  ElMessageBox.confirm(`Are you confirm to chose ${radio1.value} ?`)
    .then(() => {
      drawer2.value = false
    })
    .catch(() => {
      // catch error
    })
}

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
.login-container {
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: end;
  align-items: center;

  .ground-glass {
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
  }
}
</style>

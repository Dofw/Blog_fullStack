<template>
  <div class="login-container">
    <el-form>
      <el-row>
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
</template>

<script setup lang="ts">
import { ref } from "vue"
import { ElMessage } from "element-plus"

const loginFormRef = ref({
  username: "admin",
  password: "admin"
})

const onLogin = async () => {
  // await LoginApi()
  ElMessage.success("登录成功!")
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

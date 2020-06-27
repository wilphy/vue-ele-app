<template>
  <div class="login">
    <div class="logo">
      <img src="../assets/logo.jpg" alt="" />
    </div>

    <!-- 手机号 -->
    <input-group
      type="number"
      v-model="phone"
      placeholder="手机号"
      :btnTitle="btnTitle"
      :disabled="disabled"
      :error="errors.phone"
      @btnClick="getVerifyCode"
    />

    <!-- 验证码 -->
    <input-group
      type="number"
      v-model="verifyCode"
      placeholder="验证码"
      :error="errors.code"
    />

    <!-- 用户协议 -->
    <div class="login-des">
      <p>新用户登录即自动注册, 表示已同意<span>《服务协议》</span></p>
    </div>

    <!-- 登录按钮 -->
    <div class="login-btn">
      <button :disabled="isClick" @click="handleLogin">登录</button>
    </div>
  </div>
</template>

<script>
import InputGroup from "../components/inputGroup"

export default {
  name: "login",
  components: {
    InputGroup,
  },
  data() {
    return {
      phone: "",
      verifyCode: "",
      errors: {},
      btnTitle: "获取验证码",
      disabled: false,
    }
  },
  computed: {
    isClick() {
      if (!this.phone || !this.verifyCode) return true
      else return false
    },
  },
  methods: {
    handleLogin() {
      // 重置错误信息
      this.errors = {}
      localStorage.setItem("ele_login", true)
      this.$router.push("/")

      // 发起请求
      //   this.$axios
      //     .post("/api/posts/sms_back", {
      //       phone: this.phone,
      //       code: this.verifyCode,
      //     })
      //     .then((res) => {
      //       console.log(res)

      //       // 检验通过, 设置登录状态并跳转
      //       localStorage.setItem("ele_login", true)
      //       this.$router.push("/")
      //     })
    },
    getVerifyCode() {
      if (this.validatePhone()) {
        this.validateBtn()
        alert("已发送,请注意查收")
        // 发起网络请求
        // this.$axios.post("/api/posts/sms_send", {})
      }
    },

    // 手机号验证
    validatePhone() {
      // 验证手机号码
      if (!this.phone) {
        this.errors = {
          phone: "手机号码不能为空",
        }
        return false
      } else if (!/^1[3456789]\d{9}$/.test(this.phone)) {
        this.errors = {
          phone: "请填写正确的手机号码",
        }
        return false
      } else {
        this.errors = {}
        return true
      }
    },

    // 倒计时
    validateBtn() {
      let time = 60
      let timer = setInterval(() => {
        if (time === 0) {
          clearInterval(timer)
          this.btnTitle = "获取验证码"
          this.disabled = false
        } else {
          // 倒计时
          this.btnTitle = time + "秒后重试"
          this.disabled = true
          time--
        }
      }, 1000)
    },
  },
}
</script>

<style>
.login {
  width: 100%;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;
  background-color: #fff;
}
.logo {
  text-align: center;
}
.logo img {
  width: 150px;
}

.text-group,
.login-des,
.login-btn {
  margin-top: 20px;
}
.login-des {
  color: #aaa;
  line-height: 22px;
}
.login-des span {
  color: #4d90fe;
}
.login-btn button {
  width: 100%;
  height: 40px;
  background-color: #48ca38;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  border: none;
  outline: none;
}
.login-btn button[disabled] {
  background-color: #b6ebaf;
}
</style>

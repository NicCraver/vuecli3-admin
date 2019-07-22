<template>
  <div class="login-container" :style="loginContainerStyle">
    <pointwave :color="0x097bdb" />
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">vue admin layout</h3>
      </div>
      <el-form-item prop="username">
        <span class="svg-container">
          <img src="../../assets/img/admin.png" alt="">
        </span>
        <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text" tabindex="1" auto-complete="on" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <img src="../../assets/img/password2.png" alt="">
        </span>
        <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
        <span class="show-pwd" @click="showPwd">
          <img v-if="passwordType" src="../../assets/img/openeyes.png" alt="">
          <img v-else src="../../assets/img/closeeyes.png" alt="">
        </span>
      </el-form-item>
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
      <div class="tips">
        <span style="margin-right:20px;">username: any</span>
        <span> password: any</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import Cookies from "js-cookie";
import Pointwave from "@/components/Pointwave";
import backgroundImg from "@/assets/img/background.png";

export default {
  name: "Login",
  components: {
    Pointwave
  },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码不能少于6位数"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin-layout",
        password: "123456"
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      loading: false,
      passwordType: "password",
      redirect: undefined
    };
  },
  computed: {
    loginContainerStyle() {
      return {
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "50%"
      };
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          Cookies.set("Admin-Token", "token!!!");
          this.$router.push("/");
          this.loading = true;
          // this.$api
          //   .get("login")
          //   .then(res => {
          //     console.log(res.data);
          //     Cookies.set("Admin-Token", "token!!!");
          //     console.log("Cookies :", Cookies.get("Admin-Token"));
          //     this.loading = false;
          //     this.$router.push("/");
          //   })
          //   .catch(err => {
          //     console.log("err", err);
          //     this.loading = false;
          //   });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    LoginMessage() {
      var now = new Date();
      var hour = now.getHours();
      var titleMessage = "";
      if (hour < 6) {
        titleMessage = "凌晨好,";
      } else if (hour < 9) {
        titleMessage = "早上好,";
      } else if (hour < 12) {
        titleMessage = "上午好,";
      } else if (hour < 14) {
        titleMessage = "中午好,";
      } else if (hour < 17) {
        titleMessage = "下午好,";
      } else if (hour < 19) {
        titleMessage = "傍晚好,";
      } else if (hour < 22) {
        titleMessage = "晚上好,";
      } else {
        titleMessage = "晚上好,";
      }
      this.$notify({
        title: "欢迎",
        message: titleMessage + "欢迎回来！",
        type: "success",
        offset: 50
      });
    }
  }
};
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}
/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #15255b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 140px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 0px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 35px;
    display: inline-block;
    img {
      width: 18px;
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}

#indexLizi {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
  overflow: hidden;
}
</style>

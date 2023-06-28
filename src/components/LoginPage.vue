<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title>
            <h2 class="headline">登录</h2>
          </v-card-title>
          <v-card-text style="text-align: left">
            <span>没有账户？</span><a @click="jumptoRegister" style="color: #e0713f">注册</a>
          </v-card-text>
          <v-card-text>
            <v-form >
              <v-text-field
                  v-model="account"
                  label="账户"
                  required
                  dense
                  :error-messages="errors.account"
                  :rules="accountRules"
              ></v-text-field>
              <v-text-field style="margin-top: 20px"
                  v-model="password"
                  label="密码"
                  required
                  dense
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                   @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  :error-messages="errors.password"
                  :rules="passwordRules"
              ></v-text-field>
              <v-btn @click="login"  class="my-4" block  color="#e0713f"><span style="color: white">登录</span></v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon class="mr-2" @click="loginWithThirdParty('wechat')">
              <v-icon size="24px">mdi-wechat</v-icon>
            </v-btn>
            <v-btn icon class="mr-2" @click="loginWithThirdParty('youkan')">
              <v-icon size="24px">mdi-account</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <!-------------------------遮罩----------------------------->
    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
    <!-------------------------提示----------------------------->
    <v-alert :type="alertType"
             color="#e0713f"
             dense
             transition="scale-transition"
             :value="showAlert">
      {{ alertText }}
    </v-alert>
  </v-container>
</template>

<script>
import {post} from "@/api/Request";
import apiPath from "@/api/ApiPath";

export default {
  name: "LoginPage",
  data() {
    return {
      overlay: false,
      account: '',
      showPassword:false,
      alertType: 'success',
      alertText: '登陆成功！',
      showAlert: false,
      password: '',
      errors: {
        account: '',
        password: '',
      },
      accountRules: [
        (v) => !!v || '账户不能为空',
        (v) => /^[a-zA-Z][a-zA-Z0-9_]{4,18}$/.test(v) || '长度4~18 ,字母开头，允许字母数字下划线',
      ],
      passwordRules: [
        (v) => !!v || '密码不能为空',
        (v) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/.test(v) ||  '长度6~18 ,必须包含大小写字母和数字的组合，可以使用特殊字符',
      ],
    };
  },
  computed: {
  },
  async mounted() {
    // 若存在token信息
    if(localStorage.getItem('Authorization')){
      // checktoken
      let res =await post(apiPath.CHECK_TOKEN_URL,localStorage.getItem('Authorization'));
      console.log(res);
    }
  },
  methods: {
    // 跳转注册
    jumptoRegister() {
      this.$router.push('/register');
    },
    async login() {
      this.overlay = true
      // 执行登录逻辑
      if(this.validateForm()){
        // 验证成功请求后台数据
        let params = {
          username: this.account,
          password: this.password,
        }
        // 请求 登录接口
        let res = await post(apiPath.LOGIN_URL,params)
        console.log(res)
        // 登录成功
        if(res.success && res.ret === 1){
          this.overlay = false
          localStorage.setItem("Authorization", res.data.token.access_token)
          this.alertType = 'success'
          this.alertText=res.msg
          this.showAlert=true
          setTimeout(() => {
            this.showAlert=false
            this.$router.push('/home')
          }, 1500)
        }else {  //登录失败
          this.overlay = false
          this.alertType='error'
          this.alertText=res.msg
          this.showAlert=true
          setTimeout(() => {
            this.showAlert=false
          }, 1500)
        }
      }


      // 发送登录请求，处理登录结果
    },
    // 验证表单
    validateForm() {
      this.errors = {};

      if (!this.account) {
        this.errors.account = '请输入用户名';
      } else if(!this.validateUsername(this.account)) {
        this.errors.account = '长度4~18 ,字母开头，允许字母数字下划线';
      }
      if (!this.password) {
        this.errors.password = '请输入密码';
      } else if (!this.validatePassword(this.password)) {
        this.errors.password = '长度6~18 ,必须包含大小写字母和数字的组合，可以使用特殊字符';
      }
      return Object.keys(this.errors).length === 0;
    },
    validateUsername(username) {
      return /^[a-zA-Z][a-zA-Z0-9_]{4,18}$/.test(username)
    },
    validatePassword(password) {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/.test(password);
    },
    loginWithThirdParty(provider) {
      // 根据 provider 执行第三方登录逻辑
      switch (provider) {
        case 'wechat':
          // 执行微信登录逻辑
          break;
        case 'youkan':
          // 执行优勘账号登录逻辑
          break;
        default:
          break;
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    }
  },
}
</script>

<style scoped>

</style>
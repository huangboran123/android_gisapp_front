<template>
  <v-container fluid>
    <v-card>
      <v-card-title>
        <h2 class="headline">注册</h2>
      </v-card-title>
      <v-card-text style="text-align: left">
        <span>已有账户？</span><a @click="jumptoLogin" style="color: #e0713f">登录</a>
      </v-card-text>
        <div class="card-content">
          <v-form>
          <v-text-field
              v-model="username"
              label="用户名"
              @input="validateUsernameInput(username)"
              :error-messages="errors.username"
          ></v-text-field>

          <v-text-field
              v-model="email"
              label="Email"
              @input="validateEmailInput(email)"
              :error-messages="errors.email"
          ></v-text-field>

          <v-text-field
              v-model="password"
              label="密码"
              @input="validatePasswordInput(password)"
              type="password"
              :error-messages="errors.password"
          ></v-text-field>

          <v-text-field
              v-model="phoneNumber"
              label="手机号"
              @input="validatePhoneInput(phoneNumber)"
              :error-messages="errors.phoneNumber"
          ></v-text-field>

          <v-checkbox
              v-model="agreePolicy"
              label="同意隐私政策"
              :error-messages="errors.agreePolicy"
              color="agreePolicycolor"
          ></v-checkbox>

          <v-btn @click="register" class="my-4" block  color="#e0713f"><span style="color: white">创建账户</span></v-btn>
      </v-form>
        </div>

    </v-card>
    <!-------------------------遮罩----------------------------->
    <v-overlay :value="overlay">
      <v-progress-circular
          indeterminate
          size="64"
      ></v-progress-circular>
    </v-overlay>
     <!------------------------对话框---------------------------->
    <v-dialog
        v-model="dialog"
        max-width="290"
    >
      <v-card>
        <v-card-title class="text-sm-h5">
          {{title}}
        </v-card-title>
        <v-card-text>
          <ul>
            <li v-for="item in bindingresult" :key="item.field">{{ item.defaultMessage }}</li>
          </ul>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="green darken-1"
              text
              @click="processRegister(ret,false)"
          >
            否
          </v-btn>

          <v-btn
              color="green darken-1"
              text
              @click="processRegister(ret,true)"
          >
            是
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>


</template>

<script>
import {post} from "@/api/Request";
import apiPath from "@/api/ApiPath";
//import VConsole from 'vconsole'
export default {
  name: "RegisterPage",
  created() {
    //this.vconsole = new VConsole();
  },
  mounted() {
    //this.vconsole.show()
  }
  ,
  data(){
    return {
      bindingresult: [],
      ret : 0,
      title: '',
      dialog: false,
      overlay: false,
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      agreePolicy: true,
      agreePolicycolor:'black',
      errors: {
        username: '',
        email: '',
        password: '',
        phoneNumber: '',
        agreePolicy: ''
      },
    }
  },
  watch: {
    overlay(val){
      val && setTimeout(() => {
        this.overlay = false
      }, 5000)
    },
    agreePolicy: {
      handler(newVal) {
        this.validateAgreePolicyInput(newVal);
      },
      immediate: true,
    },

  },
  methods: {
    // 表单提交
    async register() {
      // 添加遮罩
      this.overlay = true
      if (this.validateForm()) {
        let params = {
          username: this.username,
          email: this.email,
          password: this.password,
          phone: this.phoneNumber,
          agreePolicy: this.agreePolicy
        }
        // 请求 接口 
       let res = await post(apiPath.REGISTER_URL,params)
        console.log(res)
        this.bindingresult = []
        this.ret = res.ret
        switch (res.ret) {
          case 1:
            this.overlay = false
            // 注册成功
            this.title = '注册成功！是否登录？'
            this.dialog = true
            break
          case 99:
          case 98:
            this.overlay = false
            //服务器处理失败
            this.title = '注册失败！请稍后再试。'
            this.dialog = true
            break
          case 97:
            //数据验证错误
            this.overlay = false
            this.title = '数据验证失败！请检查。'
            this.bindingresult = res.results[0]
            this.dialog = true
            break
          case 96:
            this.overlay = false
            this.title = '已存在！请检查。'
            this.bindingresult = [{field:1,defaultMessage:res.msg}]
            this.dialog = true
            break
          default:
            this.overlay = false
            this.title = '请求超时！请稍后再试。'
            this.dialog = true
            //后台请求超时
        }
        // 重置表单数据
/*        this.username = '';
        this.email = '';
        this.password = '';
        this.phoneNumber = '';
        this.agreePolicy = false;*/
      } else {
        this.overlay = false
      }

    },
    // 跳转登录
    jumptoLogin() {
      this.$router.push('/login');
    },
    processRegister(ret,val) {
      this.dialog = false
      console.log('对话框状态:',ret,val)
      switch (ret){
        case 1:
          //成功
          if(val) {
            this.jumptoLogin()
          }
          break
        case 99:
        case 98:
          //服务器处理失败
          break
        case 97:
          //数据验证错误
          break
        default:
          //后台请求超时
      }
    },
    // 验证表单
    validateForm() {
      this.errors = {};

      if (!this.username) {
        this.errors.username = '请输入用户名';
      } else if(!this.validateUsername(this.username)) {
        this.errors.username = '长度4~18 ,字母开头，允许字母数字下划线';
      }

      if (!this.email) {
        this.errors.email = '请输入邮箱';
      } else if (!this.validateEmail(this.email)) {
        this.errors.email = '邮箱格式不正确';
      }

      if (!this.password) {
        this.errors.password = '请输入密码';
      } else if (!this.validatePassword(this.password)) {
        this.errors.password = '长度6~18 ,必须包含大小写字母和数字的组合，可以使用特殊字符';
      }

      if (!this.phoneNumber) {
        this.errors.phoneNumber = '请输入手机号';
      } else if (!this.validatePhone(this.phoneNumber)) {
        this.errors.phoneNumber = '手机号码要符合中国大陆手机号';
      }

      if (!this.agreePolicy) {
        this.errors.agreePolicy = '需同意隐私政策';
      }

      return Object.keys(this.errors).length === 0;
    },

    validateEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    },
    validateUsername(username) {
      return /^[a-zA-Z][a-zA-Z0-9_]{4,18}$/.test(username)
    },
    validatePassword(password) {
      return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/.test(password);
    },
    validatePhone(phoneNumber) {
      return /^1[3456789]\d{9}$/.test(phoneNumber);
    },
    // 输入时动态验证
    validateUsernameInput(username){
      this.errors.username = !username
          ? '请输入用户名'
          : /^[a-zA-Z][a-zA-Z0-9_]{4,18}$/.test(username)
              ? ''
              : '长度4~18 ,字母开头，允许字母数字下划线';
    },
    validatePhoneInput(phoneNumber){
      this.errors.phoneNumber = !phoneNumber
          ? '请输入手机号'
          : /^1[3456789]\d{9}$/.test(phoneNumber)
              ? ''
              : '手机号码要符合中国大陆手机号';
    },
    validatePasswordInput(password){
      this.errors.password = !password
          ? '请输入密码'
          : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,18}$/.test(password)
              ? ''
              : '长度6~18 ,必须包含大小写字母和数字的组合，可以使用特殊字符';
    },
    validateAgreePolicyInput(agreePolicy){
      this.errors.agreePolicy = !agreePolicy
          ? '需同意隐私政策' : '';
      this.agreePolicycolor  = !agreePolicy
          ? 'red' : 'black';
    },
    validateEmailInput(email){
      this.errors.email = !email
          ? '请输入邮箱'
          : /\S+@\S+\.\S+/.test(email)
              ? ''
              : '邮箱格式不正确';
    },
  }
}
</script>

<style scoped>
.textfieldWidth {
  width: 300px;

}

.card-content {
  padding: 0 20px 20px 20px; /* 设置内边距为 20px */
}

</style>
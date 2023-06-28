
<template>
<v-app>
  <v-app-bar  color="#e0713f"  app>
    <v-toolbar-title style="color: white;"  @click="jumptoHome">
     外业空间
    </v-toolbar-title>
    <v-spacer></v-spacer>
      <v-btn outlined rounded color="white" @click="jumptoLogin" v-show="!islogined"   text>登录</v-btn>
    <v-menu v-if="islogined"
        transition="slide-y-transition"
        bottom right
        min-width="180px"
        rounded
        offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
            icon
            x-large
            v-on="on">
          <v-avatar color="#e0713f" >
            <v-icon dark>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </v-btn>
      </template>
      <v-card>
        <v-list-item-content class="justify-center">
          <div class="mx-auto text-center">
            <v-avatar
                color="#e0713f">
              <span class="white--text text-h5">{{avatarname}}</span>
            </v-avatar>
            <h3>{{ username }}</h3>
            <p class="text-caption mt-1">
              {{ email }}
            </p>
            <v-divider class="my-3"></v-divider>
            <v-btn
                depressed
                rounded
                text>
              购买会员
            </v-btn>
            <v-divider class="my-3"></v-divider>
            <v-btn @click="logout"
                depressed
                rounded
                text>
              退出登录
            </v-btn>
          </div>
        </v-list-item-content>
      </v-card>
    </v-menu>
  </v-app-bar>

  <!-------------------------遮罩----------------------------->
  <v-overlay :value="overlay">
    <v-progress-circular
        indeterminate
        size="64"
    ></v-progress-circular>
  </v-overlay>
<v-main style="padding: 0 0 36px">
  <!-- 给应用提供合适的间距 -->
  <v-container fluid>

    <!-- 如果使用 vue-router -->
    <router-view></router-view>
  </v-container>
</v-main>

  <v-footer app color="#e0713f">
    <span  style="color: white;font-size: 9px; text-align: center" >©2022 武汉优土优木科技有限公司 武汉优土优木数字科技有限公司 版权所有</span>
  </v-footer>
</v-app>
</template>
<script>

export default {
  name: 'App',
  components: {
  },
  mounted() {
    console.log('是否已登录',this.islogined)
    document.title = "UTUM GIS应用";
  },
  data() {
    return {
      overlay: false,
      items: [
        {title: '首页'},
        {title: '产品介绍'},
        {title: '购买会员'},
        {title: '联系我们'},
        {title: '关于'},
      ]
    }
  },
  computed:{
    islogined (){
      return this.$store.state.username !==undefined
    },
    username(){
      return this.$store.state.username
    },
    userid(){
      return this.$store.state.userid
    },
    email(){
      return this.$store.state.email
    },
    avatarname(){
      let username = this.$store.state.username
      if(username){
        return username.length>4 ? username.substr(0,3):username
      } else {
        return ''
      }

    }
  },
  methods: {
    //跳转登录页面
    jumptoLogin() {
      setTimeout(() => {
        // 动画完成后进行页面跳转
        this.$router.push('/login');
      }, 400);
    },
    // 跳转首页
    jumptoHome() {
      setTimeout(() => {
        // 动画完成后进行页面跳转
        this.$router.push('/home');
      }, 200);
    },
    // 登出
    async logout(){
      // 重置状态
      this.overlay = true
      setTimeout(()=>{
        localStorage.removeItem('Authorization')
        this.$store.commit("setuserinfo",{})
        this.overlay = false
      },800)


    }

  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
 .white-border {
   border-color: white !important;
 }
</style>

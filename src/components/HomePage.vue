<template>
  <v-container fluid>
    <v-card class="v-card-margin">
      <v-card-title>
        <h2 class="headline">GIS变得更加容易</h2>
      </v-card-title>
      <v-card-text>
        <p>使用 Web 浏览器在几分钟内创建您的 GIS。 上传您的地理数据。 制作不限次数的网络地图。 与世界各地的朋友和同事分享您的地理数据。</p>
         <v-btn  color="primary" @click="jumptoRegister" :disabled="isAnimating" text><span style="color: #e0713f">创建Web GIS账户</span></v-btn>
      </v-card-text>
    </v-card>

    <v-card class="v-card-margin">
      <v-card-title>
        <h2 class="headline">产品特点</h2>
      </v-card-title>
      <v-card-text>
        <!-- 产品特点 -->
        <v-row>
          <v-col cols="12">
            <ul >
              <li>功能强大的地图展示和分析工具</li>
              <li>支持多种地理数据格式和数据源</li>
              <li>实时位置定位和导航功能</li>
              <li>可自定义图层和标记样式</li>
              <li>高度可定制的地图交互和操作</li>
            </ul>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>


    <v-card class="v-card-margin">
      <v-card-title>
        <h2 class="headline">产品截图</h2>
      </v-card-title>
      <v-card-text>
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col cols="6" md="4" v-for="screenshot in screenshots" :key="screenshot.id">
                <v-img :src="screenshot.image" alt="产品截图"></v-img>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
      <!-- 产品截图 -->
    <v-card>
      <v-card-text>
        <v-btn  color="primary" @click="downloadApp" text><span style="color: #e0713f">下载GIS应用</span></v-btn>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import {post} from "@/api/Request";
import apiPath from "@/api/ApiPath";

export default {
  name: 'HomePage',
  data() {
    return {
      isAnimating: false,
      screenshots: [
        { id: 1, image: require('@/assets/utumgismobile_layer.png') },
        { id: 2, image: require('@/assets/utumgismobile_func.png') },
        { id: 3, image: require('@/assets/utumgismobile_new.png') },
        { id: 4, image: require('@/assets/utumgismobile_point.png') },
      ],
    };
  },
  async mounted() {
    if(!this.$store.state.username ||!this.$store.state.userid){
      //请求用户信息
      let res = await post(apiPath.USERINFO_URL,{})
      console.log(res)
      // 请求成功
      if(res.success && res.data.userinfo){
        this.$store.commit("setuserinfo",res.data.userinfo)
      }
      console.log('当前登录信息  id :'+this.$store.state.userid)
      console.log('当前登录信息  username :'+this.$store.state.username)
    }
  },
  methods:{
    //跳转注册页面
    jumptoRegister() {
      this.isAnimating = true;
      setTimeout(() => {
        // 动画完成后进行页面跳转
        this.$router.push('/register');
      }, 400);

    },
    // 下载应用
    downloadApp(){

    }
  }
};
</script>

<style scoped>

v-card-actions {
  justify-content: center;
}
.v-card-margin {
  margin: 0 0 20px 0;
}

li {
  text-align: center;
}
</style>
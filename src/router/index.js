import Router from 'vue-router';
import Vue from "vue";
import HomePage from "@/components/HomePage";
import RegisterPage from "@/components/RegisterPage";
import LoginPage from "@/components/LoginPage";
Vue.use(Router);
const routes = [
    {
        path: "/",
        redirect:"/home",
    },
    {
        path: "/home",
        component:HomePage,
        meta:{
            title:"首页"
        }
    },
    {
        path: "/register",
        component:RegisterPage,
        meta:{
            title:"注册"
        }
    },
    {
        path: "/login",
        component:LoginPage,
        meta:{
            title:"登录"
        }
    },
];
const index = new Router({
    routes,
    mode: "history"
});

export default index;
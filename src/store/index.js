import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        // 用户是否登录
        username: undefined,
        userid: undefined,
        email: undefined
    },
    // 突变，用于修改状态
    mutations: {
        setuserinfo(state,data){
            state.username = data.username
            state.userid = data.id
            state.email = data.email
        }
    },
    // 动作用于提交状态
    actions: {
    },
    getters: {
    },
});

export default store;
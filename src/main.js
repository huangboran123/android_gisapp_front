import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from '@/plugins/vuetify'
import store from './store'
new Vue({
    vuetify,
    store,
    router,
    render: h => h(App)
}).$mount("#app");

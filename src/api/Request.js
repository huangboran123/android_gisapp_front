import axios from "axios";

// 创建一个 axios 实例
const instance = axios.create({
    baseURL: 'http://192.168.1.9:8088', // 设置基础 URL api代理到后台
    timeout: 30*1000, // 设置请求超时时间
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
});

// 请求拦截器 前处理
instance.interceptors.request.use(config => {
    if (!config.headers.Authorization) {
        const token = localStorage.getItem("Authorization");
        if (token) {
            config.headers.Authorization =  `Bearer ${token}`;
        }
    }
    return config;
})


export const  post = (url,parmas = null) =>{
    return new Promise((resolve, reject) => {
        instance({ url:url,method: "POST",data:parmas })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
    });

}

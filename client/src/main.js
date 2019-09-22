import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//1。创建组件
import Login from './components/Login.vue';
import DataList from './components/DataList.vue';
//2. 配置路由
const routes = [
        { path: '/login', component: Login },
        { path: '/datalist', component: DataList },
        { path: '*', redirect: '/login' }, //默认跳转路由
    ]
    //3.实例化vueRouter
const router = new VueRouter({
    routes //(缩写)相当于 routes：routes
})

new Vue({
        el: '#app',
        router, //4.挂载路由
        render: h => h(App)
    })
    //5. 根组件添加渲染 <router-view></router-view>
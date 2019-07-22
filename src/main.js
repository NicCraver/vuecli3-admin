import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store/index";//引入vuex
import ElementUI from "element-ui";//引入element-ui
Vue.use(ElementUI);

import "@/styles/index.scss"; //引入全局样式
import "element-ui/lib/theme-chalk/index.css";//引入element-ui样式
import "./promission";//引入登录拦截js（可控制权限信息，及动态路由）

// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// Vue.use(vConsole)

import PageHeader from '@/components/PageHeader/index.js'//引用全局组件PageHeader
Vue.use(PageHeader);//使用全局组件PageHeader

import api from "./api"; // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
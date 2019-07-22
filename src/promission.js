import api from "./api";
import store from "./store";
import router from "./router";
import Cookies from "js-cookie";
import { Message } from "element-ui"; //element Toast的提示
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css";
NProgress.configure({
    showSpinner: false
}); // NProgress Configuration
import Layout from "@/layout"; //Layout 是架构组件，不在后台返回，在文件里单独引入
const whiteList = ['/login', '/auth-redirect'] // no redirect whitelist没有重定向白名单

router.beforeEach(async (to, from, next) => {
    // Cookies.remove("Admin-Token");
    NProgress.start()//进度条开始
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            console.log('if is logged in, redirect to the home page如果已登录，则重定向到主页')
            // if is logged in, redirect to the home page如果已登录，则重定向到主页
            next()
            NProgress.done()//进度条结束
        } else {
            console.log('da确定用户是否通过getInfo获取了他的权限角色')
            next()
        }
    }
    else {
        console.log('has no token！！！！！！！！！！！！！！！！！！')
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly在免费登录白名单中，直接进入
            next()
        } else {
            // other其他无权访问的页面将重定向到登录页面。
            next('/login')
            NProgress.done()//进度条结束
        }
    }
})

router.afterEach(() => {
    NProgress.done()//进度条结束
})


function getToken() {
    console.log('Cookies.get("Admin-Token") :', Cookies.get("Admin-Token"));
    return Cookies.get("Admin-Token")
}
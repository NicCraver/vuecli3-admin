import api from "./api";
import store from "./store";
import router from "./router";
import Cookies from "js-cookie";
import NProgress from "nprogress"; // 进度条
import "nprogress/nprogress.css";
NProgress.configure({
    showSpinner: false
}); // NProgress Configuration

const whiteList = ['/login', '/auth-redirect'] //白名单

router.beforeEach(async (to, from, next) => {
    // Cookies.remove("Admin-Token");
    NProgress.start()//进度条开始
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            // console.log('如果已登录，则重定向到主页')
            next()
            NProgress.done()//进度条结束
        } else {
            // console.log('编写权限角色')
            next()
        }
    }
    else {
        if (whiteList.indexOf(to.path) !== -1) {
            // 在登录白名单中，直接进入
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
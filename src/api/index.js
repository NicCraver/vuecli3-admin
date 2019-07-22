import axios from "axios";
import router from "../router";
import Cookies from "js-cookie";
import { resetRouter } from "@/router";
import { Message, Notification } from "element-ui";

// 环境的切换
if (process.env.NODE_ENV == "development") {
    axios.defaults.baseURL = "https://www.easy-mock.com/mock/5d272d1c542916226c6bb8b0/api/";
} else if (process.env.NODE_ENV == "debug") {
    axios.defaults.baseURL = "";
} else if (process.env.NODE_ENV == "production") {
    axios.defaults.baseURL = "https://www.easy-mock.com/mock/5d272d1c542916226c6bb8b0/api/";
}
// 获取Token
function getToken() {
    if (Cookies.get("token")) {
        return Cookies.get("token");
    } else {
        console.log("没有token");
        return "";
    }
}
//过滤请求
axios.interceptors.request.use(
    config => {
        //config 为请求的一些配置 例如：请求头 请求时间 Token
        config.timeout = 10 * 1000; //请求响应时间
        const token = getToken();
        token && (config.headers.token = token);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 添加响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.code === 200) {
            // console.log(
            //   "%cresponse:",
            //   "color: white; background-color:#909399; padding: 2px 5px; border-radius: 2px;",
            //   response
            // );
            //服务端定义的响应code码为0时请求成功
            return Promise.resolve(response.data); //使用Promise.resolve 正常响应
        } else if (response.data.code === 401) {
            //服务端定义的响应code码为1401时为未登录
            // Message.message.error('没有找到您的权限信息！');
            Message.error(response.data.msg);
            resetRouter(); //清除路由
            Cookies.remove("token");
            router.push("/login");
            return Promise.reject(response.data); //使用Promise.reject 抛出错误和异常
        } else if (response.data.code === 403) {
            Notification.error({
                title: "权限不足",
                message: response.data.msg
            });
            // router.push("/404");
            return Promise.reject(response.data); //使用Promise.reject 抛出错误和异常
        } else if (response.data.code === 502) {
            Notification.error({
                title: "服务器错误！",
                message: response.data.msg
            });
            return Promise.reject(response.data); //使用Promise.reject 抛出错误和异常
        } else {
            return Promise.reject(response.data);
        }
    },
    error => {
        console.info(
            "%c抛出错误异常",
            "color: white; background-color: #F56C6C; padding: 2px 5px; border-radius: 2px;",
            error
        );
        if (error == "Network Error") {
            Message({
                showClose: true,
                message: "服务器错误，请稍后重试",
                type: "error",
                duration: 0
            });
        }
        if (error == "Error: timeout of 10000ms exceeded") {
            Message({
                showClose: true,
                message: "网络请求超时，请稍后重试",
                type: "error",
                duration: 0
            });
        }
        if (error && error.response) {
            console.log(error.response);
            let res = {};
            res.code = error.response.status;
            res.msg = throwErr(error.response.status, error.response); //throwErr 捕捉服务端的http状态码 定义在utils工具类的方法
            return Promise.reject(res);
        }
        return Promise.reject(error);
    }
);

export function get(url, params) {
    if (params) {
        console.info(
            "%cget url:" + url,
            "color: white; background-color: #409EFF; padding: 2px 5px; border-radius: 2px;",
            params
        );
    } else {
        console.info(
            "%cget url:" + url,
            "color: white; background-color: #409EFF; padding: 2px 5px; border-radius: 2px;"
        );
    }

    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                console.info(
                    "%c" + url,
                    "color: white; background-color:#67C23A;  padding: 2px 5px; border-radius: 2px;",
                    res
                );
                resolve(res);
            })
            .catch(err => {
                console.info(
                    "%c" + url,
                    "color: white; background-color: #F56C6C; padding: 2px 5px; border-radius: 2px;",
                    err
                );
                reject(err);
            });
    });
}
export function post(url, params) {
    console.info(
        "%cpost url:" + url,
        "color: white; background-color: #409EFF; padding: 2px 5px; border-radius: 2px;",
        params
    );
    return new Promise((resolve, reject) => {
        axios
            .post(url, params, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                console.info(
                    "%c" + url,
                    "color: white; background-color:#67C23A;  padding: 2px 5px; border-radius: 2px;",
                    res
                );
                resolve(res);
            })
            .catch(err => {
                console.info(
                    "%c" + url,
                    "color: white; background-color: #F56C6C; padding: 2px 5px; border-radius: 2px;",
                    err
                );
                reject(err);
            });
    });
}
export function del(url, params) {
    console.info(
        "%cpost url:" + url,
        "color: white; background-color: #409EFF; padding: 2px 5px; border-radius: 2px;",
        params
    );
    return new Promise((resolve, reject) => {
        axios
            .delete(url, {
                params: params,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(res => {
                console.info(
                    "%c" + url,
                    "color: white; background-color:#67C23A;  padding: 2px 5px; border-radius: 2px;",
                    res
                );
                resolve(res);
            })
            .catch(err => {
                console.info(
                    "%c" + url,
                    "color: white; background-color: #F56C6C; padding: 2px 5px; border-radius: 2px;",
                    err
                );
                reject(err);
            });
    });
}

export default {
    get,
    post,
    del
};

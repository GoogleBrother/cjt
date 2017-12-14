//                            _ooOoo_
//                           o8888888o
//                           88" . "88
//                           (| -_- |)
//                            O\ = /O
//                        ____/`---'\____
//                      .   ' \\| |// `.
//                       / \\||| : |||// \
//                     / _||||| -:- |||||- \
//                       | | \\\ - /// | |
//                     | \_| ''\---/'' | |
//                      \ .-\__ `-` ___/-. /
//                   ___`. .' /--.--\ `. . __
//                ."" '< `.___\_<|>_/___.' >'"".
//               | | : `- \`.;`\ _ /`;.`/ - ` : | |
//                 \ \ `-. \_ __\ /__ _/ .-` / /
//         ======`-.____`-.___\_____/___.-`____.-'======
//                            `=---='
//
//         .............................................
//                  佛祖保佑             永无BUG
// When I wrote this, only God and I understood what I was doing
// now, God only knows


// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

/**
 * ------------------------------------------------------------------
 * 引入基本插件VueRouter、Vuex、axios.
 * ------------------------------------------------------------------
 */
import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import routes from './router';
import Vuex from 'vuex';
import stores from './store';
import axios from 'axios';

Vue.use(VueRouter);
Vue.use(Vuex);

const router = new VueRouter({
  routes
});
const store = new Vuex.Store(
  stores
);

/**
 * ------------------------------------------------------------------
 * 引入公共弹窗.
 * ------------------------------------------------------------------
 */
import  { ToastPlugin } from 'vux';
import { AlertPlugin } from 'vux';
import { ConfirmPlugin } from 'vux';
Vue.use(ToastPlugin);
Vue.use(AlertPlugin);
Vue.use(ConfirmPlugin);


/**
 * ------------------------------------------------------------------
 * FastClick取消移动端点击300ms延迟.
 * ------------------------------------------------------------------
 */
const FastClick = require('fastclick');
FastClick.attach(document.body);

// md5加密;
import md5 from 'js-md5';
Vue.prototype.md5 = md5;

/**
 * ------------------------------------------------------------------
 * 配置请求服务器基本参数.
 * ------------------------------------------------------------------
 */

// 请求接口baseUrl
/*const baseUrl = 'http://192.168.0.179:9090/';*/
const baseUrl = 'http://39.108.106.9:9090/';
Vue.prototype.imgUrl = baseUrl;
axios.defaults.baseURL = baseUrl;

/**
 * ------------------------------------------------------------------
 * 封装get/post请求.
 * 封装请求拦截器.
 * ------------------------------------------------------------------
 */
Vue.prototype.axios = axios;
// 封装post请求.
Vue.prototype.post = (url,param,callback) => {
  axios.post(url,param).then(
    (response) => {
      callback(response.data);
    }
  ).catch(
    (error) => {

    }
  );
};

Vue.prototype.service = (url,param,callback) => {
  // 判断是否登录状态下请求，如果是则在请求参数中加上token.
  if (sessionStorage.getItem("Authorization")) {
    param.token = sessionStorage.getItem("Authorization");
  }
  axios.post(url,param).then(
    (response) => {
      callback(response.data);
    }
  ).catch(
  (error) => {

  }
  );
};
// 封装get请求.
Vue.prototype.requestGet = (url, callback) => {
  axios.get(url).then(
    (response) => {
      callback(response.data)
    }
  ).catch(
    (error) => {
    }
  );
};

// 请求拦阻器,在每次请求之前判断是否缓存登陆权限,如果有就添加至头部.
Vue.prototype.axios.interceptors.request.use(
  config => {
    /* if (sessionStorage.getItem("Authorization")) {
      // 判断是否存在token，如果存在的话，则每个http 参数都加上token
      config.params = {
        loginToken: sessionStorage.getItem("Authorization")
      }
    } */
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 请求拦阻器,请求之后拦截报错信息错误码,根据错误码进行相应操作.
axios.interceptors.response.use(
  response => {
    if (response.data.code === '200001') {
      // 返回000002，重新登录
      window.sessionStorage.clear();
      router.replace({
        path: '/login'
      });
    } else if (response.data.code === '00000') {
      return response;
    } else if (response.data.code === '300074') {
      store.state.appId = response.data.data.openId;
      store.state.accessToken = response.data.data.accessToken;
      router.replace({
        path: '/register'
      });
    } else {
      Vue.$vux.alert.show({
        content: response.data.message
      });
      return false;
    }
  },
  error => {
    return Promise.reject(error);
  }
);


/**
 * ------------------------------------------------------------------
 * 设置页面title.
 * ------------------------------------------------------------------
 */
let setDocumentTitle = title => {
  document.title = title;
};
router.beforeEach((to, from, next) => {
  typeof to.meta.title !== undefined && setDocumentTitle(to.meta.title);
  next();
});


/* 全局filter，用于将信息隐藏用*代替 */
Vue.filter('hideStr', function (str, frontLen, endLen) { // 全局方法 Vue.filter() 注册一个自定义过滤器,必须放在Vue实例化前面
  if (str) {
    let len = str.length - frontLen - endLen;
    let xing = '';
    for (let i = 0; i < len; i++) {
      xing += '*';
    }
    return str.substring(0, frontLen) + xing + str.substring(str.length - endLen);
  } else {
    return '';
  }
});

Vue.filter('timeStr', function fmtDate (obj) {
  let date =  new Date(obj);
  let y = 1900 + date.getYear();
  let m = "0" + (date.getMonth() + 1);
  let d = "0" + date.getDate();
  return y + "-" + m.substring(m.length - 2,m.length) + "-" + d.substring(d.length - 2, d.length);
});

Vue.prototype.reg = {
  phone: /^(13|14|15|17|18)[0-9]{9}$/,
  idCard : /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}(\d|x|X)$/,
};

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

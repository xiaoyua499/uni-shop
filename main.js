// #ifndef VUE3
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App,
})
// app.use(store)

app.$mount()

// #endif

// #ifdef VUE3
import {
  createSSRApp
} from 'vue'
import store from '@/store/store.js'
import App from './App'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  return {
    app
  }
}
// 导入网络请求的包
import {
  $http
} from '@escook/request-miniprogram'

uni.$http = $http

// 请求的根路径
$http.baseUrl = 'http://www.uinav.com'

// 请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...'
  })
  // 判断请求的是否为有权限的 API 接口
  if (options.url.indexOf('/my/') !== -1) {
    options.header = {
      // 字段的值可以直接从 vuex 中进行获取
      Authorization: store.state.m_user.token,
    }
  }
}

// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

//封装请求失败后弹窗的方法
uni.$showMsg = function(title = '数据请求失败！', duration = 1500) {
  uni.showToast({
    title,
    duration,
    icon: 'none'
  })
}
// #endif

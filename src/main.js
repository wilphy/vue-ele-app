import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

import { Indicator } from 'mint-ui'

Vue.use(Mint);

Vue.config.productionTip = false
Vue.prototype.$axios = axios

// 请求拦截
axios.interceptors.request.use(config => {
  // 加载动画
  Indicator.open()
  return config
}, error => {
  // 错误提醒
  return Promise.reject(error)
})

// 响应拦截
axios.interceptors.response.use(response => {
  Indicator.close()
  return response
}, error => {
  // 错误提醒
  return Promise.reject(error)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

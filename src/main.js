// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview' // 引入iview依赖
import 'iview/dist/styles/iview.css' // 引入iview css样式
import axios from 'axios'
import echarts from 'echarts'// 引入echarts
// import qs from 'qs'// 实现CORS 解决跨域

Vue.use(iView);

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.baseURL = 'http://localhost:10000'
// 将API方法绑定到全局
Vue.prototype.$axios = axios
// 引入echarts
Vue.prototype.$echarts = echarts
// Vue.prototype.$qs = qs

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})



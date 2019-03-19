import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/index'
import Login from '@/components/pages/login'
import Register from '@/components/pages/register'
import GoodsDetail from '@/components/pages/goodsDetail'
import ShoppingCart from '@/components/pages/shoppingCart'
import Markets from '@/components/pages/markets'
import ConfirmOrder from '@/components/pages/confirmOrder'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/goodsDetail',
      name: 'goodsDetail',
      component: GoodsDetail
    },
    {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: ShoppingCart
    },
    {
      path: '/markets',
      name: 'markets',
      component: Markets
    },
    // 订单页需要用户登录才能进入，设置拦截
    {
      path: '/confirmOrder',
      name: 'confirmOrder',
      component: ConfirmOrder
    }
  ]
})

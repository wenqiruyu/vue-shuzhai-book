import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/pages/index'
import Error from '@/components/pages/error'
import Login from '@/components/pages/login'
import Register from '@/components/pages/register'
import GoodsDetail from '@/components/pages/goodsDetail'
import ShoppingCart from '@/components/pages/shoppingCart'
import Markets from '@/components/pages/markets'
import ConfirmOrder from '@/components/pages/confirmOrder'
import Info from '@/components/pages/info'
import Order from '@/components/pages/order'
import Text from '@/components/pages/text'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/index',
      name: 'toIndex',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/login',
      name: 'toLogin',
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
      // 开启路由守卫
      meta: { requireAuth: true },
      name: 'confirmOrder',
      component: ConfirmOrder
    },
    {
      path: '/order',
      // 开启路由守卫
      meta: { requireAuth: true },
      name: 'order',
      component: Order
    },
    { 
      path: '/info',
      // 开启路由守卫
      meta: { requireAuth: true },
      name: 'info',
      component: Info
    },
    {
      path: '*',
      component: Error
    },
    { 
      path: '/text',
      name: 'text',
      component: Text
    }
  ]
})

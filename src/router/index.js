import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/ShopHome',
    name: 'ShopHome',
    component: () => import('../views/ShopHome.vue'),
  },
  {
    path: '/ShopHomeFir',
    name: 'ShopHomeFir',
    component: () => import('../views/ShopHomeFir.vue'),
  },
  {
    path: '/ShopHomeSec',
    name: 'ShopHomeSec',
    component: () => import('../views/ShopHomeSec.vue'),
  },
  {
    path: '/ShopDetail',
    name: 'ShopDetail',
    component: () => import('../views/ShopDetail.vue'),
  },
  {
    path: '/ShopLocation',
    name: 'ShopLocation',
    component: () => import('../views/ShopLocation.vue'),
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

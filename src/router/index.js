/*
 * @Author: your name
 * @Date: 2021-09-24 10:27:10
 * @LastEditTime: 2021-09-27 10:54:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \binfen_discountShops\src\router\index.js
 */
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
    path: '/ShopDetail',
    name: 'ShopDetail',
    component: () => import('../views/ShopDetail.vue'),
  },
  {
    path: '/ShopListArea',
    name: 'ShopListArea',
    component: () => import('../views/ShopListArea.vue'),
  },
  // {
  //   path: '/ShopLocation',
  //   name: 'ShopLocation',
  //   component: () => import('../views/ShopLocation.vue'),
  // },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router

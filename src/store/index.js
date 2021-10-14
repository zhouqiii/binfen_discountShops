/*
 * @Author: your name
 * @Date: 2021-09-24 10:27:10
 * @LastEditTime: 2021-10-11 17:06:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \binfen_discountShops\src\store\index.js
 */
import { String } from 'core-js'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
// 使用require.context(webpack的api)自动化读取modules文件夹下所有的js文件
// 把modules文件夹下的所有模块添加到modules对象中，避免一个模块一个模块的添加代码比较繁琐
const modulesFiles = require.context('./modules', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

let defaultCity = '北京'
try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {}

export default new Vuex.Store({
  // modules文件夹下所有拆分的模块
  modules,
  // 全局公用的四个对象可以写在这里，也可以拆分成一个专门存放公用状态的module
  state: {
    cityId: '',
    lat: '',
    lon: ''
  },
  mutations: {
    changecitys (state, value) {
      state.city = value
      try {
        localStorage.city = value
      } catch (e) {}
    },
  },
  actions: {
  }
})

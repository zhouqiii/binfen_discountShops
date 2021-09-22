import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入reset.css
import "normalize.css"
//引入vant组件
import Icon from 'vant';
import 'vant/lib/index.css';
Vue.use(Icon);
import {
  Cell, CellGroup, Form, Field, Dialog, Tab, Tabs, Toast,
  Search, Swipe, SwipeItem, Lazyload, DropdownMenu, DropdownItem,
  Card, Col, Row,CountDown, TreeSelect, List
} from 'vant';
Vue.use(Cell)
  .use(CellGroup)
  .use(Form)
  .use(Field)
  .use(Dialog)
  .use(Tab)
  .use(Tabs)
  .use(Toast)
  .use(Swipe)
  .use(SwipeItem)
  .use(Lazyload)
  .use(Search)
  .use(DropdownMenu)
  .use(DropdownItem)
  .use(Card)
  .use(Col)
  .use(Row)
  .use(CountDown)
  .use(TreeSelect)
  .use(List);
// 引入公共样式
import  "@/style/common.css" 
import  "@/style/theme.less" 
import  "@/style/normal.css" 
// 引入request并添加到prototype上
import { request } from "@/utils/request"
Vue.prototype.request = request;
// // 引入自动化引入icons/svg文件夹下所有svg的js文件
import "@/assets/icons"
import VConsole from 'vconsole'
const vConsole = new VConsole()
Vue.use(vConsole)
Vue.config.productionTip = false
//全局引入header
import CommonHeader from './components/CommonHeader.vue'
Vue.component('common-header',CommonHeader)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


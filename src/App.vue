<!--
 * @Author: your name
 * @Date: 2021-09-24 10:27:10
 * @LastEditTime: 2021-10-11 10:46:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \binfen_discountShops\src\App.vue
-->
<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<style lang="less">
#app{
  height: 100%;
  padding-bottom: env(safe-area-inset-bottom) !important;//iphoneX用constant无效，单ios11用contant
  padding-bottom: constant(safe-area-inset-bottom) !important;
}
</style>

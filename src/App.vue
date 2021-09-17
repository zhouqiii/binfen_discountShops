<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
#app{
  height: 100%;
  padding-bottom: env(safe-area-inset-bottom)!important;//iphoneX用constant无效，单ios11用contant
  padding-bottom: constant(safe-area-inset-bottom)!important;
}
</style>

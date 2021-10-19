<!--
 * @Author: your name
 * @Date: 2021-09-24 10:27:10
 * @LastEditTime: 2021-10-15 16:22:38
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \binfen_discountShops\src\components\Loading.vue
-->
<template>
  <!-- <div class="loading" v-show="loadingShow"> -->
  <div class="loading">
    <div class="loading_bg">
      <div class="loading_box">
        <img src="../assets/icons/icon_loading.png" alt="loading..." class="loading_img" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"Loading",
  data(){
    return{
      // loadingShow:false
    }
  },
  methods: {
    show() {
      // this.loadingShow = true;
    },
    hide(){
      // this.loadingShow = false;
      this.remove();
    }
  },
};
</script>

<style lang="less" scoped>
.loading{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 110;
    .loading_bg{
        width: 100%;
        height: 100%;
        display:flex;
        justify-content: center;
        align-items: center;
        .loading_box{
          width: 36px;
          height: 36px;
          border-radius: 2px;
          background: rgba(0,0,0,.1);
          text-align: center;
          img.loading_img{
            margin-bottom: 6px;
            width: 22px;
            height: 22px;
            -webkit-animation: loading 2s steps(9,end) infinite;
            -moz-animation: loading 2s steps(9,end) infinite;
            -o-animation: loading 2s steps(9,end) infinite;
            animation: loading 2s steps(9,end) infinite;
          }
        }
    }
}
@keyframes loading {
    0%{
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
    }
    100%{
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
    }
}
</style>
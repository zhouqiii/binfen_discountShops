<template>
  <div class="cityheader">
    <router-link to="/">
      <div class="headerleft">
        <svg class="icon icon-back" aria-hidden="true">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
        <!-- <i class="el-icon-arrow-left"></i> -->
      </div>
    </router-link>
  <div class="headerbody">城市列表</div>
  </div>
</template>
<script>
export default {
  name: 'CityHeader'
}
</script>
<style lang="less" scoped>
.cityheader{
height: 30px;
    line-height: 30px;
    background: red;
    .headerleft{
float: left;
        font-size: 17px;
        text-align: center;
        top: 0px;
        left: 10px;
        color: black ;
        position: absolute;
        color: #ffffff;
    }
        
    .headerbody{
text-align: center;
        color: #ffffff;
        font-size: 17px;
    }
        
}
    

</style>



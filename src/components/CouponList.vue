<template>
  <div>
    <div class="coupon" v-for="(item,index) in couponList" :key="index">
      <div class="coupon_info">
        <div>
          <van-tag type="danger">免费领取</van-tag>
          <span class="info_title">{{item.title}}</span>
        </div>
        <div>￥ {{item.price}}</div>
        <div>有效期:{{item.time}}</div>
      </div>
      <div class="coupon_btn">
        <span>抢购</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CouponList',
  props:{
    list:{
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      couponList: []
    }
  },
  mounted() {
    this.couponList = this.list
  }
}
</script>
<style lang="less" scoped>
.coupon{
  width: 350px;
  height: 70px;
  color: #333333;
  margin-bottom: 10px;
  background: #d2d2d2;
  // background: -webkit-linear-gradient(left, #d34b5a, #c64765);
  // background: -o-linear-gradient(left, #d34b5a, #c64765);
  // background: -moz-linear-gradient(left, #d34b5a, #c64765);
  display: flex;
  flex-direction: row;
  .coupon_info {
    background-image: radial-gradient(circle at right top, #fff, #fff 15px, transparent 16px), 
                      radial-gradient(circle at right bottom, #fff, #fff 15px, transparent 16px);
    flex: 3;
    margin-right: -1px;
    padding: 12px 15px 10px 20px;
    font-size: 10px;
    position: relative;
    .info_title{
      font-size: @F14;
    }
  }
  .coupon_info::before {
    content: '';
    height: 20px;
    border: 1px dashed #ffffff;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    }
  .coupon_btn {
    border: none;
    flex: 1;
    height: 70px;
    line-height: 70px;
    padding: 0 20px;
    background-image: radial-gradient(circle at left top, #fff, #fff 15px, transparent 16px), 
                      radial-gradient(circle at left bottom, #fff, #fff 15px, transparent 16px);
    span {
      background: -webkit-linear-gradient(top, #fae8e9, #f2a799);
      background: -o-linear-gradient(top, #fae8e9, #f2a799);
      background: -moz-linear-gradient(top, #fae8e9, #f2a799);
      padding: 5px 10px;
      vertical-align: middle;
      font-size: 15px;
      border-radius: 15px;
      color: #E41F19;
    }
  }
}

</style>

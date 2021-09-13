<template>
  <div class="detail">
    <common-header type="1" title="商户详情"></common-header>
    <div class="detail_shop">
      <img :src="shopImg" alt="false" class="shop_img">
      <div class="shop_desc flex_between">
        <span style="flex:5">{{shop.name}}</span>
        <div v-if="shop.preference || shop.coupon" style="flex:2">
          <span v-if="shop.preference"><van-tag type="danger">惠</van-tag></span>
          <span v-if="shop.coupon"><van-tag type="danger">券</van-tag></span>
        </div>
        <div v-if="shop.time" style="flex:3;text-align:right">
          <span>活动倒计时</span>
          <van-count-down millisecond :time="shop.time" format="HH:mm:ss:SS" @finish="startHandle"/>
        </div>
      </div>
      <div class="shop_desc flex_between">
        <span style="flex:4">{{shop.adress}}</span>
        <div style="flex:1" class="flex_between">
          <div class="flex_column"><svg-icon iconClass="daohang"></svg-icon><span>导航</span></div>
          <div class="flex_column"><svg-icon iconClass="telephone"></svg-icon><span>电话</span></div>
        </div>
      </div>
    </div>
    <div class="detail_desc">
      <van-tabs v-model="active" @click="onClickTab">
        <van-tab v-for="(item,index) in tabList" :title="item" :key="index" :name="item">
          <div v-if="item === '优惠信息'">
            <div class="flex_between desc_discount">
              <span v-if="shop.preference" style="flex:1"><van-tag type="danger">惠</van-tag></span>
              <div class="discount_info" style="flex:9">
                <span v-for="(item,index) in discountList" :key="index">{{item}}</span>
              </div>
            </div>
            <div class="desc_discount">
              <div class="discount_title">活动内容</div>
              <div class="discount_desc">{{activity.desc}}</div>
              <div class="discount_title">活动规则</div>
              <div class="discount_desc">{{activity.rules}}</div>
              <div  class="discount_title">活动卡种</div>
              <div class="discount_desc">{{activity.cardType}}</div>
              <div  class="discount_title">活动时间</div>
              <div class="discount_desc">{{activity.time}}</div>
            </div>
          </div>
          <div v-if="item === '优惠抢单'">
            <div class="flex_between desc_discount">
              <span class="discount_title"><van-tag type="danger">券</van-tag>优惠抢单</span>
              <span @click="goCouponList" class="discount_desc">查看更多优惠券 ></span>
            </div>
             <div class="desc_discount">
                <coupon-list :list="couponList"></coupon-list>
              </div>
          </div>
          <div v-else class="desc_discount">
            <div class="discount_title">商户介绍</div>
            <div class="discount_desc">{{shop.desc}}</div>
          </div>
        </van-tab>
      </van-tabs>
      </div>
  </div>
</template>
<script>
import CouponList from '../components/CouponList.vue';
import SvgIcon from '../components/SvgIcon.vue';
import { insertItem } from '../utils/handleList'
export default {
  components: { SvgIcon, CouponList },
    name: 'ShopDetail',
    data() {
      return {
        active: '优惠信息',
        shopImg: 'https://img01.yzcdn.cn/vant/ipad.jpeg',
        shop: {
          name: '北京万柳元素餐厅北京万柳新元餐厅（万柳店）', //商铺名
          coupon: 1,//是否有优惠活动
          preference: 1,//是否有券
          time: 11 * 1000,//店铺活动开始倒计时
          adress: '北京东城区西小口店双用名单广场3F-13号 北京东城区西小口店双用名单广场3F-13号距您300米',//店铺地址
          desc: '商户介绍内容商户介绍内容商户介绍内容商户介绍内容商户介绍内容商户介绍内容商户介绍内容商户介绍内容商户介绍内容商户介绍内容商户介绍内容商户介绍内容商户介绍内容商户介绍内容商户介绍内容', // 商铺介绍
        },
        activity: {
          desc: '活动内容详情活动内容详情活动内容详情活动内容详情活动内容详情活动内容详情活动内容详情活动内容详情活动内容',
          rules: '活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则活动规则',
          cardType: 'XXXXXXXX卡',
          time: 'XXXX年XX月XX日-XXXX年XX月XX日'
        },
        tabList: ['优惠信息','商户介绍'],
        discountList: ['32减18','单笔满100减30元','32减18','单笔满100减30元'],
        couponList:[{
          title: '10元电子兑换券', price: '10.00', time: '2020-05-12至2020-06-30'
        },{
          title: '10元电子兑换券', price: '10.00', time: '2020-05-12至2020-06-30'
        },{
          title: '10元电子兑换券', price: '10.00', time: '2020-05-12至2020-06-30'
        },{
          title: '10元电子兑换券', price: '10.00', time: '2020-05-12至2020-06-30'
        },{
          title: '10元电子兑换券', price: '10.00', time: '2020-05-12至2020-06-30'
        }]

      }
    },
    methods:{
      startHandle() {
        this.$toast('领券计时器结束,触发一些回调')
        this.shop.time = 0
      },
      onClickTab(){
        this.$toast(11)
      },
      goCouponList() {
        this.$toast('去查看优惠券列表的链接')
      }
    },
    mounted() {
      if(this.shop.preference) {
        this.tabList.splice(1, 0, '优惠抢单')
      }
      if(this.discountList.length > 1) {
        this.discountList = insertItem(this.discountList)
      }
      
    }
}
</script>
<style lang="less" scoped>
@import url('../style/page/shopDetail.less');
</style>
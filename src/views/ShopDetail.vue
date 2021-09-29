<!--
 * @Author: your name
 * @Date: 2021-09-24 10:27:10
 * @LastEditTime: 2021-09-28 09:49:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \binfen_discountShops\src\views\ShopDetail.vue
-->
<template>
  <div class="detail">
    <common-header type="1" title="商户详情"></common-header>
    <div class="detail_shop">
      <div class="shop_img">
        <img :src="shop.merchantPicture" alt="false">
        <!-- <div class="img_time flex_between" v-if='time > 0'>
          <div class="time_text"><img src="../assets/img/icon_search.png"/>活动倒计时</div>
          <van-count-down :time="time" @finish="startHandle" class="time_time">
            <template v-slot="timeData">
              <span style="margin-right:4px">{{timeData.days}}天</span>
              <span class="time_block">{{timeData.hours < 10 ? `0${timeData.hours}` : timeData.hours}}</span>
              <span class="time_colon">:</span>
              <span class="time_block">{{timeData.minutes < 10 ? `0${timeData.minutes}` : timeData.minutes}}</span>
              <span class="time_colon">:</span>
              <span class="time_block">{{timeData.seconds < 10 ? `0${timeData.seconds}` : timeData.seconds}}</span>
            </template>
          </van-count-down>
        </div> -->
      </div>
      <div class="shop_desc flex_between name title">
        <span>{{shop.merchantName}}</span>
      </div>
      <div class="shop_desc info">
        <span class="area" @click="toTheShop">
          <svg-icon iconClass="search"></svg-icon>{{shop.businessAreaName}}
        </span>
      </div>
      <div class="shop_desc flex_between info">
        <div style="flex:4;line-height:16px" class="flex_between">
          <span>{{shop.merchantAddress}} 距您{{shop.distanceKm}}km</span>
          <span>|</span>
        </div>
        
        <div style="flex:1;justify-content:center" class="flex_between">
          <!-- <div class="flex_column" @click="toLocation"><svg-icon iconClass="daohang"></svg-icon><span>导航</span></div> -->
          <div class="desc_phone flex_column" @click="toCall">
            <img src='../assets/img/icon_phone.png' />
            <span style="margin-top:2px">电话</span>
          </div>
        </div>
      </div>
    </div>
    <!--我行收单商户且进行了活动配置-->
    <div v-if="!(shop.isOnActivity === '0' && shop.merchantIsOnself === 1)" class="detail_discount">
      <div class="title">优惠信息</div>
      <div class="detail_sale">
        <van-tag type="danger" style="margin-right:5px">惠</van-tag>
        <van-tag type="danger" plain class="sale_tag" v-for="(st,stIndex) in shop.ruleList" :key="stIndex">
          <span>满{{st.fullMeetMoney}}减{{st.fullReductionMoney}}</span>
        </van-tag>
      </div>
      <div class="discont_box">
        <div class="discount_title">活动内容</div>
        <div class="discount_desc">{{shop.activityExplain}}</div>
      </div>
      <div class="discont_box">
        <div class="discount_title">活动规则</div>
        <div class="discount_desc">{{shop.ruleExplain}}</div>
      </div>
      <div class="discont_box">
        <div  class="discount_title">活动时间</div>
        <div class="discount_desc">{{shop.startDateDay}}至{{shop.endDateDay}}</div>
      </div>
      <div class="discont_box">
        <div class="discount_title">活动卡种</div>
        <div class="discount_desc">
          <div v-if="shop.activityCardTypeList.length > 3" class="desc_type flex_between">
            <span v-for='(item,index) in shop.activityCardTypeList.slice(0,3)' style="width:30%" class="ellipsis">{{item}};</span>
            <span v-for='(item,index) in shop.activityCardTypeList.slice(3)' style="width:30%"  class="ellipsis" v-show="activeCollapse.length > 0">{{item}};</span>
            <van-collapse v-model="activeCollapse" @change="getCollapse" class="collapse_drop">
              <van-collapse-item title="" name='1'>
                <template #value>{{collapse}}</template>
              </van-collapse-item>
            </van-collapse>
          </div>
          <div v-else class="desc_type flex_between">
            <span v-for='(item,index) in shop.activityCardTypeList' style="width:30%">{{item}};</span>
          </div>
        </div>
      </div>
    </div>
    <div class="detail_discount">
      <div class="title">商户介绍</div>
      <div class="discount_desc">{{shop.merchantExplain}}</div>
    </div>
  </div>
</template>
<script>
import SvgIcon from '../components/SvgIcon.vue'
export default {
  components: { SvgIcon },
    name: 'ShopDetail',
    data() {
      return {
        shop: {
          lat: "",
          lon: "",
          merchantPicture:'',//图片
          merchantName: '', //商铺名
          merchantAddress: '',//店铺地址
          merchantTel: '',//电话
          merchantExplain:'',//商户介绍
          distanceKm:'',//距您。。米
          activityExplain: '',//活动内容
          ruleExplain:'',//活动规则
          startDate:'',//活动开始时间
          endDate:'',//活动结束时间
          activityCardType: '',//活动卡种
          ruleList:[],//优惠信息
        },
        // time: 0,
        collapse:'收起',//
        activeCollapse: ['1']
      }
    },
    methods:{
      toCall() {
        window.location.href = `tel:${this.shop.merchantTel}`;
      },
      getCollapse() {
        if(this.activeCollapse.length > 0) {
          this.collapse = '展开'
        }else{
          this.collapse = '收起'
        }
      },
      //点击去该商圈所有商户列表的页面
      toTheShop() {
        let needData = JSON.parse(this.$route.query.commonData)
        needData.businessAreaCode = this.shop.businessAreaCode
        this.$router.push({
          path:'/ShopListArea',
          query: { 
            info: JSON.stringify(needData),
            title: this.shop.businessAreaName
          }
        })
      },
    },
    mounted() {
      let data = JSON.parse(this.$route.query.data)
      data.startDateDay = data.startDate.trim().split(' ')[0]
      data.endDateDay = data.endDate.trim().split(' ')[0]
      data.activityCardTypeList = data.activityCardType.split(',')
      this.shop =Object.assign(this.shop, data)
      console.log(this.shop,'商户信息')
    },
    created() {}
}
</script>
<style lang="less" scoped>
@import url('../style/page/shopDetail.less');
</style>
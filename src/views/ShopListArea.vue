<!--
 * @Author: your name
 * @Date: 2021-09-26 20:03:11
 * @LastEditTime: 2021-10-18 15:15:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \binfen_discountShops\src\views\AreaShopList.vue
-->
<template>
  <div class="home">
    <common-header :title="title">
      <template v-slot:icon1>
        <img src="../assets/img/icon_search.png" @click="ifSearch = true" class="header_img"/>
      </template>
    </common-header>
    <div class="search_pop" v-show="ifSearch" @click="closePop">
      <div @click.stop=""><!--阻止冒泡-->
        <van-search
          v-model="searchVal"
          input-align="left"
          background="#ffffff"
          placeholder="请输入商户名称"
          @input="searchShop"
        >
          <template v-slot:left-icon>
            <img src="../assets/img/icon_search.png" class="header_img"/>
          </template>
        </van-search>
      </div>
    </div>
    <div class="home_content" :style="thisStyle">
      <div class="content_list" ref="areaBox">
        <div v-if="noListFlag === 'nocontent'" class="list_nocontent">
          <img src="../assets/img/img_nocontent.png"/>
          <div>没有找到合适的商户~</div>
        </div>
        <div v-if="noListFlag === 'net'" class="list_nocontent">
          <img src="../assets/img/icon_net.png"/>
          <div>网络出现了问题，获取数据失败</div>
          <div @click="getShopList" class="list_reload"><!--sel-->
            <img src="../assets/img/icon_reload.png"/>
            <span>重新加载</span>
          </div>
        </div>
        <!-- <van-pull-refresh v-else> -->
          <van-list
            v-else
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            :offset="10"
            finished-text=""
            @load="onLoad"
          >
            <template #loading>
              <div class="list_loading">
                <img src="../assets/img/img_loading.png"/>
                <span>努力加载中</span>
              </div>
            </template>
            <div class="list_shops">
              <div v-for="(item,index) in shopList" :key="index" class="list_detail">
                <van-card @click="routeItem(item)">
                  <template #thumb>
                    <div class="detail_img">
                      <img :src='item.merchantPicture' alt="" :onerror="defaultImg"/>
                    </div>
                  </template>
                  <template #title>
                    <div class="detail_title ellipsis">{{item.merchantName}}</div>
                  </template>
                  <template #desc>
                    <div class="detail_desc flex_between">
                      <div  style="display:flex">
                        <span class="desc_area ellipsis">{{item.areaName}}</span>
                        <span class="desc_type ellipsis">{{item.merchantTypeName}}</span>
                      </div>
                      <span class="desc_distance ellipsis" v-if="item.distanceKm !== 0">{{item.distanceKm}}km</span>
                    </div>
                    <div class="detail_sale">
                      <span class="area ellipsis">
                        <img src="../assets/img/icon_merchant.png" alt="">
                        <span>{{item.businessAreaName}}</span>
                      </span>
                    </div>
                  </template>
                  <template #tags>
                    <!--非我行收单商户判断activityName-->
                    <div class="detail_sale flex_start" v-if="item.merchantIsOneself === '0' && item.activityName">
                      <img src="../assets/img/icon_sale.png" class="sale_tag sale" alt=""/>
                      <van-tag type="danger" plain class="sale_tag">
                        <span class="tag_text">{{item.activityName}}</span>
                      </van-tag>
                    </div>
                    <!--我行收单商户且进行了ruleList-->
                    <div class="detail_sale flex_start" v-if="item.merchantIsOneself === '1' && item.ruleList.length > 0"><!-- v-if="item.merchantIsOneself === 1 && item.isOnActivity === '1'"-->
                      <img src="../assets/img/icon_sale.png" class="sale_tag sale" alt=""/>
                      <!-- <van-tag type="danger" style="margin-right:5px">惠</van-tag> -->
                      <div v-show="item.ruleList.length > 0">
                        <van-tag type="danger" plain class="sale_tag" v-for="(st,stIndex) in item.ruleList" :key="stIndex">
                          <span class="tag_text">{{st.fullMeetMoney}}减{{st.fullReductionMoney}}</span>
                        </van-tag>
                      </div>
                    </div>
                  </template>
                </van-card>
              </div>
            </div>
          </van-list>
        <!-- </van-pull-refresh> -->
      </div>
    </div>
    <div class="home_bottom"></div>
  </div>
</template>
<script>
import { getShopsList, getMock } from '../api/shops'

let searchData = {
  cityId: '',//上送城市编号
  lon: '',//经度
  lat: '',//纬度
  businessAreaCode: '',//商圈编号
  merTypeCode: '',//商户分类编号
  areaId: '',//区域编号
  smartSort:'1',//智能排序 0-智能推荐 1-距离优先
  pageNo: 1,//第几页
  pageNum: null,//每页条数
  search: '',//商户名称模糊搜索
  txnId: '1PMC000002',//交易号
  // dns: '167'///生产环境注掉
}
export default {
  name:'ShopListArea',
  data() {
    return{
      shopList:[],
      noListFlag: '',
      hasNextPage: false,
      finished: false,
      ifSearch: false,
      thisStyle: '',//有搜索弹框时阻止页面底部滚动
      loading: false,//滚动到底部加载中
      title:'',
      ifSearch: false,
      searchVal: ''
    }
  },
  methods:{
    //请求接口获取列表
    getShopList() {
      // getMock().then((res) => {
      // //加载状态结束
      // this.loading = false;
      //   const dataList = res.data.body.shopList
      //   if(dataList.length > 0) {
      //     dataList.forEach((item) => {
      //       if(item.distance){
      //         this.$set(item,'distanceKm',Math.round((parseFloat(item.distance)/1000)*100)/100)
      //       }else{
      //         this.$set(item,'distanceKm',0)
      //       }
      //     });
      //   }
      //   this.shopList = this.shopList.concat(dataList)
      //   this.listLength = this.shopList.length === 0 
      //   this.hasNextPage = res.body.hasNextPage === '1'
      //   this.finished = res.body.hasNextPage === '0'
      // })
      getShopsList(searchData).then((res) => {
        if(res.stat === '00') {
          // 加载状态结束
          this.loading = false;
          console.log(res.body,'这是拿到的商户列表')
          const dataList = res.body.shopList
          if(dataList.length > 0) {
            dataList.forEach((item) => {
              if(item.distance){
                this.$set(item,'distanceKm',Math.round((parseFloat(item.distance)/1000)*100)/100)
              }else{
                this.$set(item,'distanceKm',0)
              }
            });
          }
          this.shopList = this.shopList.concat(dataList)
          this.noListFlag = this.shopList.length === 0 ? 'nocontent' : ''
          this.hasNextPage = res.body.hasNextPage === '1'
          this.finished = res.body.hasNextPage === '0'
        }else{
          if(this.shopList.length === 0) {
            this.noListFlag = 'net'
          }
        }
      })
    },
    //商户列表加载到底部刷新
    onLoad() {
      if(this.hasNextPage) {
        searchData.pageNo += 1
        this.getShopList()
      }
    },
    routeItem(data) {
      this.$router.push({
        path:'/ShopDetail',
        query: { 
          data: JSON.stringify(data),
          commonData: this.$route.query.info//cityId,lat,lon公共信息
        }
      })
    },
     //点击搜索
    searchShop() {
      searchData.search = this.searchVal
      this.shopList = []
      this.getShopList()
    },
    //关闭搜索
    closePop() {
      this.ifSearch = false
      this.searchVal = ''
      searchData.search = ''
    },
    handleScroll() {
      this.$store.state.module1.areaTop = this.$refs.areaBox.scrollTop
    }
  },
  activated() {
    this.$refs.areaBox.scrollTop = this.$store.state.module1.areaTop
    this.$refs.areaBox.addEventListener('scroll',this.handleScroll,true)
  },
  deactivated() {
    this.$refs.areaBox.removeEventListener('scroll',this.handleScroll,true)
  },
  mounted() {
    searchData = Object.assign(searchData, JSON.parse(this.$route.query.info))
    this.title = this.$route.query.title
    this.getShopList()
  },
  watch:{
    ifSearch(val) {
      if(val) {
        this.thisStyle = 'position: fixed'
      }else{
        this.thisStyle = 'position: static'
      }
    }
  },
  computed: {
    //商户列表里图片加载失败时显示的默认图片
    defaultImg() {
      return 'this.src="'+require('../assets/img/img_default.png')+'"'
    }
  },
}
</script>
<style scoped lang="less">
@import url('../style/page/home.less');
.home_content{
  padding-top: @P16;
  .content_list{
    height: calc(100% - 32px);//calc(100% - 32px)
    padding: 0 @P16 @P16 @P16;
  }
}
.search_pop{
  position: fixed;
  overflow: hidden;
  top: 45px;
  width: 100%;
  z-index: 110;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  .header_img{
    height: 22px;
    width: 22px;
  }
}
</style>
  
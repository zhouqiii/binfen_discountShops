<template>
  <div class="home">
    <common-header type="0" title="优惠商户">
      <template v-slot:icon1>
        <img src="../assets/img/icon_search.png" @click="ifSearch = true" class="header_img"/>
      </template>
    </common-header>
    <dropdown-menu
      :allData='selData'
      :ifFailSel='ifFailSel'
      @closePop="closePop"
      :showSearch='ifSearch'
      @upDateShopList='upDateShopList'
      @upDateSelectList='getTradeArea'
    ></dropdown-menu>
    <div class="home_content" :style="thisStyle">
      <div class="content_list">
        <div v-if="ifSelShopList" class="list_nocontent">
          <img src="../assets/img/img_nocontent.png"/>
          <div>没有找到合适的商户～</div>
        </div>
        <div v-if="ifNearShopList" class="list_nocontent">
          <img src="../assets/img/img_nolist.png"/>
          <div>您附近暂无优惠商户～</div>
        </div>
        <!-- <van-pull-refresh v-else> -->
          <van-list
            v-else
            v-model="loading"
            :finished="finished"
            :immediate-check="false"
            :offset="10"
            finished-text="-没有更多了-"
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
                      <img :src='item.merchantPicture' />
                    </div>
                  </template>
                  <template #title>
                    <div class="detail_title ellipsis">{{item.merchantName}}</div>
                  </template>
                  <template #desc>
                    <div class="detail_desc flex_between">
                      <div>
                        <span class="desc_area ellipsis">{{item.areaName}}</span>
                        <span class="desc_type ellipsis">{{item.merchantTypeName}}</span>
                      </div>
                      <span class="desc_distance">{{item.distanceKm}}km</span>
                    </div>
                    <div @click.stop=""  class="detail_sale">
                      <span class="area" @click="toTheShop(item.businessAreaCode,item.businessAreaName)">
                        <svg-icon iconClass="search"></svg-icon>{{item.businessAreaName}}
                      </span>
                    </div>
                  </template>
                  <template #tags>
                    <!--非我行收单商户-->
                    <div class="detail_sale"  v-if="item.merchantIsOnself === 0">
                      <van-tag type="danger" plain class="sale_tag" v-for="(st,stIndex) in item.ruleList" :key="stIndex">
                        <span class="tag_text">满{{st.fullMeetMoney}}减{{st.fullReductionMoney}}</span>
                      </van-tag>
                    </div>
                    <!--我行收单商户且进行了活动配置-->
                    <div class="detail_sale"  v-if="item.merchantIsOnself === 1 && item.isOnActivity === '1'">
                      <van-tag type="danger" style="margin-right:5px">惠</van-tag>
                      <van-tag type="danger" plain class="sale_tag" v-for="(st,stIndex) in item.ruleList" :key="stIndex">
                        <span class="tag_text">满{{st.fullMeetMoney}}减{{st.fullReductionMoney}}</span>
                      </van-tag>
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
import DropdownMenu from '../components/DropdownMenu.vue'
import SearchInput from '../components/SearchInput.vue'
import SwiperImage from '../components/SwiperImage.vue'
import { getTradeAreaList, getLocation, getShopsList, getMock } from '../api/shops'
import SvgIcon from '../components/SvgIcon.vue'
let searchData = {
  cityId: '',//上送城市编号110100
  lon: '',//经度'39.232'
  lat: '',//纬度116.121
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
let needData = null//为了给本页商户点击商区和详情页商区传递通用cityId,lat,lon
export default {
  name:'Home',
  components:{ SearchInput, SwiperImage, DropdownMenu, SvgIcon},
  data(){
    return{
      selData:[],
      shopList:[],
      ifSearch: false,
      thisStyle: '',//有搜索弹框时阻止页面底部滚动
      loading: true,//滚动到底部加载中
      finished: false,//商户列表已经到底了
      hasNextPage: true,
      ifSelShopList: false,//切换头部状态或查找商户时空状态效果
      ifNearShopList: false,//首页初次进来附近无商户效果
      ifFailSel: true
    }
  },
  methods:{
    //获取城市Id,用户账号等信息以及当前经纬度
    getCurrentInfo() {
      console.log(searchData,'searchData查看cityId这些jsp是否拿到')
      const { cityId, lon, lat } = searchData
      needData = { cityId, lon, lat }
      this.getTradeArea()
    },
    //首页获取头部下拉商铺列表
    getTradeArea() {
      const data = {
        cityId: searchData.cityId,//上送城市编号
        txnId: '1PMC000001',//交易号
        // dns: '167'///生产环境注掉
      }
      // 获取商圈以及地区列表
      // getTradeAreaList(data).then((res) => {
      //   console.log(res,'商圈以及地区列表')
      //   this.ifFailSel = !(res.stat === '00')
      //   if(res.body) {
      //     this.selData = res.body
      //   }
      // })
    },
    //点击去该商圈所有商户列表的页面
    toTheShop(busAreaCode,busAreaName) {
      needData.businessAreaCode = busAreaCode
      this.$router.push({
        path:'/ShopListArea',
        query: { 
          info: JSON.stringify(needData),
          title: busAreaName
        }
      })
    },
    //点击搜索或者切换商圈或地区更新商户列表
    upDateShopList(val) {
      this.shopList = []
      searchData = Object.assign(searchData, val)
      this.getShopList('sel')
    },
    getShopList(type) {
      getMock().then((res) => {
        this.shopList = this.shopList.concat(res.data.body.shopList)
      })
      // getShopsList(searchData).then((res) => {
      //   // 加载状态结束
      //   this.loading = false
      //   console.log(res.body,'这是拿到的商户列表')
      //   const dataList = res.body.shopList
      //   if(dataList.length > 0) {
      //     dataList.forEach((item) => {
      //       this.$set(item,'distanceKm',Math.round((parseFloat(item.distance)/1000)*100)/100)
      //     });
      //   }
      //   this.shopList = this.shopList.concat(dataList)
      //   if(this.shopList.length === 0) {
      //     if(type === 'sel') {
      //       this.ifSelShopList = this.shopList.length === 0 
      //     }else {
      //       this.ifNearShopList = this.shopList.length === 0
      //     }
      //   }
      //   this.hasNextPage = res.body.hasNextPage === '1'
      //   this.finished = res.body.hasNextPage === '0'
      // })
    },
    //商户列表加载到底部刷新
    onLoad() {
      alert(1)
      console.log(this.hasNextPage,'1111111')
      if(this.hasNextPage) {
        searchData.pageNo += 1
        this.getShopList()
      }
    },
    closePop() {
      this.ifSearch = false
      searchData.search =''
    },
    routeItem(data) {
      this.$router.push({
        path:'/ShopDetail',
        query: { 
          data: JSON.stringify(data),
          commonData: JSON.stringify(needData)
        }
      })
    }
  },
  mounted() {
    searchData.cityId = this.cityId
    searchData.lat = this.lat
    searchData.lon = this.lon
    this.getCurrentInfo()
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
  }
}
</script>
<style scoped lang="less">
@import url('../style/page/home.less');
.home_content{
  padding: 64px 16px 16px 16px;
}
</style>

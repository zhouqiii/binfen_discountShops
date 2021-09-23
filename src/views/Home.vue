<template>
  <div class="home">
    <common-header type="0" title="优惠商户">
      <template v-slot:icon1>
        <svg-icon iconClass="search" @click="ifSearch = true"></svg-icon>
      </template>
    </common-header>
    <dropdown-menu
      :allData='selData'
      @closePop="closePop"
      :showSearch='ifSearch'
      @upDateShopList='upDateShopList'
    ></dropdown-menu>
    <div class="home_content" :style="thisStyle">
      <div class="content_list">
        <van-list
          v-model="loading"
          :finished="finished"
          finished-text="-没有更多了-"
          @load="onLoad"
        >
          <div class="list_shops">
            <div v-for="(item,index) in shopList" :key="index" class="list_detail">
              <van-card :thumb="item.merchantPicture" @click="routeItem(item)">
                <template #title>
                  <div class="detail_title ellipsis">{{item.merchantName}}</div>
                </template>
                <template #desc>
                  <div class="detail_desc flex_between">
                    <span class="desc_area ellipsis">{{item.businessAreaCode}}</span>
                    <span class="desc_type ellipsis">{{item.merTypeCode}}</span>
                    <span class="desc_distance">{{item.distance}}</span>
                  </div>
                </template>
                <template #tags>
                  <!--非我行收单商户-->
                  <div class="detail_sale"  v-if="item.merchantIsOneself === '0'">
                    <van-tag type="danger" plain class="sale_tag">
                      <span class="ellipsis ">{{item.sale}}</span>
                    </van-tag>
                  </div>
                  <!--我行收单商户且进行了活动配置-->
                  <div class="detail_sale"  v-if="item.merchantIsOneself === '1' && item.isOnActivity === '1'">
                    <van-tag type="danger" plain class="sale_tag">
                      <van-tag type="danger">惠</van-tag>
                      <span class="ellipsis ">{{item.sale}}</span>
                    </van-tag>
                  </div>
                </template>
              </van-card>
            </div>
          </div>
          <!-- <shop-list :list="shopList" class="list_shops"></shop-list> -->
        </van-list>
      </div>
    </div>
    <div class="home_bottom"></div>
  </div>
</template>
<script>
import ShopList from '../components/ShopList.vue'
import DropdownMenu from '../components/DropdownMenu.vue'
import SearchInput from '../components/SearchInput.vue'
import SwiperImage from '../components/SwiperImage.vue'
import { getTradeAreaList, getLocation, getShopsList, getMock } from '../api/shops'
import SvgIcon from '../components/SvgIcon.vue'
let searchData = {
  cityId: '110100',//上送城市编号
  lon: '',//经度
  lat: '',//纬度
  businessAreaCode: '',//商圈编号
  merTypeCode: '',//商户分类编号
  areaId: '',//区域编号
  smartSort:'1',//智能排序 0-智能推荐 1-距离优先
  pageNo: 1,//第几页
  pageNum: 6,//每页条数
  search: '',//商户名称模糊搜索
}
export default {
  name:'Home',
  components:{ SearchInput, SwiperImage, DropdownMenu, ShopList, SvgIcon},
  data(){
    return{
      selData:[],
      shopList:[{
        sale:'满32减18，满100减20，满32减18，满100减20',distance:'855.08km',businessAreaCode:'XX区',merTypeCode:'饕餮美食饕餮美食饕餮美食饕餮美食饕餮美食饕餮美食饕餮美食饕餮美食',merchantName:'商户名称商户名称商户名称商户名称商户名称商户名称',merchantPicture:'https://img01.yzcdn.cn/vant/ipad.jpeg',
        isOnActivity:'1',merchantIsOneself:'1'
      },{
        sale:'满32减18，满100减20，满32减18',distance:'5463.08km',businessAreaCode:'XXXXXXXXXX区',merchantName:'酒店会所',merTypeCode:'饕餮美食饕餮美食饕餮美食饕餮美食',merchantPicture:'https://img01.yzcdn.cn/vant/ipad.jpeg'
        ,isOnActivity:'1',merchantIsOneself:'0'
      },{
        sale:'满32减18，满100减20',distance:'5463.08km',businessAreaCode:'XXXX区',merchantName:'酒店会所酒店会所酒店会所酒店会所',merTypeCode:'饕餮美食饕餮美食饕餮美食饕餮美食',merchantPicture:'https://img01.yzcdn.cn/vant/ipad.jpeg'
        ,isOnActivity:'0',merchantIsOneself:'0'
      },{
        sale:'满32减18',distance:'5463.08km',businessAreaCode:'XX区',merchantName:'酒店会所酒店会所',merTypeCode:'饕餮美食饕餮美食饕餮美食饕餮美食',merchantPicture:'https://img01.yzcdn.cn/vant/ipad.jpeg'
        ,isOnActivity:'0',merchantIsOneself:'1'
      },{
        sale:'满32减18，满100减20，满32减18，满100减20',distance:'5463.08km',businessAreaCode:'XXXX区',merchantName:'酒店会所',merTypeCode:'饕餮美食饕餮美食饕餮美食饕餮美食',merchantPicture:'https://img01.yzcdn.cn/vant/ipad.jpeg'
        ,isOnActivity:'0',merchantIsOneself:'1'
      },{
        sale:'满32减18，满100减20',distance:'5463.08km',businessAreaCode:'XXXX区',merchantName:'酒店会所酒店会所酒店会所',merTypeCode:'饕餮美食饕餮美食饕餮美食饕餮美食',merchantPicture:'https://img01.yzcdn.cn/vant/ipad.jpeg'
        ,isOnActivity:'1',merchantIsOneself:'1'
      }],
      ifSearch: false,
      thisStyle: '',//有搜索弹框时阻止页面底部滚动
      loading: false,//滚动到底部loading效果
      finished: false,//商户列表已经到底了
      hasNextPage: false,
    }
  },
  methods:{
    //获取城市Id,用户账号等信息以及当前经纬度
    getCurrentInfo() {
      this.getTradeArea()
      // getLocation().then((res) => {
      //   console.log(res,'获取CityId及经纬度')
      //   searchData.cityId = res.body.cityId
      //   searchData.lat = res.body.lat
      //   searchData.lon = res.body.lon
      // }).then(() => {
      //   this.getTradeArea()
      // })
    },
    //首页获取头部下拉商铺列表
    getTradeArea() {
      const data = {
        cityId: searchData.cityId//上送城市编号
      }
      // //获取商圈以及地区列表
      // getTradeAreaList(data).then((res) => {
      //   console.log(res,'商圈以及地区列表')
      //   if(res.body) {
      //     this.selData = res.body
      //   }
      // })
      getMock(data).then((res) => {
        console.log(res.data,'商圈列表')
        const data = res.data.body
        this.selData = data
      })
    },
    upDateShopList(val) {
      this.shopList = []
      searchData = Object.assign(searchData, val)
      this.getShopList()
    },
    getShopList() {
      getShopsList(searchData).then((res) => {
        console.log(res,'这是拿到的商户列表')
        this.shopList = this.shopList.concat(res.body.shopList)
        this.hasNextPage = res.body.hasNextPage === '1'
        this.finished = res.body.hasNextPage === '0'
      })
    },
    //商户列表加载到底部刷新
    onLoad() {
      if(this.hasNextPage) {
        searchData.pageNo += 1
      }
      this.getShopList()
      // 加载状态结束
      this.loading = false;
    },
    closePop() {
      this.ifSearch = false
      searchData.search =''
    },
    routeItem(data) {
      this.$router.push({
        path:'/ShopDetail',
        query: { data }
      })
    }
  },
  mounted() {
    this.getCurrentInfo()
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
.home{
  height: 100%;
  .home_content{
    height: 100%;
    width: 100%;
    overflow: auto;
    .content_list{
      height: 100%;
      overflow: auto;
      .list_shops{
        height: 100%;
        padding: 64px 16px 16px 16px;
        .list_detail{
          margin-bottom: 10px;
          .detail_desc{
            .desc_area{
              max-width: 60px;
            }
            .desc_type{
              max-width: 120px;
            }
          }
          .detail_sale{
            .sale_tag{
              padding-left: 0;
              .ellipsis{
                max-width: 190px;
              }
            }
          }
        }
      }
    }
  }
  .home_bottom{
    background: #f7f7f7;
    position: fixed;
    bottom: 0;
    width: 100%;
    z-index: 100;
    height: 34px;
  }
}
</style>

<template>
  <div class="home">
    <common-header type="0" title="优惠商户">
      <template v-slot:icon1>
        <svg-icon iconClass="search" @click="ifSearch = true"></svg-icon>
      </template>
    </common-header>
    <dropdown-menu
      :allData='selData'
      @closePop="ifSearch = false"
      :showSearch='ifSearch'
      @searchShop='searchShops'
    ></dropdown-menu>
    <div class="home_content">
      <!-- <search-input @searchShop='searchShops'></search-input> -->
      <shop-list :list="shopList" class="content_shops"></shop-list>
    </div>
    <div class="home_bottom"></div>
  </div>
</template>
<script>
import ShopList from '../components/ShopList.vue'
import DropdownMenu from '../components/DropdownMenu.vue'
import SearchInput from '../components/SearchInput.vue'
import SwiperImage from '../components/SwiperImage.vue'
import { getMock } from '../api/shops'
import SvgIcon from '../components/SvgIcon.vue'

export default {
  name:'Home',
  components:{ SearchInput, SwiperImage, DropdownMenu, ShopList, SvgIcon},
  data(){
    return{
      selData:[],
      imageList:['https://img01.yzcdn.cn/vant/apple-1.jpg','https://img01.yzcdn.cn/vant/apple-2.jpg'],
      shopList:[{
        sale:'满32减18，满100减20，满32减18，满100减20',distance:'855.08km',area:'XX区',types:'饕餮美食饕餮美食饕餮美食饕餮美食饕餮美食饕餮美食饕餮美食饕餮美食',title:'商户名称商户名称商户名称商户名称商户名称商户名称',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        sale:'满32减18，满100减20，满32减18',distance:'5463.08km',area:'XXXXXXXXXX区',title:'酒店会所',types:'饕餮美食饕餮美食饕餮美食饕餮美食',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        sale:'满32减18，满100减20',distance:'5463.08km',area:'XXXX区',title:'酒店会所酒店会所酒店会所酒店会所',types:'饕餮美食饕餮美食饕餮美食饕餮美食',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        sale:'满32减18',distance:'5463.08km',area:'XX区',title:'酒店会所酒店会所',types:'饕餮美食饕餮美食饕餮美食饕餮美食',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        sale:'满32减18，满100减20，满32减18，满100减20',distance:'5463.08km',area:'XXXX区',title:'酒店会所',types:'饕餮美食饕餮美食饕餮美食饕餮美食',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        sale:'满32减18，满100减20',distance:'5463.08km',area:'XXXX区',title:'酒店会所酒店会所酒店会所',types:'饕餮美食饕餮美食饕餮美食饕餮美食',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      }],
      ifSearch: false
    }
  },
  methods:{
    //首页获取头部下拉商铺列表
    getShops() {
      const data = {
        cityId: '110100'//上送城市编号
      }
      getMock(data).then((res) => {
        console.log(res.data,'商圈列表')
        const data = res.data.body
        this.selData = data
      })
    },
    getShopList() {
      const data = {
        cityId: '110100',//上送城市编号
        lon:'',//经度
        lat:'',//纬度
        businessAreaCode:'',//商圈编号
        merTypeCode:'',//商户分类编号
        smartSort:'',//智能排序
        pageNo:'',//第几页
        pageNum:'',//每页条数
        search: '',//搜索关键字
      }
    },
    //搜索栏点击搜索时触发的事件
    searchShops(val) {
      this.$toast(`这里应该根据输入值:${val}去重新请求`)
    },
  },
  mounted() {
    this.getShops()
    this.getShopList()
  },
}
</script>
<style scoped lang="less">
.home{
  height: 100%;
  .home_content{
    height: 100%;
    overflow: auto;
    .content_shops{
      height: 100%;
      padding: 16px;
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

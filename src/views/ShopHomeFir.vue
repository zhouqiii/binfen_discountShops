<template>
  <div class="home">
    <common-header type="0" title="优惠商户"></common-header>
    <div class="home_content">
      <div class="content_tabs">
        <van-tabs v-model="active" @click="onClickTab">
          <van-tab v-for="item in tabList" :title="item.title" :key="item.id">
            <search-input @searchShop='searchShops'></search-input>
            <swiper-image :imageList='imageList'></swiper-image>
            <dropdown-menu></dropdown-menu>
            <shop-list :list="shopList"></shop-list>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
<script>
import ShopList from '../components/ShopList.vue'
import DropdownMenu from '../components/DropdownMenu.vue'
import SearchInput from '../components/SearchInput.vue'
import SvgIcon from '../components/SvgIcon.vue'
import SwiperImage from '../components/SwiperImage.vue'
export default {
  name:'ShopHomeFir',
  components:{ SvgIcon, SearchInput, SwiperImage, DropdownMenu, ShopList},
  data(){
    return{
      tabList:[{
        title:'全部品类',id:'0'
      },{
        title:'酒店会所',id:'1'
      },{
        title:'饕餮美食',id:'2'
      },{
        title:'时尚购物',id:'3'
      },{
        title:'生活服务',id:'4'
      },{
        title:'休闲娱乐',id:'5'
      },{
        title:'汽车服务',id:'6'
      },{
        title:'运动健身',id:'7'
      },{
        title:'母婴亲子',id:'8'
      }],
      active: 0,
      imageList:['https://img01.yzcdn.cn/vant/apple-1.jpg','https://img01.yzcdn.cn/vant/apple-2.jpg'],
      shopList:[{
        number:'6',price:'20.00',oldPrice:'30.00',desc:'描述描述',title:'标题标题',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        number:'6',price:'20.00',oldPrice:'30.00',desc:'描述描述',title:'标题标题',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        number:'6',price:'20.00',oldPrice:'30.00',desc:'描述描述',title:'标题标题',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        number:'6',price:'20.00',oldPrice:'30.00',desc:'描述描述',title:'标题标题',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        number:'6',price:'20.00',oldPrice:'30.00',desc:'描述描述',title:'标题标题',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      },{
        number:'6',price:'20.00',oldPrice:'30.00',desc:'描述描述',title:'标题标题',thumb:'https://img01.yzcdn.cn/vant/ipad.jpeg'
      }]
    }
  },
  methods:{
    onClickTab(){
      this.$toast(11)
    },
    searchShops(val){
      this.$toast(`这里应该根据输入值:${val}去重新请求`)
    }
  }
}
</script>
<style scoped lang="less">
</style>

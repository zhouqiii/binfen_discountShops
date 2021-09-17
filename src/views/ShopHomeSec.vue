<template>
  <div class="homeSec">
    <common-header type="0" title="优惠商户"></common-header>
    <div class="homeSec_content">
      <div class="homeSec_search flex_row">
        <div class="search_area" @click="showBullet = true">{{city}}<van-icon name="arrow-down" /></div>
        <search-input @searchShop='searchShops' class="search_input"></search-input>
      </div>
      <swiper-image :imageList='imageList'></swiper-image>
      <div class="homeSec_tabType flex_start">
        <div v-for="item in tabList" :key="item.id" class="type_item flex_column">
          <div><img :src="item.imgUrl"/></div>
          <div class="item_text">{{item.title}}</div>
        </div>
      </div>
      <dropdown-menu></dropdown-menu>
      <shop-list :list="shopList" class="homeSec_shop"></shop-list>
    </div>
    <!--地区选项弹出层-->
    <div class="homeSec_pop">
      <van-popup
        v-model="showBullet"
        position="bottom"
        :style="{ width: '100%', height: '100%', background: '#9F9F9F' }"
        get-container=".areaPop"
      >
        <area-pop @closeBullet="showBullet = false"></area-pop>
      </van-popup>
    </div>
    <!--地区选项弹出层结束-->
  </div>
</template>
<script>
import AreaPop from '../components/city/AreaPop.vue'
import ShopList from '../components/ShopList.vue'
import DropdownMenu from '../components/DropdownMenu.vue'
import SearchInput from '../components/SearchInput.vue'
import SvgIcon from '../components/SvgIcon.vue'
import SwiperImage from '../components/SwiperImage.vue'
import { mapState } from 'vuex'
export default {
  name:'ShopHomeSec',
  components:{ SvgIcon, SearchInput, SwiperImage, DropdownMenu, ShopList, AreaPop},
  data(){
    return{
      tabList:[{
        title:'全部品类',id:'0',imgUrl:'../assets/logo.png'
      },{
        title:'酒店会所',id:'1',imgUrl:'../assets/logo.png'
      },{
        title:'饕餮美食',id:'2',imgUrl:'../assets/logo.png'
      },{
        title:'时尚购物',id:'3',imgUrl:'../assets/logo.png'
      },{
        title:'生活服务',id:'4',imgUrl:'../assets/logo.png'
      },{
        title:'休闲娱乐',id:'5',imgUrl:'../assets/logo.png'
      },{
        title:'汽车服务',id:'6',imgUrl:'../assets/logo.png'
      },{
        title:'运动健身',id:'7',imgUrl:'../assets/logo.png'
      },{
        title:'母婴亲子',id:'8',imgUrl:'../assets/logo.png'
      },{
        title:'母婴亲子',id:'9',imgUrl:'../assets/logo.png'
      }],
      active:0,
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
      }],
      showBullet: false
    }
  },
  methods:{
    onClickTab(){
      this.$toast(11)
    },
    searchShops(val){
      this.$toast(`这里应该根据输入值:${val}去重新请求`)
    },
  },
  computed: {
    ...mapState(['city'])
  }
}
</script>
<style scoped lang="less">
@import url('../style/page/shopHome.less');
</style>

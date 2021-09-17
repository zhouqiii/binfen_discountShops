<template>
  <div class="home">
    <common-header type="0" title="优惠商户"></common-header>
    <div class="home_content">
      <div class="content_tabs">
        <search-input @searchShop='searchShops'></search-input>
        <dropdown-menu></dropdown-menu>
        <shop-list :list="shopList" class="home_shop"></shop-list>
      </div>
    </div>
  </div>
</template>
<script>
import ShopList from '../components/ShopList.vue'
import DropdownMenu from '../components/DropdownMenu.vue'
import SearchInput from '../components/SearchInput.vue'
import SwiperImage from '../components/SwiperImage.vue'
export default {
  name:'Home',
  components:{ SearchInput, SwiperImage, DropdownMenu, ShopList},
  data(){
    return{
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
.home_shop{
  height: 450px;
  position: relative;
  width: 100%;
}
</style>

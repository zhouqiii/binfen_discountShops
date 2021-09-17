<template>
  <div>
    <div class="shop_list">
      <div v-for="(item,index) in shopList" :key="index">
        <van-card
          :num="item.number"
          :price="item.price"
          :origin-price="item.oldPrice"
          :desc="item.desc"
          :title="item.title"
          :thumb="item.thumb"
        >
          <template #tags>
            <van-tag plain type="danger">标签</van-tag>
            <van-tag plain type="danger">标签</van-tag>
          </template>
          <template #footer>
            <van-button size="mini">按钮</van-button>
            <van-button size="mini">按钮</van-button>
          </template>
        </van-card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name:'ShopList',
  props:{
    list: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return{
      shopList: []
    }
  },
  mounted() {
    this.shopList = this.list
  }
}
</script>
<style lang="less" scoped>
.shop_list{
  height: 100%;
  overflow: auto;
}
</style>
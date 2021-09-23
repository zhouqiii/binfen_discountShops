<template>
  <div>
   <div v-for="(item,index) in shopsList" :key="index" class="list_detail">
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
          <div class="detail_sale">
            <van-tag type="danger" plain class="sale_tag">
              <van-tag type="danger">惠</van-tag>
              <span class="ellipsis ">{{item.sale}}</span>
            </van-tag>
          </div>
          <!-- <van-tag type="danger">惠</van-tag>
          <span>32减18，100减20，32减18，100减20</span> -->
        </template>
        <!-- <template #footer>
          <van-button size="mini">按钮</van-button>
          <van-button size="mini">按钮</van-button>
        </template> -->
      </van-card>
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
      shopsList: [],
    }
  },
  methods: {
    routeItem(data) {
      this.$router.push({
        path:'/ShopDetail',
        query: { data }
      })
    }
  },
  mounted() {
    alert(1)
  },
  watch: {
    list(val) {
      // val.forEach((item) => {
      //   item.ruleList.forEach((child) => {

      //   })
      // });
      this.shopsList = val
      console.log(this.shopsList,'商铺列表')
    }
  }
}
</script>
<style lang="less" scoped>
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
</style>
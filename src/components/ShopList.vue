<template>
  <div>
    <div class="shop_list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="-没有更多了-"
        @load="onLoad"
      >
        <div v-for="(item,index) in shopsList" :key="index" class="list_detail">
          <van-card :thumb="item.thumb" @click="routeItem">
            <template #title>
              <div class="detail_title ellipsis">{{item.title}}</div>
            </template>
            <template #desc>
              <div class="detail_desc flex_between">
                <span class="desc_area ellipsis">{{item.area}}</span>
                <span class="desc_type ellipsis">{{item.types}}</span>
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
      </van-list>
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
      loading: false,
      finished: false
    }
  },
  methods: {
    onLoad() {
    // 异步更新数据
    // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
    routeItem() {
      this.$router.push({
        path:'/ShopDetail'
      })
    }
  },
  watch: {
    list(val) {
      this.shopsList = val
      console.log(this.shopsList,'商铺列表')
    }
  }
}
</script>
<style lang="less" scoped>
.shop_list{ 
  height: 100%;
  overflow: auto;
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
</style>
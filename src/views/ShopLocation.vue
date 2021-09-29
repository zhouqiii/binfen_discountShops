<!--
 * @Author: your name
 * @Date: 2021-09-24 10:27:10
 * @LastEditTime: 2021-09-26 14:34:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \binfen_discountShops\src\views\ShopLocation.vue
-->
<template>
  <div class="location" style="height:100%">
    <common-header title="门店位置"></common-header>
    <tencent-map :shopData="shopInfo"></tencent-map>
  </div>
</template>
<script>
import TencentMap from '../components/TencentMap.vue';

export default {
  name: 'ShopLocation',
  components: { TencentMap },
  data() {
    return {
      shopInfo: {}
    }
  },
  mounted() {
    this.shopInfo = JSON.parse(this.$router.query.data)
    console.log(this.shopInfo, 'shopInfo')
  }
}
</script>
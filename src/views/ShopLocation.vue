<template>
  <div class="location" style="height:100%">
    <common-header title="门店位置"></common-header>
    <tencent-map></tencent-map>
  </div>
</template>
<script>
import TencentMap from '../components/TencentMap.vue';

export default {
  name: 'ShopLocation',
  components: { TencentMap },
  data() {
    return {}
  }
}
</script>
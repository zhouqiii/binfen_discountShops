<template>
  <div>
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img v-lazy="image" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script>
export default {
  name:'SwiperImage',
  props: {
    imageList: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return{
      images:[]
    }
  },
  mounted() {
    this.images = this.imageList
  }
}
</script>
<style lang="less" scoped>
.van-swipe{
  height: 100px;
}
</style>
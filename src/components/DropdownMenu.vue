<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item v-model="shopArea" :options="shopAreaOptions" @change='selectChange'/>
      <van-dropdown-item v-model="shopType" :options="shopTypeOptions" @change='selectChange'/>
      <van-dropdown-item v-model="sortLine" :options="sortOptions" @change='selectChange'/>
    </van-dropdown-menu>
  </div>
</template>
<script>
export default {
  name:'DropDownMenu',
  data() {
    return {
      sortLine: 0,
      shopType: 0,
      shopArea: 0,
      switch1: false,
      switch2: false,
      checkId: {
        parId: 0,
        chdId: 999
      },
      sortOptions: [
        { text: '智能排序', value: 0 },
        { text: '距离优先', value: 1 }
      ],
      shopTypeOptions: [
        { text: '全部类型', value: 0 },
        { text: '酒店商旅', value: 1 },
        { text: '饕餮美食', value: 2 },
        { text: '时尚购物', value: 3 },
        { text: '休闲娱乐', value: 4 },
        { text: '生活服务', value: 5 },
        { text: '汽车服务', value: 6 },
        { text: '运动健身', value: 7 },
        { text: '母婴亲子', value: 8 },
        { text: '教育培训', value: 9 },
      ],
      shopAreaOptions: [
        { text: '附近商圈', value: 0 },
        { text: '朝阳区', value: 1 },
        { text: '海淀区', value: 2 },
      ],
    };
  },
  methods: {
   selectChange(val) {
     console.log(val)
     this.$toast('选项改变回调,回调参数是value')
   }
  },
  computed:{
    hasChild() {
      if(this.areaChildOptions.length === 0) {
        return false
      }
      return true
    }
  }
};
</script>
<style lang="less" scoped>
.area{
  display: flex;;
  .area_region{
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    .textColor{
      color: red;
    }
  }
  .area_check{
    flex: 1;
  }
}
</style>

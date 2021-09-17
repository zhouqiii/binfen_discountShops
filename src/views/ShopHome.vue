<template>
  <div>
      
  </div>
</template>
<script>
export default {
  name: 'ShopHome',
  data() {
    return{
      templateFlag: '1',// 标志后台备注的是哪个模板 1--模板一
    }
  },
  mounted() {
    if(this.templateFlag === '1') {
      this.$router.push({ path: '/ShopHomeFir' });
    } else {
      this.$router.push({ path: '/ShopHomeSec' });
    }
  }
}
</script>
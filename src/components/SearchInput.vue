<template>
  <div>
    <van-search
      v-model="searchVal"
      input-align="center"
      background="#4fc08d"
      placeholder="搜索商户"
    >
      <template v-slot:left-icon>
        <svg-icon iconClass="search" @click="searchShop"></svg-icon>
      </template>
    </van-search>
  </div>
</template>
<script>
export default {
  name:'SearchInput',
  data() {
    return{
      searchVal:'',
    }
  },
  methods:{
    searchShop(){
      this.$emit('searchShop',this.searchVal)
    },
  },
  computed:{
  }
}
</script>
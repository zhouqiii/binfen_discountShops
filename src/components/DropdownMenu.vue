<template>
  <div>
    <div class="dropdown">
      <van-dropdown-menu>
        <van-dropdown-item :title="selArea" ref="areaDrop">
          <van-tree-select
            :items="areaOptions"
            :active-id.sync="activeId"
            :main-active-index.sync="activeIndex"
            @click-item="cityChange"
          />
        </van-dropdown-item>
        <van-dropdown-item v-model='type' :title='selType' :options="typeOptions" @change='typeChange'/>
        <van-dropdown-item v-model="sortLine" :options="sortOptions"/>
      </van-dropdown-menu>
    </div>
    <div class="search_pop" v-if="ifSearch" @click="closePop">
      <div  @click.stop=""><!--阻止冒泡-->
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
    </div>
  </div>
</template>
<script>
import SearchInput from './SearchInput.vue';
export default {
  components: { SearchInput },
  name: 'DropDownMenu',
  props: ['allData','showSearch'],
  data() {
    return {
      selArea:'附近商圈',
      activeId: -1,//附近商圈第二栏选中的id
      activeIndex: 0,//附近商圈第一栏选中的索引
      sortLine: 0,
      type: 0,
      selType: '商户分类',
      sortOptions: [
        { text: '智能排序', value: 0 },
        { text: '距离优先', value: 1 }
      ],
      areaOptions: [{
        text:'商圈',children:[]
      },{
        text:'城区',children:[]
      }],
      typeOptions: [],
      ifSearch: false,
      searchVal:'',
    };
  },
  methods: {
    //商圈类型选择改变触发
    typeChange(index) {
      this.selType = this.typeOptions[index].text
    },
    //商圈类型或者商圈地区选择改变触发
    cityChange(item) {
      this.selArea = item.text
      this.$refs.areaDrop.toggle();//把ref=areaDrop对应的dropDown关起来
    },
    //点击搜索
    searchShop(){
      this.$emit('searchShop',this.searchVal)
    },
    //关闭当前搜索层
    closePop() {
      this.$emit('closePop')
    }
  },
  watch: {
    allData(val) {
      //所有商圈赋值
      val.businessAreaList.forEach((item) => {
        const obj = {}
        obj.text = item.businessAreaName
        obj.id = item.businessAreaCode
        this.areaOptions[0].children.push(obj)
      });
      //所有城区赋值
      val.cityAreaList.forEach((item) => {
        const obj = {}
        obj.text = item.cityAreaName
        obj.id = item.cityAreaCode
        this.areaOptions[1].children.push(obj)
      });
      //所有商圈分类
      val.merTypeList.forEach((item) => {
        const obj = {}
        obj.text = item.merchantTypeName
        obj.value = item.merTypeCode
        this.typeOptions.push(obj)
      });
    },
    showSearch(val) {
      this.ifSearch = val
    }
  }
};
</script>
<style lang="less" scoped>
.dropdown{
  top: 45px;
  width: 100%;
  z-index: 105;
  position: fixed;
}
.search_pop{
  position: fixed;
  top: 45px;
  overflow: hidden;
  width: 100%;
  z-index: 110;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}
</style>

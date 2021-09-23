<template>
  <div>
    <div class="dropdown">
      <van-dropdown-menu>
        <van-dropdown-item :title="selArea" ref="areaDrop">
          <van-tree-select
            :items="areaOptions"
            :active-id.sync="areaChildren"
            :main-active-index.sync="areaParent"
            @click-item="cityChange"
          />
        </van-dropdown-item>
        <van-dropdown-item v-model='merTypeCode' :title='selType' :options="typeOptions" @change='typeChange'/>
        <van-dropdown-item v-model="smartSort" :options="sortOptions"/>
      </van-dropdown-menu>
    </div>
    <div class="search_pop" v-if="ifSearch" @click="closePop">
      <div  @click.stop=""><!--阻止冒泡-->
        <van-search
          v-model="searchVal"
          input-align="center"
          background="#4fc08d"
          placeholder="搜索商户"
          @change="searchShop"
        >
          <template v-slot:left-icon>
            <svg-icon iconClass="search"></svg-icon>
          </template>
        </van-search>
      </div>
    </div>
  </div>
</template>
<script>
let sendData = {
  businessAreaCode: '',//商圈编号
  merTypeCode: '',//商户分类编号
  areaId: '',//区域编号
  search: '',//搜索关键字
}
import SearchInput from './SearchInput.vue';
export default {
  components: { SearchInput },
  name: 'DropDownMenu',
  props: ['allData','showSearch'],
  data() {
    return {
      selArea:'附近商圈',
      areaChildren: -1,//附近商圈第二栏选中的id
      areaParent: 0,//附近商圈第一栏选中的索引
      smartSort: '1',
      merTypeCode:'',//商户分类编号
      selType: '商户分类',
      sortOptions: [
        // { text: '智能排序', value: 0 },
        { text: '距离优先', value: '1' }
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
      console.log(index,'typeChange')
      this.typeOptions.forEach((item) => {
        if(item.value === index) {
          this.selType = item.text
        }
      })
    },
    //商圈类型或者商圈地区选择改变触发
    cityChange(item) {
      console.log(this.areaParent,this.areaChildren,'是商圈还是地区')
      sendData.areaId = this.areaParent === 1 ? this.areaChildren : ''
      sendData.businessAreaCode = this.areaParent === 0 ? this.areaChildren : ''
      this.selArea = item.text
      this.$refs.areaDrop.toggle();//把ref=areaDrop对应的dropDown关起来
      this.$emit('upDateShopList',sendData)
    },
    //点击搜索
    searchShop(){
      this.$emit('upDateShopList',sendData)
    },
    //关闭当前搜索层
    closePop() {
      this.searchVal = ''
      this.$emit('closePop')
    }
  },
  watch: {
    allData(val) {
      //所有商圈赋值
      if(val.businessAreaList.length>0) {
        val.businessAreaList.forEach((item) => {
          let obj = item
          obj = JSON.parse(JSON.stringify(obj).replace(/businessAreaName/g, 'text'))
          obj = JSON.parse(JSON.stringify(obj).replace(/businessAreaCode/g, 'id'))
          this.areaOptions[0].children.push(obj)
        });
      }
      //所有城区赋值
      if(val.areaList.length>0) {
        val.areaList.forEach((item) => {
          let obj = item
          obj = JSON.parse(JSON.stringify(obj).replace(/areaName/g, 'text'))
          obj = JSON.parse(JSON.stringify(obj).replace(/areaId/g, 'id'))
          this.areaOptions[1].children.push(obj)
        });
      }
      //所有商户分类
      if(val.merTypeList.length>0) {
        val.merTypeList.forEach((item) => {
          let obj = item
          obj = JSON.parse(JSON.stringify(obj).replace(/merchantTypeName/g, 'text'))
          obj = JSON.parse(JSON.stringify(obj).replace(/merTypeCode/g, 'value'))
          this.typeOptions.push(obj)
        });
      }
    },
    showSearch(val) {
      this.ifSearch = val
    },
    searchVal(val) {
      sendData.search = val
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

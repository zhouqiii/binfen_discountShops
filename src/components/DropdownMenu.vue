<template>
  <div>
    <div class="dropdown">
      <van-dropdown-menu active-color="#F44336">
        <van-dropdown-item :title="selArea" ref="areaDrop">
          <div v-if="ifFailList" @click="reLoad" class="drop_reload">
            <img src="../assets/img/icon_reload.png"/>
            <span>点击重新加载</span>
          </div>
          <van-tree-select
            v-if="!ifFailList"
            :items="areaOptions"
            :active-id.sync="areaChildren"
            :main-active-index.sync="areaParent"
            @click-item="cityChange"
          />
        </van-dropdown-item>
        <van-dropdown-item v-model='merTypeCode' :title='selType' :options="typeOptions" @change='typeChange' ref="typeDrop">
          <div v-if="ifFailList" @click="reLoad" class="drop_reload">
            <img src="../assets/img/icon_reload.png"/>
            <span>点击重新加载</span>
          </div>
        </van-dropdown-item>
        <!-- <van-dropdown-item v-model="smartSort" :options="sortOptions"/> -->
      </van-dropdown-menu>
    </div>
    <div class="search_pop" v-if="ifSearch" @click="closePop">
      <div @click.stop=""><!--阻止冒泡-->
        <van-search
          v-model="searchVal"
          input-align="left"
          background="#ffffff"
          placeholder="请输入商户名称"
          @input="searchShop"
        >
          <template v-slot:left-icon>
            <img src="../assets/img/icon_search.png" class="header_img"/>
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
export default {
  name: 'DropDownMenu',
  props: ['allData','showSearch','ifFailSel'],
  data() {
    return {
      selArea:'附近商圈',
      areaChildren: -1,//附近商圈第二栏选中的id
      areaParent: 0,//附近商圈第一栏选中的索引
      // smartSort: '1',
      merTypeCode:'',//商户分类编号
      selType: '商户分类',
      // sortOptions: [
      //   // { text: '智能排序', value: 0 },
      //   { text: '距离优先', value: '1' }
      // ],
      areaOptions: [{
        text:'商圈',children:[]
      },{
        text:'城区',children:[]
      }],
      typeOptions: [],
      ifSearch: false,
      searchVal:'',
      ifFailList: true,//父组件加载头部选项列表数据是否失败
    };
  },
  methods: {
    //商圈类型选择改变触发
    typeChange(index) {
      console.log(index,'typeChange')
      sendData.merTypeCode = index
      this.typeOptions.forEach((item) => {
        if(item.value === index) {
          this.selType = item.text
        }
      })
      this.$emit('upDateShopList',sendData)
    },
    //商圈类型或者商圈地区选择改变触发
    cityChange(item) {
      console.log(this.areaParent,this.areaChildren,'是商圈还是地区')
      if(this.areaOptions.length === 1) {
        sendData.areaId = this.areaOptions[0].text === '城区' ? this.areaChildren : ''
        sendData.businessAreaCode = this.areaOptions[0].text === '商圈' ? this.areaChildren : ''
      }else if(this.areaOptions.length === 2){
        sendData.areaId = this.areaParent === 1 ? this.areaChildren : ''
        sendData.businessAreaCode = this.areaParent === 0 ? this.areaChildren : ''
      }
      this.selArea = item.text
      this.$refs.areaDrop.toggle();//把ref=areaDrop对应的dropDown关起来
      this.$emit('upDateShopList',sendData)
    },
    //点击搜索
    searchShop(){
      sendData.search = this.searchVal
      this.$emit('upDateShopList',sendData)
    },
    //关闭当前搜索层
    closePop() {
      this.searchVal = ''
      sendData.search = ''
      this.$emit('closePop')
    },
    //头部选项加载失败--重新加载商户分类和商圈头部选项
    reLoad() {
      this.$refs.typeDrop.toggle(false);//把ref=typeDrop对应的dropDown关起来
      this.$refs.areaDrop.toggle(false);//把ref=areaDrop对应的dropDown关起来
      this.$emit('upDateSelectList')
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
      }else{
        this.areaOptions.splice(0,1)
      }
      //所有城区赋值
      if(val.areaList.length>0) {
        val.areaList.forEach((item) => {
          let obj = item
          obj = JSON.parse(JSON.stringify(obj).replace(/areaName/g, 'text'))
          obj = JSON.parse(JSON.stringify(obj).replace(/areaId/g, 'id'))
          this.areaOptions[1].children.push(obj)
        });
      }else{
        if(this.areaOptions.length === 1){
          this.areaOptions.splice(0,1)
        }else{
          this.areaOptions.splice(1,1)
        }
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
      console.log(this.areaOptions,this.typeOptions,'头部选项列表')
    },
    showSearch(val) {
      this.ifSearch = val
    },
    ifFailSel(val) {
      this.ifFailList = val
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
  .drop_reload{
    padding: 40px 0;
    text-align: center;
    font-size: 15px;
    color: @CF44;
    img{
      height: 16px;
      width: 16px;
      margin-right: 6px;
      vertical-align:top

    }
  }
}
.search_pop{
  position: fixed;
  top: 45px;
  overflow: hidden;
  width: 100%;
  z-index: 110;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  .header_img{
    height: 22px;
    width: 22px;
  }
}
</style>

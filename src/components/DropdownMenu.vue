<template>
  <div>
    <div class="dropdown">
      <van-dropdown-menu active-color="#F44336">
        <van-dropdown-item :title="selArea" ref="areaDrop">
          <div v-if="ifFailArea || ifFailSel" @click="reLoad" class="drop_reload">
            <img src="../assets/img/icon_reload.png"/>
            <span>点击重新加载</span>
          </div>
          <van-tree-select
            v-else
            max="2"
            :items="areaOptions"
            :active-id.sync="areaChildren"
            :main-active-index.sync="areaParent"
            @click-item="cityChange"
          />
        </van-dropdown-item>
        <van-dropdown-item v-model='merTypeCode' :title='selType' :options="typeOptions" @change='typeChange' ref="typeDrop">
          <div v-if="ifFailType || ifFailSel" @click="reLoad" class="drop_reload">
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
      selArea:'附近区域',
      areaChildren: [''],//附近商圈第二栏选中的id
      areaParent: 0,//附近商圈第一栏选中的索引
      // smartSort: '1',
      merTypeCode:'',//商户分类编号
      selType: '全部品类',
      // sortOptions: [
      //   // { text: '智能排序', value: 0 },
      //   { text: '距离优先', value: '1' }
      // ],
      areaOptions: [{
        text:'按商圈',children:[]
      },{
        text:'按区域',children:[]
      }],
      typeOptions: [],
      ifSearch: false,
      searchVal:'',
      ifFailArea: true,//父组件加载头部选项地区列表数据是否失败
      ifFailType: true,//父组件加载头部选项种类列表数据是否失败
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
      this.areaChildren[1] = item.id
      console.log(this.areaParent,this.areaChildren,'是商圈还是地区')
      //因为这里要求两个全部,且两个全部不是同时选中的，所以区分''和null区分两个全部
      this.areaOptions.forEach((item,index) => {
        if(index === this.areaParent) {
          item.children[0].id = null
        }else{
          item.children[0].id = ''
        }
      })
      //商圈号businessAreaCode和地区号areaId是互斥的
      if(this.areaOptions.length === 1) {
        sendData.areaId = this.areaOptions[0].text === '城区' ? this.areaChildren[1] : ''
        sendData.businessAreaCode = this.areaOptions[0].text === '商圈' ? this.areaChildren[1] : ''
      }else if(this.areaOptions.length === 2){
        sendData.areaId = this.areaParent === 1 ? this.areaChildren[1] : ''
        sendData.businessAreaCode = this.areaParent === 0 ? this.areaChildren[1] : ''
      }
      //上送不能为null
      sendData.areaId = sendData.areaId === null ? '' : sendData.areaId
      sendData.businessAreaCode = sendData.businessAreaCode === null ? '' : sendData.businessAreaCode
      //当选择全部时头部还显示附近区域
      this.selArea = item.id !== null ? item.text : '附近区域'
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
      this.areaOptions.forEach((item) => {
        item.children = []
      })
      this.typeOptions = []
      //所有商圈赋值
      if(val.businessAreaList.length>0) {
        this.areaOptions[0].children.push({text:'全部',id:''})
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
        this.areaOptions[1].children.push({text:'全部',id:''})
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
      this.ifFailArea = (val.areaList.length<1 && val.businessAreaList.length<1) ? true : false//说明商圈和地区列表都为空
      //所有商户分类
      if(val.merTypeList.length>0) {
        this.typeOptions.push({text:'全部品类',value:''})
        val.merTypeList.forEach((item) => {
          let obj = item
          obj = JSON.parse(JSON.stringify(obj).replace(/merchantTypeName/g, 'text'))
          obj = JSON.parse(JSON.stringify(obj).replace(/merTypeCode/g, 'value'))
          this.typeOptions.push(obj)
        });
      }
      this.ifFailType =  val.merTypeList.length<1 ? true : false//说明商户种类为空
      console.log(this.ifFailArea,this.ifFailType,this.ifFailSel,'头部显示')
      console.log(this.areaOptions,this.typeOptions,'头部选项列表')
    },
    showSearch(val) {
      this.ifSearch = val
    },
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

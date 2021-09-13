<template>
  <div>
    <van-dropdown-menu>
      <van-dropdown-item :title="tradeArea" ref="item">
        <div class="area">
          <div class="area_region parent">
            <van-cell
              v-for="item in areaOptions"
              :key="item.id"
              :class="{textColor: checkId.parId === item.id}"
              @click="changeOptions(item)"
            >
              <template #title>
                <span>{{item.name}}</span>
              </template>
              <template #right-icon>
                <van-icon name="success" class="search-icon" v-show="!hasChild && item.id===checkId.parId"/>
              </template>
            </van-cell>
          </div>
          <div class="area_region child" v-show="hasChild">
            <van-cell
              v-for="item in areaChildOptions"
              :key="item.id"
              :class="{textColor: checkId.chdId === item.id}"
              @click="changeChildOptions(item)"
            >
              <template #title>
                <span>{{item.name}}</span>
              </template>
              <template #right-icon>
                <van-icon name="success" class="search-icon"  v-show="item.id===checkId.chdId"/>
              </template>
            </van-cell>
          </div>
        </div>
      </van-dropdown-item>
      <van-dropdown-item v-model="sortLine" :options="sortOptions" />
    </van-dropdown-menu>
  </div>
</template>
<script>
export default {
  name:'DropDownMenu',
  data() {
    return {
      tradeArea: '附近区域',
      sortLine:0,
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
      items:[
        { text: '浙江', children: [{
        // 名称
        text: '温州',
        // id，作为匹配选中状态的标识符
        id: 2,
      },{
        // 名称
        text: '温州',
        // id，作为匹配选中状态的标识符
        id: 1,
      },], dot: true },
        { text: '江苏', children: [{
        // 名称
        text: '',
        // id，作为匹配选中状态的标识符
        id: 5,
      },], badge: 5 },
      ],
      activeId: 1,
      activeIndex: 0,
      areaOptions:[
        {name:'附近',id:0,child:[{name:'附近(智能范围)',id:111},{name:'500米',id:112},{name:'1000米',id:113},{name:'2000米',id:114},{name:'5000米',id:115}]},
        {name:'东城区',id:1,child:[]},{name:'西城区',id:2,child:[]},{name:'崇文区',id:3,child:[]},
        {name:'宣武区',id:4,child:[]},{name:'朝阳区',id:5,child:[]},{name:'丰台区',id:6,child:[]},{name:'石景山区',id:7,child:[]},
        {name:'海淀区',id:8,child:[]},{name:'门头沟区',id:9,child:[]},{name:'房山区',id:10,child:[]},{name:'通州区',id:11,child:[]},
        {name:'顺义区',id:12,child:[]},{name:'昌平区',id:13,child:[]},{name:'大兴区',id:14,child:[]},{name:'怀柔区',id:15,child:[]},
        {name:'平谷区',id:16,child:[]},{name:'密云区',id:17,child:[]},{name:'延庆区',id:18,child:[]}
      ],
      areaChildOptions:[]
    };
  },
  methods: {
    onConfirm() {
      this.$refs.item.toggle();
    },
    changeOptions(item) {
      if(item.child.length !== 0){
        this.areaChildOptions = item.child
        this.checkId.parId = item.id
        this.checkId.chdId = item.child[0].id
      }else{
        this.tradeArea = item.name
        this.checkId.parId = item.id
        this.checkId.chdId = 999
        this.areaChildOptions = []
      }
    },
    changeChildOptions(item) {
      this.tradeArea=item.name
      this.checkId.chdId = item.id
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

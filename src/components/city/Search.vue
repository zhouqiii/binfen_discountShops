<template>
  <div>
    <div class="citysearch">
      <input v-model="inputname" class="city-input" type="text" placeholder="请输入城市/景点名称"  style="border-color: none"/>
    </div>
    <div class="showsearch" ref="inpututil" v-show="inputname">
      <ul>
        <li v-for="item in lists" :key="item.id" style="border-bottom:1px solid #cccccc;list-style-type:none;" class="liforinput"  @click="changecitynn(item.name)">{{item.name}}</li>
        <li v-show="hasinput" style="border-bottom:1px solid #cccccc;list-style-type:none;" class="liforinput">无匹配数据</li>
      </ul>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { mapMutations } from 'vuex'

export default {
  name: 'CitySearch',
  props: {
    cities: Object
  },
  data () {
    return{
      lists: [],
      timer: null,
      inputname: ''
    }
  },
  methods: {
    changecitynn: function(value) {
      this.changecitys(value)
      this.$router.push('/')
      this.inputname = ''
    },
    ...mapMutations(['changecitys'])
  },
  mounted () {
    this.scroll = new BScroll(this.$refs.inpututil)
  },
  computed: {
    hasinput () {
      return !this.lists.length
    }
  },
  watch: {
    inputname () {
      if(this.timer) {
        clearTimeout(this.timer)
      }
      if(!this.inputname) {
        this.lists = []
        return 
      }
      this.timer = setTimeout(() => {
        const results = []
        for(let i in this.cities) {
          this.cities[i].forEach((value) => {
            if(value.spell.indexOf(this.inputname) > -1 || value.name.indexOf(this.inputname) > -1) {
              results.push(value)
            }
          })
          }
        this.lists = results
      },100)
    }
  }
}
</script>
<style lang="less" scoped>
.citysearch{
margin-top: 0;
    background: red;
    height: 31px;
    padding:  0 4px;
    text-align: center;
    .city-input{
  box-sizing: border-box;
        height: 28px;
        line-height: 28px;
        font-size: 14px;
        text-align: center;
        width: 100%;
        border-radius: 4px ;
        color: #666;
        padding: 0 8px;
    }
}
    
      
.showsearch{
z-index: 1;
    overflow: hidden;
    position: absolute;
    top: 60px;
    left: -38px;
    right: 0;
    bottom: 0;
    background: #eeeeee; 
    .liforinput{

        line-height: 25px;
        text-align: left ;
    }
}
</style>



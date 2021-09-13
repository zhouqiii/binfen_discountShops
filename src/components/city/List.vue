<template>
  <div class="citylists" ref="wrapper" >
    <!--1 start-->
    <div>
      <div class="currentArea">
        <div class="title" style="border-top:1px solid #cccccc;border-bottom:1px solid #cccccc">当前位置</div>
        <div class="contentlist">
          <div class="content">
            <div class="btncontent">{{this.dispalcecity}}</div>
          </div>
        </div>
      </div>
      <div class="hotArea">
        <div class="title" style="border-top:1px solid #cccccc;border-bottom:1px solid #cccccc">热门城市</div>
        <div class="contentlist">
          <div class="content"
            v-for="item in hotCities"
            :key="item.id"
            @click="changecitynn(item.name)"
          >
            <div class="btncontent">{{item.name}}</div>
          </div>
        </div>
      </div>
    </div>
    <!--1 end-->
    <!--2 start-->
    <div class="allArea" v-for="(item,key) in allLists" :key="key" :ref="key">
      <div class="title" style="border-top:1px solid #cccccc;border-bottom:1px solid #cccccc">{{key}}</div>
      <div class="city">
        <div class="listname" v-for="cityname in item" :key="cityname.id" @click="changecitynn(cityname.name)">{{cityname.name}}</div>
      </div>
    </div>
    <!--3 end-->
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import { mapState, mapMutations } from 'vuex'//mapState是vuex带的API

export default {
  name: 'CityList',
  props: {
    hotCities: Array,
    allLists: Object,
    alphabet: String
    },
  computed: {
    ...mapState({
        dispalcecity: 'city'
        })
    },
  methods: {
    changecitynn: function(value) {
        this.changeCityName(value)
        this.$router.push('/')
        },
    ...mapMutations({
        changeCityName: 'changecitys'//或者直接['changecitys']
        })
    },
  mounted () {
        this.scroll = new BScroll(this.$refs.wrapper)
  },
  watch: {
    alphabet () {
      if (this.alphabet) {
        const element = this.$refs[this.alphabet][0]
        this.scroll.scrollToElement(element)// scrollToElement是better-scroll自定义的API
      }
    }
  }
}
</script>
<style lang="less" scoped>
  .citylists{
    overflow: hidden;
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    .title{
      background: #eeeeee;
      line-height: 25px;
      text-align: left;
      padding: 0 10px;
      font-size: 14px;
    }
    .contentlist{
      padding: 4px 34px 4px 4px;
      overflow: hidden;
      .content{
        width: 33%;
        float: left;
        .btncontent{
          border: 1px solid #cccccc;
          text-align: center;
          border-radius: 3px;
          margin: 3px;
          padding: 2px;
        }
      }
    }
    .city{
      text-align: left;
      .listname{
        padding-left: 10px;
        line-height: 28px;
        border-bottom: 1px solid #cccccc;
      }
    }
 }
</style>


<!--<template>
  <div class="areaPop city">
    <city-search :cities="allLists" @hidePop="hidePop"></city-search>
    <city-list :hotCities="hotCities" :allLists="allLists" :alphabet="alphabetlist" @hidePop="hidePop"></city-list>
    <city-alphabet :cities="allLists" @changeAlp="getAlphabet"></city-alphabet>
  </div>  
</template>
<script>
import axios from 'axios'
import CitySearch from './Search'
import CityList from './List'
import CityAlphabet from './Alphabet'
import SvgIcon from '../SvgIcon.vue'

export default {
  name: 'AreaPop',
  components: {
    CitySearch,
    CityList,
    CityAlphabet,
    SvgIcon
  },
  data () {
    return {
      hotCities: [],
      allLists: {},
      alphabetlist: ''
    }
  },
  methods: {
    getCityList: function() {
        axios.get('/mock/city.json').then(this.getCityListSucc)
    },
    getCityListSucc: function(res) {
      res = res.data
      if(res.ret && res.data) {
        const data = res.data
        this.hotCities = data.hotCities
        this.allLists = data.cities
      }
    },
    getAlphabet: function(value) {
      this.alphabetlist = value
    },
    hidePop() {
      this.$emit('closeBullet')
    }
  },
  mounted () {
    this.getCityList()
  }
}
</script>-->
<template>
  <div class="areaPop city">
    <city-header></city-header>
    <city-search :cities="allLists" @hidePop="hidePop"></city-search>
    <city-list :hotCities="hotCities" :allLists="allLists" :alphabet="alphabetlist" @hidePop="hidePop"></city-list>
    <city-alphabet :cities="allLists" @change="getAlphabet"></city-alphabet>
  </div>  
</template>
<script>
import axios from 'axios'
import CityHeader from './Header'
import CitySearch from './Search'
import CityList from './List'
import CityAlphabet from './Alphabet'

export default {
  name: 'City',
  components: {
    CityHeader,
    CitySearch,
    CityList,
    CityAlphabet
  },
  data () {
    return {
      hotCities: [],
      allLists: {},
      alphabetlist: ''
    }
  },
  methods: {
    getCityList: function() {
        axios.get('/mock/city.json').then(this.getCityListSucc)
    },
    getCityListSucc: function(res) {
      res = res.data
      if(res.ret && res.data) {
        const data = res.data
        this.hotCities = data.hotCities
        this.allLists = data.cities
      }
    },
    getAlphabet: function(value) {
      this.alphabetlist = value
    }
  },
  mounted () {
    this.getCityList()
    document.documentElement.style.fontSize='16px'
  }
}
</script>
<style lang="stylus" scoped>

</style>




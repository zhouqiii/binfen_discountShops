
<template>
  <div class="areaPop city">
    <div class="city_header flex_row">
      <img
        @click="closeBullet"
        src="../../assets/img/back@2x.png"
        alt="back"
        class="back back_btn"
      />
      <city-search :cities="allLists"></city-search>
    </div>
    <city-list :hotCities="hotCities" :allLists="allLists" :alphabet="alphabetlist"></city-list>
    <city-alphabet :cities="allLists" @changeAlpha="getAlphabet"></city-alphabet>
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
    closeBullet() {
      this.$emit('closeBullet')
    }
  },
  mounted () {
    this.getCityList()
  }
}
</script>

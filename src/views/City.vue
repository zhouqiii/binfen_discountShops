<template>
  <div class="city">
    <div class="city_header flex_row">
      <img
        @click="back"
        src="../assets/img/back@2x.png"
        alt="back"
        class="back back_btn"
      />
    </div>
    <city-search :cities="allLists"></city-search>
    <city-list :hotCities="hotCities" :allLists="allLists" :alphabet="alphabetlist"></city-list>
    <city-alphabet :cities="allLists" @changeAlpha="getAlphabet"></city-alphabet>
  </div>  
</template>
<script>
import axios from 'axios'
import CitySearch from '../components/City/Search'
import CityList from '../components/City/List'
import CityAlphabet from '../components/City/Alphabet'
import SvgIcon from '../components/SvgIcon.vue'

export default {
  name: 'City',
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
    }
  },
  mounted () {
    this.getCityList()
  }
}
</script>




<template>
  <ul class="list">
    <li class="item" style="list-style-type:none;"
    v-for="item in alphabets"
    :key="item"
    :ref="item"
    @click="giveAlphabet"
    @touchstart.prevent="handletouchstart"
    @touchmove="handletouchmove"
    @touchend="handletouchend"
    >{{item}}</li>
  </ul>
</template>

<script>

export default {
  name: 'CityAlphabet',
  props: {
    cities: Object
  },
  data () {
    return {
      start: false,
      aY: 0,
      timer: null
    }
  },
  updated () {
    this.aY = this.$refs['A'][0].offsetTop
  },
  computed: {
    alphabets () {
      const alphabets = []
      for (let i in this.cities) {
        alphabets.push(i)
      }
      return alphabets
    }
  },
  methods: {
    giveAlphabet: function (e) {
      this.$emit('changeAlp', e.target.innerText)
    },
    handletouchstart: function () {
      this.start = true
    },
    handletouchend: function () {
      this.start = false
    },
    handletouchmove: function (e) {
      if (this.start) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const anotherY = e.touches[0].clientY - 61
          const index = Math.floor((anotherY - this.aY) / 20)
          if (index >= 0 && index < 26) {
            this.$emit('changeAlp', this.alphabets[index])
          }
        }, 16)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.list{
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  top: 60Px;
  right: 6Px;
  bottom: 0;
  width: 8Px;
  .item{
    line-height:12Px;
    text-align: center;
    color: red;
    margin-top: 6Px;
    font-size: 13Px;
  }
}
</style>

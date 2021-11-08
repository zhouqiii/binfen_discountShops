<template>
  <div>
    <div id="map"></div>
    <div class="map_guide flex_between">
      <div class="flex_between guide_icon">
        <svg-icon iconClass="bus" @click="transport('transit')"></svg-icon>
        <svg-icon iconClass="driving" @click="transport('driving')"></svg-icon>
        <svg-icon iconClass="run" @click="transport('walking')"></svg-icon>
      </div>
      <div class="guide_shop">
        <div class="shop_name ellipsis">{{shopInfo.merchantName}}</div>
        <div class="shop_location ellipsis"><span>{{shopInfo.merchantAddress}}</span></div>
      </div>
    </div>
  </div>
</template>
<script>
import SvgIcon from './SvgIcon.vue';
let user = {//用户当前定位
  lat: null,//经度
  lng: null,//纬度
}
let shop = {//之所以在定义一遍是因为放在data里，用this指向绘制地图找不到
  lat: 116.307503,
  lon: 39.984104
}
let marker = null;//点标记
let map = null;//地图
let center = null;//中心点
let infoWindow = null;//文本标记
let polylineLayer = null;//折线
let geolocation = null;//当前定位
let GoWay = null;//点击了哪个出行方式
let count = 0;
let flag = true;//true标志当前定位可以拿到，false标志当前定位无法获取
const timeOptions = {
  timeout: 2000,//获取当前定位设置超时限制
}
// WebServiceAPI请求URL（驾车路线规划默认会参考实时路况进行计算）
const wayUrl = "https://apis.map.qq.com/ws/direction/v1/"; //请求路径--driving驾车transit公交walking步行
const key ="JAJBZ-ADQLJ-MMHFF-K63WY-IOZX7-OOF6T"; //开发key，可在控制台自助创建--因为我这里使用了路线图，所以需要在创建key的时候勾选webserviceAPI
export default {
  components: { SvgIcon },
  name: 'TencentMap',
  props: ['shopData','userData'],
  data() {
    return {
      shopInfo:{
        merchantName: '',//店铺名称
        merchantAddress: '',//店铺具体地址
        lat: null,//经度
        lon: null,//纬度
      }
    }
  },
  methods: {
    //将地图上左下角右上角所有logo，文字，缩放都隐藏
    hideLogo() {
      let paDom = document.querySelector('canvas+div:last-child')
      let childDom = paDom.querySelector('div:last-child')
      let childDomBox = childDom.querySelector('div')
      let childDomArrow = childDomBox.nextSibling//获得box的第一个兄弟级节点
      paDom.style.visibility = 'hidden'
      childDom.style.visibility = 'visible'
      childDomBox.style.padding = '0px'
      childDomBox.style.visibility = 'hidden'
      childDomArrow.style.display = 'node'
    },
    //设置起止绘制路线的标记marker的样式和位置
    display_marker() {
      map.panTo( new TMap.LatLng(user.lng, user.lat))
      marker = new TMap.MultiMarker({ 
        id: 'marker-layer',
        map: map,
        styles: {
          "start": new TMap.MarkerStyle({
            "width": 25,
            "height": 35,
            "anchor": { x: 16, y: 32 },
            "src": 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/start.png'
          }),
          "end": new TMap.MarkerStyle({
            "width": 25,
            "height": 35,
            "anchor": { x: 16, y: 32 },
            "src": 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/end.png'
          })
        },
        geometries: [{
          "id": 'start',
          "styleId": 'start',
          "position": new TMap.LatLng(user.lng,user.lat)
        }, {
          "id": 'end',
          "styleId": 'end',
          "position": new TMap.LatLng(this.shopInfo.lon,this.shopInfo.lat)
        }]
      });
    },
    //设置MultiPolyline显示折线
    display_polyline(pl){
      polylineLayer = new TMap.MultiPolyline({
        id: 'polyline-layer', //图层唯一标识
        map: map,//绘制到目标地图
        //折线样式定义
        styles: {
          'style_blue': new TMap.PolylineStyle({
              'color': '#3777FF', //线填充色
              'width': 6, //折线宽度
              'borderWidth': 5, //边线宽度
              'borderColor': '#FFF', //边线颜色
              'lineCap': 'round' //线端头方式
          })
        },
        //折线数据定义
        geometries: [
          {
            'id': 'pl_1',//折线唯一标识，删除时使用
            'styleId': 'style_blue',//绑定样式名
            'paths': pl
          }
        ]
      });
    },
    //初始化map--定义map变量，调用 TMap.Map() 构造函数创建地图
    initMap () {
      // 定义地图中心点坐标
      center = new TMap.LatLng(shop.lon, shop.lat)
      map = new TMap.Map(document.getElementById('map'), {
        center: center,
        zoom: 16, // 设置地图缩放级别--数值越大显示的越具体
        pitch: 40, // 设置俯仰角 0~45
        rotation: 20, // 设置地图旋转角度
      })
      //初始化marker--位置图标
      marker = new TMap.MultiMarker({
        id: 'marker-layer',
        map: map,
        styles: {
          "marker": new TMap.MarkerStyle({
            "width": 30,
            "height": 30,
            "anchor": { x: 16, y: 32 },
            "src": 'https://mapapi.qq.com/web/lbs/javascriptGL/demo/img/markerNew.png',
          })
        },
        geometries: [{
          "id": 'demo',
          "styleId": 'marker',
          "position": center,
          "properties": {
              "title": "marker"
          }
        }]
      });
      //初始化infoWindow--位置文字标记
      infoWindow = new TMap.InfoWindow({
        map: map, 
        position: center, //设置信息框位置
        offset: { x: -3, y: -35 },
        content: `
          <div class="map_dialog">
            <div class="dialog_title">
              <div>${this.shopInfo.merchantName}</div>
              <div class="title_sale">${this.shopInfo.activityName}</div>
            </div>
            <div class="dialog_way">
              <div class="flex_between guide_icon">
                <img src='../assets/logo.png'/>
              </div>
              <div>${this.shopInfo.merchantAddress}</div>
            </div>
            <div class="triangle"></div>
          </div>
          `
      });  
      // infoWindow.close();//初始关闭信息窗关闭
      marker.on("click", function (evt) {
        //设置infoWindow
        infoWindow.open(); //打开信息窗
        infoWindow.setPosition(evt.geometry.position);//设置信息窗位置
      })
      this.hideLogo()
    },
    //移除标记点marker
    removeMarker() {
      marker.setMap(null);
      marker = null;
    },
    //选择出行方式进行路线规划
    transport(way) {
      if(flag) {
        GoWay = way
        count += 1
        this.removeMarker()
        this.display_marker()
        const url = `${wayUrl}${way}/?from=${user.lng},${user.lat}&to=${this.shopInfo.lon},${this.shopInfo.lat}&output=jsonp&callback=cb&key=${key}`
        this.jsonp_request(url)
      } else {
        this.$toast('无法获取您当前位置，路线规划失败！')
      }
    },
    //获取当前经纬度
    // getLocation(){
    //   geolocation = new qq.maps.Geolocation(key, "discountShop");
    //   geolocation.getLocation(this.showPosition,this.errPosition,timeOptions)//获取当前位置后的回调，成功--失败--请求option设置
    // },
    // //获取当前定位成功的回调
    // showPosition(position) {
    //   flag = true
    //   user.lat = position.lat
    //   user.lng = position.lng
    //   this.$toast('已获取您的位置')
    // },
    // //获取当前定位失败的回调
    // errPosition(position) {
    //   flag = false
    //   this.$toast('无法获取您当前位置，路线规划失败！')
    // },
    //浏览器调用WebServiceAPI需要通过Jsonp的方式，此处定义了发送JOSNP请求的函数
    jsonp_request(url){
      var script=document.createElement('script');
      script.src=url;
      document.body.appendChild(script);
    },
    //定义请求回调函数，在此拿到计算得到的路线，并进行绘制
    lineHandle(ret){
      console.log(ret,'这是地图回调')
      let coords = [];
      let pl = [];
      if(GoWay === 'transit') {
        Array.prototype.forEach.call(ret.result.routes[0].steps,(item) => {
          if(item.polyline){
            coords.push(item.polyline)
          }else if(item.lines) {
            coords.push(item.lines[0].polyline)
          }
        })
      } else {
        coords = ret.result.routes[0].polyline;
      }
      //坐标解压（返回的点串坐标，通过前向差分进行压缩）
      const kr = 1000000;
      for (let i = 2; i < coords.length; i++) {
        coords[i] = Number(coords[i - 2]) + Number(coords[i]) / kr;
      }
      const isDeep = coords.some((item) => item instanceof Array) ? true : false;//发现可能coords是二维数组，也就是说没有该种规划
      if(count > 1 && polylineLayer) {
        polylineLayer.setMap(null);
        polylineLayer = null;
      }
      if(isDeep) {
        this.$toast('暂无该出行方式路线规划！')
      }else{
        //将解压后的坐标放入点串数组pl中
        for (let i = 0; i < coords.length; i += 2) {
          pl.push(new TMap.LatLng(coords[i], coords[i+1]));
        }
        this.display_polyline(pl)//显示路线
      }
    },
  },
  mounted () {
    this.$nextTick(() => {
      this.initMap()
    })
    //把腾讯地图绘制路线的请求jsonp对应的window回调函数cb挂载到lineHandle
    window['cb'] = (val) => {
      this.lineHandle(val)
     }

  },
  watch:{
    shopData(val) {
      this.shopInfo = Object.assign(this.shopInfo, val)
      if(this.shopInfo.lat && this.shopInfo.lon) {
        shop.lat = this.shopInfo.lat
        shop.lon = this.shopInfo.lon
      }
    },
    userData(val) {
      user.lat = val.lat
      user.lng = val.lon
      if(user.lat && user.lng) {
        this.flag = true
      }else{
        this.flag =false
      }
    }
  }
}
</script>
<style>
/* 将地图上底部文字隐藏 */
.logo-text{
  display: none;
}
</style>
<style lang="less" scoped>
#map{
  width: 100%;
  position: absolute;
  top: 45px;
  bottom: 100px;
  left: 0px;
  // a{
  //   display: none;
  // }
}
.map_guide{
  position: absolute;
  bottom: 0;
  height: 68px;
  width: 100%;
  left: 0;
  background: @CFFF;
  padding: @P16 0;
  .guide_icon{
    width: 20%;
  }
  .guide_shop{
    width: 80%;
    .shop_name{
      font-size: @F14;
      font-weight: bold;
      color: black;
    }
    .shop_location{
      margin-top: @M10;
      font-size: @F15;
      color: @C333;
    }
  }

}

</style>
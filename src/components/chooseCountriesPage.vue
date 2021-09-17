<!--
	作者：SQK
	时间：2019-12-27
	描述：公共国家列表，可实现（点击索引、滑动索引）实时点亮索引，国家列表滚动到相应位置，并弹出提示标识，滚动国家列表相应点亮对应索引及提示标识
-->
<template>
	<div class="Outerbox">
		<!--顶部标题start-->
		<div class="publicHeaderOuterbox">
			<div class="nav header" ref="header" :class="isMobile() === 1 ? 'androidHeight' : 'iosPaddingtop'">
				<div class="left">
					<div class="leftBoxMain" @click="titlePageBackClick">
						<div class="img">
							<img src="../assets/icon_back@2x.png" alt="返回" />
						</div>
					</div>
				</div>
				<div class="middle_box">
					<div class="top_img_box" @click="searchClick">
						<img class="imgs100" src="../assets/huimei/coupon/coupon_search_ico@2x.png" alt="搜索"/>
					</div>
					<input class="input_box_middle" ref="searchText" type="text" placeholder="请输入城市名称查询" v-model="searchText" @focus="focusClick" @input="inputClick" />
					<div class="input_box_right" v-show="searchText.length>0" @click="deleteTextClick">
						<img class="img100" src="../assets/huimei/coupon/coupon_delete@2x.png" alt="删除"/>
					</div>
				</div>
				<div class="right">
				</div>
			</div>
			<div class="blank" :class="isMobile() === 1 ? 'androidHeight' : 'iosPaddingtop'"></div>
		</div>
		<!--搜索页面start-->
		<div class="searchList_box" v-if="isShowSearchBox=='true'">
			<div class="search_item" v-for="(item,index) in searCountrychList" :key='index' @click="searchItemClick(item,index)">
				{{item.cityName}}
			</div>
		</div>
		<!--搜索页面end-->

		<div v-else>
			<!--境内外tabstart-->
			<div class="top_tab_box">
				<div :class="currentName=='境内'?'itemTab_red':'itemTab_gray'" @click="tabItemClick('境内')">境内</div>
				<div :class="currentName=='境外'?'itemTab_red':'itemTab_gray'" @click="tabItemClick('境外')">境外 | 港澳台</div>
			</div>
			<div class="top_tab_box_blank"></div>
			<!--顶部标题end-->
			<!--公共部分-->
			<div class="rAndl" @touchmove.prevent>
				<!--顶部国家大写字母-->
				<div class="positionLetterTop" v-show="showDiv">{{letterText}}</div>
				<!--国家列表-->
				<div class="my-indexlist" ref="wrapper">
					<div class="my-indexlist-content">
						<div class="city_Box" v-if="historyCityList.length>0">
							<div class="cityHistory_box">
								<div>当前/历史访问城市</div>
								<div class="item_city_box">
									<div class="item_city" v-for="(item,index) in historyCityList" @click="historyItemClick(item,index)">
										<div v-if="index==0" class="selected_gray">
											<div class="location_box">
												<img class="img100" :src="locationYesImg" />
											</div>
											<div v-if="locationCityMap.isLocation=='false'">定位失败</div>
											<div v-else>{{item.cityName}}</div>

										</div>
										<div v-else :class="locCityInfo.cityName==item.cityName?'selected_red':'selected_gray'">
											{{item.cityName}}
										</div>
									</div>
								</div>
								<div class="citi_bottom"></div>
							</div>
						</div>
						<div class="my-indexsection" v-for="(letter,indexs) in countrySortArr" ref="everyLetter">
							<div class="my-indexsection-index">
								<div>{{letter}}</div>
							</div>
							<div class="" v-for="(item,index) in countryArr">
								<div class="my-cell" @click="get(item)">
									<div class="my-cell-wrapper" v-if="item.key==letter">{{item.value}}</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<!--索引导航-->
				<div class="my-indexlist-nav">
					<div class="my-indexlist-navlist">
						<div class="jt" @click="jtBtn"></div>
						<div @click="jtBtn">顶部</div>
						<div :class="[{hide:currentIndex===index},'my-indexlist-navitem']" v-for="(letter,index) in countrySortArr" :key="letter" :ref="letter" @click="handleLetterClick(index)" @touchmove.prevent="handleTouchMove" @touchstart="handleTouchStart" @touchend="handleTouchEnd">{{letter}}
							<div v-show="currentIndex===index" class="biaoshi">{{bsText}}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		mapState,
		mapMutations,
		mapActions
	} from "vuex";
	import BScroll from "better-scroll";
	export default {
		name: "chooseCountriesPage",
		data() {
			return {
				//是否显示搜索页面
				isShowSearchBox: 'false',
				showDiv: false,
				letterText: "A",
				touchStatus: false,
				startY: 0,
				timer: null,
				currentIndex: "0",
				bsText: "",
				type: this.$route.params.type,
				locationYesImg: require("../assets/city/location_ico_red@2x.png"),
				locationNoImg: require("../assets/city/prompt_ico_red@2x.png"),
				searchText: "",
				currentName: "境内",
				//测试数据
				arr: [], //存放初始过滤数组
				//存放第二次筛选后国家名称
				countryArr: [],
				//存放初始获取国家首字母大写的数组
				countrySort: [],
				//存放第二次筛选重复，不存在的首字母数组
				countrySortArr: [],
				countrySortArr_inland: [], //境内城市
				countrySortArr_foreign: [], //境外城市
				//所有城市列表
				allcountrySortList: [],
				//搜索城市列表
				searCountrychList:[],
				//东奥专区奥运网点用到的
				formWhere:"",
			}
		},
		computed: {
			/*变量名称*/
			...mapState([
				"country", //国家名称
				"locCityInfo", //当前选择城市
				"cityListData", //城市列表数据
				"historyCityList", //城市列表历史数据
				"locationCityMap",
			]),
		},
		methods: {
			...mapMutations([
				"show_alert_box",
				"setCountry",
				"setShowRightBox",
				"setLocCityInfo", //定位城市
				"setCityListData", //城市列表数据
				"setHistoryCityList", //城市列表历史数据
				"setLocationCityMap", //定位城市
				"setNetLocCityName",//城市定位名称，东奥专区网点只用到城市名称
				"setNetIsRefresh",//网点选择城市用到了，要区分是直接返回，还是选了城市之后返回
			]),
			/*用于请求交易**/
			...mapActions([
				"sendRequestByGetCCTxnIdByComm",
        "sendRequestByCgiTxnIdByCity"
			]),
			titlePageBackClick(){
        if (this.notNull(this.formWhere) && this.formWhere == 'X06net') {
          this.setNetIsRefresh(false)
        }
        // history.go(-1);
        if (window.history.length <= 1) {
          this.$router.push({path: '/'})
          return false
        } else {
          this.$router.go(-1)
        }
      },
			/*页面返回事件*/
			pageBackClick() {
        if (this.notNull(this.formWhere) && this.formWhere == 'X06net') {
          this.setNetIsRefresh(true)
        }
        // history.go(-1);
        if (window.history.length <= 1) {
          this.$router.push({path: '/'})
          return false
        } else {
          this.$router.go(-1)
        }
      },
			/**删除输入文字*/
			deleteTextClick() {
				let that = this;
				that.searchText = "";
				that.$refs.searchText.focus();
				that.searCountrychList=[];
			},
			/**搜索城市*/
			searchClick() {
				this.$refs.searchText.focus();
				this.isShowSearchBox = 'true';
			},
			/*获得焦点监听事件*/
			focusClick() {
				this.isShowSearchBox = 'true';
			},
			/*输入事件*/
			inputClick() {
				if(!this.notNull(this.searchText)) {
					return;
				}
				let keys=this.searchText;
				let list = [];
				for(let i = 0; i < this.allcountrySortList.length; i++) {
					let item = this.allcountrySortList[i];
					let cityNames = item.cityName;
					if(cityNames.indexOf(keys)>-1) {
						list.push(item);
					}
				}
				this.searCountrychList=list;
			},
			/**查询item点击事件*/
			searchItemClick(item,index){
				this.get(item);
			},
			/**境内外切换*/
			tabItemClick(name) {
				this.currentName = name;
				if("境内" == name) {
					this.getShowData(this.countrySortArr_inland);
				} else {
					this.getShowData(this.countrySortArr_foreign);
				}
			},
			handleLetterClick(index) {
				let b = this.$refs.wrapper.getElementsByClassName('my-indexsection')
				this.scroll.scrollToElement(b[index])
			},
			/*按住滑动开始*/
			handleTouchStart() {
				this.touchStatus = true;
			},
			/*按住滑动索引实现滚动功能*/
			handleTouchMove(e) {
				if(this.touchStatus) {
					if(this.timer) {
						clearTimeout(this.timer)
					}
					this.timer = setTimeout(() => {
						let str = $(".my-indexlist-navitem").css("margin-top");
						let touchY = e.touches[0].clientY - 88;
						let ff = (touchY - this.startY) / (this.$refs["A"][0].offsetHeight + Math.round(str.substring(0, str.length - 2)))
						/*由于计算取整会有部分误差，0.80通过计算出补位*/
						let index = Math.ceil(ff + 0.80)
						if(index >= 0 && index < this.countrySortArr.length) {
							let c = this.$refs.wrapper.getElementsByClassName('my-indexsection')
							this.scroll.scrollToElement(c[index])
						}
					});
				}
			},
			/*滑动结束*/
			handleTouchEnd(letter) {
				this.touchStatus = false
			},
			/*点击箭头*/
			jtBtn() {
				let b = this.$refs.wrapper.getElementsByClassName('city_Box')
				this.scroll.scrollToElement(b[0])

			},
			/**
			 * 历史城市点击事件
			 */
			historyItemClick(item, index) {
				if(index == 0) {
					if(this.locationCityMap.isLocation == 'false') {
						return;
					} else {
						//当前城市信息
						if(this.notNull(this.formWhere) && this.formWhere == 'X06net'){
              this.setNetLocCityName(item.cityName);
              this.pageBackClick();
						}else {
              if (this.notNull(item.longitude) && this.notNull(item.latitude)) {/*如果该节点已经存入经纬度*/
                this.loadHistoryLocaition(item);
                this.pageBackClick();
              } else {
                this.requestCityIdByCityName(item);
              }
            }

						return;
					}
				}
				//删除数据，不新增
				this.historyCityList.splice(index, 1);
				//新增数据
				this.historyCityList.splice(1, 0, item);
				//当前城市信息
				if(this.notNull(this.formWhere) && this.formWhere == 'X06net'){
          this.setNetLocCityName(item.cityName);
          this.pageBackClick();
				}else {
          if (this.notNull(item.longitude) && this.notNull(item.latitude)) {/*如果该节点已经存入经纬度*/
            this.loadHistoryLocaition(item);
            this.pageBackClick();
          } else {
            this.requestCityIdByCityName(item);
          }
        }

			},
			/*获取点击的城市*/
			get(item) {
				//当前城市信息
				if(this.notNull(this.formWhere) && this.formWhere == 'X06net'){
          this.setNetLocCityName(item.cityName);
          this.loadHistoryLocaition(item);
				}else {
          if (this.notNull(item.longitude) && this.notNull(item.latitude)) {/*如果该节点已经存入经纬度*/
            this.loadHistoryLocaition(item);
            this.pageBackClick();
          } else {
            this.requestCityIdByCityName(item);
          }

        }

      },
      /*创建选择城市历史记录*/
      loadHistoryLocaition(item) {
        let list = this.historyCityList;
        this.setHistoryCityList([]);
        list.splice(1, 0, item);//添加
        //第一种
        let arr1 = [];
        let arr2 = [];
        for (let i = 0; i < list.length; i++) {
          let jsons = {};
          if (arr2.indexOf(list[i].cityId) == -1) {
            arr2.push(list[i].cityId);
            jsons.cityId = list[i].cityId;
            jsons.cityName = list[i].cityName;
            jsons.countryCode = list[i].countryCode;
            jsons.isHw = list[i].isHw;
            jsons.key = list[i].key;
            jsons.provinceId = list[i].provinceId;
            jsons.provinceName = list[i].provinceName;
            jsons.value = list[i].value;
            jsons.vasCityId = list[i].vasCityId;
            jsons.ids = [];
            arr1.push(jsons)
          } else {
            let x = arr2.indexOf(list[i].cityId)
            let aa = arr1[x];
            aa.ids.push(list[i].id)
          }
        }
        list = arr1

        if (list.length <= 6) {
          this.setHistoryCityList(list);
        } else {
          let list2 = [];
          for (let i = 0; i < 6; i++) {
            list2.push(list[i]);
            this.setHistoryCityList(list2);
          }
        }

      },
      /**发送交易请求数据*/
      getCountryList() {
        let that = this;
        let req = {};
        req.txnId = that.isMobile() + "CTY010001";
        let tradeCode = {
          code: "cities.do"
        }
        that.sendRequestByGetCCTxnIdByComm({
          req,
						tradeCode
					})
					.then(res => {
						// console.log(res)
						let stst = res.stat;
						let result = res.result;
						if(!that.notNull(stst)) {
							return;
						}
						if("00" === stst) {
							let body = res.body;
							if(!that.notNull(body)) {
								return;
							}
							let CitiesInland = body.CitiesInland; //境内城市
							let CitiesForeign = body.CitiesForeign; //境外城市
							that.countrySortArr_inland = that.dataDeal(CitiesInland);
							that.countrySortArr_foreign = that.dataDeal(CitiesForeign);
							that.getShowData(that.countrySortArr_inland);
							that.getAllCountryList();
							let objs = {
								citiesInland_normal: CitiesInland,
								citiesForeign_normal: CitiesForeign,
							}
							that.setCityListData(objs);
						} else {
							that.showMissageAlert(result);
						}
					})
					.catch(err => {
						that.showMissageAlert("连接服务器出错，请稍后重试");
					})
			},
			/*获取页面*/
			getShowData(arr) {
				this.countrySortArr = arr[0];
				this.countryArr = arr[1];
			},
			showMissageAlert(msg) {
				this.show_alert_box({
					alertContent: msg,
					cancelText: "",
					cancelStat: "",
					confirmText: "确定",
					confirmStat: "01",
				});
			},
			/**数据组装*/
			dataDeal(countryList) {
				let countryArr = []; //城市列表
				let countrySort = []; //字母顺序
				let countrySortArr = []; //字母顺序

				for(let k in countryList) {
					let countryKey = countryList[k].field; //字母
					let countryValue = countryList[k].cityName; //城市名称
					let countryCode = countryList[k].cityId; //城市ID
					let cityName = countryList[k].cityName; //城市名称
					let cityId = countryList[k].cityId; //城市ID
					let provinceId = countryList[k].provinceId; //省ID
					let provinceName = countryList[k].provinceName; //省名称
					let vasCityId = countryList[k].vasCityId;
					let isHw = countryList[k].isHw; //0-境内，1-境外
					countrySort[countryKey] = countryKey;
					countryArr[k] = {
						key: countryKey,
						value: countryValue,
						countryCode: countryCode,
						cityName: cityName,
						cityId: cityId,
						provinceId: provinceId,
						provinceName: provinceName,
						vasCityId: vasCityId,
						isHw: isHw,
					}
				}
				for(let p in countrySort) {
					countrySortArr.push(countrySort[p]);
				}
				countrySortArr = countrySortArr.sort();
				let arr = [];
				arr[0] = countrySortArr;
				arr[1] = countryArr;
				return arr;
			},
			/**获取所有城市列表*/
			getAllCountryList() {
				let inlandList = this.countrySortArr_inland[1];
				let foreignList = this.countrySortArr_foreign[1];
				for(let i = 0; i < inlandList.length; i++) {
					let item = inlandList[i];
					this.allcountrySortList.push(item);
				}
				for(let i = 0; i < foreignList.length; i++) {
					let item = foreignList[i];
					this.allcountrySortList.push(item);
				}
			},
			/*添加方法*/
			initScroll() {
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: 3,
					click: true,
					bounce: false
				})
				/*列表加滚动事件*/
				this.scroll.on('scroll', (pos) => {
					let head = $(".positionLetterTop").css("height");
					head = Math.round(head.substring(0, head.length - 2));
					for(let i = 0; i < this.$refs.everyLetter.length; i++) {
						/*头部索引滚动效果和定位*/
						if(this.$refs.everyLetter[i].offsetTop + pos.y >= 0 && this.$refs.everyLetter[i].offsetTop + pos.y <= head) {
							$('.positionLetterTop').css('top', this.$refs.everyLetter[i].offsetTop + pos.y - head)
						}
						if(this.$refs.everyLetter[i].offsetTop + pos.y <= 0) {
							$('.positionLetterTop').css('top', '0px')
							this.showDiv = true;
						}
						if(this.$refs.everyLetter[0].offsetTop + pos.y >= 0) {
							$('.positionLetterTop').css('top', '0px')
							this.showDiv = false;
						}
						/*点亮索引及标识和头部索引*/
						if(this.$refs.everyLetter[i].offsetTop + pos.y <= 1) {
							this.currentIndex = i;
              this.bsText = this.countrySortArr[i];
              this.letterText = this.countrySortArr[i];
              setTimeout(function () {
                $(".biaoshi").hide();
              }, 500);

            }
          }
          ;
        })
      },
      /*根据城市名称获取城市信息*/
      requestCityIdByCityName(item) {
        console.log("SPO000185-通过城市名称，查询城市ID");
        let that = this;
        let req = {};
        req.txnId = this.isMobile() + "SPO000185";
        req.cityName = encodeURIComponent(item.cityName);
        that
          .sendRequestByCgiTxnIdByCity(req)
          .then((res) => {
            console.log("SPO000185交易返回：" + JSON.stringify(res));
            let stst = res.stat;
            let result = res.result;
            let datas = res.date;
            if (!that.notNull(stst)) {
              return;
            }
            if ("00" === stst) {
              let body = res.body;
              if (!that.notNull(body)) {
                return;
              }
              let cityInfo = body.cityInfo;
              if (cityInfo.length > 0) {/*查询到数据取给item存入经纬度*/
                item.longitude = cityInfo[0].longitude
                item.latitude = cityInfo[0].latitude
                that.setLocCityInfo(cityInfo[0]);/**/
              } else {/*定位失败*/
                that.locationError(item);
              }
              that.loadHistoryLocaition(item);
              that.pageBackClick();
            } else {
              that.showMissageAlert("连接服务器出错，请稍后重试");
            }
          })
          .catch((err) => {
            console.log("SPO000185=" + err);
            that.showMissageAlert("连接服务器出错，请稍后重试");
          });
      },
      locationError(item) {
        let obj = {
          isLocation: "false",
        };
        item.longitude = "116.299634",
          item.latitude = "39.987725"
        this.setLocCityInfo(item);
        //定位城市失败
        this.setLocationCityMap(obj);
      }
    },
		created() {
			let that = this;
			if(this.cityListData.citiesInland_normal.length > 0) {
				this.countrySortArr_inland = that.dataDeal(this.cityListData.citiesInland_normal);
				this.countrySortArr_foreign = that.dataDeal(this.cityListData.citiesForeign_normal);
				this.getShowData(this.countrySortArr_inland);
				this.getAllCountryList();
			} else {
				//查询城市列表数据
				this.getCountryList();
			}
			this.formWhere = this.$route.params.formWhere;
			console.log("---"+this.formWhere);
			/*初始化better-scroll*/
			setTimeout(() => {
				this.initScroll()
			}, 20);

    },
		 beforeRouteLeave(to, from, next) {
			if(to.name=="netbranchMapIndex"){
				to.meta.keepAlive = false;
			}
			next()
		},
		mounted() {
			/*二次渲染防止初始化失败*/
			this.$nextTick(() => {
				if(!this.scroll) {
					this.scroll = new BScroll(this.$refs.wrapper, {
						probeType: 3,
						// click: true,
						bounce: false
					})
				}
			})
		},
		updated() {
			if(this.isShowSearchBox == 'false') {
				this.startY = this.$refs["A"][0].offsetTop;
			}

		},
		watch: {}
	}
</script>

<style scoped lang="less">
	.Outerbox {
		font-family: PingFang-SC-Regular;
		background: white;
	}

  .rAndl {
		position: absolute;
		width: 100%;
		/*top: 650px;*/
		top: 188px;
		bottom: 0;
		overflow: hidden;
		/*background: #fff;*/
	}

  .my-indexlist {
		flex: 1;
		position: absolute;
		width: 100%;
		top: 0;
		bottom: 0;
	}

  .my-indexlist-content {}

  .my-indexsection {
		padding: 0;
		padding-left: 32px;
	}

  .my-indexsection-index {
		font-size: 26px;
		color: #f44336;
		font-family: PingFang-SC-Regular;
		padding: 17px 0px 17px 0px;
		line-height: 100%;
		background-color: #fff;
	}

  .my-indexlist-nav {
		padding: 14px 32px 0px 150px;
		/*padding: 14px 32px 0px 50px;*/
		border-left: none;
		background-color: rgba(0, 0, 0, 0);
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		margin: 0;
		text-align: center;
		max-height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		z-index: 3;
	}

  .my-indexlist-navlist {
		padding-top: 260px;
	}

  .my-indexlist-navitem {
		/*padding: 4px;*/
		line-height: 26px;
		font-family: PingFang-SC-Regular;
		color: #333333;
		font-size: 24px;
		margin-top: 4px;
		margin-left: 10px;
		height: 26px;
		width: 26px;
		display: flex;
		justify-content: center;
		position: relative;
		box-sizing: content-box;
	}

  .my-cell {
		/*min-height: 0;
		background-color: #fff;
		color: inherit;
		min-height: 0;
		display: block;
		overflow: hidden;
		position: relative;
		text-decoration: none;*/
	}

  .my-cell:last-child {}

  .my-cell-wrapper {
		padding: 0;
		line-height: 88px;
		min-height: 0;
		height: 88px;
		font-size: 28px;
		color: #333333;
		font-family: PingFang-SC-Regular;
		border-bottom: 1px solid #F5F5F5;
		/*no*/
		width: 100%;
	}

  .hide {
		border-radius: 50%;
		color: #ffffff;
		background-color: #f44336;
		font-family: PingFang-SC-Medium;
	}
	/*.mint-indexlist-navitem:first-child {
	margin-top: 0px;
}*/

  .biaoshi {
		width: 102px;
		height: 86px;
		position: absolute;
		background: url(../assets/zoom-in-tool@2x.png) center no-repeat;
		background-size: 100px 84px;
		top: -26px;
		left: -142px;
		padding-left: 25px;
		line-height: 84px;
		font-size: 50px;
		text-align: left;
		transform: translate(0px, 0px);
	}

  .jt {
		width: 16px;
		height: 6px;
		background: url(../assets/Fast-top-ico@2x.png) center no-repeat;
		background-size: 16px 6px;
		margin-left: 16px;
		margin-bottom: 12px;
	}

  .positionLetterTop {
		width: 100%;
		height: 60px;
		font-size: 26px;
		color: #f44336;
		font-family: PingFang-SC-Regular;
		padding-left: 32px;
		line-height: 60px;
		position: absolute;
		top: 1px;
		left: 0px;
		z-index: 8;
		background-color: #FFF;
	}
	/*顶部标题搜索区域*/

  .middle_box {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		width: 508px;
		height: 60px;
		background-color: #f7f7f7;
		border-radius: 30px;
		padding: 0 50px;
		font-size: 28px;
		color: #333;
		line-height: 100%;
		.top_img_box {
			flex: 0 0 30px;
			height: 30px;
			margin-right: 14px;
		}
		.input_box_right {
			display: flex;
			justify-content: space-between;
			align-items: center;
			flex: 0 0 30px;
			height: 30;
			margin-left: 14px;
		}
		.input_box_middle {
			height: 50px;
			width: 100%;
			background: transparent;
			font-size: 26px;
			line-height: 100%;
			color: #000000;
		}
	}

  .top_tab_box_blank {
		height: 100px;
		width: 750px;
	}
	/**境内外切换*/

  .top_tab_box {
		height: 100px;
		width: 750px;
		background: white;
		padding: 0 121px;
		position: fixed;
		z-index: 10;
		border-bottom: 1px solid #F5F5F5;
		/*no*/
		display: flex;
		align-items: center;
		justify-content: space-between;
		.itemTab_red {
			flex: 0 0 180px;
			height: 100px;
			border-bottom: 3px solid #E85E4E;
			display: flex;
			align-items: center;
			justify-content: center;
			.text_red_28;
		}
		.itemTab_gray {
			flex: 0 0 180px;
			height: 100px;
			border-bottom: 3px solid #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			.text_black_28;
		}
	}

  .text_red_28 {
		font-size: 28px;
		/*px*/
		line-height: 100%;
		letter-spacing: 0px;
		color: #E85E4E;
	}

  .text_black_28 {
		font-size: 28px;
		/*px*/
		line-height: 100%;
		letter-spacing: 0px;
		color: #333;
	}
	/*历史城市样式*/

  .cityHistory_box {
		/*height: 323px;*/
		width: 750px;
		background: #fff;
		padding: 60px 32px 0 32px;
		font-size: 24px;
		/*px*/
		font-weight: normal;
		font-stretch: normal;
		line-height: 100%;
		color: #999999;
		border-bottom: 1px solid #F5F5F5;
		/*no*/
		position: relative;
		z-index: 8;
		.item_city_box {
			background: white;
			padding: 0 0px 40px 0px;
			display: flex;
			justify-content: flex-start;
			align-items: center;
			flex-wrap: wrap;
			.location_box {
				width: 15px;
				height: 22px;
				margin-right: 13px;
			}
			.item_city {
				margin-top: 29px;
				margin-right: 40px;
				text-align: center;
				flex: 0 0 200px;
				height: 72px;
				font-size: 26px;
				/*px*/
				line-height: 100%;
				color: #333333;
				&:nth-of-type(3n) {
					margin-right: 0;
				}
			}
			.selected_gray {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				border: solid 1px #dcdcdc;
				/*no*/
				border-radius: 4px;
				color: #333333;
			}
			.selected_red {
				/*px*/
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;
				height: 100%;
				background: #E85E4E;
				/*opacity: 0.1;*/
				border-radius: 4px;
				color: #fff;
			}
		}
	}

  .red_f44336 {
		color: #f44336;
	}

  .black_333333 {
		color: #333333;
	}
	/**搜索显示页面样式*/

  .searchList_box {
		position: relative;
		z-index: 10;
		width: 750px;
		background: #FFFFFF;
		.search_item{
			width: 718px;
			height: 88px;
			border-bottom: 1px solid #F5F5F5;/*no*/
			padding-right: 32px;
			margin-left: 32px;
			font-size: 28px;/*px*/
			color: #333333;
			line-height: 100%;
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
	}
</style>

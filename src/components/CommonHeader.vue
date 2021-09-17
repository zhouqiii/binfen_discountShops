<template>
  <div class="commonHeader">
    <div class="main">
      <div class="left">
        <slot name="back">
          <img
            @click="back"
            src="../assets/img/back@2x.png"
            alt="back"
            class="back back_btn"
          />
        </slot>
      </div>
      <div class="center">
        <div>{{title}}</div>
      </div>
      <div class="right">
        <slot name="icon1">
          <div slot="icon1">
            <!-- <img
              class="icon_share"
              src="../assets/img/share.png"
            /> -->
          </div>
        </slot>
        <slot name="icon2"></slot>
        <!-- 用户自定义 -->
        <slot name="custom"></slot>
      </div>
    </div>
    <div class="blank"></div>
  </div>
</template>

<script>
import { callAppMethod } from "@/utils/commonFn";
export default {
  name: "commonHeader",
  data() {
    return {
    };
  },
  props: {
    // type的值：
    // "0":调用客户端的lastGoBack方法，关闭加载H5的webview
    // "1":返回当前项目的上级页面
    // "3":跳转到当前项目的指定页面
    type: {
      type: String,
      default: "1",
    },
    title:{
      type: String,
      default: '优惠商户'
    }
  },
  methods: {
    back() {
      if(this.type === '0') {
        callAppMethod({
          callName: "lastGoBack",
        });
      }else if(this.type === '1') {
        this.$router.go(-1)
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import '../style/mixin.less';
.commonHeader {
  .main,
  .blank {
    height: 44px;
    padding-top: env(safe-area-inset-top) !important;
    padding-top: constant(safe-area-inset-top) !important;
  }
  .main {
    width: 343px;
    position: fixed;
    z-index: 10;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 @P16;
    border-bottom: 1px solid #f5f5f5;
    box-sizing: content-box;
    background: #fff;
    .left,
    .right{
      flex: 0 0 90px;
      height: 100%;
    }
    .left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .back_btn {
        width: 22px;
        height: 22px;
      }
    }
    .center {
      font-size: 18px;
      font-weight: 600;
    }
    .right {
      height: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .icon_share{
        width: 22px;
        height: 22px;
      }
    }
  }
}
</style>
<template>
  <div class="img_test">
    <!--1.img直接监听:onerror="defaultImg" computed:(){defaultImg(){return 'this.src="'+require('../assets/img/img_default.png')+'"'}}再加上可以设置backround图片-->
    <!--2.与上述实现不同的是，想在上述的基础上把alt以合适的方式显示出来，这样图片加载出错时除了有默认图片还可以提示一下图片的内容 如下test-->
    <img :src="imgSor.src" :alt="imgSor.alt" onerror="this.classList.add('error')"/>
  </div>
</template>
<script>
export default{
  name: 'ImgIcon',
  props: {
    data:{
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      imgSor:{
        src: '',
        alt: '图片介绍',
      }
    }
  },
  watch:{
    data(val) {
      this.imgSor = val
    }
  }
}
</script>

<style lang="less" scoped>
.img_test{
  img{
    height: 200px;
    width: 200px
  }
  img.error {
    display: inline-block;
    transform: scale(1);
    content: '';
    color: transparent;
  }
  img.error::before {
    content: '';
    position: absolute;
    left: 0; top: 0;
    width: 100%; height: 100%;
    background: #f5f5f5 url('../assets/noapprove_page.png') no-repeat center / 50% 50%;
  }
  img.error::after {
    content: attr(alt);
    position: absolute;
    left: 0; bottom: 0;
    width: 100%;
    line-height: 2;
    background-color: rgba(0,0,0,.5);
    color: white;
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
</style>
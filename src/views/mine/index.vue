// 我的模块
<template lang="pug">
  .vm-mine
    Scroll(background="rgb(203, 40, 41)")
      .scroll-header(slot="scroll-header")
        i.cloud.icon-menu.easy-click
        span.title 我的
        .right
      .scroll-content(slot="scroll-content")
        // 用户填充头部的内容，防止content被头部遮挡
        .fill-top
        // 内容部分
        .fill-content
          .user-tip
            .tip-content
              .blur
              .content
                .detail
                  img(src="http://www.daiwei.org/vue/bg/657952152722629515.jpg")
                  span.name 未曾遗忘的青春
                  .tip
                .vip
                  span.btn 会员中心
</template>
<script>
import Scroll from 'components/scroll/'
export default {
  created () {
    // alert(1)
  },
  components: {
    Scroll
  }
}
</script>
<style lang="scss" scoped>
.vm-mine{
  .scroll-header{
    height: $auto_h;
    width: 100%;
    background: $primary_color;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 5;
    font-size: $f_auto_l;
    color: #fff;
    display:flex;
    align-items: center;
    justify-content: center;
    padding: 0 $auto_padding_l_r;
    box-sizing: border-box;
    .title{
      flex: 1 1 auto;
      padding: 0 $auto_padding_l_r;
      box-sizing: border-box;
      @include els();
    }
    .cloud, .right{
      flex: 0 0 p2r(0.7rem);
    }
  }
  .scroll-content {
    overflow: hidden;
    .fill-top{
      height: $auto_h;
      background: $primary_color;
    }
    .fill-content{
      position: relative;
      min-height: 100%;
      height: -webkit-fill-available;
      .user-tip{
        width: 100%;
        height: p2r(1.5rem);
        position: relative;
        &::before{
          content: '';
          position: absolute;
          background: $primary_color;
          left: 0;
          right: 0;
          top: 0;
          bottom: 50%;
        }
        &::after{
          content: '';
          position: absolute;
          background: #fff;
          left: 0;
          right: 0;
          top: 50%;
          bottom: 0;
        }
        .tip-content{
          width: p2r(7.3rem);
          height: p2r(1.3rem);
          background: rgba(243,243,243,0.8);
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
          box-shadow: 0px 2px 8px 0 #a1a1a1;
          z-index: 1;
          border-radius: p2r(0.12rem);
          -webkit-backdrop-filter: blur(15px);
          overflow: hidden;
          .blur{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            filter: blur(15px);
            background: #fff;
          }
          .content{
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            overflow: hidden;
            padding: p2r(0.2rem);
            box-sizing: border-box;
            .detail{
              flex: 1 1 auto;
              display: flex;
              align-items: center;
              justify-content: flex-start;
              img{
                width: p2r(1rem);
                flex:0 0 p2r(1rem);
                height: p2r(1rem);
                border-radius: 50%;
              }
              .name{
                flex:1 1 auto;
                @include els();
                font-size: $f_auto_l;
                text-align: left;
                margin:0 p2r(0.15rem);
              }
              .tip{
                width: p2r(0.4rem);
                flex: 0 0 p2r(0.4rem);
                height: auto;
                background: red;
              }
            }
            .vip{
              flex: 0 0 p2r(1.2rem);
              overflow: hidden;
              font-size: $f_samll_m;
              padding: p2r(0.05rem) p2r(0.1rem);
              color: $primary_color;
              border: 1px solid $primary_color;
              border-radius: p2r($f_samll_m);
            }
          }
        }
      }
    }
  }
}
</style>

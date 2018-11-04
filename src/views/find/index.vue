// 发现模块
<template lang="pug">
  .vm-find
    .fix-top
      // 搜索区域
      .serch-area
        i.left.icon-pencil.easy-click
        // 控制区域
        input(type="text" class="serach-input" value="111")
      .nav-bar
        router-link(to="/main/find/recommend" class="nav-bar-router") 个性推荐
        router-link(to="/main/find/station" class="nav-bar-router") 主播电台
    // 内容中心区域
    .find-content
      router-view
</template>
<script>
export default {
  created () {
    // alert(1)
  }
}
</script>
<style lang="scss" scoped>
.vm-find{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: $NAV_H;
  .fix-top{
    height: $HEADER_H;
    width: 100%;
    background: $primary-color;
    .serch-area{
      height: $HEADER_H_S;
      width: 100%;
      background: $primary-color;
      display: flex;
      align-items: center;
      .left{
        flex:0 0 p2r(0.7rem);
        margin: p2r(0.1rem);
        color: $icon-f;
        font-size: $f_auto_l;
      }
      .serach-input{
        flex:1 1 auto;
        margin-right: p2r($HEADER_H_S);
        height: p2r(0.52rem);
        border-radius: p2r(0.26rem);
        border: none;
        outline: none;
        background: rgba(255,255,255,0.1);
        color: rgba(255,255,255,0.8);
        text-indent: p2r(0.1rem);
        font-size: $f_small_l;
      }
    }
    .nav-bar{
      height: $HEADER_H - $HEADER_H_S;
      display: flex;
      align-items: center;
      justify-content: center;
      .nav-bar-router{
        color: #fff;
        height: $HEADER_H - $HEADER_H_S - p2r(0.15rem);
        font-size: $f_small_m;
        text-align: center;
        width: p2r(1.5rem);
        position: relative;
        color: $text_noactive;
        &::after{
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translate(-50%, 0);
          background: $icon-f;
          width: p2r(0.4rem);
          height: p2r(0.04rem);
          display: none;
        }
        &.router-link-active{
          color: $text_active;
          &::after{
            display: block;
          }
        }
      }
    }
  }
  .find-content{
    position: fixed;
    width: 100%;
    top: $HEADER_H;
    bottom: $NAV_H;
    background: #fff;
  }
}
</style>

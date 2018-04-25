<template>
  <div class="bottomNav">
    <router-link tag="a" to="find">
      <i class="icon-message"></i>
      <span class="name">发现</span>
    </router-link>
    <router-link tag="a" to="singer">
      <i class="icon-message"></i>
      <span class="name">歌手</span>
    </router-link>
    <router-link tag="a" to="rank">
      <i class="icon-message"></i>
      <span class="name">排行榜</span>
    </router-link>
    <router-link tag="a" to="mine">
      <i class="icon-message"></i>
      <span class="name">我的</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'bottomNav'
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .bottomNav{
    position: fixed;
    bottom: 0;
    left:0;
    right:0;
    height: $bottom_nav_h;
    background: rgba(255,255,255,0.8);
    @include blur(10px);
    @include display-flex;
    font-size:12px;
    z-index: 11;
    a{
      @include flex(1);
      @include display-flex;
      @include flex-direction(column);
      color: $text_auto_s;
      @include justify-content(center);
      text-decoration:none;
      i{
        font-size: 22px;
        color: $m_text_gray_l;
        font-weight: 400;
      }
      span{
        color: $m_text_gray_m;
      }
      &.router-link-active{
        color: $m_active_color;
        i{
          color: $m_active_color;
        }
        span{
          color: $m_active_color;
        }
      }
    }
  }
</style>

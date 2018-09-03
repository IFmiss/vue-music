// 底部固定菜单
<template lang="pug">
  .cp-nav
    router-link(to="/main/find" class="model-router")
      i.icon-menu
      span 发现
    router-link(to="/main/video" class="model-router")
      i.icon-office
      span 视频
    router-link(to="/main/mine" class="model-router")
      i.icon-pencil
      span 我的
    router-link(to="/main/firends" class="model-router")
      i.icon-quill
      span 朋友
    router-link(to="/main/account" class="model-router")
      i.icon-droplet
      span 账号
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.cp-nav{
  display: flex;
  align-items: center;
  justify-content: center;
  @include border-1px(#aaa, top);
  .model-router{
    flex: 0 0 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    i{
      font-size: p2r(0.4rem);
      color: $icon_color_nav;
    }
    span{
      font-size: $f_samll_s;
      line-height: 1;
      margin-top: p2r(0.1rem);
      color: $icon_color_nav;
    }
    &.router-link-active{
      i,span{
        color: $primary_color;
      }
    }
  }
}
</style>

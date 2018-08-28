// 底部固定菜单
<template lang="pug">
  .cp-nav
    router-link(to="/main/find" class="model-router")
      i
      span 发现
    router-link(to="/main/video" class="model-router")
      i
      span 视频
    router-link(to="/main/mine" class="model-router")
      i
      span 我的
    router-link(to="/main/firends" class="model-router")
      i
      span 朋友
    router-link(to="/main/account" class="model-router")
      i
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
  .model-router{
    flex: 0 0 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    i{
      width: p2r(0.5rem);
      height: p2r(0.5rem);
    }
    span{
      font-size: $f_samll_s;
      line-height: 1;
      margin-top: p2r(0.05rem);
    }
  }
}
</style>

// 底部固定菜单
<template lang="pug">
  .cp-nav
    router-link(to="/find") 发现
    router-link(to="/video") 视频
    router-link(to="/mine") 我的
    router-link(to="/firends") 朋友
    router-link(to="/account") 账号
</template>
<script>
export default {
}
</script>
<style lang="scss" scoped>
.cp-nav{
  position: fixed;
  height: p2r(0.5rem);
  bottom: 0;
  left: 0;
  right: 0;
}
</style>

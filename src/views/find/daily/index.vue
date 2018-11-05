// 每日推荐音乐列表
<template lang="pug">
  .music-daily
    CommonPage(title="每日推荐")
      .header(slot="header")
        i.icon-menu
      .content(slot="content")
        .banner
          .date 12
          img(src="https://s2.music.126.net/style/web2/img/recmd_daily.jpg")
        .lists
</template>
<script>
import CommonPage from 'components/commonpage'
export default {
  components: {
    CommonPage
  }
}
</script>
<style lang="scss" scoped>
.banner{
  width: 100%;
  height: auto;
  position: relative;
  .date{
    color: $text_active;
    opacity: 0.8;
    font-size: p2r(0.64rem);
    position: absolute;
    left: p2r(0.62rem);
    top: 50%;
    transform: translateY(-50%);
  }
  img{
    display: block;
    width: 100%;
  }
}
</style>

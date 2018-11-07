// 每日推荐音乐列表
<template lang="pug">
  .music-daily
    CommonPage(title="每日推荐")
      .header(slot="header-r")
        i.icon-menu
      .content(slot="content")
        .banner
          .date {{new Date().getDate()}}
          img(src="https://s2.music.126.net/style/web2/img/recmd_daily.jpg")
        .lists(v-if="recommend.length")
          MusicList(v-for="item in recommend" :name="item.name", :singer="item.artists", :avatar="item.album.picUrl", :id="item.id", :list="item")
</template>
<script>
import API from 'api'
import MusicList from 'components/sheetlist'
import CommonPage from 'components/commonpage'
export default {
  data () {
    return {
      recommend: []
    }
  },
  components: {
    CommonPage,
    MusicList
  },
  methods: {
    async initData () {
      let res = await this.$mutils.fetchData(API.sheet.RECOMMEND_SONGS_LISTS)
      this.recommend = res.data.recommend
      console.log(this.recommend)
    }
  },
  created () {
    this.initData()
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
    font-size: p2r(0.82rem);
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
.lists{
  margin-top: $auto_padding_l_r;
  padding-left: $auto_padding_l_r;
  padding-bottom: $auto_padding_l_r;
  box-sizing: border-box;
  position: relative;
  @include border-1px(#eee, top);
}
</style>

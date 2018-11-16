// 每日推荐音乐列表
<template lang="pug">
  .music-daily
    CommonPage(title="每日推荐")
      i.icon-menu(slot="header-r")
      .content(slot="content")
        .banner
          .date {{new Date().getDate()}}
          img(src="https://s2.music.126.net/style/web2/img/recmd_daily.jpg")
        .lists(v-if="recommendList.length")
          SheetList(v-for="(item, index) in recommendList" :name="item.name", :index="index", :singer="item.artists", :avatar="item.album.picUrl", :id="item.id", :playSheet="playSheet(item.id)", :list="item", @play="play")
        Loading(v-else :absolute="true")
</template>
<script>
import API from 'api'
import SheetList from 'components/sheetlist'
import CommonPage from 'components/commonpage'
import Loading from 'components/loading'
import music from 'utils/music'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      recommendList: [],
      recommendId: 0
    }
  },
  components: {
    CommonPage,
    SheetList,
    Loading
  },
  methods: {
    async initData () {
      let res = await this.$mutils.fetchData(API.sheet.RECOMMEND_SONGS_LISTS)
      let data = res.data.recommend
      this.parsePlayInfo(data)
    },

    /**
     * 每日的歌曲和歌单给的数据是不一样的所以需要改写一下数据格式
     */
    parsePlayInfo (data) {
      this.recommendList = data.map(item => {
        item.ar = item.artists
        item.al = item.album
        return item
      })
    },

    /**
     * 播放每日推荐
     */
    play (index) {
      let data = {
        lists: this.recommendList,
        index,
        id: this.recommendId
      }
      music.saveSheetList(data)
    },

    /**
     * 是否是播放每日推荐的歌曲
     */
    playSheet (id) {
      return this.playSheetId === 0 && this.musicPlayingListId === id
    }
  },
  computed: {
    ...mapState({
      playSheetId: state => state.Music['PLAY_MUSIC_LISTS_ID'],
      musicPlayingListId (state) {
        let music = state.Music
        if (!music['PLAY_MUSIC_LISTS']) return
        return music['PLAY_MUSIC_LISTS'][music['PLAY_MUSIC_INDEX']].id
      }
    })
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

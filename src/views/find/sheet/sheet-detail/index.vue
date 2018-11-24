// 这是歌单的详情页面  包含歌单的一系列操作
<template lang="pug">
  .sheet-detail(v-if="!isEmptyDetail")
    CommonPage(title="歌单", :bg="imageSrc")
      .content(slot="content")
        .scroll-main
          .content-main
            .blur(v-if="isAlbum" :style="{backgroundImage: 'url(' + detail.blurPicUrl + '?param=170y170)'}")
            .blur(v-else :style="{backgroundImage: 'url(' + detail.coverImgUrl + '?param=170y170)'}")
            .detail-main(v-if="isAlbum")
              .sheet-avatar(@click="showSheetAvatar")
                img.avatar(:src="detail.blurPicUrl + 'param=300y300'")
                .info i
              .sheet-disc
                .name {{detail.name}}
                .user
                  span {{detail.artists[0].name}}
                  i.icon-menu
            .detail-main(v-else)
              .sheet-avatar(@click="showSheetAvatar")
                img.avatar(:src="detail.coverImgUrl + 'param=300y300'")
                .tips {{detail.playCount | parseNumber}}
                .high-quality(v-if="detail.highQuality")
                  i.icon-menu
                .info i
              .sheet-disc
                .name {{detail.name}}
                .user
                  img(:src="detail.creator.avatarUrl + 'param=120y120'")
                  span {{detail.creator.nickname}}
                  i.icon-menu
            .detail-conf
              .conf-list
                i.icon-menu
                span.disc {{detail.commentCount}}
              .conf-list
                i.icon-menu
                span.disc {{detail.shareCount}}
              .conf-list
                i.icon-menu
                span.disc 下载
              .conf-list
                i.icon-menu
                span.disc 多选
          .content-lists-info
            .list-title
              .play
                i.icon-menu
                span.label 播放全部
                span.count (共{{detail.trackCount}}首)
              .collect
                span + 收藏 ({{detail.subscribedCount | parseNumber}})
            .list-content
              MusicList(v-for="(item, index) in tracks" :index="index" :name="item.name", :singer="item.ar", :id="item.id", :list="item", :playSheet="playSheet(item.id)", @play="playMusic")
    transition(name="fade")
      SheetAvatar(v-if="showAvatar", @hideSheetAvatar="hideSheetAvatar" :avatarData="detail")
</template>

<script>
import API from 'api'
import CommonPage from 'components/commonpage'
import Scroll from 'components/scroll'
import SheetAvatar from './../sheet-avatar'
import MusicList from 'components/musiclist'
import music from 'utils/music'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      sheetId: 0,
      // 数据详情
      detail: {},
      // 音乐列表
      tracks: [],
      // 是否显示图片封面
      showAvatar: false
    }
  },
  components: {
    Scroll,
    CommonPage,
    SheetAvatar,
    MusicList
  },
  computed: {
    isEmptyDetail () {
      return JSON.stringify(this.detail) === '{}'
    },
    ...mapState({
      playSheetId: state => state.Music['PLAY_MUSIC_LISTS_ID'],
      musicPlayingListId (state) {
        let music = state.Music
        if (!music['PLAY_MUSIC_LISTS']) return
        return music['PLAY_MUSIC_LISTS'][music['PLAY_MUSIC_INDEX']].id
      }
    }),
    isAlbum () {
      return this.$route.query.type === 'album'
    },
    imageSrc () {
      let src = this.isAlbum ? this.detail.blurPicUrl : this.detail.coverImgUrl
      return this.$mutils.changeImageSize(src)
    }
  },

  methods: {
    // 获取专辑数据
    async initData () {
      const fetchUrl = this.isAlbum ? API.sheet.SHEET_ALBUM_LISTS : API.sheet.SHEET_DETAIL_LISTS
      let res = await this.$mutils.fetchData(fetchUrl, {
        id: this.sheetId
      })
      this.detail = this.isAlbum ? res.data.album : res.data.playlist
      this.tracks = this.isAlbum ? res.data.songs : res.data.playlist.tracks
    },

    playSheet (id) {
      return this.playSheetId === this.detail.id && this.musicPlayingListId === id
    },

    /**
     * 显示歌单图片背景
     */
    showSheetAvatar () {
      this.showAvatar = true
    },

    /**
     * 关闭歌单图片背景
     */
    hideSheetAvatar () {
      this.showAvatar = false
    },

    /**
     * 播放音乐
     * 在播放之前，需要进行一下操作
     * 1. 比对当前播放的歌单是和现在将要播放的歌单是否相同，如果相同，歌单数据将不会变化，只需要变化索引即可
     * 2. 根据1的判断是否将播放的歌曲集合存储到vuex
     * 3. 存储播放的索引
     * 4. 页面跳转到播放页，在播放页拿到将要播放的音乐数据，获取其他数据以及播放
     */
    playMusic (index) {
      this.saveSheetList(index)
    },

    /**
     * 保存歌单信息
     */
    saveSheetList (index) {
      let data = {
        lists: this.tracks,
        index,
        id: this.detail.id
      }
      music.saveSheetList(data)
    }
  },
  created () {
    this.sheetId = this.$route.query.id
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
$opacity: 0.8;
.content-main{
  position: relative;
  overflow: hidden;
  padding-bottom: $auto_padding_l_r * 2;
  .blur{
    overflow: hidden;
    @include blur(20px, auto, center);
  }
  .detail-main{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $auto_padding_l_r * 3 $auto_padding_l_r * 1.5 $auto_padding_l_r * 2 $auto_padding_l_r * 1.5;
    .sheet-avatar{
      flex: 0 0 p2r(2.5rem);
      height: p2r(2.5rem);
      overflow: hidden;
      position: relative;
      border-radius: p2r(0.06rem);
      z-index: 1;
      .avatar{
        display: block;
        width: 100%;
      }
      .tips{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: p2r(0.4rem);
        background: lg(180deg, rgba(22,22,22, 0.3), rgba(22,22,22, 0));
        color: $text_active;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: $f_small_s;
        padding: 0 p2r(0.1rem);
      }
      .high-quality{
        background: $gold_color;
        width: p2r(1rem);
        line-height: p2r(0.4rem);
        transform: rotate(-45deg) translate(-27%, -98%);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        padding: $auto_padding_l_r / 2 $auto_padding_l_r;
        i{
          font-size: $f_small_s / 2;
          font-weight: 200;
        }
      }
      .info{
        border-radius: 50%;
        border: 1px solid #fff;
        padding: p2r(0.03rem);
        position: absolute;
        width: p2r(0.3rem);
        height: p2r(0.3rem);
        display: flex;
        align-items: center;
        justify-content: center;
        right: $auto_padding_l_r / 2;
        bottom: $auto_padding_l_r / 2;
        color: #fff;
        font-size: $f_small_l;
        font-weight: 600;
      }
    }
    .sheet-disc{
      flex: 1 1 auto;
      padding-left: $auto_padding_l_r;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      text-align: left;
      flex-direction: column;
      font-weight: 500;
      z-index: 1;
      .name{
        width: 100%;
        font-size: $f_auto_l;
        color: #fff;
        @include lineclamp(p2r(1rem), 2);
      }
      .user{
        width: 100%;
        margin-top: $auto_padding_l_r * 2;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        img{
          flex: 0 0 p2r(0.56rem);
          height: p2r(0.56rem);
          border-radius: 50%;
        }
        span{
          color: #fff;
          max-width: p2r(2.6rem);
          @include els();
          font-size: $f_small_x;
          margin-left: $auto_padding_l_r;
          opacity: $opacity;
        }
        i{
          margin-left: $auto_padding_l_r;
          color: $text_noactive;
          font-size: $f_small_x;
          opacity: $opacity;
        }
      }
    }
  }
  .detail-conf{
    width: 100%;
    display: flex;
    padding: $auto_padding_t_b * 1.5 $auto_padding_t_b;
    box-sizing: border-box;
    align-items: center;
    .conf-list{
      width: 25%;
      opacity: $opacity;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $icon_color_nav;
      i{
        font-size: $f_auto_l * 1.2;
      }
      .disc{
        margin-top: $auto_padding_t_b;
        font-size: $f_small_l;
      }
    }
  }
}
.content-lists-info{
  width: 100%;
  border-radius: p2r(0.24rem)  p2r(0.24rem) 0 0;
  background: #fff;
  margin-top: - $auto_padding_l_r * 2;
  overflow: hidden;
  position: relative;
  .list-title{
    display: flex;
    align-items: center;
    &.fixed{
      position: fixed;
      top: $auto_h;
      left: 0;
      right: 0;
      height: 20px;
      background: red;
    }
    .play{
      display: flex;
      flex: 1 1 auto;
      align-items: center;
      height: p2r(0.8rem);
      justify-content: flex-start;
      padding: 0 $auto_padding_l_r;
      i{
        color: $color_gray_deep;
        font-size: $f_small_m;
        margin-right: $auto_padding_l_r / 2;
      }
      .label{
        color: $color_gray;
        font-size: $f_small_m;
        margin-right: $auto_padding_l_r / 2;
      }
      .count{
        color: $color_gray_slow;
        font-size: $f_small_x;
      }
    }
    .collect{
      height: p2r(0.8rem);
      flex: 0 0 p2r(2rem);
      background: lg(110deg, $primary_color_s, $primary_color_d);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 $auto_padding_l_r;
      font-size: $f_small_m;
      color: #fff;
    }
  }
  p{
    margin: 0;
  }
}
</style>

<template lang="pug">
  .play
    .blur(:class="{'draken': isShowLrc}" :style="{backgroundImage: 'url(' + musicPlayingList.al.picUrl + ')'}")
    .auto-header
      .left
        i.icon-menu(@click="back")
      .title
        .name {{musicPlayingList.name}} - {{playType}}
        .user
          span.user-name {{getSinger(musicPlayingList.ar)}}
          i.icon-menu
      // 分享
      .right
        i.icon-menu
    .content
      .lrc(v-if="isShowLrc")
      .cd(v-else)
        TouthBar(@setProgress="setVol", :progress="vol")
          .left-sider(slot="left-sider")
            i.icon-menu
          .right-sider(slot="right-sider")
            i.icon-menu
      .music-conf
        .music-progress
        .music-play-set
          .play-type.icon-menu.easy-click(@click="music.setPlayType")
          .play-set
            .play-index.icon-menu.easy-click(@click="playPrev")
            .play-puase.easy-click(:class="isPlaying ? 'icon-menu' : 'icon-office'"
                                    @click="playPause")
            .play-index.icon-menu.easy-click(@click="playNext")
          .play-lists.icon-menu.easy-click
</template>
<script>
import { mapState } from 'vuex'
import music from 'utils/music'
import TouthBar from 'components/touchbar'
export default {
  data () {
    return {
      isShowLrc: false,
      vol: 100,
      audioEle: document.getElementById('myAudio'),
      music: music
    }
  },

  components: {
    TouthBar
  },

  methods: {
    back () {
      this.$router.go(-1)
    },
    getSinger (arr) {
      return arr.map(item => item.name).toString()
    },

    // 设置音量大小
    setVol (percent) {
      this.vol = percent
      this.audioEle.volume = this.vol / 100
    },

    /**
     * 播放下一首
     */
    playNext () {
      music.playNextPrev('next')
    },

    /**
     * 播放上一首
     */
    playPrev () {
      music.playNextPrev('prev')
    },

    /**
     * 音乐播放暂停
     */
    playPause () {
      music.playPause()
    }
  },

  computed: {
    ...mapState({
      musicPlayLists: state => state.Music['PLAY_MUSIC_LISTS'],
      playIndex: state => state.Music['PLAY_MUSIC_INDEX'],
      musicPlayingList (state) {
        let music = state.Music
        if (!music['PLAY_MUSIC_LISTS']) return
        return music['PLAY_MUSIC_LISTS'][music['PLAY_MUSIC_INDEX']]
      },
      isPlaying: state => state.Music['MUSIC_IS_PLAYING'],
      playType: state => state.Music['MUSIC_PLAY_TYPE']
    })
  },
  created () {
    // console.log(this.playIndex)
  },
  mounted () {
    // 播放
    this.playPause()
  }
}
</script>
<style lang="scss" scoped>
.play{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-size: 300%;
  background-position: center center;
  .blur{
    background: #333;
    transition: all 0.3s;
    @include blur(26px, auto, center);
  }
  .auto-header{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: $auto_h;
    flex: 0 0 $auto_h;
    width: 100%;
    color: #fff;
    font-size: $f_auto_l;
    display: flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    @include border-1px(rgba(166,166,166,0.2));
    .left,.right{
      flex: 0 0 p2r(1.8rem);
      display: flex;
      align-items: center;
      i, span{
        flex: 0 0 p2r(0.7rem);
        margin: 0 p2r(0.2rem);
      }
    }
    .title{
      flex: 1 1 auto;
      @include els();
      opacity: 0.96;
      .name{
        font-size: $f_small_l;
      }
      .user{
        margin-top: p2r(0.04rem);
        font-size: $f_small_s;
        span{
          margin-right: $auto_padding_l_r / 2;
        }
      }
    }
  }
  .content{
    position: absolute;
    top: $auto_h;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    display: flex;
    flex-direction: column;
    .lrc, .cd{
      flex: 1 1 auto;
      overflow: hidden;
    }
    .music-conf{
      flex: 0 0 p2r(2rem);
      display: flex;
      flex-direction: column;
      padding: $auto_padding_l_r;
      .music-progress{
        flex: 0 0 p2r(0.6rem);
      }
      .music-play-set{
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        opacity: 0.9;
        .play-set{
          flex: 0 0 p2r(4.6rem);
          display: flex;
          align-items: center;
          justify-content: space-around;
          .play-index{
            position: relative;
            font-size: $f_auto_s * 1.4;
          }
          .play-puase{
            position: relative;
            font-size: $f_auto_l * 1.5;
          }
        }
        .play-type, .play-lists{
          position: relative;
          flex: 0 0 p2r(0.8rem);
          font-size: $f_small_l;
        }
      }
    }
  }
}
</style>

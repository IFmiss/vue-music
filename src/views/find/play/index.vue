<template lang="pug">
  .play
    .blur(:class="{'draken': isShowLrc}" :style="{backgroundImage: 'url(' + musicPlayingList.al.picUrl + '?param=400y400)'}")
    .auto-header
      .left
        i.icon-menu(@click="back")
      .title
        .name {{musicPlayingList.name}}
        .user
          span.user-name {{getSinger(musicPlayingList.ar)}}
          i.icon-menu
      // 分享
      .right
        i.icon-menu
    .content
      .lrc(v-if="isShowLrc" @click="toggleType")
        .vol
          TouthBar(@setProgress="setVol", :progress="audioVol")
            .left-sider(slot="left-sider")
              i.icon-menu
            .right-sider(slot="right-sider")
              i.icon-menu
        .lrc-area(ref="lrcarea")
          .full-lrc
          Lrc(:songId="musicPlayingList.id", :currentT="currentTime")
      .cd(v-else @click="toggleType")
        .cd-area
          .cd-image-wp(id="cdwp")
            img.cd-image(id="cd" :src="musicPlayingList.al.picUrl + '?param=400y400'", :class="{'rotate': isPlaying}")
        .mc-conf
          i.icon-menu.collect
          i.icon-menu.download
          i.icon-menu.commen
          i.icon-menu.set
      .music-conf
        .music-progress
          TouthBar(@setProgress="setProgress"
                  :progress="percent"
                  @setPercent="setPercent")
            .left(slot="left-sider")
              span {{currentTime | parseMusicTime}}
            .right(slot="right-sider")
              span {{durationTime | parseMusicTime}}
        .music-play-set
          .play-type.icon-menu.easy-click(@click="music.setPlayType")
          .play-set
            .play-index.icon-menu.easy-click(@click="playPrev")
            .play-puase.easy-click(:class="isPlaying ? 'icon-menu' : 'icon-office'"
                                    @click="playPause")
            .play-index.icon-menu.easy-click(@click="playNext")
          .play-lists.icon-menu.easy-click(@click="showSider = true")
    MusicSiderList(v-if="showSider", @close="showSider = false")
</template>
<script>
import { mapState } from 'vuex'
import music from 'utils/music'
import TouthBar from 'components/touchbar'
import Lrc from 'components/lrc'
import MusicSiderList from 'components/musicsiderlist'
export default {
  data () {
    return {
      isShowLrc: false,
      audioEle: document.getElementById('myAudio'),
      music: music,
      showSider: false,
      currentT: null
    }
  },

  components: {
    TouthBar,
    MusicSiderList,
    Lrc
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
      music.setVol(percent)
    },

    /**
     * 设置进度
     */
    setProgress (progress) {
      const currentTime = this.audioEle.duration * progress / 100
      this.currentT = this.audioEle.currentTime = currentTime
      this.$store.dispatch('MUSIC_CURRENT_TIME_SETTERS', this.currentT)
    },

    setPercent (progress) {
      this.currentT = this.audioEle.duration * progress / 100
    },

    /**
     * 切换显示类型
     */
    toggleType () {
      this.isShowLrc = !this.isShowLrc
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
      playType: state => state.Music['MUSIC_PLAY_TYPE'],
      currentTime: state => state.Music['MUSIC_CURRENT_TIME'],
      durationTime: state => state.Music['MUSIC_DURATION_TIME'],
      audioVol: state => state.Music['MUSIC_VOL']
    }),
    musicProgress () {
      return Math.floor(this.currentTime / this.durationTime * 100)
    },
    percent () {
      return Math.floor(this.currentTime / this.audioEle.duration * 100)
    }
  },

  created () {
    // console.log(document.getElementById('myAudio'))
  },
  mounted () {
    // 播放
    music.play()
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
        margin: 0 p2r(0.1rem);
      }
    }
    .right{
      justify-content: flex-end;
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
    overflow: hidden;
    .lrc, .cd{
      flex: 1 1 auto;
      overflow: hidden;
      .left-sider, .right-sider{
        font-size: $f_small_x;
        color: #fff;
        opacity: 0.95;
        width: p2r(0.8rem);
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .lrc{
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .vol{
        flex: 0 0 p2r(0.8rem);
        padding: 0 $auto_padding_l_r;
        box-sizing: border-box;
        overflow: hidden;
        width: 100%;
      }
      .lrc-area{
        flex: 1 1 auto;
        width: 100%;
        overflow: hidden;
        .full-lrc{
          margin-top: 50%;
        }
      }
    }
    .cd{
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: center;
      .cd-area{
        flex: 1 1 auto;
        display: flex;
        align-items: center;
        justify-content: center;
        .cd-image-wp{
          width: p2r(4rem);
          height: p2r(4rem);
          margin: 0 auto;
          .cd-image{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 5px solid rgba(224, 201, 201, 0.3);
            box-shadow: 0 0 25px 0 rgba(0,0,0,0.3);
          }
        }
      }
      .mc-conf{
        flex: 0 0 p2r(1rem);
        width: 100%;
        padding: $auto_padding_l_r $auto_padding_l_r * 9;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        i{
          font-size: $f_small_l;
          color: $border_color;
          opacity: 0.8;
        }
      }
    }
    .music-conf{
      flex: 0 0 p2r(2rem);
      display: flex;
      flex-direction: column;
      padding: $auto_padding_l_r;
      .music-progress{
        flex: 0 0 p2r(0.8rem);
        padding: 0 $auto_padding_l_r;
        box-sizing: border-box;
        overflow: hidden;
        .left, .right{
          color: #fff;
          font-size: $f_small_s;
          opacity: 0.95;
          width: p2r(0.8rem);
          display: flex;
          align-items: center;
          justify-content: center;
        }
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

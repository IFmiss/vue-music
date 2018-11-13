<template lang="pug">
  .play
    .blur(:class="{'draken': isShowLrc}" :style="{backgroundImage: 'url(' + musicPlayingList.al.picUrl + ')'}")
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
      .lrc(v-if="isShowLrc")
      .cd(v-else)
      .music-conf
</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isShowLrc: false
    }
  },

  methods: {
    back () {
      this.$router.go(-1)
    },
    getSinger (arr) {
      return arr.map(item => item.name).toString()
    }
  },

  computed: {
    ...mapState({
      musicPlayLists: state => state.Music['PLAY_MUSIC_LISTS'],
      playIndex: state => state.Music['PLAY_MUSIC_INDEX'],
      musicPlayingList (state) {
        let music = state.Music
        return music['PLAY_MUSIC_LISTS'][music['PLAY_MUSIC_INDEX']]
      }
    })
  },
  created () {
    // console.log(this.playIndex)
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
      background: red;
    }
  }
}
</style>

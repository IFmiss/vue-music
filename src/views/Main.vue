// 主页 只是个包含底部菜单以及模块内容
<template lang="pug">
  .vm-main
    audio(id="myAudio"
          ref="myAudio"
          :src="musicPlayingList && musicPlayingList.id ? 'http://music.163.com/song/media/outer/url?id=' + musicPlayingList.id + '.mp3' : ''")
    router-link.fix-music-btn.icon-menu.easy-click(v-show="isPlayRouter", to="/main/play")
    Nav
    transition(:name="$route.meta.transition")
      keep-alive
        router-view(v-if="$route.meta.keepAlive" class="model-view" :class="{'isFull': $route.meta.isFull}")
    transition(:name="$route.meta.transition")
      router-view(v-if="!$route.meta.keepAlive" class="model-view" :class="{'isFull': $route.meta.isFull}")
</template>
<script>
import Nav from 'components/nav'
import music from 'utils/music.js'
import { mapState } from 'vuex'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    Nav
  },
  created () {
    this.$dutils.utils.console(' this is vue-music 2.0 ', {
      isMax: false,
      colors: ['#d299c2', '#fef9d7']
    })
  },
  computed: {
    isPlayRouter () {
      return (!this.$route.path.includes('/main/play') && this.musicPlayingList)
    },
    ...mapState({
      musicPlayingList: state => state.Music['MUSIC_PLAYING_DETAIL']
    })
  },
  methods: {
  },
  watch: {
    $route (to, from) {
      console.log(to.path.includes('/main/play'))
      console.log(from.path.includes('/main/play'))
    }
  },
  mounted () {
    music.initAudioEvent(this.$refs.myAudio)
  }
}
</script>
<style lang="scss" scoped>
.vm-main{
  position: relative;
  width: 100%;
  height: 100%;
  .fix-music-btn{
    position: fixed;
    top: 0;
    right: 0;
    height: $auto_h;
    width: p2r(0.7rem);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 p2r(0.1rem);
    font-size: $f_auto_l;
    color: $text_active;
    transition: (all 0.3s);
    z-index: 11;
  }
  .model-view {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: $NAV_H;
    &.isFull{
      bottom: 0;
    }
  }
  .cp-nav{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: $NAV_H;
  }
  audio{
    display: none;
  }
}
</style>

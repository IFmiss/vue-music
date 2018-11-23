// play页面呼起的列表内容
<template lang="pug">
  .music-sider-lists
    transition(name="fade")
      .mask(@click="close")
    transition(name="sider-top")
      .sider-content
        MusicList(v-for="(item, index) in musicPlayLists" :index="index" :name="item.name", :singer="item.ar", :id="item.id", :list="item", :playSheet="playSheet(item.id)", @play="playMusic")
</template>
<script>
import MusicList from 'components/musiclist'
import { mapState } from 'vuex'
import music from 'utils/music'
export default {
  components: {
    MusicList
  },
  computed: {
    ...mapState({
      musicPlayLists: state => state.Music['PLAY_MUSIC_LISTS'],
      musicPlayingList (state) {
        let music = state.Music
        if (!music['PLAY_MUSIC_LISTS']) return
        return music['PLAY_MUSIC_LISTS'][music['PLAY_MUSIC_INDEX']]
      }
    })
  },
  methods: {
    /**
     * 判断list是否是播放的音乐
     */
    playSheet (id) {
      return id === this.musicPlayingList.id
    },
    /**
     * 播放音乐
     */
    playMusic (index) {
      music.playIndex(index)
      this.close()
    },
    /**
     * 关闭浮层
     */
    close () {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss" scoped>
.music-sider-lists{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .mask{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
  }
  .sider-content{
    padding: $auto_padding_t_b / 2 0;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: p2r(7rem);
    background: #fff;
    -webkit-overflow-scrolling: touch;
    overflow: auto;
    border-radius: p2r(0.24rem)  p2r(0.24rem) 0 0;
  }
}
</style>

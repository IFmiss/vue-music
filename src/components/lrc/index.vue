<template lang="pug">
  .lrc-info(ref="lrc")
    .lrc-c(v-if="hasLrc === 1")
      .lrc-list(v-for="(item, index) in lrcs", :class="{active: activeIndex === index}") {{item.lrc}}
    .lrc-tip(v-if="hasLrc === 2") 纯音乐，请欣赏
    .lrc-tip(v-if="hasLrc === 0") 歌词加载中, 请稍等...
    .lrc-tip(v-if="hasLrc === 3") 暂无歌词
</template>
<script>
import API from 'api'
import music from 'utils/music'
export default {
  data () {
    return {
      lrcs: [],
      t: null,
      // 0 加载   1 有歌词   2 没有歌词 定义为纯音乐
      hasLrc: 0,
      // dom 元素的lists
      lrcLists: null
    }
  },

  props: {
    songId: {
      type: Number,
      defalut: 0
    },
    currentT: {
      type: Number,
      defalut: 0
    }
  },

  methods: {
    /**
     * 初始化获取数据
     */
    async initLrc () {
      let res = await this.$mutils.fetchData(API.music.MUSIC_LRC, {
        id: this.songId
      })
      // 是否存在
      if (res.data.nolyric) {
        this.hasLrc = 2
        return
      }
      if (res.data.lrc && res.data.lrc.lyric) {
        let lrcs = res.data.lrc.lyric
        this.hasLrc = 1
        this.lrcs = music.parseLrc(lrcs)
        return
      }
      this.hasLrc = 3
    },

    /**
     * 滚动到指定位置
     */
    scrollLrc () {
      if (this.activeIndex < 0) return
      if (this.lrcLists && this.lrcLists[this.activeIndex]) {
        let scrollT = this.lrcLists[this.activeIndex].offsetTop
        this.$refs.lrc.style.WebkitTransform = `translate3d(0, -${scrollT}px, 0)`
        this.$refs.lrc.style.transform = `transform: translate3d(0, -${scrollT}px, 0)`
      }
    }
  },

  computed: {
    activeIndex () {
      let activeIndex = -1
      for (let i = 0; i < this.lrcs.length; i++) {
        if (this.currentT > this.lrcs[i].t) {
          activeIndex = i
        } else {
          break
        }
      }
      return activeIndex
    }
  },

  watch: {
    songId: {
      immediate: true,
      handler: function (val, oldVal) {
        this.hasLrc = 0
        this.initLrc()
      }
    },
    activeIndex (n) {
      this.scrollLrc()
    }
  },

  mounted () {
    this.lrcLists = document.getElementsByClassName('lrc-list')
    this.scrollLrc()
  }
}
</script>
<style lang="scss" scoped>
.lrc-info{
  position: relative;
  height: 100%;
  overflow: auto;
  transition: all 0.3s;
  padding: $auto_padding_l_r $auto_padding_l_r * 4;
  .lrc-c{
    .lrc-list{
      color: $icon_color_nav;
      opacity: 0.8;
      font-size: $f_small_m;
      line-height: 1.8;
      padding: $auto_padding_t_b / 2 0;
      &.active{
        color: #fff;
        opacity: 1;
      }
  }
  }
  .lrc-tip{
    color: $icon_color_nav;
    opacity: 0.8;
    font-size: $f_small_m;
    line-height: 1.8;
    padding: $auto_padding_t_b / 2 0;
  }
}
</style>

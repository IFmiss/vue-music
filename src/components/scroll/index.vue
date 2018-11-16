<template lang="pug">
  .bt-scroll
    slot(name="scroll-header")
    .wrapper(ref="wrapper", :style="{background: background}")
      .content
        slot(name="scroll-content")
        .pullup-wrapper(v-if="needPullUp")
          .before-trigger(v-if="!isPullUpLoad")
            Loading(:vertical="false", height="60px")
</template>
<script>
import BScroll from 'better-scroll'
import Loading from 'components/loading'
export default {
  data () {
    return {
      scroll: null,
      isPullUpLoad: false
    }
  },
  components: {
    Loading
  },
  props: {
    background: {
      type: String,
      default: '#fff'
    },
    click: {
      type: Boolean,
      default: true
    },

    // 是否可以上拉加载
    needPullUp: {
      type: Boolean,
      default: false
    },

    // 是否可以下拉刷新
    needPullDown: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    initScroll () {
      let data = {}
      let pullDownRefresh = {
        threshold: 50,
        stop: 20
      }
      let pullUpLoad = {
        threshold: 50
      }
      if (this.needPullDown) data.pullDownRefresh = pullDownRefresh
      if (this.needPullUp) data.pullUpLoad = pullUpLoad
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        },
        ...data
      })

      // 初始化事件
      this._initPullUpLoad()
      this._initpullDownRefresh()
      this.finishPullUp()
      this.finishPullDown()
    },
    _initPullUpLoad () {
      if (this.needPullUp) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp', this)
        })
      }
    },
    _initpullDownRefresh () {
      if (this.needPullDown) {
        this.scroll.on('pullingDown', () => {
          this.$emit('pullingDown', this)
        })
      }
    },
    finishPullUp () {
      this.scroll && this.scroll.finishPullUp()
    },
    finishPullDown () {
      this.scroll && this.scroll.finishPullDown()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initScroll()
    })
  }
}
</script>
<style lang="scss" scoped>
.bt-scroll{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  .wrapper{
    width: 100%;
    height: 100%;
    &::after{
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 50%;
      background: #fff;
    }
    .content{
      background: #fff;
      position: absolute;
      width: 100%;
      z-index: 1;
      // min-height: 100%;
      .pullup-wrapper{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .before-trigger{
          font-size: $f_small_x;
          span{
            color: $color_gray;
          }
        }
      }
    }
  }
}
</style>

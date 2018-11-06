<template lang="pug">
  .bt-scroll
    slot(name="scroll-header")
    .wrapper(ref="wrapper", :style="{background: background}")
      .content
        slot(name="scroll-content")
</template>
<script>
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      scroll: null
    }
  },
  props: {
    background: {
      type: String,
      default: '#fff'
    },
    click: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    initScroll () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: this.click,
        mouseWheel: {
          speed: 20,
          invert: false,
          easeTime: 300
        }
        // pullDownRefresh: {
        //   threshold: 50,
        //   stop: 20
        // }
      })
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    }
  },
  mounted () {
    this.initScroll()
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
      min-height: 100%;
    }
  }
}
</style>

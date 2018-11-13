<template lang="pug">
  .touch-bar
    slot.left-sider(name="left-sider")
    .bar
      .progress(ref="bar")
        .current(:style="{width: dataProgress + '%'}")
        .range(:style="{left: dataProgress + '%'}", @touchstart="rangeTouchStart", @touchmove="rangeTouchMove", @touchend="rangeTouchEnd")
    slot.right-sider(name="right-sider")
</template>
<script>
export default {
  data () {
    return {
      barWidth: null,
      startPageX: null,
      movePageX: null,
      percent: 0,
      dataProgress: this.progress
    }
  },
  props: {
    progress: {
      type: Number,
      default: 20
    }
  },
  methods: {
    rangeTouchStart (e) {
      this.startPageX = e.touches[0].pageX
      this.startOffsetLeft = e.target.offsetLeft
    },
    rangeTouchMove (e) {
      this.movePageX = e.touches[0].pageX
      // this.dataProgress = (this.dataProgress + Math.floor(this.movePageX / this.barWidth * 100))
      let moveDisctance = Math.min(this.barWidth, Math.max(0, this.startOffsetLeft + (this.movePageX - this.startPageX)))
      this.dataProgress = Math.floor(moveDisctance / this.barWidth * 100)
    },
    rangeTouchEnd () {
      this.$emit('setProgress', this.dataProgress)
    }
  },
  mounted () {
    this.barWidth = this.$refs.bar.offsetWidth
  }
}
</script>
<style lang="scss" scoped>
.touch-bar{
  width: 100%;
  height: p2r(0.8rem);
  display: flex;
  align-items: center;
  justify-content: center;
  .left-sider, .right-sider {
    flex: 0 0 p2r(0.9rem);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .bar{
    flex: 1 1 auto;
    padding: 0 $auto_padding_l_r;
    box-sizing: border-box;
    .progress{
      height: p2r(0.04rem);
      background: rgba(244,244,244,0.9);
      position: relative;
      .current{
        background: $primary_color;
        height: 100%;
      }
      .range{
        width: p2r(0.2rem);
        height: p2r(0.2rem);
        border-radius: p2r(0.2rem) / 2;
        background: #fff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        &.music{
          &::before{
            position: absolute;
            top: 50%;
            left: 50%;
            background: $primary_color;
            transform: translate(-50%, -50%);
            width: p2r(0.08rem);
            height: p2r(0.08rem);
            border-radius: p2r(0.08rem) / 2;
          }
        }
      }
    }
  }
}
</style>

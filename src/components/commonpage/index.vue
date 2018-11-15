<template lang="pug">
  .common-page
    .auto-header(:class="{'bg': bg}")
      .bg(v-if="bg" :style="headerStyle")
        .bg-content
      .left
        slot(v-if="custBack" name="header-l")
        i.icon-menu(v-else @click="back")
      .title {{title}}
      .right
        slot(name="header-r")
    .auto-body
      slot(name="content")
</template>
<script>
export default {
  props: {
    // 中间的提示文字
    title: {
      type: String,
      default: ''
    },

    // 是否自定义返回效果
    custBack: {
      type: Boolean,
      default: false
    },

    // 是否设置头部背景效果  否则默认为红色
    bg: {
      type: String,
      default: ''
    }
  },
  computed: {
    headerStyle () {
      let data = {
        backgroundImage: `url(${this.bg})`
      }
      if (this.bg) return data
      return {}
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
// 通用页面内容
.common-page{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  // 头部
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
    background: $primary_color;
    display: flex;
    align-items: center;
    justify-content: center;
    // padding: 0 $auto_padding_l_r;
    box-sizing: border-box;
    opacity: 1;
    overflow: hidden;
    .bg{
      @include blur(20px, 250px, 60%);
      z-index: 1;
      // background-position: calc(50% - $auto_h);
    }
    .left,.right{
      flex: 0 0 p2r(1.8rem);
      display: flex;
      align-items: center;
      i, span{
        flex: 0 0 p2r(0.7rem);
        margin: 0 p2r(0.2rem);
      }
    }
    &.bg{
      .left,.right,.title{
        z-index: 1;
      }
    }
    .left{
      justify-content: flex-start;
      span{
        font-size: $f_small_m;
      }
    }
    .right{
      justify-content: flex-end;
    }
    .title{
      flex: 1 1 auto;
      @include els();
    }
  }
  // 内容
  .auto-body{
    background: #fff;
    position: absolute;
    top: $auto_h;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: auto;
    -webkit-overflow-scrolling:touch;
  }
}
</style>

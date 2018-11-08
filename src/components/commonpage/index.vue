<template lang="pug">
  .common-page
    .auto-header(:class="{'bg': bg}")
      .bg(v-if="bg" :style="headerStyle")
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
    title: {
      type: String,
      default: ''
    },
    custBack: {
      type: Boolean,
      default: false
    },
    bg: {
      type: String,
      default: ''
    }
  },
  computed: {
    headerStyle () {
      let data = {
        background: `url(${this.bg})`
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
    .bg{
      @include blur(20px, $auto_h);
      background-position: calc(50% - $auto_h);
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
      background: transparent;
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
    overflow: auto
  }
}
</style>

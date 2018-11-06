<template lang="pug">
  .common-page
    .auto-header
      .left
        i.icon-menu(@click="back")
      .title
      .right
        slot(name="header")
    .auto-body
      slot(name="content")
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
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
    .left,.right{
      flex: 0 0 p2r(1.8rem);
      display: flex;
      align-items: center;
      i, span{
        flex: 0 0 p2r(0.7rem);
        margin: 0 p2r(0.2rem);
      }
    }
    .left{
      justify-content: flex-start;
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

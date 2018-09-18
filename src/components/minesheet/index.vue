<template lang="pug">
  .mine-sheet
    .sheet-title(@click="toggoleList")
      i.icon-menu
      span.name 我创建的歌单
      i.icon-menu
    .sheet-content(v-if="showSheetList")
      .sheet-img.love
        img(src="http://www.daiwei.org/vue/bg/657952152722629515.jpg")
      .sheet-detail
        .detail-info
          .sheet-name 我喜欢的音乐
          .sheet-desc 共12首
        i.icon-menu
</template>
<script>
export default {
  data () {
    return {
      showSheetList: true
    }
  },
  methods: {
    // 列表内容折叠
    toggoleList () {
      this.showSheetList = !this.showSheetList
    }
  }
}
</script>
<style lang="scss" scoped>
$mine-sheet-title-c: #8b8b8d;
$mine-sheet-name-c: #4B4B4D;
$mine-sheet-desc-c: #99999b;
.mine-sheet{
  .sheet-title{
    background: rgb(234,235,238);
    font-size: $f_small_s;
    color: $mine-sheet-title-c;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: p2r(0.05rem) p2r(0.13rem);
    i{
      flex:0 0 p2r(0.5rem);
    }
    .name{
      flex: 1 1 auto;
      text-align: left;
    }
  }
  .sheet-content{
    padding: 0 p2r(0.13rem);
    display: flex;
    align-items: center;
    justify-content: center;
    .sheet-img{
      flex: 0 0 p2r(0.8rem);
      height: p2r(0.8rem);
      overflow: hidden;
      border-radius: p2r(0.054rem);
      position: relative;
      img{
        width: 100%;
        height: 100%;
      }
      &.love{
        &::after{
          content: "\E521";
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          top: 0;
          color: #fff;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0,0,0,0.7);
        }
      }
    }
    .sheet-detail{
      flex: 1 1 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      @include border-1px(#eee);
      .detail-info{
        flex: 1 1 auto;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        margin-left: $auto_padding_l_r;
        padding: $auto_padding_l_r;
        .sheet-name{
          font-size: $f_auto_s;
          color:#333;
        }
        .sheet-desc{
          font-size: $f_small_s;
          color: $mine-sheet-desc-c;
        }
      }
      i{
        flex: 0 0 p2r(0.5rem);
        font-size: p2r(0.2rem);
        color: $primary_color;
      }
    }
  }
}
</style>

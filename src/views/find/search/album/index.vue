// 搜索的歌单显示效果
<template lang="pug">
  router-link.s-album(v-if="list && list.name", :to="{path: '/main/listdetail', query: {id: list.id, type: 'album'}}")
    .img
      img(v-imgsize="list.picUrl")
    .right-info
      .name {{list.name}}
      .disc
        .user {{getArtists}}
        .push-t {{getDate}}
</template>
<script>
export default {
  computed: {
    // 获取艺术家信息[]解析
    getArtists () {
      if (this.list.artists && this.list.artists.length) {
        return this.list.artists.map(item => item.name).join(' / ')
      }
      return this.list.artist.name
    },
    // 发布时间
    getDate () {
      return this.$dutils.utils.formatDate('yyyy-MM-dd', new Date(this.list.publishTime))
    }
  },
  props: {
    list: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  created () {
    console.log(this.list)
  }
}
</script>

<style lang="scss" scoped>
  .s-album{
    position: relative;
    @include border-1px(#eee);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: $auto_padding_l_r / 2 $auto_padding_l_r;
    .img{
      flex:0 0 p2r(1.2rem);
      height: p2r(1.2rem);
      position: relative;
      display: block;
      img{
        display: block;
        width: 100%;
        height: 100%;
        border-radius: p2r(0.06rem);
      }
      &::before{
        content: '';
        background: url('./../../../../assets/images/ablum.png') 0 0 no-repeat;
        position: absolute;
        top: 0;
        left: 0;
        right: - p2r(0.2rem);
        bottom: 0;
        z-index: 1;
      }
    }
    .right-info{
      flex:1 1 auto;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: p2r(1rem);
      align-items: flex-start;
      margin-left: $auto_padding_l_r * 3;
      .name{
        font-size: $f_small_l;
        font-weight: 600;
        color: $text_gray_color;
        @include els();
      }
      .disc{
        width: 100%;
        display: flex;
        overflow: hidden;
        flex-wrap: nowrap;
        font-size: $f_small_x;
        color: $icon_color;
        justify-content: flex-start;
        @include els();
        .push-t{
          flex: 0 0 p2r(1.5rem);
        }
        .user{
          flex: 0 0 auto;
          @include els();
        }
      }
    }
  }
</style>

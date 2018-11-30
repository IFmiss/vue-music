// 搜索的歌单显示效果
<template lang="pug">
  router-link.s-sheet(v-if="list && list.name", :to="{path: '/main/listdetail', query: {id: list.id}}")
    img(v-imgsize="list.coverImgUrl")
    .right-info
      .name {{list.name}}
      .disc
        .count {{list.trackCount}} 首音乐
        .user(v-if="list.creator && list.creator.nickname") by {{list.creator.nickname}}
        .playCount 播放 {{list.playCount || parseNumber}}次
</template>
<script>
export default {
  props: {
    list: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .s-sheet{
    position: relative;
    @include border-1px(#eee);
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: $auto_padding_l_r / 2 $auto_padding_l_r;
    img{
      flex:0 0 p2r(1.2rem);
      height: p2r(1.2rem);
      border-radius: p2r(0.06rem);
    }
    .right-info{
      flex:1 1 auto;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: p2r(1rem);
      align-items: flex-start;
      margin-left: $auto_padding_l_r;
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
        .count{
          flex: 0 0 p2r(1.5rem);
        }
        .user{
          flex: 0 0 auto;
          @include els();
        }
        .playCount{
          flex: 0 0 p2r(1.7rem);
        }
      }
    }
  }
</style>

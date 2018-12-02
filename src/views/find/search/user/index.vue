<template lang="pug">
  .s-user(v-if="list && list.userId")
    img.avatar(v-imgsize="{url: list.avatarUrl, w: 150}")
    .right-info
      .detail
        .name-info
          .name {{list.nickname}}
          i(:class="list.gender === 1 ? 'icon-menu nan' : 'icon-quill nv'")
        .disc {{list.signature}}
      .follow
        .f-name.followed(v-if="list.followed") 已关注
        .f-name(v-else) + 关注
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
.s-user{
  position: relative;
  display: flex;
  align-self: center;
  justify-content: center;
  padding: $auto_padding_l_r $auto_padding_l_r * 1.5;
  box-sizing: border-box;
  @include border-1px();
  .avatar{
    flex: 0 0 p2r(1.0rem);
    height: p2r(1.0rem);
    border-radius: p2r(1.0rem) / 2;
    margin-right: $auto_padding_l_r;
  }
  .right-info{
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    .detail{
      flex: 1 1 auto;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      .name-info{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        overflow: hidden;
        .name{
          // max-width: calc(100);
          font-size: $f_small_l;
          font-weight: 600;
          color: $text_gray_color;
          @include els();
          text-align: left;
        }
        i{
          flex: 0 0 p2r(0.6rem);
          text-align: center;
          font-size: $f_small_x;
          &.nan{
            color: #33CCFF;
          }
          &.nv{
            color: #FF99CC;
          }
        }
      }
      .disc{
        font-size: $f_small_x;
        color: $icon_color;
        text-align: left;
        @include els();
      }
    }
    .follow{
      flex: 0 0 p2r(1.2rem);
      margin-left: $auto_padding_l_r * 1.5;
      .f-name{
        font-size: $f_small_l;
        height: p2r(0.46rem);
        line-height: p2r(0.48rem);
        border: 1px solid $primary_color;
        color: $primary_color;
        border-radius: p2r(0.48rem) / 2;
        &.followed{
          color: #eee;
          border: 1px solid #eee;
        }
      }
    }
  }
}
</style>

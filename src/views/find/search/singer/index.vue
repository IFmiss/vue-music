<template lang="pug">
  .s-singer(v-if="list && list.id", :class="size")
    img.avatar(v-imgsize="{url: list.img1v1Url, w: 150}")
    .name
      .detail {{list.name}}
</template>
<script>
export default {
  props: {
    list: {
      type: Object,
      default: function () {
        return {}
      }
    },
    size: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.s-singer{
  position: relative;
  display: flex;
  align-self: center;
  justify-content: center;
  padding: $auto_padding_l_r $auto_padding_l_r * 1.5;
  box-sizing: border-box;
  overflow: hidden;
  @include border-1px();
  .avatar{
    flex: 0 0 p2r(1.0rem);
    height: p2r(1.0rem);
    border-radius: p2r(1.0rem) / 2;
    margin-right: $auto_padding_l_r * 1.5;
  }
  .name{
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;
    .detail{
      @include els();
      font-size: $f_small_l;
      font-weight: 600;
      color: $text_gray_color;
    }
  }
  &.big{
    .avatar{
      flex: 0 0 p2r(1.2rem);
      height: p2r(1.2rem);
      border-radius: p2r(1.2rem) / 2;
    }
  }
}
</style>

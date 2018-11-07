<template lang="pug">
  .loading(:class="{'absolute' : absolute}")
    .c(:class="{size, 'vertical' : vertical}")
      img(src="./../../assets/images/loading.gif")
      p 数据加载中
</template>
<script>
export default {
  props: {
    // 图片和文字是否是垂直显示 默认水平显示
    vertical: {
      type: Boolean,
      default: false
    },

    // 提示的名称
    name: {
      type: String,
      default: '数据加载中'
    },

    // 显示大小  small  auto 两种
    size: {
      type: String,
      default: 'auto'
    },

    absolute: {
      type: Boolean,
      default: false
    }
  }
}
</script>
<style lang="scss" scoped>
.loading{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  &.absolute{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .c{
    display: flex;
    align-items: center;
    justify-content: center;
    img{
      width: p2r(0.4rem);
      height: p2r(0.4rem);
    }
    p{
      font-size: $f_small_x;
      margin-left: p2r(0.1rem);
      color: $icon_color_nav;
    }
    &.vertical{
      flex-direction: column;
      p{
        margin-left: 0;
        margin-top: p2r(0.1rem);
      }
    }
    &.small{
      img{
        width: p2r(0.24rem);
        height: p2r(0.24rem);
      }
      p{
        font-size: $f_small_s;
      }
    }
  }
}
</style>

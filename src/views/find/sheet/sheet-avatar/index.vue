<template lang="pug">
  .sheet-avatar(@click="hideSheetAvatar")
    .blur(:style="{background: 'url(' + avatarData.coverImgUrl + ')'}")
    .fix-content
      i.icon-menu.easy-click
      .avatar-content
        img(:src="avatarData.coverImgUrl")
        .detail-content
          .title {{avatarData.name}}
          .tips
            label 标签
            span 电子
            span 工作
          .disc 敲代码听这些音乐一定不会错
</template>
<script>
export default {
  props: {
    avatarData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods: {
    hideSheetAvatar () {
      this.$emit('hideSheetAvatar')
    }
  }
}
</script>
<style lang="scss" scoped>
.sheet-avatar{
  z-index: 1;
  @include fixedfull();
  .blur{
    @include blur(20px, auto);
  }
  .fix-content{
    i{
      position: fixed;
      top: p2r(0.2rem);
      right: p2r(0.2rem);
      font-size: p2r($f_auto_l);
      color: #fff;
    }
    .avatar-content{
      position: relative;
      padding: $auto_padding_l_r * 8 $auto_padding_l_r;
      img{
        width: p2r(3.4rem);
        height: p2r(3.4rem);
        border-radius: p2r(0.08rem);
      }
      .detail-content{
        position: relative;
      }
    }
  }
}
</style>

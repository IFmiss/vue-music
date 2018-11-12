<template lang="pug">
  .sheet-avatar(@click="hideSheetAvatar")
    .blur(:style="{backgroundImage: 'url(' + avatarData.coverImgUrl + ')'}")
    .fix-content
      i.icon-menu.easy-click
      .avatar-content
        img(:src="avatarData.coverImgUrl")
        .detail-content
          .title {{avatarData.name}}
          .tips
            label 标签
            span(v-for="item in avatarData.tags") {{item}}
          .disc(v-html="trim(avatarData.description)")
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
    },
    trim (str) {
      return str.replace(/\n|\r|\n/g, '<br/>')
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
    @include fixedfull();
    overflow-y: auto;
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
        .title{
          margin-top: $auto_padding_t_b * 2;
          font-size: $f_auto_l;
          color:$text_active;
          position: relative;
          opacity: 0.95;
          padding: $auto_padding_t_b * 1.5 $auto_padding_t_b;
          @include border-1px(rgba(233,233,233,0.26));
        }
        .tips{
          margin-top: $auto_padding_t_b * 2;
          color:$text_active;
          opacity: 0.95;
          text-align: left;
          padding: $auto_padding_l_r * 1.5 $auto_padding_l_r * 4;
          label{
            font-size: $f_small_l;
          }
          span {
            margin-left: $auto_padding_l_r;
            border: 1px solid rgb(244,244,244);
            font-size: $f_small_l;
            line-height: p2r(0.4rem);
            padding: 0 $auto_padding_l_r;
            border-radius: p2r(0.2rem);
          }
        }
        .disc{
          margin-top: $auto_padding_t_b * 2;
          padding: $auto_padding_t_b / 2 $auto_padding_t_b * 4;
          font-size: $f_small_x;
          color:$text_active;
          opacity: 0.95;
          text-align: left;
          line-height: 1.6;
        }
      }
    }
  }
}
</style>

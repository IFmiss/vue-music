// 这是歌单的详情页面  包含歌单的一系列操作
<template lang="pug">
  .sheet-detail(v-if="!isEmptyDetail")
    CommonPage(title="歌单", :bg="detail.coverImgUrl + '?param=170y170'")
      .content(slot="content")
        .scroll-main
          .content-main
            .blur(:style="{background: 'url(' + detail.coverImgUrl + '?param=170y170)'}")
            .detail-main
              .sheet-avatar(@click="showSheetAvatar")
                img.avatar(:src="detail.coverImgUrl + 'param=300y300'")
                .tips {{detail.playCount | parseNumber}}
                .high-quality(v-if="detail.highQuality")
                  i.icon-menu
                .info i
              .sheet-disc
                .name {{detail.name}}
                .user
                  img(:src="detail.creator.avatarUrl + 'param=120y120'")
                  span {{detail.creator.nickname}}
                  i.icon-menu
            .detail-conf
              .conf-list
                i.icon-menu
                span.disc {{detail.commentCount}}
              .conf-list
                i.icon-menu
                span.disc {{detail.shareCount}}
              .conf-list
                i.icon-menu
                span.disc 下载
              .conf-list
                i.icon-menu
                span.disc 多选
          .content-lists-info
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
            p 123123
    transition(name="fade")
      SheetAvatar(v-if="showAvatar", @hideSheetAvatar="hideSheetAvatar" :avatarData="detail")
</template>

<script>
import API from 'api'
import CommonPage from 'components/commonpage'
import Scroll from 'components/scroll'
import filter from 'filter'
import SheetAvatar from './../sheet-avatar'
export default {
  data () {
    return {
      sheetId: 0,
      // 数据详情
      detail: {},
      // 是否显示图片封面
      showAvatar: false
    }
  },
  components: {
    Scroll,
    CommonPage,
    SheetAvatar
  },
  computed: {
    isEmptyDetail () {
      return JSON.stringify(this.detail) === '{}'
    }
  },
  filters: {
    parseNumber: (value) => filter.parseNumber(value)
  },
  methods: {
    // 获取专辑数据
    async initData () {
      let res = await this.$mutils.fetchData(API.sheet.SHEET_DETAIL_LISTS, {
        id: this.sheetId
      })
      this.detail = res.data.playlist
    },

    /**
     * 显示歌单图片背景
     */
    showSheetAvatar () {
      this.showAvatar = true
    },
    /**
     * 关闭歌单图片背景
     */
    hideSheetAvatar () {
      this.showAvatar = false
    }
  },
  created () {
    this.sheetId = this.$route.query.id
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
$opacity: 0.8;
.content-main{
  overflow: hidden;
  position: relative;
  padding-bottom: $auto_padding_l_r * 2;
  .blur{
    overflow: hidden;
    @include blur(20px, auto, center);
  }
  .detail-main{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $auto_padding_l_r * 3 $auto_padding_l_r * 1.5 $auto_padding_l_r * 2 $auto_padding_l_r * 1.5;
    .sheet-avatar{
      flex: 0 0 p2r(2.5rem);
      height: p2r(2.5rem);
      overflow: hidden;
      position: relative;
      border-radius: p2r(0.06rem);
      z-index: 1;
      .avatar{
        display: block;
        width: 100%;
      }
      .tips{
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        height: p2r(0.4rem);
        background: lg(180deg, rgba(22,22,22, 0.3), rgba(22,22,22, 0));
        color: $text_active;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        font-size: $f_small_s;
        padding: 0 p2r(0.1rem);
      }
      .high-quality{
        background: $gold_color;
        width: p2r(1rem);
        line-height: p2r(0.4rem);
        transform: rotate(-45deg) translate(-27%, -98%);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        padding: $auto_padding_l_r / 2 $auto_padding_l_r;
        i{
          font-size: $f_small_s / 2;
          font-weight: 200;
        }
      }
      .info{
        border-radius: 50%;
        border: 1px solid #fff;
        padding: p2r(0.03rem);
        position: absolute;
        width: p2r(0.3rem);
        height: p2r(0.3rem);
        display: flex;
        align-items: center;
        justify-content: center;
        right: $auto_padding_l_r / 2;
        bottom: $auto_padding_l_r / 2;
        color: #fff;
        font-size: $f_small_l;
        font-weight: 600;
      }
    }
    .sheet-disc{
      flex: 1 1 auto;
      padding-left: $auto_padding_l_r;
      box-sizing: border-box;
      overflow: hidden;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      text-align: left;
      flex-direction: column;
      font-weight: 500;
      z-index: 1;
      .name{
        width: 100%;
        font-size: $f_auto_l;
        color: #fff;
        @include lineclamp(p2r(1rem), 2);
      }
      .user{
        width: 100%;
        margin-top: $auto_padding_l_r * 2;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: flex-start;
        img{
          flex: 0 0 p2r(0.56rem);
          height: p2r(0.56rem);
          border-radius: 50%;
        }
        span{
          color: #fff;
          max-width: p2r(2.6rem);
          @include els();
          font-size: $f_small_x;
          margin-left: $auto_padding_l_r;
          opacity: $opacity;
        }
        i{
          margin-left: $auto_padding_l_r;
          color: $text_noactive;
          font-size: $f_small_x;
          opacity: $opacity;
        }
      }
    }
  }
  .detail-conf{
    width: 100%;
    display: flex;
    padding: $auto_padding_t_b * 1.5 $auto_padding_t_b;
    box-sizing: border-box;
    align-items: center;
    .conf-list{
      width: 25%;
      opacity: $opacity;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: $icon_color_nav;
      i{
        font-size: $f_auto_l * 1.2;
      }
      .disc{
        margin-top: $auto_padding_t_b;
        font-size: $f_small_l;
      }
    }
  }
}
.content-lists-info{
  width: 100%;
  border-radius: p2r(0.24rem)  p2r(0.24rem) 0 0;
  background: #fff;
  margin-top: - $auto_padding_l_r * 2;
  overflow: hidden;
  height: -webkit-fill-available;
  overflow: auto;
  z-index: 1;
  &.fixed{
    position: fixed;
    top: 0;
    margin-top: 0;
    left: 0;
    right: 0;
    overflow: auto;
    bottom: 0;
  }
  p{
    margin: 0;
  }
}
</style>

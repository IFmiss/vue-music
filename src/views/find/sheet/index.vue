// 歌单内容，显示歌单的页面
<template lang="pug">
  CommonPage(title="歌单")
    .header(slot="header")
    .content(slot="content")
      Scroll()
        .scroll-content(slot="scroll-content", :style="{background: 'url(' + hightSheet.coverImgUrl + '?param=200y200)'}")
          router-link.hight-sheet(to="/main/hightsheet")
            .content
              img(:src="hightSheet.coverImgUrl + '?param=200y200'")
              .detail
                .title
                  i.icon-menu.rank
                  span 精品歌单
                  i.icon-menu
                .name {{hightSheet.name}}
                .disc {{hightSheet.copywriter}}
          .sheet-lists

</template>
<script>
import Scroll from 'components/scroll'
import Api from 'api'
import CommonPage from 'components/commonpage'
export default {
  data () {
    return {
      hightSheet: {},
      cat: '全部歌单'
    }
  },
  components: {
    Scroll,
    CommonPage
  },
  methods: {
    async initData () {
      let res = await this.$mutils.fetchData(Api.HIGHT_QUALITY_SHEET_LISTS, {limit: 1})
      // 拿到精品歌单排行第一的数据，放在页面顶端
      this.hightSheet = res.data.playlists[0]
    }
  },
  created () {
    this.initData()
  }
}
</script>
<style lang="scss" scoped>
.hight-sheet{
  height: auto;
  display: block;
  padding: p2r(0.6rem) $auto_padding_l_r $auto_padding_l_r $auto_padding_l_r;
  .content{
    height: auto;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    img{
      flex: 0 0 p2r(1.6rem);
      height: p2r(1.6rem);
      border-radius: p2r(0.08rem);
      margin-right: p2r(0.2rem);
    }
    .detail{
      flex: 1 1 auto;
      overflow: hidden;
      display: flex;
      height: 100%;
      flex-direction: column;
      align-items: flex-start;
      text-align: left;
      .title{
        width: 100%;
        color: #fff;
        span{
          font-size: $f_auto_s;
          margin:0 $auto_padding_t_b / 2 0 $auto_padding_t_b;
        }
        i{
          font-size: $f_small_m;
          opacity: 0.7;
          &.rank{
            opacity: 1;
          }
        }
      }
      .name, .disc{
        width: 100%;
        @include els();
      }
      .name{
        font-size: $f_small_l;
        color: $text_active;
        margin-top: $auto_padding_t_b;
      }
      .disc{
        font-size: $f_small_x;
        color: $text_noactive;
        margin-top: $auto_padding_t_b / 2;
      }
    }
  }
}
</style>

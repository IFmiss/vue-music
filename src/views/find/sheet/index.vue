// 歌单内容，显示歌单的页面
<template lang="pug">
  .sheet
    CommonPage(title="歌单")
      .content(slot="content")
        Scroll(@pullingUp="getSheetListMore", :needPullUp="true")
          .scroll-content(slot="scroll-content")
            router-link.hight-sheet(to="/main/hightsheet" v-if="hightSheet.name")
              .blur(:style="{backgroundImage: 'url(' + $mutils.changeImageSize(hightSheet.coverImgUrl, 200) + ')'}")
              .content
                img(:src="$mutils.changeImageSize(hightSheet.coverImgUrl)")
                .detail
                  .title
                    i.icon-menu.rank
                    span 精品歌单
                    i.icon-menu
                  .name {{hightSheet.name}}
                  .disc {{hightSheet.copywriter}}
            .sheet-lists(v-if="hightSheet.name")
              .filter
                .select
                  .name(@click="showSelect = true") {{cat}}
                  i.icon-menu
                .select-list
                  li(@click="getSheetType('华语')") 华语
                  li(@click="getSheetType('电子')") 电子
                  li(@click="getSheetType('乡村')") 乡村
              .lists(v-if="sheets")
                router-link.sheet-list(:to="{path: '/main/listdetail', query: {id: item.id}}" v-for="item in sheets")
                  .image-list
                    .tips {{item.playCount | parseNumber}}
                    .user {{item.creator.nickname}}
                    img(:src="$mutils.changeImageSize(item.coverImgUrl)")
                  .disc {{item.name}}
    transition(name="sider-top")
      SheetType(class="sheet-t" v-if="showSelect" :cat="cat", @selectCat="getSheetType")
</template>
<script>
import Scroll from 'components/scroll'
import Api from 'api'
import SheetType from './sheet-type'
import CommonPage from 'components/commonpage'
import Loading from 'components/loading'
export default {
  data () {
    return {
      hightSheet: {},
      cat: '全部歌单',
      limit: 8,
      offset: 0,
      sheets: [],
      showSelect: false
    }
  },
  components: {
    Scroll,
    CommonPage,
    SheetType,
    Loading
  },
  methods: {
    initData () {
      this.getHighFirstSheet()
      this.getSheetListByOffset()
    },

    /**
     * 获取第一条精品数据
     */
    async getHighFirstSheet () {
      // 获取精品数据
      let res = await this.$mutils.fetchData(Api.sheet.HIGHT_QUALITY_SHEET_LISTS, {limit: 1})
      // 拿到精品歌单排行第一的数据，放在页面顶端
      this.hightSheet = res.data.playlists[0]
    },

    /**
     * 上拉加载更多
     */
    getSheetListMore (that) {
      this.offset = this.offset + this.limit

      this.getSheetListByOffset()
      // 更新完成之后需要重新计算滚动高度
      that.scroll.refresh()
      that.finishPullUp()
    },

    /**
     * 获取歌单分类
     */
    getSheetType (type) {
      // 关闭选择项
      this.showSelect = false

      if (!type) return
      // 初始化并请求数据
      this.offset = 0
      this.cat = type
      this.sheets = []
      this.getSheetListByOffset()
    },

    /**
     * 获取歌单列表
     */
    async getSheetListByOffset () {
      let res = await this.$mutils.fetchData(Api.sheet.SHEET_LISTS, {
        limit: this.limit,
        offset: this.offset,
        cat: this.cat
      })
      this.sheets = this.sheets.concat(res.data.playlists)
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
  position: relative;
  overflow: hidden;
  padding: p2r(0.6rem) $auto_padding_l_r $auto_padding_l_r $auto_padding_l_r;
  .blur{
    @include blur(20px, auto);
    z-index: -1;
  }
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
.sheet-lists{
  padding: $auto_padding_l_r * 2 $auto_padding_l_r 0 $auto_padding_l_r;
  .filter{
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    .select{
      font-size: $f_small_m;
      border: 1px solid $color_gray_slow;
      display: flex;
      align-items: center;
      padding: 0 p2r(0.2rem);
      height: p2r(0.5rem);
      border-radius: p2r(0.5rem) / 2;
      .name{
        color: $text_gray_color;
      }
      i{
        margin-left: p2r(0.06rem);
        color: $color_gray_slow;
        font-size: $f_small_x;
      }
    }
  }
  .lists{
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    position: relative;
    justify-content: space-between;
    .sheet-list{
      display: block;
      width: p2r(3.5rem);
      margin-top: $auto_padding_t_b;
      .image-list{
        position: relative;
        width: p2r(3.5rem);
        height: p2r(3.5rem);
        border-radius: p2r(0.06rem);
        overflow: hidden;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
        .tips,.user{
          position: absolute;
        }
        .tips{
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
        .user{
          bottom: 0;
          left: 0;
          right: 0;
          height: p2r(0.4rem);
          background: lg(180deg, rgba(22,22,22, 0), rgba(22,22,22, 0.3));
          color: $text_active;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: $f_small_s;
          padding: 0 p2r(0.1rem);
        }
      }
      .disc{
        font-size: $f_small_s;
        display: block;
        text-align: left;
        @include lineclamp(p2r(0.7rem), 2);
        margin: p2r(0.04rem) 0;
      }
    }
  }
  .select-list{
    display: flex;
    li{
      list-style: none;
      font-size: $f_small_x;
      color: #a1a1a1;
      position: relative;
      padding: $auto_padding_l_r / 3 $auto_padding_l_r / 2;
    }
  }
}
.sheet-t{
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}
</style>

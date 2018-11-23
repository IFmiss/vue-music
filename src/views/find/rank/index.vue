<template lang="pug">
  .rank
    CommonPage(title="排行榜")
      .rank-content(slot="content")
        .main-content(v-if="official && official.length")
          .title 云音乐官方榜
          .lists-rank
            router-link.list(v-for="item in official", :to="{path: '/main/listdetail', query: {id: item.id}}")
              .img-info
                img(:src="item.coverImgUrl")
                .tips {{item.updateFrequency}}
              .rank-three
                .list-three(v-for="(list, index) in item.tracks") {{index + 1}}. {{list.first}} - {{list.second}}
          .title 全球榜
          .global-rank(v-if="unOfficial && unOfficial.length")
            router-link.sheet-list(v-for="item in unOfficial" :to="{path: '/main/listdetail', query: {id: item.id}}")
              .sheet-image
                img(:src="item.coverImgUrl")
                .high-quality(v-if="item.highQuality")
                  i.icon-menu
                .tips
                  span {{item.updateFrequency}}
              .sheet-name {{item.name}}
        Loading(v-else)
</template>
<script>
import API from 'api'
import CommonPage from 'components/commonpage'
import Loading from 'components/loading'
export default {
  data () {
    return {
      // 官方榜单
      official: null,
      // 非官方榜单
      unOfficial: null
    }
  },
  components: {
    CommonPage,
    Loading
  },
  methods: {
    async getRankSheetLists () {
      let res = await this.$mutils.fetchData(API.sheet.RANK_SHEET_LISTS)
      this.official = res.data.list.filter(item => item.ToplistType)
      this.unOfficial = res.data.list.filter(item => !item.ToplistType)
    }
  },
  created () {
    this.getRankSheetLists()
  }
}
</script>
<style lang="scss" scoped>
.main-content{
  .title{
    color: $text_color;
    font-size: $f_small_l;
    font-weight: 600;
    text-align: left;
    padding: $auto_padding_l_r;
    box-sizing: border-box;
  }
  .lists-rank{
    width: 100%;
    .list{
      padding: $auto_padding_l_r / 2;
      display: flex;
      align-items: center;
      justify-content: center;
      box-sizing: border-box;
      .img-info{
        flex: 0 0 p2r(2.4rem);
        height: p2r(2.4rem);
        border-radius: p2r(0.06rem);
        overflow: hidden;
        position: relative;
        img{
          width: 100%;
          height: 100%;
        }
        .tips{
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: p2r(0.4rem);
          background: lg(0, rgba(111,111,111, 0.3), rgba(111,111,111, 0));
          color: $text_active;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: $f_small_s;
          padding: 0 p2r(0.1rem);
        }
      }
      .rank-three{
        flex:  1 1 auto;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: $auto_padding_l_r;
        box-sizing: border-box;
        margin-left: $auto_padding_l_r;
        .list-three{
          font-size: $f_small_l;
          color: $color_drak_slow;
          width: 100%;
          text-align: left;
          @include els();
          padding: $auto_padding_l_r / 2 0;
        }
      }
    }
  }
  .global-rank{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: auto;
    padding: $auto_padding_l_r $auto_padding_l_r / 2;
    .sheet-list{
      width: 32.6%;
      position: relative;
      .sheet-image{
        border-radius: p2r(0.06rem);
        position: relative;
        overflow: hidden;
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
        img{
          display: block;
          width: 100%;
        }
        .tips{
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: p2r(0.4rem);
          background: lg(0, rgba(111,111,111, 0.3), rgba(111,111,111, 0));
          color: $text_active;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          font-size: $f_small_s;
          padding: 0 p2r(0.1rem);
        }
        i{
          margin-right: p2r(0.08rem);
        }
      }
      .sheet-name{
        font-size: $f_small_s;
        display: block;
        text-align: left;
        @include lineclamp(p2r(0.7rem), 2);
        margin: p2r(0.04rem) 0;
      }
    }
  }
}
</style>

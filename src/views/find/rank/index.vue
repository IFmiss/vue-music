<template lang="pug">
  .rank
    CommonPage(title="排行榜")
      .rank-content(slot="content")
        .title 云音乐官方榜
        .lists-rank(v-if="official && official.length")
          .list(v-for="item in official")
            .img-info
              img(:src="item.coverImgUrl")
              .tips {{item.updateFrequency}}
            .rank-three
              .list-three
</template>
<script>
import API from 'api'
import CommonPage from 'components/commonpage'
export default {
  data () {
    return {
      // 官方榜单
      official: null
    }
  },
  components: {
    CommonPage
  },
  methods: {
    async getRankSheetLists () {
      let res = await this.$mutils.fetchData(API.sheet.RANK_SHEET_LISTS)
      this.official = res.data.list.filter(item => item.ToplistType)
      console.log(this.official)
    }
  },
  created () {
    this.getRankSheetLists()
  }
}
</script>
<style lang="scss" scoped>
.rank-content{
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
        border-radius: p2r(0.08rem);
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
      }
    }
  }
}
</style>

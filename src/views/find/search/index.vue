// 搜索
<template lang="pug">
  .search
    .header
      .input-area
        i.icon-menu
        input(ref="searchRef", v-model="keyword", type="search")
      .span.easy-click(@click="back") 取消
    .content
      //- SearchingPanel
      .result-type
        .type(v-for="item in type" :class="{'active': currentType === item.code}" @click="selectType(item.code)") {{item.name}}
      .result-content
        Loading(v-if="isLoad")
        .result-detail(v-else)
</template>
<script>
import Loading from 'components/loading'
import API from 'api'
import SearchingPanel from './searchingPanel'
export default {
  // type: 搜索类型；默认为 1 即单曲 , 取值意义 :
  // 1: 单曲
  // 10: 专辑
  // 100: 歌手
  // 1000: 歌单
  // 1002: 用户
  // 1004: MV
  // 1006: 歌词
  // 1009: 电台
  // 1014: 视频
  data () {
    return {
      keyword: '',
      currentType: 0,
      limit: 30,
      offset: 0,
      isLoad: true,
      searchData: {},
      type: [
        {
          name: '综合',
          code: 0
        },
        {
          name: '单曲',
          code: 1
        },
        {
          name: '专辑',
          code: 10
        },
        {
          name: '歌手',
          code: 100
        },
        {
          name: '歌单',
          code: 1000
        },
        {
          name: '用户',
          code: 1002
        },
        {
          name: 'MV',
          code: 1004
        },
        {
          name: '歌词',
          code: 1006
        },
        {
          name: '电台',
          code: 1009
        },
        {
          name: '视频',
          code: 1014
        }
      ]
    }
  },
  components: {
    SearchingPanel,
    Loading
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    /**
     * 选择类型
     */
    selectType (code) {
      if (!this.$dutils.utils.strTrim(this.keyword, 0)) {
        this.$msg('请输入搜索的内容')
        return
      }
      this.currentType = code
      this.offset = 0
      this.getSearchData()
    },

    /**
     * 获取搜索返回的数据结果
     */
    async getSearchData () {
      let res
      if (this.currentType === 0) {
        res = await this.$mutils.fetchData(API.search.SEARCH_SUGGEST, {
          limit: this.limit,
          offset: this.offset,
          keywords: this.keyword
        })
        this.isLoad = false
      } else {
        res = await this.$mutils.fetchData(API.search.SEARCH_MAIN, {
          limit: this.limit,
          offset: this.offset,
          keywords: this.keyword,
          type: this.currentType
        })
      }
      this.searchData = res.data.result
    }
  },
  mounted () {
    this.$refs.searchRef.focus()
  }
}
</script>

<style lang="scss" scoped>
.search{
  .header{
    height: $auto_h;
    background: $primary_color;
    display: flex;
    align-items: center;
    padding: 0 $auto_padding_l_r * 2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .input-area{
      flex:1 1 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-right: $auto_padding_l_r * 1.5;
      height: p2r(0.52rem);
      border-radius: p2r(0.26rem);
      border: none;
      outline: none;
      background: rgba(255,255,255,0.1);
      z-index: 1;
      color: rgba(255,255,255,0.8);
      text-indent: p2r(0.1rem);
      font-size: $f_small_l;
      padding: 0 p2r(0.04rem);
      box-sizing: border-box;
      i{
        margin: p2r(0.04rem);
        font-size: $f_small_s;
        flex: 0 0 p2r(0.32rem);
      }
      input{
        flex: 1 1 auto;
        overflow: hidden;
        height: p2r(0.52rem);
        border-radius: p2r(0.26rem);
        border: none;
        outline: none;
        background: transparent;
        z-index: 1;
        color: rgba(255,255,255,0.8);
        text-indent: p2r(0.06rem);
        font-size: $f_small_l;
        padding: 0 p2r(0.04rem);
        box-sizing: border-box;
      }
    }
    .span{
      flex: 0 0 p2r(0.6rem);
      font-size: $f_small_x;
      color: $text_active;
      position: relative;
    }
  }
  .content{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: $auto_h;
    .result-type::-webkit-scrollbar {
      display: none
    }
    .result-type{
      width: 100%;
      height: p2r(0.56rem);
      line-height: p2r(0.4rem);
      overflow-y: auto;
      text-align: left;
      font-size: 0;
      padding: 0 $auto_padding_l_r;
      background: $primary_color;
      white-space: nowrap;
      box-sizing: border-box;
      .type{
        font-size: $f_small_m;
        color: $text_noactive;
        display: inline-block;
        margin: 0 $auto_padding_l_r * 1.8;
        &.active{
          color: $text_active;
          position: relative;
          &::before{
            content: '';
            position: absolute;
            left: 50%;
            bottom: - p2r(0.1rem);
            height: p2r(0.04rem);
            border-radius: p2r(0.02rem);
            background: #fff;
            transform: translate3d(-50%, 0, 0);
            width: 60%;
          }
        }
      }
    }
    .result-content{
      position: absolute;
      top: p2r(0.56rem);
      bottom: 0;
      overflow: auto;
      left: 0;
      right: 0;
    }
  }
}
</style>

// 搜索面板
<template lang="pug">
  .search-panel
    .search-lists-a
      .a-name 热门搜索
      .search-lists(v-if="hots.length")
        .list(v-for="item in hots", @click="searchItem(item.first)")
          .name {{item.first}}
          .tip(v-if="item.iconType === 1") 热
      Loading(v-else)
    .search-lists-a
      .a-name.config
        .name 搜索历史
        i.icon-menu.easy-click(@click="deleteHistory")
      .search-lists(v-if="history.length")
        .list(v-for="list in history", @click="searchItem(list)")
          .name {{list}}
      .none-list(v-else) 暂无搜索记录
</template>
<script>
import API from 'api'
import Loading from 'components/loading'
export default {
  data () {
    return {
      hots: [],
      history: []
    }
  },
  components: {
    Loading
  },
  methods: {
    /**
     * 初始化搜索记录
     */
    async initHotSearch () {
      let res = await this.$mutils.fetchData(API.search.SEARCH_HOT)
      this.hots = res.data.result.hots
    },
    /**
     * 本地存储的搜索历史
     */
    initHistorySearch () {
      this.history = JSON.parse(localStorage.getItem(API.storage.SEARCH_LISTS)) || []
    },

    /**
     * 点击列表搜索对应内容
     */
    searchItem (name) {
      this.$emit('search', name)
    },

    /**
     * 清空历史记录
     */
    deleteHistory () {
      if (window.confirm('确认删除搜索记录?')) {
        localStorage.removeItem(API.storage.SEARCH_LISTS)
        this.history = []
        this.$msg('删除成功')
      }
    }
  },
  created () {
    this.initHotSearch()
    this.initHistorySearch()
  }
}
</script>

<style lang="scss" scoped>
.search-panel{
  padding: $auto_padding_l_r;
  box-sizing: border-box;
  .search-lists-a{
    margin-bottom: p2r($auto_padding_l_r);
    .a-name{
      font-size: $f_small_l;
      text-align: left;
      padding: p2r($auto_padding_l_r) / 2 0;
      &.config{
        display: flex;
        align-items: center;
        justify-content: space-between;
        i{
          position: relative;
          color: $color_drak_slow;
        }
      }
    }
    .search-lists{
      text-align: left;
      margin-left: - p2r($auto_padding_l_r) / 1.2;
      .list{
        margin: p2r($auto_padding_l_r) / 2 p2r($auto_padding_l_r) / 1.2;
        background: $border_color;
        font-size: $f_small_l;
        display: inline-block;
        padding: 0 $auto_padding_l_r * 1.5;
        line-height: p2r(0.50rem);
        color: $text_gray_color;
        border-radius: p2r(0.50rem) / 2;
        .name, .tip{
          display: inline-block;
          font-size: $f_small_m;
        }
        .tip{
          margin-left: p2r(0.04rem);
          background: $primary_color;
          color: #fff;
          height: p2r(0.34rem);
          line-height: p2r(0.36rem);
          padding: 0 p2r($auto_padding_l_r) / 4;
          border-radius: p2r(0.04rem);
        }
      }
    }
    .none-list{
      font-size: $f_small_m;
      color: $color_drak_slow;
      padding: $auto_padding_l_r * 2;
    }
  }
}
</style>

// 这是首页推荐歌单这种模版 封装成组件
<template lang="pug">
  .group-sheet
    .title
      span {{sheetName}}
      i.icon-circle-right
    .content(v-if="sheetList.length")
      router-link.sheet-list(v-for="(item, index) in sheetList" v-if="index < 6", :to="{path: '/main/sheetdetail', query: {id: item.id}}")
        .sheet-image
          img(:src="item.picUrl")
          .high-quality(v-if="item.highQuality")
            i.icon-menu
          .tips
            i.icon-menu
            span {{item.playCount | parseNumber}}
        .sheet-name {{item.name}}
    Loading(v-else)
</template>
<script>
import API from 'api'
import filter from 'filter'
import Loading from 'components/loading'
export default {
  data () {
    return {
      sheetList: []
    }
  },
  components: {
    Loading
  },
  props: {
    // 请求的地址
    api: {
      type: String,
      default: 'RECOMMEND_SHEET_LISTS'
    },

    // 左上角歌单的名称
    sheetName: {
      type: String,
      default: '推荐歌单'
    },

    // 是否需要请求参数
    parmas: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },

  filters: {
    parseNumber: (value) => filter.parseNumber(value)
  },

  methods: {
    // 通过传递不同的请求参数，获取不同的数据
    initData () {
      this.$mutils.fetchData(API.sheet[this.api], this.parmas).then(res => {
        this.sheetList = res.data.result
      })
    }
  },
  created () {
    // 数据初始化
    this.initData()
  }
}
</script>

<style lang="scss" scoped>
.group-sheet{
  width: 100%;
  height: auto;
  padding: $auto_padding_t_b;
  box-sizing: border-box;
  .title{
    width: 100%;
    display: flex;
    font-size: $f_auto_s;
    align-items: center;
    padding: p2r(0.06rem) 0;
    span{
      font-weight: 400;
    }
    i{
      margin-left: p2r(0.05rem);
    }
  }
  .content{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    height: auto;
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

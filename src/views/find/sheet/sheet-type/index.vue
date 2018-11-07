<template lang="pug">
  .sheet-type
    CommonPage(title="筛选歌单", :custBack="true")
      .header(slot="header-l")
        span(@click="selectCat()") 取消
      .content(slot="content")
        .cats-info(v-if="showCats")
          .all
            .all-cat(:class="cat === '全部歌单' ? 'active' : ''", @click="selectCat('全部歌单')") 全部歌单
          .lists(v-for="item in catsList")
            .name {{item.typename}}
            .detail
              .cat-name(v-for="list in item.list", :class="{'active' : cat === list.name, 'hot': list.hot}", @click="selectCat(list.name)") {{list.name}}
        Loading(v-else)
</template>
<script>
import CommonPage from 'components/commonpage'
import API from 'api'
import Loading from 'components/loading'
export default {
  data () {
    return {
      catsList: {}
    }
  },
  props: {
    cat: {
      type: String,
      default: '全部歌单'
    }
  },
  components: {
    CommonPage,
    Loading
  },
  computed: {
    showCats () {
      return JSON.stringify(this.catsList) !== '{}'
    }
  },
  methods: {
    selectCat (type) {
      this.$emit('selectCat', type)
    },
    /**
     * 获取分类列表
     */
    async getCatLists () {
      let res = await this.$mutils.fetchData(API.sheet.CAT_LISTS)
      let data = res.data
      this.parseData(data)
    },
    /**
     * 格式化返回的数据
     */
    parseData (data) {
      let parseObj = {}
      data.sub.forEach(item => {
        if (!parseObj[item.category]) {
          parseObj[item.category] = {}
          parseObj[item.category].list = []
        }
        parseObj[item.category].list.push(item)

        if (parseObj[item.category].typename) return
        parseObj[item.category].typename = data.categories[item.category]
      })
      this.catsList = parseObj
    }
  },
  created () {
    this.getCatLists()
  }
}
</script>
<style lang="scss" scoped>
.content{
  height: 100%;
  overflow: auto;
  .cats-info{
    background: $bg_gray;
    .all{
      padding: $auto_padding_l_r;
      background: #fff;
      .all-cat{
        font-size: $f_small_l;
        width: 100%;
        height: p2r(0.68rem);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        &.active{
          border: 1px solid $primary_color;
          color: $primary_color;
        }
      }
    }
    .lists{
      margin-top: $auto_padding_l_r;
      padding: $auto_padding_l_r;
      background: #fff;
      .name{
        color: $primary_color;
        font-size: $f_small_l;
        text-align: left;
        height: p2r(0.8rem);
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: p2r(0.3rem);
        position: relative;
        @include border-1px();
      }
      .detail{
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        padding: $auto_padding_l_r 0;
        .cat-name{
          width: 23%;
          margin: 0 1%;
          height: p2r(0.68rem);
          display: flex;
          align-items: center;
          justify-content: center;
          color: $text_gray_color;
          font-size: $f_small_l;
          box-sizing: border-box;
          position: relative;
          @include els();
          &.hot{
            &::before{
              content: 'hot';
              font-size: $f_small_s;
              position: absolute;
              top: 0;
              left: 0;
              padding: 0 $auto_padding_l_r;
              line-height: $f_small_s * 1.2;
              background: $primary_color;
              width: p2r(1.5rem);
              color: $text_active;
              text-align: center;
              transform: translate3d(-40%,20%,0) rotate(-45deg);
            }
          }
          &.active{
            border: 1px solid $primary_color;
            color: $primary_color;
          }
        }
      }
    }
  }
}
</style>

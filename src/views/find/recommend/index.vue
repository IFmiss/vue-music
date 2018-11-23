<template lang="pug">
  .recommend
    Scroll(ref="scroll", background="rgb(203, 40, 41)")
      .scroll-content(slot="scroll-content")
        // SWIPER
        .sider
          swiper(v-if="banners.length" class="main-sider" :options="swiperOption")
            swiper-slide(v-for="item in banners")
              img(:src="item.imageUrl" @click="bannerClick(item)")
            .swiper-pagination(slot="pagination")
        // 四个大的按钮
        .vm-lists
          router-link(class="list-entry" to="/")
            img(src="./../../../assets/images/r1.jpg")
            span.entry-name 私人FM
          router-link(class="list-entry" to="/main/daily")
            img(src="./../../../assets/images/r2.jpg")
            span.entry-name 每日推荐
          router-link(class="list-entry" to="/main/sheet")
            img(src="./../../../assets/images/r3.jpg")
            span.entry-name 歌单
          router-link(class="list-entry" to="/main/rank")
            img(src="./../../../assets/images/r4.jpg")
            span.entry-name 排行榜
        GroupSheet(api="RECOMMEND_SHEET_LISTS")
</template>
<script>
import Scroll from 'components/scroll'
import GroupSheet from 'components/groupsheet'
export default {
  data () {
    return {
      banners: [],
      swiperOption: {
        notNextTick: true,
        // autoplay: 3000,
        loop: true,
        pagination: '.swiper-pagination'
      }
    }
  },
  components: {
    Scroll,
    GroupSheet
  },
  methods: {
    async getBanner () {
      let res = await this.$store.dispatch('BANNER_LISTS')
      this.banners = res.data.banners
    },
    /**
     * 点击banner的事件
     */
    bannerClick (item) {
      if (item.url) {
        window.location.href = item
        return
      }
      this.$router.push({
        path: '/main/listdetail',
        query: {
          id: item.targetId
        }
      })
    }
  },
  mounted () {
    this.getBanner()
  }
}
</script>
<style lang="scss" scoped>
.recommend{
  position: absolute;
  background: $primary-color;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .scroll-content{
    height: auto;
    .sider{
      width: 100%;
      height: auto;
      overflow: hidden;
      box-sizing: border-box;
      .main-sider{
        position: relative;
        &::before{
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 20%;
          background: $primary-color;
        }
        .swiper-slide{
          padding: p2r(0.15rem);
          box-sizing: border-box;
          img{
            display: block;
            width: 100%;
            border-radius: p2r(0.15rem);
          }
        }
      }
    }
    .vm-lists{
      display: flex;
      width: 100%;
      justify-content: space-around;
      padding: p2r(0.3rem) 0;
      position: relative;
      @include border-1px($border_color);
      .list-entry{
        list-style: none;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        img{
          width: p2r(1rem);
          height: p2r(1rem);
          color: $primary-color;
        }
        .entry-name{
          font-size: $f_small_m;
          margin-top: $auto_padding_t_b / 3;
          color: $text_color;
        }
      }
    }
  }
}
</style>

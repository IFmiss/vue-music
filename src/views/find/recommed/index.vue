<template lang="pug">
  .recommed
    Scroll(ref="scroll", background="rgb(203, 40, 41)")
      .scroll-content(slot="scroll-content")
        // SWIPER
        .sider
          swiper(v-if="banners.length" class="main-sider" :options="swiperOption")
            swiper-slide(v-for="item in banners")
              img(:src="item.picUrl")
            .swiper-pagination(slot="pagination")
        // 四个大的按钮
        .vm-lists
          li.list-entry
            .icon-menu
            span.entry-name 私人FM
          li.list-entry
            .icon-menu
            span.entry-name 每日推荐
          li.list-entry
            .icon-menu
            span.entry-name 歌单
          li.list-entry
            .icon-menu
            span.entry-name 排行榜
</template>
<script>
import Scroll from 'components/scroll'
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
    Scroll
  },
  methods: {
    async getBanner () {
      let res = await this.$store.dispatch('BANNER_LISTS')
      this.banners = res.data.banners
      console.log(this.banners)
    }
  },
  mounted () {
    this.getBanner()
  }
}
</script>
<style lang="scss" scoped>
.recommed{
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
        .icon-menu{
          font-size: p2r(0.8rem);
          color: $primary-color;
        }
        .entry-name{
          font-size: $f_small_l;
          margin-top: $auto_padding_t_b;
          color: $text_color;
        }
      }
    }
  }
}
</style>

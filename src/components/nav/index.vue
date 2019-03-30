// 底部固定菜单
<template lang="pug">
  .cp-nav
    router-link(v-for="item in mainRt" :to="item.url" class="model-router" :class="isActiveRouter(item.url) ? 'acitve' : '' ")
      i(:class="item.icon")
      span {{item.name}}
</template>
<script>
export default {
  data () {
    return {
      mainRt: [
        {
          url: '/main/find',
          name: '发现',
          icon: 'icon-menu'
        },
        {
          url: '/main/video',
          name: '视频',
          icon: 'icon-office'
        },
        {
          url: '/main/mine',
          name: '我的',
          icon: 'icon-pencil'
        },
        {
          url: '/main/firends',
          name: '朋友',
          icon: 'icon-quill'
        },
        {
          url: '/main/account',
          name: '账号',
          icon: 'icon-droplet'
        }
      ]
    }
  },
  methods: {
    /**
     * 路由配置 active状态
     */
    isActiveRouter (url) {
      if (this.$route.meta.activeRouter && this.$route.meta.activeRouter.length) {
        return this.$route.meta.activeRouter.some(item => item.includes(url))
      }
      return false
    }
  }
}
</script>
<style lang="scss" scoped>
.cp-nav{
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  @include border-1px(#a1a1a1, top);
  .model-router{
    flex: 0 0 20%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    i{
      font-size: p2r(0.4rem);
      color: $icon_color_nav;
    }
    span{
      font-size: $f_small_s;
      line-height: 1;
      margin-top: p2r(0.1rem);
      color: $icon_color_nav;
    }
    &.router-link-active{
      i,span{
        color: $primary_color;
      }
    }
    &.acitve{
      i,span{
        color: $primary_color;
      }
    }
  }
}
</style>

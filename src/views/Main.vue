// 主页 只是个包含底部菜单以及模块内容
<template lang="pug">
  .vm-main
    Nav
    router-view(class="model-view")
</template>
<script>
import Nav from '@/components/nav'
// import http from '@/utils/http.js'
// import API from '@/api'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    Nav
  },
  created () {
    this.$dutils.utils.console(' this is vue-music 2.0 ', {
      isMax: false,
      colors: ['#d299c2', '#fef9d7']
    })
  }
}
</script>
<style lang="scss" scoped>
$NAV_H: p2r(0.9rem);
.vm-main{
  position: relative;
  width: 100%;
  height: 100%;
  .model-view {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: $NAV_H;
  }
  .cp-nav{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: $NAV_H;
  }
}
</style>

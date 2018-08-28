// 主页 只是个包含底部菜单以及模块内容
<template lang="pug">
  .vm-main
    router-view(class="model-view")
    Nav
</template>
<script>
import Nav from '@/components/nav'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    Nav
  }
}
</script>
<style lang="scss" scoped>
$NAV_H: p2r(0.8rem);
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

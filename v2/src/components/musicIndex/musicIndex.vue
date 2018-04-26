<template>
  <div class="musicIndex">
    <div class="mainContent">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
    <bottomnav></bottomnav>
  </div>
</template>

<script>
import bottomnav from 'components/common/bottomnav/bottomnav.vue'
export default {
  name: 'musicIndex',
  data () {
    return {
      msg: 'Hi, Vue-Music 2.0'
    }
  },
  components: {
    bottomnav
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .musicIndex{
    @include fixedfull();
  }
  .mainContent{
    @include fixedfull();
    z-index: 10;
    padding-bottom: $bottom_nav_h;
    @include box-sizing(border-box);
    background:$m_color_primary;
  }
</style>

<template>
  <div class="musicIndex">
    <div class="mainContent">
      <router-view/>
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
  .mainContent{
    @include fixedfull();
    bottom: $bottom_nav_h;
    background:red;
  }
</style>

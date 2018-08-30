<template lang="pug">
  .sub-login.auto-content
    Commonpage
      //- .header-slot(slot="header") 1
      .content-slot(slot="content")
        .text-input
          i.icon-phone
          input(type="text")
        .text-input
          i.icon-pwd
          input(type="password")
        input(type="button")
</template>
<script>
import Commonpage from '@/components/commonpage'
export default {
  components: {
    Commonpage
  },
  created () {
  }
}
</script>
<style lang="scss" scoped>
.content-slot{
  width: p2r(5rem);
  margin-top: p2r(1rem);
  margin: 0 auto;
  .text-input{
  }
}
</style>

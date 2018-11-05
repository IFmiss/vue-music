// 通用音乐列表组件
<template lang="pug">
  .music-list(:id="id")
    .music-avatar
      img(:src="avatar")
    .music-detail
      .name {{name}}
      .singer {{siger}}
    .music-conf
      .mv
      .set
</template>
<script>
export default {
  props: {
    // 音乐的id
    id: {
      type: Number,
      default: 0
    },

    // 音乐的封面
    avatar: {
      type: String,
      default: ''
    },

    // 音乐名称
    name: {
      type: String,
      default: ''
    },

    // 歌手
    siger: {
      type: String,
      default: ''
    },

    // 返回对应的list的所有的数据
    list: {
      type: Object,
      default: function () {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.music-list{
  .music-avatar{
    img{}
  }
  .music-detail{
    .name{}
    .siger{}
  }
  .music-conf{
    .mv{}
    .siger{}
  }
}
</style>

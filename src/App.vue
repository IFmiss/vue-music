<template>
  <div id="app">
    <audio id="myaudio" ref="audio" @ended="musicEnded"></audio>
    <v-header :index="2"></v-header>
    <side-bar :info="info"></side-bar>
    <menu-list></menu-list>
    <music-list></music-list>
    <bottom-bar></bottom-bar>
    <my-music></my-music>
    <music-detail></music-detail>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import sidebar from './components/sidebar/sidebar.vue'
import bottombar from './components/bottombar/bottombar.vue'
import mymusic from './components/mymusic/mymusic.vue'
import menulist from './components/menulist/menulist.vue'
import musiclist from './components/musiclist/musiclist.vue'
import musicdetail from './components/musicdetail/musicdetail.vue'
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import store from './store'

Vue.use(Vueaxios, axios)

export default {
  data () {
    return {
      info: {}
    }
  },
  methods: {
    musicEnded () {
      store.dispatch('play_Next')
    }
  },
  components: {
    'v-header': header,
    'side-bar': sidebar,
    'bottom-bar': bottombar,
    'my-music': mymusic,
    'menu-list': menulist,
    'music-list': musiclist,
    'music-detail': musicdetail
  },
  created () {
    let LocalAPI = './../static/data.json'
    axios.get(LocalAPI).then((res) => {
      // data.user的信息赋值给info  再通过组件的数据传递传给sideBar
      this.info = res.data.user
      // 把所有的音乐数据给vuex的musicAllList
      store.dispatch('set_MusicAllList', res.data.music)
      // 设置音乐的地址  初始化 根据vuex的currentIndex来决定
      this.$refs.audio.setAttribute('src', store.getters.getCurrentMusic.url)
      // 给audio元素存在vuex 的state里面  方便日后调用
      store.dispatch('set_AudioElement', this.$refs.audio)
    }, (err) => {
      alert(err)
    })
  }
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
body,html
  margin:0
  padding:0
  box-sizing:border-box
  background:#f0f0f0f0

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
</style>

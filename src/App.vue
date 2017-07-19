<!-- 未曾遗忘的青春 -->
<!-- 项目地址: https://github.com/IFmiss/vue-cloud-music -->

<template>
  <div id="app">
    <audio id="myaudio" ref="audio" @timeupdate="musicTimeUpdate" @canplay="musicCanPlay" @playing="musicOnPlaying" @ended="musicEnded" @waiting="musicOnWaiting" @pause="musicOnPause" @loadstart="loadStart"></audio>
    <!-- 头部header -->
    <v-header :index="2"></v-header>
    <!-- 侧边栏列表 -->
    <side-bar :info="info"></side-bar>
    <!-- 底部显示的菜单列表 -->
    <!-- <menu-list></menu-list> -->
    <!-- 底部显示的浮层页  音乐列表 -->
    <music-list></music-list>
    <!-- 底部固定页 -->
    <bottom-bar></bottom-bar>
    <!-- 我的音乐  首页 -->
    <my-music></my-music>
    <!-- 音乐播放详情  显示cd页 -->
    <music-detail></music-detail>
    <!-- 歌单详情页 -->
    <song-sheet></song-sheet>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import sidebar from './components/sidebar/sidebar.vue'
import bottombar from './components/bottombar/bottombar.vue'
import mymusic from './components/mymusic/mymusic.vue'
// import menulist from './components/menulist/menulist.vue'
import musiclist from './components/musiclist/musiclist.vue'
import musicdetail from './components/musicdetail/musicdetail.vue'
import songsheet from './components/songsheet/songsheet.vue'
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
import store from './store'

Vue.use(Vueaxios, axios)

let musicLrcIndex = 0
export default {
  data () {
    return {
      info: {}
    }
  },
  methods: {
    // 音频播放结束事件
    musicEnded () {
      store.dispatch('play_Ended')
      // 歌词初始化
      musicLrcIndex = 0
      store.commit({
        type: 'setLyricIndex',
        index: 0
      })
    },
    // 音乐播放时间更新事件
    musicTimeUpdate () {
      store.dispatch({
        type: 'set_CurrentTime',
        time: Math.floor(this.$refs.audio.currentTime)
      })

      // 设置歌词内容(以索引的形式显示,主要是)
      let musicLrc = store.getters.getCurrentMusic.lyric
      let currentTime = Math.floor(this.$refs.audio.currentTime)
      if (musicLrc[musicLrcIndex] === undefined) return
      if (musicLrc.length === 0) {
        store.commit({
          type: 'setLyricIndex',
          index: -1
        })
        return
      }
      for (let i = 0; i < musicLrc.length; i++) {
          if (currentTime >= Number(musicLrc[musicLrcIndex].timeId)) {
            musicLrcIndex += 1
            // return
            break
          } else {
            if (musicLrcIndex <= 0) {
              musicLrcIndex = 0
            } else {
              musicLrcIndex--
            }
          }
      }
        store.commit({
          type: 'setLyricIndex',
          index: musicLrcIndex
        })
    },
    // 可以播放事件
    musicCanPlay () {
      store.dispatch({
        type: 'set_MusicDuration',
        duration: Math.floor(this.$refs.audio.duration)
      })
      store.commit({
        type: 'setMusicLoadStart',
        isloadstart: false
      })
    },
    // 音乐处于播放状态
    musicOnPlaying () {
      store.commit('play')
    },
    // 音乐处于watting状态
    musicOnWaiting () {
      // alert('音乐加载中')
    },
    // 音乐处于暂停状态
    musicOnPause () {
      store.commit('pause')
    },
    // 音乐加载
    loadStart () {
      store.commit({
        type: 'setMusicLoadStart',
        isloadstart: true
      })
    }
  },
  components: {
    'v-header': header,
    'side-bar': sidebar,
    'bottom-bar': bottombar,
    'my-music': mymusic,
    // 'menu-list': menulist,
    'music-list': musiclist,
    'music-detail': musicdetail,
    'song-sheet': songsheet
  },
  created () {
    let LocalAPI = 'static/data.json'
    axios.get(LocalAPI).then((res) => {
      // data.user的信息赋值给info  再通过组件的数据传递传给sideBar
      this.info = res.data.user
      // 把所有的音乐数据给vuex的musicAllList
      store.dispatch('set_MusicAllList', res.data.music)
      // 所有的数据存起来  包括音乐个人信息 等等
      store.dispatch('set_AllInfo', res.data)
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
@import "/static/font-icon/style.css"
@import "common/stylus/border-1px/index.styl"
@import "common/stylus/global.styl"
body,html
  margin:0
  padding:0
  box-sizing:border-box
  background:#f0f0f0f0
  user-select:none
  -webkit-tap-highlight-color: transparent

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
</style>

<template>
  <div id="app">
    <v-header :index="2"></v-header>
    <side-bar :info="info"></side-bar>
    <bottom-bar :video="videoele"></bottom-bar>
      <router-link tag="li" to="/musiclist">
        <a>Home</a>
      </router-link>
      <router-link tag="li" to="/search">
        <a>Search</a>
      </router-link>
      <router-view></router-view>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import sidebar from './components/sidebar/sidebar.vue'
import bottombar from './components/bottombar/bottombar.vue'
import Vue from 'vue'
import axios from 'axios'
import Vueaxios from 'vue-axios'
// import store from './store'

Vue.use(Vueaxios, axios)

export default {
  data () {
    return {
      info: {},
      videoele: {}
    }
  },
  methods: {
  },
  components: {
    'v-header': header,
    'side-bar': sidebar,
    'bottom-bar': bottombar
  },
  created () {
    let LocalAPI = './../static/data.json'
    axios.get(LocalAPI).then((res) => {
      this.info = res.data.user
    }, (err) => {
      alert(err)
    })
    const myvideo = new Vue({
      el: '#myvideo'
    })
    this.videoele = myvideo.$el
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

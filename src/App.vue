<template>
  <div id="app">
    <v-header></v-header>
    <side-bar></side-bar>
    <bottom-bar></bottom-bar>  
     <router-link tag="li" to="/search">
        <a>Search</a>
      </router-link>
  </div>
</template>

<script>
import header from './components/header/header.vue'
import sidebar from './components/sidebar/sidebar.vue'
import bottombar from './components/bottombar/bottombar.vue'

export default {
  components: {
    'v-header': header,
    'side-bar': sidebar,
    'bottom-bar': bottombar
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
</style>

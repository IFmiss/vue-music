import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user/index.js'
import createLogger from 'vuex/dist/logger'

Vue.use(Vuex)
const store = new Vuex.Store({
  plugins: [createLogger()],
  modules: {
    user: User
  }
})
export default store

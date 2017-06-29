import Vue from 'vue'
import Vuex from 'vuex'
import Sidebar from './modules/sidebar.js'
import AudioInfo from './modules/audio.js'
import MenuList from './modules/menulist.js'
import MusicList from './modules/musiclist.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    todos: [
      { id: 1, text: '...', done: true },
      { id: 2, text: '...', done: false },
      { id: 3, text: '...', done: true }
    ]
  },
  getters: {
	doneTodos: state => {
		return state.todos.filter(todo => todo.done)
	}
  },
  mutations: {
    increment (state, payload) {
      state.count += payload.count
    },

    myaction (state, payload) {
		// alert(payload)
		state.count += payload.count
    }
  },
  actions: {
	myactionAsync ({ commit }, value) {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				commit('myaction', value)
				resolve()
			}, 1000)
		})
    }
  },

  modules: {
	sideBar: Sidebar,
  audioInfo: AudioInfo,
  menuList: MenuList,
  musiclist: MusicList
  }
})

export default store

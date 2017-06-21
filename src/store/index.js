import Vue from 'vue'
import Vuex from 'vuex'

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
    }
  },
  actions: {
	myactions (context) {
		context.commit('myactions')
	}
  }
})

export default store

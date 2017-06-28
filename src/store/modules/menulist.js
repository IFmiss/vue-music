// 测面滑动菜单效果
const SHOW_MENU = true
const HIDE_MENU = false

const menulist = {
	state: {
		isShow: false
	},
	mutations: {
		showMenu (state) {
			state.isShow = SHOW_MENU
		},
		hideMenu (state) {
			state.isShow = HIDE_MENU
		}
	},
	actions: {
		showMenuList ({commit}) {
			commit('showMenu')
		},
		hideMenuList ({commit}) {
			commit('hideMenu')
		}
	},
	getters: {
		getShowMenuInfo () {
			return this.state.isShow
		}
	}
}
export default menulist

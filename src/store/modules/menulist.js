// 测面滑动菜单效果
const SHOW_MENU = true
const HIDE_MENU = false

const menulist = {
	state: {
		isShow: false,
		content: {
			title: 'title : by 未曾遗忘的青春',
			content: [
			]
		}
	},
	mutations: {
		showMenu (state, obj) {
			state.content = obj === undefined ? state.content : obj.amount
			state.isShow = SHOW_MENU
		},
		hideMenu (state) {
			state.isShow = HIDE_MENU
		}
	},
	actions: {
		showMenuList ({commit}, obj) {
			commit('showMenu', obj)
		},
		hideMenuList ({commit}) {
			commit('hideMenu')
		}
	},
	getters: {
		getIsShow: state => state.isShow,
		getShowMenuInfo: state => state.content
	}
}
export default menulist

// 测面滑动菜单效果
const SHOW_MUSIC_LIST = true
const HIDE_MUSIC_LIST = false

const musiclist = {
	state: {
		isShow: false
	},
	mutations: {
		showMusic (state) {
			// state.content = obj === undefined ? state.content : obj.amount
			state.isShow = SHOW_MUSIC_LIST
		},
		hideMusic (state) {
			state.isShow = HIDE_MUSIC_LIST
		}
	},
	actions: {
		showMusicList ({commit}) {
			commit('showMusic')
		},
		hideMusicList ({commit}) {
			commit('hideMusic')
		}
	},
	getters: {
		getIsShowMusicList: state => state.isShow
		// getShowMenuInfo: state => state.content
	}
}
export default musiclist

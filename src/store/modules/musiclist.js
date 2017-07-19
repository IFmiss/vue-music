// 测面滑动菜单效果
const SHOW_MUSIC_LIST = true
const HIDE_MUSIC_LIST = false

const musiclist = {
	state: {
		scrollTop: 0,
		refs: '',
		isShow: false
	},
	mutations: {
		showMusic (state) {
			// state.content = obj === undefined ? state.content : obj.amount
			state.isShow = SHOW_MUSIC_LIST
		},
		hideMusic (state) {
			state.isShow = HIDE_MUSIC_LIST
		},
		setScrollTop (state, scrollTop) {
			setTimeout(function () {
				// alert(scrollTop)
				state.refs.scrollTop = scrollTop
			}, 100)
		},
		setRefScrollMusicList (state, ele) {
			state.refs = ele
		}
	},
	actions: {
		showMusicList ({commit}) {
			commit('showMusic')
		},
		hideMusicList ({commit}, obj) {
			commit('hideMusic', obj.refs)
		},
		set_ScrollTop ({commit}, obj) {
			commit('setScrollTop', obj.scrollTop)
		},
		set_RefScrollMusicList ({commit}, obj) {
			commit('setRefScrollMusicList', obj.refs)
		}
	},
	getters: {
		getIsShowMusicList: state => state.isShow,
		// getShowMenuInfo: state => state.content
		// 获取列表的scrollTop
		getScrollTop: state => state.scrollTop
	}
}
export default musiclist

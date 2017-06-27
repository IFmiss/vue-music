// 测面滑动菜单效果
const audioInfo = {
	state: {
		audioelement: '', // audio元素
		audio: {
			id: 0,
			name: '',
			singer: '',
			url: '',
			img_url: '',
			type: '',
			lyric: ''
		},
		showMusicDetail: false,
		currentIndex: 7,
		musicList: [{
			id: 0,
			name: '未曾遗忘的青春',
			singer: 'iFmiss',
			url: '',
			img_url: 'http://www.daiwei.org/index/images/img/indeximg3.jpg',
			type: '华语',
			lyric: ''
		}],
		playing: false,
		waiting: false
	},
	getters: {
		getAudioElement: state => state.audioelement,
		getAudioInfo: state => state.audio,
		getCurrentIndex: state => state.currentIndex,
		getMusicList: state => state.musicList,
		getIsPlaying: state => state.playing,
		getIsWaiting: state => state.waiting,
		getMusicDetail: state => state.showMusicDetail,
		// 当前音乐详细信息
		getCurrentMusic: state => state.musicList[state.currentIndex]
	},
	mutations: {
		play (state) {
			state.playing = true
		},
		pause (state) {
			state.playing = false
		},
		toggerMusicDetail (state) {
			state.showMusicDetail = !state.showMusicDetail
		},
		initAudio (state) {
			if (state.musicList) {
				alert(1)
			} else {
				alert(2)
			}
		},
		setMusicList (state, obj) {
			state.musicList = obj
		},
		setAudioElement (state, ele) {
			state.audioelement = ele
		},
		setShowMusicDetail (state) {
			state.showMusicDetail = false
		}
	},
	actions: {
		set_AudioElement ({commit}, ele) {
			commit('setAudioElement', ele)
		},
		set_ShowMusicDetail ({commit}) {
			commit('setShowMusicDetail')
		},
		set_MusicList ({commit}, obj) {
			commit('setMusicList', obj)
		}
		// hideSideBar ({commit}) {
		// 	commit('hideBar')
		// }
	}
}
export default audioInfo

// 测面滑动菜单效果
const audioInfo = {
	state: {
		// audio元素
		audioelement: '',
		// audio信息
		audio: {
			id: 0,
			name: '',
			singer: '',
			url: '',
			img_url: '',
			type: '',
			lyric: ''
		},
		// 是否显示audio的列表
		showMusicDetail: false,
		// 当前音乐的index索引
		currentIndex: 0,
		// 所有的音乐信息
		musicList: [{
			id: 0,
			name: '未曾遗忘的青春',
			singer: 'iFmiss',
			url: '',
			img_url: 'http://www.daiwei.org/index/images/img/indeximg3.jpg',
			type: '华语',
			lyric: ''
		}],
		// 是否正在播放
		playing: false,
		// 是否正在加载
		waiting: false
	},
	getters: {
		// 获取audio元素
		getAudioElement: state => state.audioelement,
		// 获取audio信息
		getAudioInfo: state => state.audio,
		// 获取当前播放的索引
		getCurrentIndex: state => state.currentIndex,
		// 获取音乐的所有信息
		getMusicList: state => state.musicList,
		// 获取音乐是否播放
		getIsPlaying: state => state.playing,
		// 获取音乐是否加载
		getIsWaiting: state => state.waiting,
		// 获取音乐是否打开底部音乐列表
		getMusicDetail: state => state.showMusicDetail,
		// 当前音乐详细信息
		getCurrentMusic: state => state.musicList[state.currentIndex]
	},
	mutations: {
		// play设置
		play (state) {
			state.playing = true
		},
		// 暂停设置
		pause (state) {
			state.playing = false
		},
		// 开关显示底部列表
		toggerMusicDetail (state) {
			state.showMusicDetail = !state.showMusicDetail
		},
		// 初始化音乐
		initAudio (state) {
			if (state.musicList) {
				alert(1)
			} else {
				alert(2)
			}
		},
		// 插入音乐信息
		setMusicList (state, obj) {
			state.musicList = obj
		},
		// 获取音乐元素 Dom
		setAudioElement (state, ele) {
			state.audioelement = ele
		},
		// 关闭底部列表
		setShowMusicDetail (state) {
			state.showMusicDetail = false
		},
		// 播放下一曲
		playNext (state) {
			state.currentIndex ++
			const length = state.musicList.length
			if (state.currentIndex > length) {
				state.currentIndex = 0
			}
			state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
			state.audioelement.load()
			state.audioelement.play()
		},

		// 播放下一曲
		playPrev (state) {
			state.currentIndex --
			const length = state.musicList.length
			if (state.currentIndex < 0) {
				state.currentIndex = length - 1
			}
			state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
			state.audioelement.load()
			state.audioelement.play()
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
		},
		play_Next ({commit}) {
			commit('playNext')
		}
		// hideSideBar ({commit}) {
		// 	commit('hideBar')
		// }
	}
}
export default audioInfo

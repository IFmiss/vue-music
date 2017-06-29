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
		currentIndex: 7,
		// 全部音乐信息  包括歌单等等
		musicAllList: [],
		// 音乐播放信息
		musicList: [],
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
		// 获取音乐播放列表信息
		getMusicList: state => state.musicList,
		// 获取音乐全部信息
		getMusicAllList: state => state.musicAllList,
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
			state.audioelement.play()
		},
		// 暂停设置
		pause (state) {
			state.playing = false
			state.audioelement.pause()
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
		// 插入播放列表信息
		setMusicList (state, obj) {
			state.musicList = obj
		},
		// 插入所有音乐信息
		setMusicAllList (state, obj) {
			state.musicAllList = obj
			state.musicList = obj.all
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
			state.playing = true
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
			state.playing = true
			state.audioelement.load()
			state.audioelement.play()
		},

		// 设置当前的播放索引
		playIndex (state, index) {
			state.currentIndex = index
			state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
			state.playing = true
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
		set_MusicAllList ({commit}, obj) {
			commit('setMusicAllList', obj)
		},
		set_MusicList ({commit}, obj) {
			commit('setMusicList', obj)
		},
		play_Next ({commit}) {
			commit('playNext')
		},
		play_Index ({commit}, obj) {
			commit('playIndex', obj.index)
		}
		// hideSideBar ({commit}) {
		// 	commit('hideBar')
		// }
	}
}
export default audioInfo

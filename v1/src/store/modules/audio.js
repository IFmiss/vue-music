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
		// 是否显示歌单列表
		showSongSheet: false,
		// 当前音乐的index索引
		currentIndex: 0,
		// 歌词信息 索引
		lyricIndex: -1,
		// 全部音乐信息  包括歌单等等
		musicAllList: [],
		// 音乐播放信息
		musicList: [],
		// 音乐歌单信息
		musicSheetList: [],
		// 正在播放的音乐歌单类型，到时候区分正在播放的歌曲是存在于哪一个歌单的    默认为-1 表示所有
		musicSheetType: '-1',
		// 图片获取颜色
		songSheetImageColor: '#333',
		// 是否正在播放
		playing: false,
		// 是否正在加载
		waiting: false,
		// 播放类型   1是自动播放  2是循环播放  3是随机播放
		playType: 1,
		// 当前播放的时间
		currentTime: 0,
		// 音乐的播放时长
		musicDuration: 0,
		// 音乐是否在加载
		musicLoadStart: false
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
		getCurrentMusic: state => state.musicList[state.currentIndex],
		// 获取播放类型
		getMusicPlayType: state => state.playType,
		// 获取当前的播放进度
		getCurrentTime: state => state.currentTime,
		// 获取音乐的播放时长
		getMusicDuration: state => state.musicDuration,
		// 音乐开始加载
		getIsLoadStart: state => state.musicLoadStart,
		// 获取歌单列表的显示状态
		getIsShowSongSheet: state => state.showSongSheet,
		// 获取歌单信息
		getMusicSheetList: state => state.musicSheetList,
		// 获取歌单图片颜色
		getSongSheetImageColor: state => state.songSheetImageColor,
		// 获取音乐歌单类型
		getMusiSheetType: state => state.musicSheetType,
		// 获取音乐歌词当前播放的索引
		getLyricIndex: state => state.lyricIndex
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
		togglePlay (state) {
			if (state.playing) {
				state.playing = false
				state.audioelement.pause()
			} else {
				state.playing = true
				state.audioelement.play()
			}
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
			state.musicList = obj.list
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
		setMusicDetail (state, obj) {
			state.showMusicDetail = obj.isShow
		},
		setPlayType (state) {
			if (state.playType === 3) {
				state.playType = 1
			} else {
				state.playType ++
			}
		},
		// 播放下一曲
		playNext (state) {
			state.currentIndex ++
			const length = state.musicList.length
			if (state.currentIndex >= length) {
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
		playIndex (state, obj) {
			state.currentIndex = obj.index
			state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
			state.playing = true
			state.audioelement.load()
			state.audioelement.play()
		},

		// 设置音乐结束自动播放播放类型的歌曲
		playEnded (state) {
			let type = state.playType
			if (type === 1) {
				state.currentIndex ++
				const length = state.musicList.length
				if (state.currentIndex >= length) {
					state.currentIndex = 0
				}
				state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
				state.playing = true
				state.audioelement.load()
				state.audioelement.play()
			}
			if (type === 2) {
				state.audioelement.currentTime = 0
				state.playing = true
				state.audioelement.play()
			}
			if (type === 3) {
				const length = state.musicList.length
				state.currentIndex = Math.floor(Math.random() * length)
				state.audioelement.setAttribute('src', state.musicList[state.currentIndex].url)
				state.playing = true
				state.audioelement.load()
				state.audioelement.play()
			}
		},
		setCurrentTime (state, obj) {
			state.currentTime = obj.time
		},
		setMusicDuration (state, obj) {
			state.musicDuration = obj.duration
		},
		// 设置音乐是否正在加载
		setMusicLoadStart (state, obj) {
			state.musicLoadStart = obj.isloadstart
		},
		// 设置是否显示歌单信息
		setIsShowSongSheet (state, obj) {
			state.showSongSheet = obj.isShow
		},
		// 设置音乐播放器的歌单列表数据
		setMusicSheetList (state, obj) {
			state.musicSheetList = obj.data
		},
		setSongSheetImageColor (state, obj) {
			state.songSheetImageColor = obj.color
		},
		// 设置音乐歌单类型
		setMusiSheetType (state, obj) {
			state.musicSheetType = obj.sheettype
		},
		// 设置音乐歌词当前播放的索引
		setLyricIndex (state, obj) {
			state.lyricIndex = obj.index
		}
	},
	actions: {
		set_AudioElement ({commit}, ele) {
			commit('setAudioElement', ele)
		},
		set_MusicDetail ({commit}, obj) {
			commit('setMusicDetail', obj)
		},
		set_MusicAllList ({commit}, obj) {
			commit('setMusicAllList', obj)
		},
		set_MusicList ({commit}, obj) {
			commit('setMusicList', obj)
		},
		set_PlayType ({commit}) {
			commit('setPlayType')
		},
		set_CurrentTime ({commit}, obj) {
			commit('setCurrentTime', obj)
		},
		set_MusicDuration ({commit}, obj) {
			commit('setMusicDuration', obj)
		},
		set_MusicSheetList ({commit}, obj) {
			commit('setMusicSheetList', obj)
		},
		set_SongSheetImageColor ({commit}, obj) {
			commit('setSongSheetImageColor', obj)
		},
		play_Next ({commit}) {
			commit('playNext')
		},
		play_Prev ({commit}) {
			commit('playPrev')
		},
		play_Index ({commit}, obj) {
			commit('playIndex', obj)
		},
		play_Ended ({commit}) {
			commit('playEnded')
		}
	}
}
export default audioInfo

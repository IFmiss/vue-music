import store from 'store'
export default {
  audioEle: document.getElementById('myAudio'),

  /**
   * 播放上一首 下一首歌曲
   * @param { String }  是下一首还是上一首  'next'  和  'prev' 两种
   */
  playNextPrev: (type) => {
    let playType = store.getters.MUSIC_PLAY_TYPE_GETTERS
    let playIndex = store.getters.PLAY_MUSIC_INDEX_GETTERS
    let listCount = store.getters.PLAY_MUSIC_LISTS_GETTERS.length
    switch (playType) {
      case 'auto':
      case 'loop':
        // 下一曲
        if (type === 'next') {
          if (playIndex >= listCount) {
            store.dispatch('PLAY_MUSIC_INDEX_SETTERS', 0)
            return
          }
          store.dispatch('PLAY_MUSIC_INDEX_SETTERS', playIndex + 1)
        }
        // 上一曲
        if (type === 'prev') {
          if (playIndex <= 0) {
            store.dispatch('PLAY_MUSIC_INDEX_SETTERS', listCount - 1)
            return
          }
          store.dispatch('PLAY_MUSIC_INDEX_SETTERS', playIndex - 1)
        }
        break
      // 随机不区分上一曲下一曲
      case 'random':
        store.dispatch('PLAY_MUSIC_INDEX_SETTERS', Math.floor(Math.random() * listCount))
        break
    }
  },

  /**
   * 播放对应索引的歌曲
   * @param { Number }  是点击第多少个播放
   */
  playIndex: (index) => {
    store.dispatch('PLAY_MUSIC_INDEX_SETTERS', index)
  },

  /**
   * 设置音频的current时间, 存储在vuex中
   */
  setCurrentTime: (time) => {
    store.dispatch('MUSIC_CURRENT_TIME_SETTERS', time)
  },

  /**
   * 音频的事件初始化
   */
  initAudioEvent: () => {

  }
}

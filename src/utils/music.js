import store from 'store'
import route from '@/router'
import {vueProject} from '@/main.js'
const Music = {
  audioEle: store.getters.AUDIO_ELE_GETTERS,

  /**
   * 播放上一首 下一首歌曲
   * @param { String }  type 是下一首还是上一首  'next'  和  'prev' 两种
   */
  playNextPrev (type) {
    let playType = store.getters.MUSIC_PLAY_TYPE_GETTERS
    let playIndex = store.getters.PLAY_MUSIC_INDEX_GETTERS
    let listCount = store.getters.PLAY_MUSIC_LISTS_GETTERS.length
    switch (playType) {
      case 'auto':
      case 'loop':
        // 下一曲
        if (type === 'next') {
          if (playIndex >= listCount - 1) {
            this.playIndex(0)
            return
          }
          this.playIndex(playIndex + 1)
        }
        // 上一曲
        if (type === 'prev') {
          if (playIndex <= 0) {
            this.playIndex(listCount - 1)
            return
          }
          this.playIndex(playIndex - 1)
        }
        break
      // 随机不区分上一曲下一曲
      case 'random':
        let index = Math.floor(Math.random() * listCount)
        this.playIndex(index)
        break
    }
  },

  /**
   * 播放对应索引的歌曲
   * @param { Number }  index  是点击第多少个播放
   */
  playIndex (index) {
    store.dispatch('PLAY_MUSIC_INDEX_SETTERS', index)
    vueProject.$nextTick(() => {
      this.play()
    })
  },

  /**
   * 设置音乐的播放类型
   */
  setPlayType () {
    const type = ['auto', 'loop', 'random']
    let playType = store.getters.MUSIC_PLAY_TYPE_GETTERS
    // 获取索引
    let getTypeIndex
    for (let k in type) {
      if (type[k] === playType) {
        getTypeIndex = parseInt(k)
      }
    }

    let index
    if (getTypeIndex >= type.length - 1) {
      index = 0
    } else {
      index = getTypeIndex + 1
    }
    store.dispatch('MUSIC_PLAY_TYPE_SETTERS', type[index])
  },

  /**
   * 设置音频的current时间, 存储在vuex中
   * @param { Number }   progress  当前时间与durantion的百分比
   */
  setProgress (progress) {
    let durationTime = store.getters.MUSIC_DURATION_TIME_GETTERS
    let time = Math.floor(progress * durationTime / 100)
    this.audioEle.currentTime = time
    store.dispatch('MUSIC_CURRENT_TIME_SETTERS', time)
  },

  /**
   * 设置播放音频音量的大小
   */
  setVol (vol) {
    this.audioEle.volume = vol / 100
    store.dispatch('MUSIC_VOL_SETTERS', vol)
  },

  /**
   * 播放
   */
  play () {
    this.audioEle.play()
  },

  /**
   * 暂停
   */
  pause () {
    this.audioEle.pause()
  },

  /**
   * 播放暂停
   */
  playPause () {
    if (this.audioEle.paused) {
      this.play()
    } else {
      this.pause()
    }
  },

  /**
   * 播放专辑歌曲的操作
   * @param { Object } data  相关数据
   * data.lists   播放的列表集合
   * data.index   播放的索引
   * data.id      播放的歌单id
   */
  saveSheetList (data) {
    let {lists, index} = data
    store.dispatch('PLAY_MUSIC_LISTS_SETTERS', data)
    route.push({
      path: '/main/play',
      query: {
        id: lists[index].id
      }
    })
  },

  /**
   * 音频的事件初始化
   */
  initAudioEvent (ele) {
    // 存储 audioEle
    this.audioEle = ele
    // 播放事件
    ele.onplaying = () => {
      console.log('播放事件')
      store.dispatch('MUSIC_IS_PLAYING_SETTERS', true)
    }

    // 暂停事件
    ele.onpause = () => {
      console.log('暂停事件')
      if (!this.audioEle.paused) return
      let cd = document.getElementById('cd')
      let cdwp = document.getElementById('cdwp')
      if (cd && cdwp) {
        let cdTransform = getComputedStyle(cd).transform
        let wpTransform = getComputedStyle(cdwp).transform
        cdwp.style.transform = wpTransform === 'none' ? cdTransform : wpTransform.concat(' ', cdTransform)
      }
      store.dispatch('MUSIC_IS_PLAYING_SETTERS', false)
    }

    // 播放结束事件
    ele.onended = () => {
      console.log('播放结束事件')
      this.playNextPrev('next')
    }

    // 音频初始化获取数据
    ele.onloadedmetadata = (e) => {
      let dr = Math.floor(e.target.duration)
      console.log(dr)
      console.log(vueProject.$dutils.utils.debounce)
      store.dispatch('MUSIC_DURATION_TIME_SETTERS', dr)
    }

    // 截流 获取当前的播放进度
    ele.ontimeupdate = vueProject.$dutils.utils.throttle(function (e) {
      let arg = Array.from(arguments)[0]
      let ct = Math.floor(arg.target.currentTime)
      store.dispatch('MUSIC_CURRENT_TIME_SETTERS', ct)
    }, 1000)
  }
}

export default Music

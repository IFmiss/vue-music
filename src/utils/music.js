import store from 'store'
import route from '@/router'
import vueProject from '@/main.js'
import API from 'api'
import Vibrant from 'node-vibrant'

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
  async playIndex (index) {
    let playId = store.getters.PLAY_MUSIC_LISTS_GETTERS[index].id
    store.dispatch('PLAY_MUSIC_INDEX_SETTERS', index)
    await this.initMusic(playId)
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
   * 解码音乐歌词
   */
  parseLrc (lrc) {
    /* eslint-disable */
    if (!lrc) return ''
    const lyrics = lrc.split('\n')
    let lrcObj = []
    for (let i = 0; i < lyrics.length; i++) {
      // 解码
      const lyric = decodeURIComponent(lyrics[i])
      const timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g
      const timeRegExpArr = lyric.match(timeReg)
      if (!timeRegExpArr) continue
      const clause = lyric.replace(timeReg, '')
      for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
        const t = timeRegExpArr[k]
        let min = Number(String(t.match(/\[\d*/i)).slice(1))
        let sec = Number(String(t.match(/\:\d*/i)).slice(1))
        const time = min * 60 + sec
        // lrcObj[time] = clause
        lrcObj.push({
          t: time,
          lrc: clause
        })
      }
    }
    return lrcObj
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
   * 初始化音频
   */
  async initMusic (id) {
    // 动态设置url的qurey id
    if (location.href.includes('/main/play')) {
      route.replace({
        path: '/main/play',
        query: {
          id
        }
      })
    }

    // 判断是否可以播放音乐，可以则播放，否则提示无法播放且console
    this.checkMusic(id).then(async res => {
      // 此时这首歌可以播放
      // 请求数据
      let musicRes = await vueProject.$mutils.fetchData(API.music.MUSIC_DETAIL, {
        ids: id
      })
      // 判断有没有播放列表集合，没有存储单曲作为歌曲列表集合
      if (!store.getters.PLAY_MUSIC_LISTS_GETTERS.length) {
        store.dispatch('PLAY_MUSIC_LISTS_SETTERS', {
          id: musicRes.data.songs[0].id,
          index: 0,
          lists: musicRes.data.songs
        })
      }
      store.dispatch('MUSIC_PLAYING_DETAIL_SETTERS', musicRes.data.songs[0])
      this.initMusicColor(musicRes.data.songs[0])
      vueProject.$nextTick(() => {
        this.play()
      })
    }, err => {
      vueProject.$msg({text: '暂无权限播放'})
      // 需要重置index的值(通过当前播放的音乐id与lists的集合比对拿到索引至重新修改索引值)
      this.resetMusicIndex()
      route.go(-1)
      console.log(err)
    })
  },

  /**
   * 重置索引，当点击播放的音乐无效的时候
   */
  resetMusicIndex () {
    let playingList = store.getters.MUSIC_PLAYING_DETAIL_GETTERS
    let playLists = store.getters.PLAY_MUSIC_LISTS_GETTERS
    if (vueProject.$dutils.exp.isEmptyObject(playingList) || !playLists.length) return
    let index = function () {
      for (let i = 0; i < playLists.length; i++) {
        if (playLists[i].id === playingList.id) return i
      }
      return 0
    }
    store.dispatch('PLAY_MUSIC_INDEX_SETTERS', Number(index()))
  },

  // 获取图片的颜色以设置进度条的颜色
  initMusicColor (res) {
    // Vibrant
    let pic = res.al.picUrl
    Vibrant.from(pic).getPalette()
    .then((palette) => {
      // palette.DarkMuted
      store.dispatch(
        'MUSIC_PLAYING_COLOR_SETTERS',
        `rgba(${palette.LightMuted.r}, ${palette.LightMuted.g}, ${palette.LightMuted.b}, 0.9)`
      )
    })
  },

  async checkMusic (id) {
    return new Promise(async (resolve, reject) => {
      try {
        let res = await vueProject.$mutils.fetchData(API.music.CHECK_MUSIC, {id})
        resolve(res)
      } catch (e) {
        reject(e)
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
      store.dispatch('MUSIC_IS_PLAYING_SETTERS', true)
    }

    // 暂停事件
    ele.onpause = () => {
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
      this.playNextPrev('next')
    }

    // 音频初始化获取数据
    ele.onloadedmetadata = (e) => {
      let dr = Math.floor(e.target.duration)
      store.dispatch('MUSIC_DURATION_TIME_SETTERS', dr)
    }

    // 截流 获取当前的播放进度
    ele.ontimeupdate = vueProject.$dutils.utils.throttle(function (e) {
      let arg = Array.from(arguments)[0]
      if (arg.target && arg.target.currentTime) {
        let ct = Math.floor(arg.target.currentTime)
        store.dispatch('MUSIC_CURRENT_TIME_SETTERS', ct)
      }
    }, 1000)
  }
}

export default Music

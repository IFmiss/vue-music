import store from 'store'
export default {
  // 播放列表
  MUSIC_LSITS: store.getters.PLAY_MUSIC_LISTS_GETTERS,
  // 正在播放的索引
  PLAY_INDEX: store.getters.PLAY_MUSIC_INDEX_GETTERS,
  // 正在播放的音乐信息
  MUSIC_PLAY_LSIT: store.getters.MUSIC_PLAY_LSIT_GETTERS,
  // 是否是播放状态
  IS_PALYING: store.getters.MUSIC_IS_PLAYING_GETTERS,
  // 播放的类型  auto 列表循环， loop 单曲循环， random 列表随机播放
  PLAY_TYPE: store.getters.MUSIC_PLAY_TYPE_GETTERS,
  // 音乐列表的数量
  MUSIC_COUNT: this.MUSIC_LSITS.length,

  playNext: () => {
    switch (this.PLAY_TYPE) {
      case 'auto':
        if (this.PLAY_INDEX >= this.MUSIC_COUNT) {
          store.dispatch('PLAY_MUSIC_INDEX_SETTERS', 0)
        }
        store.dispatch('PLAY_MUSIC_INDEX_SETTERS', this.PLAY_INDEX++)
    }
  }
}

import * as types from './../mutation-types'
// import axios from 'utils/http'
// import API from '@/api/index'
let state = {
  [types.PLAY_MUSIC_LISTS]: null,
  [types.PLAY_MUSIC_INDEX]: null,
  // [types.PLAY_MUSIC_LIST]: {},
  [types.PLAY_MUSIC_LISTS_ID]: null,
  [types.MUSIC_IS_PLAYING]: false,
  [types.MUSIC_PLAY_TYPE]: 'auto'
}

let getters = {
  [types.PLAY_MUSIC_LISTS_GETTERS]: (state) => state[types.PLAY_MUSIC_LISTS],
  [types.PLAY_MUSIC_INDEX_GETTERS]: (state) => state[types.PLAY_MUSIC_INDEX],
  // [types.PLAY_MUSIC_LIST_GETTERS]: (state) => state[types.PLAY_MUSIC_LIST],
  [types.PLAY_MUSIC_LISTS_ID_GETTERS]: (state) => state[types.PLAY_MUSIC_LISTS_ID],
  [types.MUSIC_IS_PLAYING_GETTERS]: (state) => state[types.MUSIC_IS_PLAYING],
  [types.MUSIC_PLAY_TYPE_GETTERS]: (state) => state[types.MUSIC_PLAY_TYPE]
}

const mutations = {}
const actions = {}

mutations[types.PLAY_MUSIC_INDEX_SETTERS] = (state, index) => {
  state[types.PLAY_MUSIC_INDEX] = index
}

mutations[types.PLAY_MUSIC_LISTS_ID_SETTERS] = (state, id) => {
  state[types.PLAY_MUSIC_LISTS_ID] = id
}

// mutations[types.PLAY_MUSIC_LIST_SETTERS] = (state, obj) => {
//   state[types.PLAY_MUSIC_LIST] = obj
// }

/**
 * 添加播放列表，此时PLAY_MUSIC_LISTS_ID 也需要变化
 * Index也需要变化
 * data.lists 是播放的列表集合
 * data.index 是播放的列表索引
 * data.id 是播放的列表的id
 */
mutations[types.PLAY_MUSIC_LISTS_SETTERS] = (state, lists) => {
  state[types.PLAY_MUSIC_LISTS] = lists
}

actions[types.PLAY_MUSIC_LISTS_SETTERS] = ({commit}, data) => {
  // 不等才修改播放列表
  if (data.id !== state[types.PLAY_MUSIC_LISTS_ID]) {
    commit(types.PLAY_MUSIC_LISTS_SETTERS, data.lists)
    commit(types.PLAY_MUSIC_LISTS_ID_SETTERS, data.id)
  }
  if (data.index >= 0) {
    commit(types.PLAY_MUSIC_INDEX_SETTERS, data.index)
    // commit(types.PLAY_MUSIC_LIST_SETTERS, data.lists[data.index])
  }
}

/**
 * 设置音频播放的状态
 * 用于全局控制音频按钮等样式的显示效果
 */
mutations[types.MUSIC_IS_PLAYING_SETTERS] = (state, isplay) => {
  state[types.MUSIC_IS_PLAYING] = isplay
}

actions[types.MUSIC_IS_PLAYING_SETTERS] = ({commit}, isplay) => {
  commit(types.MUSIC_IS_PLAYING_SETTERS, isplay)
}

/**
 * 用于控制音频的播放类型
 */
mutations[types.MUSIC_PLAY_TYPE] = (state, type) => {
  state[types.MUSIC_PLAY_TYPE] = type
}
actions[types.MUSIC_PLAY_TYPE_SETTER] = ({commit}, type) => {
  commit(types.MUSIC_PLAY_TYPE_SETTER, type)
}

export default {
  state,
  getters,
  mutations,
  actions
}

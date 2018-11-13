import * as types from './../mutation-types'
// import axios from 'utils/http'
// import API from '@/api/index'
let state = {
  [types.PLAY_MUSIC_LISTS]: null,
  [types.PLAY_MUSIC_INDEX]: null,
  [types.PLAY_MUSIC_LISTS_ID]: null
}

let getters = {
  [types.PLAY_MUSIC_LISTS_GETTERS]: (state) => state[types.PLAY_MUSIC_LISTS],
  [types.PLAY_MUSIC_INDEX_GETTERS]: (state) => state[types.PLAY_MUSIC_INDEX],
  [types.PLAY_MUSIC_LISTS_ID_GETTERS]: (state) => state[types.PLAY_MUSIC_LISTS_ID]
}

const mutations = {}
const actions = {}

mutations[types.PLAY_MUSIC_LISTS_SETTERS] = (state, lists) => {
  state[types.PLAY_MUSIC_LISTS] = lists
}

mutations[types.PLAY_MUSIC_INDEX_SETTERS] = (state, index) => {
  state[types.PLAY_MUSIC_INDEX] = index
}

mutations[types.PLAY_MUSIC_LISTS_ID_SETTERS] = (state, id) => {
  state[types.PLAY_MUSIC_LISTS_ID] = id
}

/**
 * 添加播放列表，此时PLAY_MUSIC_LISTS_ID 也需要变化
 * Index也需要变化
 * data.lists 是播放的列表集合
 * data.index 是播放的列表索引
 * data.id 是播放的列表的id
 */
actions[types.PLAY_MUSIC_LISTS_SETTERS] = ({commit}, data) => {
  // 不等才修改播放列表
  if (data.id !== state[types.PLAY_MUSIC_LISTS_ID]) {
    commit(types.PLAY_MUSIC_LISTS_SETTERS, data.lists)
    commit(types.PLAY_MUSIC_LISTS_ID_SETTERS, data.id)
  }
  if (data.index >= 0) {
    commit(types.PLAY_MUSIC_INDEX_SETTERS, data.index)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

import * as types from './../mutation-types'
// import axios from 'utils/http'
// import API from '@/api/index'
let state = {
  // 播放的列表集合
  [types.PLAY_MUSIC_LISTS]: [],
  // 音乐播放的当前索引
  [types.PLAY_MUSIC_INDEX]: 0,
  // 音乐播放的播放集ID
  [types.PLAY_MUSIC_LISTS_ID]: null,
  // 音乐播放状态
  [types.MUSIC_IS_PLAYING]: false,
  // 音乐播放类型   auto  loop  random
  [types.MUSIC_PLAY_TYPE]: 'auto',
  // 当前音乐时长
  [types.MUSIC_CURRENT_TIME]: 0,
  // 音乐时长
  [types.MUSIC_DURATION_TIME]: 0,
  // 音量
  [types.MUSIC_VOL]: 100,
  // 音乐播放详细信息
  [types.MUSIC_PLAYING_DETAIL]: {},
  // 音乐播放的颜色
  [types.MUSIC_PLAYING_COLOR]: 'rgb(203, 40, 41)'
}

let getters = {
  [types.PLAY_MUSIC_LISTS_GETTERS]: (state) => state[types.PLAY_MUSIC_LISTS],
  [types.PLAY_MUSIC_INDEX_GETTERS]: (state) => state[types.PLAY_MUSIC_INDEX],
  [types.PLAY_MUSIC_LISTS_ID_GETTERS]: (state) => state[types.PLAY_MUSIC_LISTS_ID],
  [types.MUSIC_IS_PLAYING_GETTERS]: (state) => state[types.MUSIC_IS_PLAYING],
  [types.MUSIC_PLAY_TYPE_GETTERS]: (state) => state[types.MUSIC_PLAY_TYPE],
  [types.MUSIC_CURRENT_TIME_GETTERS]: (state) => state[types.MUSIC_CURRENT_TIME],
  [types.MUSIC_DURATION_TIME_GETTERS]: (state) => state[types.MUSIC_DURATION_TIME],
  [types.MUSIC_VOL_GETTERS]: (state) => state[types.MUSIC_VOL],
  [types.MUSIC_PLAYING_DETAIL_GETTERS]: (state) => state[types.MUSIC_PLAYING_DETAIL],
  [types.MUSIC_PLAYING_COLOR_GETTERS]: (state) => state[types.MUSIC_PLAYING_COLOR]
}

const mutations = {}
const actions = {}

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
mutations[types.MUSIC_PLAY_TYPE_SETTERS] = (state, type) => {
  state[types.MUSIC_PLAY_TYPE] = type
}
actions[types.MUSIC_PLAY_TYPE_SETTERS] = ({commit}, type) => {
  commit(types.MUSIC_PLAY_TYPE_SETTERS, type)
}

/**
 * 用于设置播放的索引
 */
mutations[types.PLAY_MUSIC_INDEX_SETTERS] = (state, index) => {
  state[types.PLAY_MUSIC_INDEX] = index
}
actions[types.PLAY_MUSIC_INDEX_SETTERS] = ({commit}, index) => {
  commit(types.PLAY_MUSIC_INDEX_SETTERS, index)
}

/**
 * 用于设置播放的current时间
 */
mutations[types.MUSIC_CURRENT_TIME_SETTERS] = (state, time) => {
  state[types.MUSIC_CURRENT_TIME] = time
}
actions[types.MUSIC_CURRENT_TIME_SETTERS] = ({commit}, time) => {
  commit(types.MUSIC_CURRENT_TIME_SETTERS, time)
}

/**
 * 用于设置音频的duration时长
 */
mutations[types.MUSIC_DURATION_TIME_SETTERS] = (state, time) => {
  state[types.MUSIC_DURATION_TIME] = time
}
actions[types.MUSIC_DURATION_TIME_SETTERS] = ({commit}, time) => {
  commit(types.MUSIC_DURATION_TIME_SETTERS, time)
}

/**
 * 设置音频播放声音大小
 */
mutations[types.MUSIC_VOL_SETTERS] = (state, vol) => {
  state[types.MUSIC_VOL] = vol
}
actions[types.MUSIC_VOL_SETTERS] = ({commit}, vol) => {
  commit(types.MUSIC_VOL_SETTERS, vol)
}

/**
 * 音频的播放详情
 */
mutations[types.MUSIC_PLAYING_DETAIL_SETTERS] = (state, detail) => {
  state[types.MUSIC_PLAYING_DETAIL] = detail
}
actions[types.MUSIC_PLAYING_DETAIL_SETTERS] = ({commit}, detail) => {
  commit(types.MUSIC_PLAYING_DETAIL_SETTERS, detail)
}

/**
 * 音频专辑的相近颜色设定
 */
mutations[types.MUSIC_PLAYING_COLOR_SETTERS] = (state, color) => {
  state[types.MUSIC_PLAYING_COLOR] = color
}
actions[types.MUSIC_PLAYING_COLOR_SETTERS] = ({commit}, color) => {
  commit(types.MUSIC_PLAYING_COLOR_SETTERS, color)
}

export default {
  state,
  getters,
  mutations,
  actions
}

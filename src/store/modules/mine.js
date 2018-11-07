import * as types from 'store/mutation-types'
import axios from 'utils/http'
import API from '@/api/index'
let state = {}

const getters = {}

let actions = {}
let mutations = {}

/**
 * 用户信息，歌单，收藏，mv，dj数量
 */
actions[types.MINE_AUTO_INFO] = ({commit}, uid) => {
  return new Promise((resolve, reject) => {
    axios.get(API.user.MINE_AUTO_INFO, {
      params: {
        uid
      }
    }).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

export default {
  state,
  getters,
  actions,
  mutations
}

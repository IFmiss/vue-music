import * as types from 'store/mutation-types'
import axios from 'utils/http'
import API from '@/api/index'
let state = {
  [types.USER_INFO_RES]: []
}

const getters = {
  [types.USER_INFO_GETTER]: state => state.USER_INFO_RES
}

let actions = {}
let mutations = {}

// 登录获取用户信息
mutations[types.USER_INFO_SETTER] = (state, data) => {
  state[types.USER_INFO_RES] = data
}

/**
 * 登录获取用户信息
 * @param { commit } 执行mutations
 * @param { Object } data 参数 包括data.type (phone || email)  和 data.password
 */
actions[types.USER_INFO_SETTER] = ({commit}, data) => {
  let url = data.type === 'phone' ? API.USER_LOGIN_PHONE : API.USER_LOGIN_EMAIL
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: {
        ...data
      }
    }).then(res => {
      commit(types.USER_INFO_SETTER, data)
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

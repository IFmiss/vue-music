import * as types from 'store/mutation-types'
import axios from 'utils/http'
import API from '@/api/index'
let state = {
  [types.USER_INFO_RES]: {},
  [types.USER_ACCOUNRT_RES]: {},
  [types.USER_PROFILE_RES]: {},
  [types.USER_BINDINGS_RES]: [],
  [types.USER_LOGIN_TYPE_RES]: null
}

const getters = {
  [types.USER_INFO_GETTER]: state => state.USER_INFO_RES,
  [types.USER_ACCOUNRT_GETTER]: state => state.USER_ACCOUNRT_RES,
  [types.USER_PROFILE_GETTER]: state => state.USER_PROFILE_RES,
  [types.USER_BINDINGS_GETTER]: state => state.USER_BINDINGS_RES,
  [types.USER_LOGIN_TYPE_GETTER]: state => state.USER_LOGIN_TYPE_RES
}

let actions = {}
let mutations = {}

/**
 * 登录获取所有用户信息
 */
mutations[types.USER_INFO_SETTER] = (state, data) => {
  state[types.USER_INFO_RES] = data
}

/**
 * 账户信息
 */
mutations[types.USER_ACCOUNRT_SETTER] = (state, data) => {
  state[types.USER_ACCOUNRT_RES] = data
}

/**
 * 个人信息
 */
mutations[types.USER_PROFILE_SETTER] = (state, data) => {
  state[types.USER_PROFILE_RES] = data
}

/**
 * 绑定信息
 */
mutations[types.USER_BINDINGS_SETTER] = (state, data) => {
  state[types.USER_BINDINGS_RES] = data
}

/**
 * 登陆类型信息
 */
mutations[types.USER_LOGIN_TYPE_SETTER] = (state, data) => {
  state[types.USER_LOGIN_TYPE_RES] = data
}

/**
 * 登录获取用户信息
 * @param { commit } 执行mutations
 * @param { Object } data 参数 包括data.type (phone || email)  和 data.password
 * 手机----------------：
 * 必选参数 : phone: 手机号码 password: 密码
 * 接口地址 : /login/cellphone
 * 调用例子 : /login/cellphone?phone=xxx&password=yyy
 * 邮箱----------------：
 * 必选参数 : email: 163 网易邮箱 password: 密码
 * 接口地址 : /login
 * 调用例子 : /login?email=xxx@163.com&password=yyy
 */
actions[types.USER_LOGIN] = ({commit}, data) => {
  let url = data.type === 'phone' ? API.USER_LOGIN_PHONE : API.USER_LOGIN_EMAIL
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: {
        ...data
      }
    }).then(res => {
      // 返回的数据添加到不同的state
      commit(types.USER_INFO_SETTER, res.data)
      commit(types.USER_ACCOUNRT_SETTER, res.data.account)
      commit(types.USER_PROFILE_SETTER, res.data.profile)
      commit(types.USER_BINDINGS_SETTER, res.data.bindings)
      commit(types.USER_LOGIN_TYPE_SETTER, res.data.loginType)
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

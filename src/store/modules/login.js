import * as types from 'store/mutation-types'
import axios from 'utils/http'
import API from '@/api/index'
import router from '@/router'

let state = {
  [types.LOGIN_STATUS]: {}
}

const getters = {
  [types.LOGIN_STATUS_GETTERS]: state => state.LOGIN_STATUS
}

let actions = {}
let mutations = {}

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
  let url = data.type === 'phone' ? API.login.USER_LOGIN_PHONE : API.login.USER_LOGIN_EMAIL
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: {
        ...data
      }
    }).then(res => {
      resolve(res)
    }, err => {
      reject(err)
    })
  })
}

/**
 * 获取用户的登陆状态
 */
mutations[types.LOGIN_STATUS_SETTERS] = (state, data) => {
  state[types.LOGIN_STATUS] = data
}

actions[types.LOGIN_STATUS_SETTERS] = ({commit}, data) => {
  return new Promise((resolve, reject) => {
    axios.get(API.login.USER_LOGIN_STATUS).then(res => {
      if (!res.data.bindings[0] || res.data.bindings[0].expired) {
        commit(types.LOGIN_STATUS_SETTERS, {})
        reject(new Error('登陆过期'))
        router.push('/login')
        return
      }
      commit(types.LOGIN_STATUS_SETTERS, res.data.profile)
      resolve(res)
    }, err => {
      commit(types.LOGIN_STATUS_SETTERS, {})
      router.push('/login')
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

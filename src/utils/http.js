import {vueProject} from '@/main.js'
import axios from 'axios'
// 全局的音乐播放api地址
const MUSIC_API = process.env.VUE_APP_MUSIC_URL
let http = axios.create({
  timeout: 15000,
  withCredentials: true,
  baseURL: MUSIC_API,
  params: {
    ts: new Date().getTime()
  }
})

/**
 * 请求拦截
 */
http.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

/**
 * 响应拦截
 */
http.interceptors.response.use(res => {
  console.log(res)
  if (res.data.code === 200) {
    return res
  }

  if ('success' in res.data) {
    return res
  }
  let msg = res.data.msg ? res.data.msg : '数据请求报错'
  vueProject.$msg({text: msg, background: '#FF3366'})
  return Promise.reject(res)
}, error => {
  return Promise.reject(error)
})
export default http

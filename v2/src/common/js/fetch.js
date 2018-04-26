import axios from 'axios'
import qs from 'qs'

const ajaxHost = 'http://www.daiwei.org/vue/server/music2.php?inAjax=1&do='
// request拦截器
axios.interceptors.request.use(
  config => {
  // loading
  console.log('loadding')
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  return Promise.reject(error)
})

// respone拦截器
axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  console.log('hide loadding')

  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    console.log(res.msg)
  }
  if (res.data && (!res.data.success)) {
    // alert(res.data.error_msg)
  }
  console.log('loadding')
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: process.env.BASE_API,
      url: `${ajaxHost}` + url,
      data: qs.stringify(data),
      timeout: 15000,
      headers: {
        // 'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: process.env.BASE_API,
      url: `${ajaxHost}` + url,
      params, // get 请求时带的参数
      timeout: 15000
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}

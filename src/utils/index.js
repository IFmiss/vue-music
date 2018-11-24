import Http from './http'
/**
 * 通用js 的一些代码
 */
export default {
  /**
   * 基于http.js二次封装
   * @param     { Sring }       url       请求地址
   * @param     { Object }      data      请求参数
   * @param     { String }      type      请求类型，get还是post  默认get
   * @return    { Promise }     返回一个Promise  resove会返回请求成功的数据，reject会提示错误
   */
  fetchData (url, data = {}, type = 'get') {
    return new Promise((resolve, reject) => {
      if (type.toLowerCase() === 'get') {
        Http.get(url, {
          params: {
            ...data
          }
        }).then(res => {
          resolve(res)
        }, err => {
          reject(err)
        })
        return
      }
      Http.post(url, data).then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  },

  /**
   * 返回图片的不同宽度的地址
   */
  changeImageSize (src, w = 300) {
    return `${src}?param=${w}y${w}`
  }
}

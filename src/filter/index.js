export default {
  /**
   * 返回听歌的用户数量 添加万 亿 单位的
   */
  parseNumber: (value) => {
    return value >= 100000 ? (value >= 100000000 ? (value / 100000000).toFixed(1) + '亿' : Math.floor(value / 10000) + '万') : value
  },

  /**
   * 返回倒计时时分秒
   */
  parseMusicTime: (value) => {
    let t = Math.floor(value)
    let m = Math.floor(t / 60)
    let s = t % 60
    let strS = (Array(2).join('0') + s).slice(-2)
    let strM = (Array(2).join('0') + m).slice(-2)
    return strM + ' : ' + strS
  }
}

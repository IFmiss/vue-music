export default {
  // 返回听歌的用户数量 添加万 亿 单位的
  parseNumber: (value) => {
    return value >= 100000 ? (value >= 100000000 ? (value / 100000000).toFixed(1) + '亿' : Math.floor(value / 10000) + '万') : value
  }
}

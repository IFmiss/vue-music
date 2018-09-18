// 全局的音乐播放api地址
const MUSIC_API = process.env.VUE_APP_MUSIC_URL

const API = {
  // 登录================================
  // 手机号
  USER_LOGIN_PHONE: `${MUSIC_API}/login/cellphone`,
  // 邮箱
  USER_LOGIN_EMAIL: `${MUSIC_API}/login`,
  // 登录刷新  可刷新登录状态
  USER_LOGIN_REFRESH: `${MUSIC_API}/login/refresh`,
  // 调用此接口,可获取登录状态
  USER_LOGIN_STATUS: `${MUSIC_API}/login/status`,
  // 音乐搜索
  MUSIC_SEARCH: `${MUSIC_API}/search`,

  // 获取用户信息，歌单，收藏，mv，dj数量
  MINE_AUTO_INFO: `${MUSIC_API}/user/subcount`
}
export default API

// 全局的音乐播放api地址
const MUSIC_API = process.env.VUE_APP_MUSIC_URL

const API = {
  // 登录
  // 手机号
  USER_LOGIN_PHONE: `${MUSIC_API}/login/cellphone`,
  // 邮箱
  USER_LOGIN_EMAIL: `${MUSIC_API}/login`,
  // 音乐搜索
  MUSIC_SEARCH: `${MUSIC_API}/search`
}
export default API

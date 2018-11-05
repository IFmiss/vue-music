const API = {
  // 登录================================
  // 手机号
  USER_LOGIN_PHONE: `/login/cellphone`,
  // 邮箱
  USER_LOGIN_EMAIL: `/login`,
  // 登录刷新  可刷新登录状态
  USER_LOGIN_REFRESH: `/login/refresh`,
  // 调用此接口,可获取登录状态
  USER_LOGIN_STATUS: `/login/status`,

  // banner 幻灯片列表
  BANNER_LISTS: `/banner`,

  // 获取推荐歌单
  RECOMMED_SHEET_LISTS: `/personalized`,

  // 每日推荐歌曲
  RECOMMED_SONGS_LISTS: `/recommend/songs`,

  // 最新音乐
  NEW_SHEET_LISTS: `/personalized/newsong`,

  // 音乐搜索
  MUSIC_SEARCH: `/search`,

  // 获取用户信息，歌单，收藏，mv，dj数量
  MINE_AUTO_INFO: `/user/subcount`
}
export default API

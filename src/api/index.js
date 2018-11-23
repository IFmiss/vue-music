const API = {
  /**
   * ====================
   * 登录
   * ====================
   */
  login: {
    // 手机号
    USER_LOGIN_PHONE: `/login/cellphone`,
    // 邮箱
    USER_LOGIN_EMAIL: `/login`,
    // 登录刷新  可刷新登录状态
    USER_LOGIN_REFRESH: `/login/refresh`,
    // 调用此接口,可获取登录状态
    USER_LOGIN_STATUS: `/login/status`
  },

  /**
   * ====================
   * 用户相关接口
   * ====================
   */
  user: {
    // 获取用户信息，歌单，收藏，mv，dj数量
    MINE_AUTO_INFO: `/user/subcount`
  },

  /**
   * ====================
   * 发现页面
   * ====================
   */
  find: {
    // banner 幻灯片列表
    BANNER_LISTS: `/banner`,

    // 音乐搜索
    MUSIC_SEARCH: `/search`,

    // 最新音乐
    NEW_SONG_LISTS: `/personalized/newsong`
  },

  /**
   * ====================
   * 歌单
   * ====================
   */
  sheet: {
    // 获取推荐歌单
    RECOMMEND_SHEET_LISTS: `/personalized`,

    // 每日推荐歌曲
    RECOMMEND_SONGS_LISTS: `/recommend/songs`,

    // 获取精品歌单
    HIGHT_QUALITY_SHEET_LISTS: `/top/playlist/highquality`,

    // 调用此接口 , 可获取网友精选碟歌单
    // parmas: cat=华语 分类
    SHEET_LISTS: `/top/playlist`,

    // 获取歌单分类
    CAT_LISTS: `/playlist/catlist`,

    // 获取歌单详情  参数id为歌单id
    SHEET_DETAIL_LISTS: `/playlist/detail`,

    // 获取排行榜信息
    RANK_SHEET_LISTS: `/toplist/detail`
  },

  /**
   * ====================
   * 音乐详情
   * ====================
   */
  music: {
    // 获取歌词
    MUSIC_LRC: '/lyric'
  }
}
export default API

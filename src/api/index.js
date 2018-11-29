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
    RANK_SHEET_LISTS: `/toplist/detail`,

    // 获取专辑列表信息  参数id
    SHEET_ALBUM_LISTS: `/album`,

    // 歌单收藏 | 取消收藏
    // t : 类型,1:收藏,2:取消收藏 id : 歌单 id
    SHEET_SUBSCRIBE: `/playlist/subscribe`
  },

  /**
   * ====================
   * 音乐详情
   * ====================
   */
  music: {
    // 获取歌词
    MUSIC_LRC: '/lyric',
    // 获取音乐详情
    MUSIC_DETAIL: '/song/detail',
    // 检查音乐是否可以播放
    CHECK_MUSIC: '/check/music'
  },

  /**
   * ====================
   * 搜索相关接口
   * ====================
   */
  search: {
    /**
     * 必选参数 : keywords : 关键词
     * 可选参数 :
     * limit : 返回数量 , 默认为 30
     * offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0
     * type: 搜索类型；默认为 1 即单曲 , 取值意义 : 1: 单曲 10: 专辑 100: 歌手 1000: 歌单 1002: 用户 1004: MV 1006: 歌词 1009: 电台
     */
    // 调用此接口 , 传入搜索关键词可获得搜索建议 , 搜索结果同时包含单曲 , 歌手 , 歌单 ,mv 信息
    SEARCH_SUGGEST: '/search/suggest',

    // 说明 : 调用此接口,可获取热门搜索列表
    SEARCH_HOT: '/search/hot',

    // 说明 : 调用此接口 , 传入搜索关键词可以搜索该音乐 / 专辑 / 歌手 / 歌单 / 用户 , 关键词可以多个 , 以空格隔开 , 如 " 周杰伦 搁浅 "( 不需要登录 ), 搜索获取的 mp3url 不能直接用 , 可通过 /song/url 接口传入歌曲 id 获取具体的播放链接
    SEARCH_MAIN: '/search'
  }
}
export default API

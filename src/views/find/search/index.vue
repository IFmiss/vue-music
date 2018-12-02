// 搜索
<template lang="pug">
  .search
    .header
      .input-area
        i.icon-menu
        input(ref="searchRef", v-model="keywords", type="search")
      .span.easy-click(@click="back") 取消
    .content
      SearchingPanel(v-if="showRecommend", @search="searchItem")
      .result-info(v-else)
        .result-type
          .type(v-for="item in type" :class="{'active': currentType === item.code}" @click="selectType(item.code)") {{item.name}}
        .result-content
          Loading(v-if="isLoad")
          .result-detail(v-else)
            .title-tip(v-if="currentType === 0 && result.songs && result.songs.length") 单曲
            MusicList(v-if="result.songs && result.songs.length"
                      v-for="(song, index) in result.songs"
                      :index="index" :name="song.name"
                      :singer="song.artists"
                      :id="song.id"
                      :list="song"
                      :playSheet="playSheet(song.id)"
                      @play="playMusic")

            .title-tip(v-if="currentType === 0 && result.playlists && result.playlists.length") 歌单
            SSheet(v-if="result.playlists && result.playlists.length" v-for="sheet in result.playlists"
                  :list="sheet")

            //- .title-tip(v-if="currentType === 0 && result.albums && result.albums.length") 单曲
            SAlbum(v-if="result.albums && currentType !== 0 && result.albums.length" v-for="album in result.albums"
                  :list="album")

            SUser(v-if="result.userprofiles && currentType !== 0 && result.userprofiles.length" v-for="user in result.userprofiles"
                  :list="user")

            .title-tip(v-if="currentType === 0 && result.artists && result.artists.length") 歌手
            SSinger(v-if="result.artists && result.artists.length" v-for="singer in result.artists"
                  :list="singer", :size="currentType === 0 ? 'big' : ''")
</template>
<script>
import Loading from 'components/loading'
import API from 'api'
import SearchingPanel from './searchingPanel'
import MusicList from 'components/musiclist'
import SSheet from './sheet'
import SAlbum from './album'
import SUser from './user'
import SSinger from './singer'
import music from 'utils/music'
import { mapState } from 'vuex'
export default {
  // type: 搜索类型；默认为 1 即单曲 , 取值意义 :
  // 1: 单曲
  // 10: 专辑
  // 100: 歌手
  // 1000: 歌单
  // 1002: 用户
  // 1004: MV
  // 1006: 歌词
  // 1009: 电台
  // 1014: 视频
  data () {
    return {
      keywords: '',
      currentType: 0,
      limit: 40,
      offset: 0,
      isLoad: true,
      type: [
        {
          name: '综合',
          code: 0
        },
        {
          name: '单曲',
          code: 1
        },
        {
          name: '专辑',
          code: 10
        },
        {
          name: '歌手',
          code: 100
        },
        {
          name: '歌单',
          code: 1000
        },
        {
          name: '用户',
          code: 1002
        },
        {
          name: 'MV',
          code: 1004
        },
        {
          name: '歌词',
          code: 1006
        },
        {
          name: '电台',
          code: 1009
        },
        {
          name: '视频',
          code: 1014
        }
      ],
      // 搜索结果
      result: {}
    }
  },
  components: {
    SearchingPanel,
    Loading,
    MusicList,
    SSheet,
    SAlbum,
    SUser,
    SSinger
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    /**
     * 选择类型
     */
    selectType (code) {
      if (!this.$dutils.utils.strTrim(this.keywords, 0)) {
        this.$msg('请输入搜索的内容')
        return
      }
      this.isLoad = true
      this.currentType = code
      this.offset = 0
      this.getSearchData()
    },

    /**
     * 获取搜索返回的数据结果
     */
    async getSearchData () {
      this.isLoad = true
      let res
      if (this.currentType === 0) {
        res = await this.$mutils.fetchData(API.search.SEARCH_SUGGEST, {
          limit: this.limit,
          offset: this.offset,
          keywords: this.keywords
        })
      } else {
        res = await this.$mutils.fetchData(API.search.SEARCH_MAIN, {
          limit: this.limit,
          offset: this.offset,
          keywords: this.keywords,
          type: this.currentType
        })
      }

      this.saveSearchDataInfo(this.keywords)

      this.isLoad = false
      // 设置歌曲
      this.result = res.data.result || {}
    },

    /**
     * 搜索点击的内容
     */
    searchItem (item) {
      this.keywords = item
      this.$router.replace({
        path: '/main/search',
        query: {
          limit: this.limit,
          offset: 0,
          keywords: item,
          type: 0
        }
      })
      this.$refs.searchRef.focus()
      this.initDataInfo()
      this.initSearchEvent()
    },

    /**
     * 存储搜索数据至本地，且去重
     */
    saveSearchDataInfo (keywords) {
      let data = JSON.parse(localStorage.getItem(API.storage.SEARCH_LISTS)) || []
      data.unshift(keywords)
      let storageD = this.$dutils.store.getRandomDataFromArr(data, 10)
      localStorage.setItem(API.storage.SEARCH_LISTS, JSON.stringify(storageD))
    },

    /**
     * 播放单曲 搜索的歌单id 我们设置为 -2
     * 由于需要判断音乐是否是播放状态，以及存储播放的列表
     * 而且由于者些并不是正常的歌单，没有歌单id
     * 所以规定搜索列表的id都是 -2
     */
    playSheet (id) {
      return this.playSheetId === -2 && this.musicPlayingListId === id
    },

    /**
     * 搜素请求再input变化的时候请求数据，需要一个防抖操作
     */
    initSearchEvent () {
      this.$refs.searchRef.oninput = this.$dutils.utils.debounce(() => {
        if (!this.showRecommend) {
          this.getSearchData()
        }
      }, 1000, false)
    },

    // 播放点击的音乐
    playMusic (index) {
      this.saveSheetList(index)
    },

    /**
     * 保存歌单信息
     */
    saveSheetList (index) {
      let data = {
        lists: this.result.songs,
        index,
        id: -2
      }
      music.saveSheetList(data)
    },

    /**
     * url地址的替换
     * 动态配置url
     */
    replaceUrl () {
      this.$router.replace({
        path: '/main/search',
        query: {
          limit: this.limit || 30,
          type: this.currentType || 0,
          keywords: this.keywords,
          offset: this.offset || 0
        }
      })
    },
    /**
     * 初始化data的数据
     */
    initDataInfo () {
      this.limit = Number(this.$route.query.limit) || 30
      this.currentType = Number(this.$route.query.type) || 0
      this.keywords = this.$route.query.keywords || ''
      this.offset = Number(this.$route.query.offset) || 0

      if (!this.keywords) return
      this.getSearchData()
    }
  },
  computed: {
    ...mapState({
      playSheetId: state => state.Music['PLAY_MUSIC_LISTS_ID'],
      musicPlayingListId (state) {
        let music = state.Music
        if (!music['PLAY_MUSIC_LISTS']) return
        return music['PLAY_MUSIC_LISTS'][music['PLAY_MUSIC_INDEX']].id
      }
    }),
    showRecommend () {
      return this.$dutils.utils.strTrim(this.keywords, 0).length === 0
    }
  },
  mounted () {
    this.$refs.searchRef.focus()
    this.initDataInfo()
    this.initSearchEvent()
  }
}
</script>

<style lang="scss" scoped>
.search{
  .header{
    height: $auto_h;
    background: $primary_color;
    display: flex;
    align-items: center;
    padding: 0 $auto_padding_l_r * 2;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    .input-area{
      flex:1 1 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-right: $auto_padding_l_r * 1.5;
      height: p2r(0.52rem);
      border-radius: p2r(0.26rem);
      border: none;
      outline: none;
      background: rgba(255,255,255,0.1);
      z-index: 1;
      color: rgba(255,255,255,0.8);
      text-indent: p2r(0.1rem);
      font-size: $f_small_l;
      padding: 0 p2r(0.04rem);
      box-sizing: border-box;
      i{
        margin: p2r(0.04rem);
        font-size: $f_small_s;
        flex: 0 0 p2r(0.32rem);
      }
      input{
        flex: 1 1 auto;
        overflow: hidden;
        height: p2r(0.52rem);
        border-radius: p2r(0.26rem);
        border: none;
        outline: none;
        background: transparent;
        z-index: 1;
        color: rgba(255,255,255,0.8);
        text-indent: p2r(0.06rem);
        font-size: $f_small_l;
        padding: 0 p2r(0.04rem);
        box-sizing: border-box;
      }
    }
    .span{
      flex: 0 0 p2r(0.6rem);
      font-size: $f_small_x;
      color: $text_active;
      position: relative;
    }
  }
  .content{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: $auto_h;
    .result-type::-webkit-scrollbar {
      display: none
    }
    .result-info{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      top: 0;
      .result-type{
        width: 100%;
        height: p2r(0.56rem);
        line-height: p2r(0.4rem);
        overflow-y: auto;
        text-align: left;
        font-size: 0;
        padding: 0 $auto_padding_l_r;
        background: $primary_color;
        white-space: nowrap;
        box-sizing: border-box;
        .type{
          font-size: $f_small_m;
          color: $text_noactive;
          display: inline-block;
          margin: 0 $auto_padding_l_r * 1.8;
          &.active{
            color: $text_active;
            position: relative;
            &::before{
              content: '';
              position: absolute;
              left: 50%;
              bottom: - p2r(0.1rem);
              height: p2r(0.04rem);
              border-radius: p2r(0.02rem);
              background: #fff;
              transform: translate3d(-50%, 0, 0);
              width: 60%;
            }
          }
        }
      }
      .result-content{
        position: absolute;
        top: p2r(0.56rem);
        bottom: 0;
        overflow: auto;
        left: 0;
        right: 0;
        .result-detail{
          position: relative;
          .title-tip{
            text-align: left;
            font-size: $f_small_l;
            padding: $auto_padding_l_r * 2 $auto_padding_l_r * 1.5 $auto_padding_l_r $auto_padding_l_r * 1.5;
          }
        }
      }
    }
  }
}
</style>

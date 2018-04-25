<template>
  <div class="find">
    <searchhead></searchhead>
    <scroll :data="musicInfo" class="find_content" :pullUpLoad="true" :pullingUp="pullingUp">
        <div class="content">
          <div class="scroll_info">
            <img src="" alt="">
          </div>
          <div class="find_nav">
            <li class="nav_fm">
              <div class="find_icon">
                <i class="icon-fm"></i>
              </div>
              <span class="nav_name">私人FM</span>
            </li>
            <li class="nav_fm">
              <div class="find_icon">
                <i class="icon-date"></i>
              </div>
              <span class="nav_name">每日推荐</span>
            </li>
            <li class="nav_fm">
              <div class="find_icon">
                <i class="icon-list-music"></i>
              </div>
              <span class="nav_name">歌单</span>
            </li>
            <li class="nav_fm">
              <div class="find_icon">
                <i class="icon-rank-list"></i>
              </div>
              <span class="nav_name">排行榜</span>
            </li>
          </div>
        </div>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p><p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p><p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>

        <p>11111</p>
        <p>11111</p><p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
        <p>11111</p>
    </scroll>
  </div>
</template>

<script>
import searchhead from 'components/common/searchhead/searchhead'
import scroll from 'components/common/scroll/scroll'
export default {
  name: 'find',
  data () {
    return {
      musicInfo: []
    }
  },
  methods: {
	pullingUp () {
		alert(1)
	}
  },
  components: {
    searchhead,
    scroll
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $scroll_info_h: px75rem(300);
  .find_content{
    position: absolute;
    top: $searchhead_h;
    bottom:0;
    right:0;
    left:0;
    background: #fff;
    overflow:hidden;
    .scroll_info{
      width: 100%;
      height: $scroll_info_h;
      background: $m_color_primary;
      position:relative;
      &:after{
        content: '';
        position: absolute;
        bottom: 0;
        right:0;
        left:0;
        height: 30%;
        // background: #fff;
        z-index: 1;
      }
    }
    .find_nav{
      @include display-flex;
      @include align-items(center);
      padding: px75rem(15) 0;
      .nav_fm{
        list-style: none;
        @include flex(1);
        @include display-flex;
        @include flex-direction(column);
        margin: 0;
        .find_icon{
          width: 1rem;
          height: 1rem;
          margin: 0 auto;
          position: relative;
          @include display-flex;
          &:before{
            content: '';
            @include fixedfull();
            position: absolute;
            border:1px solid $m_color_primary;
            @include border-radius(50%);
          }
          i{
            font-size: px75rem(52);
            color: $m_color_primary;
            position:absolute;
            top: 50%;
            left: 50%;
            @include translate(-50%, -50%);
          }
        }
        span{
          padding-top: 3px;
          font-size: 14px;
        }
      }
    }
  }
</style>

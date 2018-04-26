<template>
  <div class="sheetlist">
    <div class="tag">
      <h3 class="name">推荐歌单</h3>
      <i class="icon-right"></i>
    </div>
    <div class="content">
      <div class="sheet-list" v-if="data && data.playlists.length" v-for="(item, index) in data.playlists" :key="item.id">
        <div class="sheet-detail" :data-name="item.name">
          <div class="img-top" :data-name="item.name" :data-index="index" :data-id="item.id" :style="{backgroundImage : 'url(' + item.coverImgUrl + ')', backgroundSize:'cover', backgroundPosition:'center'}">
            <div class="img-detail">
              <i class="icon-erji"></i>
              <span class="count">{{item.playCount > 10000 ? Math.floor(item.playCount / 10000) + '万' : item.playCount}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      data: {}
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
  .sheetlist{
    width: 100%;
    height: auto;
    margin: px75rem(50) 0 0 0;
    .tag{
      color: $m_text_gray_l;
      font-size: 16px;
      @include display-flex;
      @include align-items(center);
      i{
        vertical-align:center;
      }
      .name{
        margin: px75rem(20) 0;
        @include box-sizing(border-box);
        padding: 0 px75rem(5);
        font-size: 18px;
      }
    }
    .content{
      width:100%;
      @include display-flex;
      @include align-items(center);
      @include flex-wrap(wrap);
      @include justify-content(space-between);
      .sheet-list{
        width: 32%;
        height: auto;
        position:relative;
        margin-bottom: px75rem(15);
        .sheet-detail{
          .img-top{
            width: 100%;
            height:0;
            background-color: #333;
            padding-top: 100%;
            @include border-radius(4px);
            .img-detail{
              position:absolute;
              top:0;
              left:0;
              right:0;
              height: px75rem(80);
              @include textoneline();
              font-size: 14px;
              color: #fff;
              text-align:right;
              @include box-sizing(border-box);
              padding: 0 px75rem(8);
            }
            &:before{
              content: '';
              position: absolute;
              top: 0;
              left:0;
              right:0;
              bottom: 80%;
              @include background(linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0)))
            }
          }
          &:after{
            content: attr(data-name);
            @include lineclamp(80, 2);
            font-size: 12px;
            text-align:left;
          }
        }
      }
    }
  }
</style>

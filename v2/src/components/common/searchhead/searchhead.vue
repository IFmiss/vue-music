<template>
  <div class="searchhead">
  	<i class="icon-message clickfull"></i>
  	<div class="input-info">
  		<input type="text">
  		<p class="search-div">
  			<span class="icon-message"></span>
  			<span class="search-text">发现音乐</span>
  		</p>
  	</div>
  	<i class="icon-message clickfull"></i>
  	<span class="cancel">取消</span>
  </div>
</template>

<script>
export default {
  name: 'searchhead'
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $icon_w: 50px;
  $icon_h: 30px;
  .searchhead{
    width: 100%;
    @include display-flex;
    padding: 5px;
    @include box-sizing(border-box);
    position: relative;
    i{
      width: $icon_w;
      height: $icon_h;
      line-height: $icon_h;
    }
    .input-info{
      @include flex(1 1 auto);
      position: relative;
      padding: 1px 0;
      input{
        width: 100%;
        margin: 0 auto;
        border: none;
        @include border-radius(($icon_w - 2px) / 2)
        height: $icon_h - 2px;
        outline: none;
        padding: 0;
      }
      .search-div{
        margin: 0;
        position: absolute;
        top:0;
        left: 0;
        right: 0;
        bottom: 0;
        @include display-flex;
        @include align-items(center);
        @include justify-content(center);
        span{
          font-size: 12px;
        }
      }
    }
    .cancel{
      position: absolute;
      right: -40px;
    }
  }
</style>

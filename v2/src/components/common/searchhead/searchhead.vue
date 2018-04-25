<template>
  <div class="searchhead">
		<i class="icon-message clickfull"></i>
		<div class="input-info">
			<input type="search">
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
  $icon_w: px75rem(80);
  $icon_h: px75rem(50);
  $input_bg: #DD5556;
  .searchhead{
    width: 100%;
    @include display-flex;
    height: $searchhead_h;
    @include align-items(center);
    position: relative;
    background: $m_color_primary;
    i{
		width: $icon_w;
		height: $icon_h;
		line-height: $icon_h;
		font-size: 18px;
    }
    .input-info{
		@include flex(1 1 auto);
		position: relative;
		padding: 1px 0;
		color: $m_text_color;
		height: 100%;
		@include display-flex;
		@include align-items(center);
		input{
			width: 100%;
			margin: 0 auto;
			border: none;
			@include border-radius(px75rem(48 / 2));
			height: px75rem(48);
			outline: none;
			background: $input_bg;
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
      font-size: 12px;
    }
  }
</style>

<template>
	<div class="findsheettitle">
		<span class="name">推荐歌单</span>
		<i class="icon icon-right"></i>
	</div>
</template>
<script>
	export default {
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	.findsheettitle
		box-sizing:border-box
		height:40px
		line-height:40px
		position:relative
		.name
			display:inline-block
			vertical-align:middle
			height:18px
			line-height:18px
			position:relative
			color:#333
			font-size:16px
			font-weight:400
			padding-left:12px
			&:before
				content:''
				position:absolute
				top:0
				left:0
				height:100%
				width:3px
				background:$primarycolor
		.icon
			display:inline-block
			font-size:16px
			color:$icon_color
			vertical-align:middle
</style>

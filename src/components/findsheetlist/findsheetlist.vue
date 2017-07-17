<template>
	<div class="findsheetlist">
		<img class="image" src="http://oiq8j9er1.bkt.clouddn.com/music_%E9%82%A3%E4%BA%9B%E4%BD%A0%E5%BE%88%E5%86%92%E9%99%A9%E7%9A%84%E6%A2%A6.jpg" alt="">
		<span class="toprighttips"><i class="icon icon-music"></i>400万</span>
		<span class="bottomtips">this is bottom tips</span>
	</div>
</template>
<script>
	export default {
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	.findsheetlist
		display:inline-block
		width:100%
		box-sizing:border-box
		height:auto
		position:relative
		.image
			width:100%
		.toprighttips
			height:22px
			line-height:22px
			display:block
			position:absolute
			top:0
			left:0
			right:0
			color:#fff
			font-size:12px
			font-weight:400
			text-align:right
			padding:0 6px
			letter-spacing:1px
			.icon
				margin-right:3px
		.bottomtips
			font-size:12px
			font-weight:400
			padding:0 6px
			color:#fff
			height:22px
			line-height:22px
			position:absolute
			bottom:0
			left:0
			right:0
</style>

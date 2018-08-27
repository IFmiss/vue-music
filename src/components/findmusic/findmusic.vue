<template>
	<div class="findmusic">
		<div class="find-menu">
			<router-link class="menu-list" tag="div" to="/findmusic/findrecommend">
				<div class="menu-list-div">个性推荐</div>
			</router-link>
			<router-link class="menu-list" tag="div" to="/findmusic/findsheet">
				<div class="menu-list-div">歌单</div>
			</router-link>
			<router-link class="menu-list" tag="div" to="/ccc">
				<div class="menu-list-div">主播电台</div>
			</router-link>
			<router-link class="menu-list" tag="div" to="/ddd">
				<div class="menu-list-div">排行榜</div>
			</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>
<script>
	import findrecommend from '../findrecommend/findrecommend.vue'
	import findsheet from '../findsheet/findsheet.vue'
	export default {
		components: {
			findrecommend: findrecommend,
			findsheet: findsheet
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	.findmusic
		position:fixed
		background:#fff
		overflow:auto
		top:50px
		bottom:46px
		left:0
		right:0
		z-index:11
		background:#f3f3f3
		-webkit-overflow-scrolling:touch
		.find-menu
			position:fixed
			height:36px
			width:100%
			line-height:36px
			background:#fff
			overflow:hidden
			display:flex
			.menu-list
				flex: 1
				width:25%
				overflow:hidden
				text-align:center
				cursor:pointer
				font-size:14px
				position:relative
				font-weight:500
				&.router-link-active
					color:$primarycolor
					&:after
						content:''
						position:absolute
						background:$primarycolor
						bottom:0
						height:2px
						left:0
						right:0
				&:active
					background:$list_active
</style>

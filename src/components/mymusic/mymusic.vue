<template>
	<div class="mymusic">
		<type-list name="我的音乐" count="28" :playing="true"></type-list>
		<type-list name="最近播放" count="18"></type-list>
		<type-list name="下载管理" count="32"></type-list>
		<type-list name="我的收藏" count="3"></type-list>
		<type-list name="我的电台" count="1" :has-border="false"></type-list>
	</div>
</template>
<script>
	import typelist from '../typelist/typelist.vue'
	export default {
		components: {
			'type-list': typelist
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "./../../common/font-icon/style.css"
	@import "./../../common/stylus/global.styl"
	.mymusic
		position:fixed
		background:#fff
		overflow:scroll
		top:50px
		bottom:46px
		left:0
		right:0
		z-index:7
		-webkit-overflow-scrolling:touch
</style>

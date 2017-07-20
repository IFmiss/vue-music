<template>
	<div class="mymusic">
		<type-list name="我的音乐" iconinfo="icon-music" count="28" :playing="true"></type-list>
		<type-list name="最近播放" iconinfo="icon-zuijinplay" count="18"></type-list>
		<type-list name="我的电台" iconinfo="icon-diantai" count="1"></type-list>
		<type-list name="我的收藏" iconinfo="icon-collect" count="3" :has-border="false"></type-list>
		<musicsheet v-for="(item, index) in items" :item="item" :index="index" :key="item.id"></musicsheet>
    	<!-- 底部显示的菜单列表 -->
   		<menu-list></menu-list>
	</div>
</template>
<script>
	import musicsheet from '../musicsheet/musicsheet.vue'
	import typelist from '../typelist/typelist.vue'
	import menulist from '../menulist/menulist.vue'
	export default {
		computed: {
			items () {
				return this.$store.getters.getMusicAllList.sheets
			}
		},
		components: {
			'type-list': typelist,
			musicsheet,
			'menu-list': menulist
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "./../../common/stylus/global.styl"
	.mymusic
		position:fixed
		background:#fff
		overflow:auto
		top:50px
		bottom:46px
		left:0
		right:0
		z-index:9
		-webkit-overflow-scrolling:touch
</style>

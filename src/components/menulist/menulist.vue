<template>
	<div class="menulist">
		<transition name="sideUp">
			<div class="content" v-show="showMenu">
				<p class="title">
					歌单:操作自己想操作的内容
				</p>
				<type-list name="分享" iconinfo="icon-SHARE" count="none" bgcolor="#fff"></type-list>
				<type-list name="编辑" iconinfo="icon-zuijinplay" count="none" bgcolor="#fff"></type-list>
				<type-list name="删除" iconinfo="icon-diantai" count="none" bgcolor="#fff"></type-list>
			</div>
		</transition>
		<transition name="fade">
			<div class="mask" v-show="showMenu" @click="hideMenuList" @touchmove.stop.prevent="stopTouch($event)">
			</div>
		</transition>
	</div>
</template>

<script>
	import store from './../../store'
	import typelist from '../typelist/typelist.vue'
	export default {
		methods: {
			stopTouch (event) {
				return
			},
			hideMenuList () {
				store.dispatch({
					type: 'hideMenuList'
				})
			}
		},
		computed: {
			showMenu () {
				return this.$store.state.menuList.isShow
			}
		},
		components: {
			'type-list': typelist
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/font-icon/font.css"
	@import "../../common/stylus/border-1px/index.styl"
	@import "../../common/stylus/global.styl"
	
	.menulist
		font-size:12px
		.content
			background:#fff
			position:fixed
			z-index:12
			height:auto
			bottom:0
			left:0
			right:0
			padding:25px 0 10px 0
			&.sideUp-enter-to,&.sideUp-leave-to
				transition: transform 0.3s
			&.sideUp-enter,&.sideUp-leave-to
				transform:translate3d(0,100%,0)
			.title
				margin:0
				padding:2px 15px
		.mask
			position:fixed
			top:0
			left:0
			bottom:0
			right:0
			z-index:11
			opacity:1
			background:$maskBackground
			&.fade-enter-to,&.fade-leave-to
				transition: opacity 0.3s
			&.fade-enter,&.fade-leave-to
				opacity:0
</style>

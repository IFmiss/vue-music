<template>
	<div class="sideabr" @touchmove.stop="stopTouch($event)" v-show="isReallShow">
		<transition name="fade">
			<div class="menu-mask"></div>
		</transition>	

		<transition name="side">
			<div class="menu-content">
				
			</div>
		</transition>
	</div>
</template>

<script>
	import store from './../../store'
	export default {
		methods: {
			stopTouch (event) {
				return
			}
		},
		computed: {
			isReallShow () {
				return store.state.sideBar.isShow
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/font-icon/font.css"
	@import "../../common/stylus/global.styl"
	.sideabr
		.menu-mask
			position:fixed
			top:0
			left:0
			bottom:0
			right:0
			opacity: 1
			background:rgba(0,0,0,0.5)
			&.fade-enter-to, &.fade-leave-to
				transition: all 1s ease;
			&.fade-enter, &.fade-leave-to
				opacity:0
				background:rgba(0,0,0,0)
		.menu-content
			position:fixed
			width:280px
			height:100%	
			top:0
			left:0
			bottom:0
			background:#fff	
			&.side-enter-to, &.side-leave-to
				transition: all 1s ease;
			&.side-enter, &.side-leave-to
				left:-280px

</style>

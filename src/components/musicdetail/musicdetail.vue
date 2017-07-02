<template>
	<transition name="sliderUpHideRight">
		<div class="musicdetail" v-show="isShowMusicDetail">
			<div class="filterbg" :style="{background:'url('+getCurrentMusic.img_url+')'}">
			</div>
			<div class="content">
				<i class="back icon-music" @click="hideMusicDetail"></i>
			</div>
		</div>
	</transition>
</template>
<script>
	import store from './../../store'
	export default {
		methods: {
			hideMusicDetail () {
				store.dispatch({
					type: 'set_MusicDetail',
					isShow: false
				})
			}
		},
		computed: {
			isShowMusicDetail () {
				return this.$store.getters.getMusicDetail
			},
			getCurrentMusic () {
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic : ''
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.musicdetail
		position:fixed
		top:0
		left:0
		bottom:0
		right:0
		z-index:15
		transform:translate3d(0,0,0)
		background:cover
		background-size:cover
		background:#aaa
		.filterbg
			position:fixed
			height:100%
			width:100%
			top:0
			left:0
			bottom:0
			right:0
			z-index:16
			filter: url(../../common/blur.svg#blur); 
			filter:blur(10px)
		.content
			position:fixed
			height:100%
			width:100%
			top:0
			left:0
			bottom:0
			right:0
			z-index:17
			.back
				position:absolute
				width:50px
				height:50px
				color:#fff
				font-size:24px
				
		&.sliderUpHideRight-enter-to,&.sliderUpHideRight-leave-to
			transition: all 0.3s
		&.sliderUpHideRight-enter
			transform:translate3d(0,100%,0)
			opacity: 0
		&.sliderUpHideRight-leave-to
			transform:translate3d(100%,0,0)
			opacity: 0
		// &.sliderUpHideRight-leave-to
		// 	transform:translate3d(100%,0,0)	
</style>

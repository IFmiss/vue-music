<template>
	<div class="bottom-bar">
		<div class="music-info">
			<img class="music-pic" src="http://oiq8j9er1.bkt.clouddn.com/music_imissyou.jpg" alt="">
			<div class="music-detail">
				<p class="music-name">I miss you</p>
				<p class="music-singer">罗百吉</p>
			</div>
		</div>
		<div class="playpause" @click="playpause">
			<i class="icon-music"></i>
		</div>
		<i class="music-list icon-menu"></i>
	</div>
</template>
<script>
	export default {
		props: {
			video: {}
		},
		data () {
			return {
				myvideo: {}
			}
		},
		methods: {
			playpause () {
				this.myvideo.setAttribute('src', 'http://oiq8j9er1.bkt.clouddn.com/%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E4%B8%80%E5%8D%83%E5%B9%B4%E4%BB%A5%E5%90%8E.mp3')
				this.myvideo.play()
			}
		},
		mounted () {
			this.myvideo = this.video
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "./../../common/stylus/global.styl"
	.bottom-bar
		position:fixed
		z-index:9
		background:#fff
		bottom:0
		height:46px
		padding:5px
		box-sizing:border-box
		left:0
		right:0
		display:flex
		.music-info
			position:relative
			flex:1 1 auto
			height:100%
			display:flex
			.music-detail
				flex:1 1 auto
				padding: 0 5px
				display:flex
				flex-direction:column
				justify-content:space-around
				@media screen and (max-width: 320px)
					p
						max-width:160px
				@media screen and (max-width: 375px)
					p
						max-width:210px
				@media screen and (max-width: 414px)
					p
						max-width:250px
				@media screen and (min-width: 768px)
					p
						max-width:580px
				p
					width:100%
					margin:0
					text-overflow:ellipsis
					white-space:nowrap
					overflow:hidden
					&.music-name
						font-size:14px
						font-weight:400
						color:#333
						padding:2px 0
					&.music-singer
						color:#aaa
						font-size:10px
						font-weight:200
						padding:2px 0
			.music-pic
				flex:0 0 36px
				width:36px
				height:36px
		.playpause i,.music-list
			display:block
			flex:0 0 36px
			width:36px
			height:100%
			line-height:36px
			text-align:center
			margin-left:10px
			font-size:28px
			&:active
				background:$list_active
		
</style>

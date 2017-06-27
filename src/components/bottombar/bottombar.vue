<template>
	<div class="bottom-bar">
		<div class="music-info">
			<img class="music-pic" :src="musicImage" alt="">
			<div class="music-detail">
				<p class="music-name" v-if="musicName">{{musicName}}</p>
				<p class="music-singer" v-if="musicSinger">{{musicSinger}}</p>
			</div>
		</div>
		<div class="playpause" @click="playpause">
			<i :class="iconPlayPause?'icon-menu':'icon-music'"></i>
		</div>
		<i class="music-list icon-menu" @click="playNext"></i>
	</div>
</template>
<script>
	import store from '../../store'
	// import { mapState } from 'vuex'
	export default {
		data () {
			return {
				audioInfo: {
				},
				myaudio: {},
				state: {
					isplaying: false,
					loading: false,
					currentIndex: 0
				}
			}
		},
		methods: {
			// 控制音乐播放暂停
			playpause () {
				if (this.audioInfo.playing) {
					store.commit('pause')
					this.audioInfo.audioelement.pause()
				} else {
					store.commit('play')
					this.audioInfo.audioelement.play()
				}
			},
			// 显示播放列表
			playNext () {
				store.dispatch('play_Next')
			}
		},
		computed: {
			iconPlayPause () {
				return this.audioInfo.playing
			},
			// 获取音乐名称
			musicName () {
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.name : ''
			},
			// 获取歌手名称
			musicSinger () {
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.singer : ''
			},
			// 获取音乐封面地址
			musicImage () {
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.img_url : ''
			},
			// 获取音乐播放地址
			musicUrl () {
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic.url : ''
			}
		},
		mounted () {
			// 所有的audio的 vuex 的状态信息
			this.audioInfo = this.$store.state.audioInfo
			// 音乐是否play
			this.state.isplaying = this.audioInfo.playing
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
				@media screen and (max-width: 414px)
					p
						max-width:250px
				@media screen and (max-width: 375px)
					p
						max-width:210px
				@media screen and (max-width: 320px)
					p
						max-width:160px
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

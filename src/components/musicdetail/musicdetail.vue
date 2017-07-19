<template>
	<transition name="sliderUpHideRight">
		<div class="musicdetail" v-show="isShowMusicDetail">
			<div class="filterbg" :style="{background : 'url(' + this.getCurrentMusic.img_url + ')', backgroundSize : 'cover' , backgroundPosition : 'center center'}">
			</div>
			<div class="detailcontent">
				<div class="content-header">
					<i class="back icon-back" @click="hideMusicDetail"></i>
					<div class="musicTopDetail">
						<p class="name">{{getCurrentMusic.name}}</p>
						<p class="singer">{{getCurrentMusic.singer}}</p>
					</div>
					<i class="share icon-share"></i>
				</div>
				<transition name="fade">
					<div class="content-wrapper" v-show="showCD" @click.stop="isShowCD(false)">
						<div class="cd">
							<div class="swith-line">
								<div class="triger" :class="isPlaying ? '' : 'pause'"></div>
							</div>
							<div class="cd-content" ref="cdcontent">
								<div class="wrapper" ref="cd" :class="isPlaying ? 'animate ' : ''">
									<div class="cd-bg"></div>
									<img class="img" :src="getCurrentMusic.img_url" alt="">
								</div>
							</div>
						</div>
						<!-- <div class="lrc" v-if="getCurrentMusic">
							{{musicCurrentLrc}}
						</div> -->
						<div class="musicDo">
							<i class="icon icon-like"></i>
							<i class="icon icon-download"></i>
							<i class="icon icon-msg"></i>
							<i class="icon icon-list-circle-small"></i>
						</div>
					</div>
				</transition>
				<transition name="fade">
					<div class="lrc-wrapper" ref="lrcwrapper" v-show="!showCD" @click.stop="isShowCD(true)">
						<div class="volume-range">
							<range range-type="volume" ball-width="10" current-color="rgba(255,255,255,0.8)"></range>
						</div>
						<div class="lrc" ref="lrc" :scroll-top.prop="scrollTop">
							<div class="div-lrc" ref="divlrc">
								<p v-if="getCurrentMusic" v-for="(lrc, index) in getCurrentMusic.lyric" :data-index="index" :class="lrcIndex === index ? 'active musiclrc' : 'musiclrc'" :data-timeid="lrc.timeId">{{lrc === '' ? '暂无歌词' : lrc.text}} </p>
							</div>
						</div>
					</div>
				</transition>
				<div class="content-footer">
					<div class="div-range">
						<range></range>
					</div>
					<div class="musicDetailCtrl">
						<i class="playType" :class="musicPlayType" @click.stop="setPlayType"></i>
						<i class="prev icon-prevdetail" @click.stop="playPrev"></i>
						<i class="playPause" :class="isPlaying ? 'icon-pause-detail' : 'icon-playdetail' " @click.stop="playPause"></i>
						<i class="next icon-nextdetail" @click.stop="playNext"></i>
						<i class="menu icon-list-music" @click.stop="showMusicList"></i>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	import store from './../../store'
	import range from './../range/range'
	export default {
		data () {
			return {
				isPlay: false,
				showCD: true,
				scrollTop: 0,
				currentLrcIndex: 0
			}
		},
		methods: {
			hideMusicDetail () {
				store.dispatch({
					type: 'set_MusicDetail',
					isShow: false
				})
				this.showCD = true
			},
			playPause () {
				// 控制音乐播放暂停
				store.commit('togglePlay')
			},
			playNext () {
				store.dispatch('play_Next')
			},
			playPrev () {
				store.dispatch('play_Prev')
			},
			// 显示音乐列表
			showMusicList () {
				let scrollTop = (this.$store.getters.getCurrentIndex + 1 - 3) * 42
				store.dispatch({
					type: 'set_ScrollTop',
					scrollTop: scrollTop
				})
				store.dispatch('showMusicList')
			},
			// 设置播放类型
			setPlayType () {
				store.dispatch('set_PlayType')
			},
			isShowCD (bool) {
				this.showCD = bool
			}
		},
		computed: {
			isShowMusicDetail () {
				return this.$store.getters.getMusicDetail
			},
			isPlaying () {
				this.isPlay = this.$store.getters.getIsPlaying
				return this.$store.getters.getIsPlaying ? this.$store.getters.getIsPlaying : ''
			},
			getCurrentMusic () {
				return this.$store.getters.getCurrentMusic ? this.$store.getters.getCurrentMusic : ''
			},
			musicPlayType () {
				let playType = this.$store.getters.getMusicPlayType ? this.$store.getters.getMusicPlayType : -1
				let className = ''
				switch (playType) {
					case 1:
						className = 'icon-music-shunxu'
						break
					case 2:
						className = 'icon-music-danqu1'
						break
					case 3:
						className = 'icon-music-random'
						break
					default:
						className = ''
				}
				return className
			},
			musicCurrentLrc () {
				let currentMusic = this.$store.getters.getCurrentMusic
				let lrcIndex = this.$store.getters.getLyricIndex ? this.$store.getters.getLyricIndex : 0
				if (currentMusic.lyric.length) {
					return lrcIndex === -1 ? '加载中...' : currentMusic.lyric[lrcIndex].text
				} else {
					return '暂无歌词'
				}
			},
			lrcIndex () {
				return this.$store.getters.getLyricIndex ? this.$store.getters.getLyricIndex : 0
			}
		},
		watch: {
			isPlay: function (newisPlay, oldisPlay) {
				if (newisPlay !== true) {
					let imageTrans = getComputedStyle(this.$refs.cd).transform
					let contentTrans = getComputedStyle(this.$refs.cdcontent).transform
					this.$refs.cdcontent.style.transform = contentTrans === 'none' ? imageTrans : imageTrans.concat('', contentTrans)
				}
			},
			showCD: function (newisPlay, oldisPlay) {
				if (newisPlay !== true) {
					if (this.currentLrcIndex >= 0 && document.getElementsByClassName('musiclrc')[this.currentLrcIndex]) {
						let height = this.$refs.lrc.offsetHeight
						let top = document.getElementsByClassName('musiclrc')[this.currentLrcIndex].offsetTop
						this.scrollTop = top - height / 2
					}
				}
			},
			lrcIndex: function (newisPlay, oldisPlay) {
				this.currentLrcIndex = newisPlay
				if (document.getElementsByClassName('musiclrc')[newisPlay]) {
					let height = this.$refs.lrc.offsetHeight
					let top = document.getElementsByClassName('musiclrc')[newisPlay].offsetTop
					this.scrollTop = top - height / 2
				}
			}
		},
		components: {
			'range': range
		},
		mounted () {
			let _this = this
			setInterval(function () {
				if (_this.currentLrcIndex >= 0 && document.getElementsByClassName('musiclrc')[_this.currentLrcIndex]) {
					let height = _this.$refs.lrc.offsetHeight
					let top = document.getElementsByClassName('musiclrc')[_this.currentLrcIndex].offsetTop
					_this.scrollTop = top - height / 2
				}
			}, 2000)
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@keyframes goRotate{
		0%{
			transform: rotate(0)
		}
		50%{
			transform: rotate(180deg)
		}
		100%{
			transform: rotate(360deg)
		}
	}
	.musicdetail
		position:fixed
		top:0
		left:0
		bottom:0
		right:0
		z-index:20
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
			transition:all 0.5s
			right:0
			z-index:16
			filter: url(../../common/blur.svg#blur); 
			filter:blur(30px)
		.detailcontent
			position:fixed
			height:100%
			width:100%
			top:0
			left:0
			bottom:0
			right:0
			z-index:17
			background:rgba(0,0,0,0.15)
			.content-header
				position:absolute
				top:0
				left:0
				right:0
				display:flex
				height:10vh
				padding-top:1vh
				box-sizing:border-box
				align-items:center
				// background:red
				.back,.share
					width:50px
					flex:0 0 50px
					height:8vh
					color:#fff
					font-size:24px
					line-height:8vh
					text-align:center
				.share
					font-size:32px
				.musicTopDetail
					flex:1 1 auto
					display:flex
					flex-direction:column
					justify-content:center
					color:#fff
					width:calc(100% - 100px)
					.singer,.name
						margin:0
						color:#fff
						font-size:12px
						padding:4px 0
						text-overflow:ellipsis
						overflow:hidden
						white-space:nowrap
					.name
						font-size:14px
						font-weight:400
			.content-wrapper
				position:absolute
				top:10vh
				left:0
				bottom:20vh
				right:0
				overflow:hidden
				&.fade-enter-to, &.fade-leave-to
					transition: opacity 0.3s
				&.fade-enter, &.fade-leave-to
					opacity: 0
				.cd
					.swith-line
						width:80%
						height:1px 
						background-image:-webkit-linear-gradient(to left, rgba(255,255,255,0),rgba(255,255,255,0.6),rgba(255,255,255,0)); 
						background-image:linear-gradient(to left, rgba(255,255,255,0),rgba(255,255,255,0.6),rgba(255,255,255,0));
						margin:0 auto
						.triger
							position:absolute
							top:-14px
							left:50%
							transform: translate3d(-16px,0,0)
							width:90px
							height:140px
							background-image:url('/static/images/swith.png')
							background-size:cover
							transform-origin:14px 16px
							transition:all 0.3s
							z-index:5
						.triger.pause
							transform: translate3d(-16px,0,0) rotateZ(-30deg)
					.cd-content
						width:44vh
						height:44vh
						position:relative
						margin: 0 auto
						margin-top:70px
						.wrapper
							width:44vh
							height:44vh
							position:relative
							margin: 0 auto
							margin-top:70px
							&.animate
								animation: goRotate 16s linear infinite 0.1s;
							// animation: goRotate 16s linear infinite 0.1s;
							// animation-play-state:paused
							// &.play
							// 	animation-play-state:running
							.cd-bg
								width:44vh
								height:44vh
								position:absolute
								top:0
								left:50%
								transform:translate3d(-50%,0,0)
								background:url('/static/images/cd-mine.png')
								background-size:100%
								z-index:2
							.img
								position:absolute
								display:block
								width:28vh
								height:28vh
								top:8vh
								transition:all 0.3s
								left:50%
								transform:translate3d(-50%,0,0)
								z-index:1
				.musicDo
					width:70vw
					position:absolute
					height:40px
					left:50%
					bottom:0
					transform:translate3d(-50%,0,0)
					display:flex
					align-items:center
					justify-content:space-around
					i
						display:inline-block
						width:40px
						width:40px
						line-height:40px
						text-align:center
						color:rgba(255,255,255,0.8)
						font-size:20px
						&:active
							color:rgba(255,255,255,0.4)
			.lrc-wrapper
				position:absolute
				top:10vh
				left:0
				bottom:20vh
				right:0
				overflow:visible
				&.fade-enter-to, &.fade-leave-to
					transition: opacity 0.3s
				&.fade-enter, &.fade-leave-to
					opacity: 0
				.volume-range
					height:30px
					line-height:30px
				.lrc
					position:relative
					height:calc(100% - 30px)
					overflow-y:scroll
					box-sizing:border-box
					transition:all 0.3s
					.div-lrc
						padding:50% 0
						position:relative
						p
							font-size:14px
							font-weight:400
							text-align:center
							color:rgba(255,255,255,0.5)
							&.active
								color:rgba(255,255,255,1)
			.content-footer
				position:absolute
				bottom:0
				left:0
				right:0
				height:18vh
				color:#fff
				background-image:-webkit-linear-gradient(to top, rgba(0,0,0,0.8),rgba(0,0,0,0.4),rgba(0,0,0,0),rgba(0,0,0,0)) 
				background-image:linear-gradient(to top, rgba(0,0,0,0.8),rgba(0,0,0,0.4),rgba(0,0,0,0),rgba(0,0,0,0))
				.div-range
					height:6vh
				.musicDetailCtrl
					height:12vh
					width:100%
					display:flex
					align-items:center
					justify-content:center
					font-size:0
					i
						display:inline-block
						font-size:28px
						width:20vw
						height:50px
						line-height:50px
						text-align:center
						&.playType,&.menu
							font-size:20px
							color:#e1e1e1
						&.playPause
							font-size:46px
					
				
				
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

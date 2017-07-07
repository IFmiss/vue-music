<template>
	<transition name="sliderUpHideRight">
		<div class="songsheet" ref="songsheet" v-show="showSongSheet" @scroll="scrollEvent">
			<div class="songheader">
				<i class="back icon-back" @click.stop="hideSongSheet"></i>
				<p class="title">歌单</p>
				<i class="search icon-search"></i>
				<i class="menu icon-list-circle"></i>
				<div class="songheaderimg" ref="songheader"></div>
			</div>
			<div class="content">
				<div class="top" ref="top">
					<div class="songsheetdisc">
						<div class="songsheetimg">
							<img :src="getSongSheet.info[0].img_url" alt="">
							<span class="info">i</span>
						</div>
						<div class="disc">
							<p class="songsheetname">{{getSongSheet.name}}</p>
							<div class="user">
								<img class="avatar" :src="getSongSheet.user.avatar" alt="">
								<p class="songsheetuser">{{getSongSheet.user.name}}</p>
								<i class="icon-right"></i>
							</div>
						</div>
					</div>
					<div class="do">
						<div class="list nocollect">
							<i class="icon-music"></i>
							<span class="disc">收藏</span>
						</div>
						<div class="list">
							<i class="icon-music"></i>
							<span class="disc">评论</span>
						</div>
						<div class="list">
							<i class="icon-music"></i>
							<span class="disc">分享</span>
						</div>
						<div class="list">
							<i class="icon-music"></i>
							<span class="disc">下载</span>
						</div>
					</div>
				</div>
				<div class="bottom" style="height:16000px"></div>
			</div>
			<!-- 底部固定页 -->
    		<bottom-bar></bottom-bar>
		</div>
	</transition>
</template>
<script>
	import store from './../../store'
	import bottombar from './../bottombar/bottombar.vue'
	export default {
		data () {
			return {
				isShow: false
			}
		},
		methods: {
			hideSongSheet () {
				store.commit({
					type: 'setIsShowSongSheet',
					isShow: false
				})
			},
			scrollEvent () {
				// alert(this.$refs.songsheet.scrollTop)
				let opacity = this.$refs.songsheet.scrollTop / (this.$refs.top.offsetHeight - this.$refs.songheader.offsetHeight)
				if (this.$refs.songsheet.scrollTop < this.$refs.top.offsetHeight - this.$refs.songheader.offsetHeight) {
					this.$refs.songheader.style.opacity = opacity
					this.$refs.songheader.style.filter = `alpha(opacity:${opacity * 100})`
				} else {
					this.$refs.songheader.style.opacity = 1
					this.$refs.songheader.style.filter = `alpha(opacity:${100})`
				}
			}
		},
		computed: {
			showSongSheet () {
				// let img = this.$store.getters.getMusicSheetList ? this.$store.getters.getMusicSheetList : ''
				// if (this.$store.getters.getIsShowSongSheet) {
				// 	alert(this.$refs.top)
				// 	this.$refs.top.style.backgroundImage = 'url(' + img.info[0].img_url + ')'
				// 	this.$refs.top.style.backgroundSize = '1800%'
				// 	this.$refs.top.style.backgroundPosition = 'center center'
				// }
				this.isShow = this.$store.getters.getIsShowSongSheet ? this.$store.getters.getIsShowSongSheet : false
				return this.isShow
			},
			getSongSheet () {
				return this.$store.getters.getMusicSheetList ? this.$store.getters.getMusicSheetList : ''
			},
			getImageColor () {
				return this.$store.getters.getSongSheetImageColor ? this.$store.getters.getSongSheetImageColor : '#333'
			}
		},
		watch: {
			isShow: function (newisshwo, oldisshow) {
				let img = this.$store.getters.getMusicSheetList ? this.$store.getters.getMusicSheetList : ''
				if (newisshwo) {
					this.$refs.top.style.backgroundImage = `url(${img.info[0].img_url})`
					this.$refs.top.style.backgroundSize = `5800%`
					this.$refs.top.style.backgroundPosition = `center center`
					this.$refs.songheader.style.backgroundImage = `url(${img.info[0].img_url})`
					this.$refs.songheader.style.backgroundSize = `5800%`
					this.$refs.songheader.style.backgroundPosition = `center center`
				}
			}
		},
		components: {
			'bottom-bar': bottombar
		},
		mounted () {
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.songsheet
		position:fixed
		left:0
		top:0
		bottom:0
		right:0
		z-index: 14
		background: #fff
		overflow:auto
		.songheader
			position:fixed
			transform:translateZ(0)
			top:0
			left:0
			right:0
			height:50px
			z-index:10
			display:flex
			align-items:center
			padding:0 10px
			.songheaderimg
				position:absolute
				top:0
				left:0
				right:0
				bottom:0
				z-index: -1;
				opacity:0
			i
				flex:0 0 36px
				width:36px
				height:36px
				line-height:36px
				text-align:center
				font-size:24px
				color:#fff
				&.menu
					font-size:20px
			.title
				flex:1 1 auto
				max-width:calc(100% - 108px)
				font-size:16px
				color:#fff
				font-weight:400
				text-overflow:ellipsis
				overflow:hidden
				white-space:nowrap
				margin:0
				padding:0 5px
		.content
			min-height: calc(100vh - 46px)
			background:#FFF
			box-sizing:border-box
			.top
				height:155px
				background:#000
				padding:70px 25px 20px 25px
				.songsheetdisc
					height:100px
					display:flex
					.songsheetimg
						position:relative
						flex:0 0 100px
						width:100px
						height:100px
						img
							width:100px
							height:100px
						.info
							display:block
							position:absolute
							bottom:2px
							right:2px
							width:16px
							height:16px
							border:1px solid #f0f0f0
							border-radius:50%
							text-align:center
							line-height:16px
							color:#fff
							font-weight:400
							background:rgba(0,0,0,0.6)
					.disc
						flex:1 1 auto
						max-width: calc(100% - 100px)
						margin-left:15px
						display:flex
						flex-direction:column
						padding-top:10px
						p
							margin:0
							&.songsheetname
								height:40px
								line-height:20px
								font-size:14px
								font-weight:500
								overflow:hidden
								color:#fff
						.user
							width:100%
							height:30px
							line-height:30px
							display:flex
							align-items:center
							.avatar
								width:20px
								height:20px
								border-radius:50%
								color:#f0f0f0
							.songsheetuser
								text-indent:6px
								max-width:calc( 100% - 40px )
								text-overflow:ellipsis
								white-space:nowrap
								overflow:hidden
								color:#f0f0f0
							i
								width:20px
								height:20px
								text-align:center
								line-height:20px
								color:#f0f0f0
				.do
					display:flex
					width:100%
					height:40px
					align-items:center
					margin-top:15px
					div
						flex:1
						display:flex
						flex-direction:column
						align-items:center
						color:#fff
						&:active
							color:#ccc
						&.nocollect
							i
								color:rgba(255,255,255,0.3)
							span
								color:rgba(255,255,255,0.8)
						i
							width:28px
							height:28px
							font-size:18px
							text-align:center
							line-height:28px
						span
							font-size:12px
							
							
		&.sliderUpHideRight-enter-to,&.sliderUpHideRight-leave-to
			transition: all 0.3s
		&.sliderUpHideRight-enter
			transform:translate3d(0,100%,0)
			opacity: 0
		&.sliderUpHideRight-leave-to
			transform:translate3d(100%,0,0)
			opacity: 0
</style>

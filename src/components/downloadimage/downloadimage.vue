<template>
	<transition name="fade">
		<div class="downloadimage" ref="downloadsheet" v-show="showImage">
			<div class="top">
				<div class="linearbg"></div>
			</div>
			<i class="close icon-close" @click.stop="cancelDownload"></i>
			<div class="imagecontent">
				<div class="imageArea">
					<img v-if="sheetData.info" class="sheetimg" :src="sheetData.info[0].img_url" alt="">
					<p v-if="sheetData.name" class="title">{{sheetData.name}}</p>
				</div>
				<div class="swith-line"></div>
				<div class="detail">
					<div class="disc">{{musicDisc}}</div>
					<div class="tips">
						<span class="title">{{sheetData.tips === "" ? "暂无标签" : "标签 :"}}</span>
						<span v-if="sheetData.tips" class="span-tips" v-for="item in sheetData.tips">{{ item }}</span>
						<!-- <span class="span-tips">欧美</span> -->
<!-- 						<span class="span-tips">乡村</span>
						<span class="span-tips">放松</span> -->
					</div>
				</div>
			</div>
			<div class="bottom">
				<div class="linearbg">
					<span class="download" @click.stop="download">保存封面</span>
				</div>
			</div>
		</div>
	</transition>
</template>
<script>
	// import store from './../../store'
	export default {
		props: {
			showImage: {
				type: Boolean,
				default: false
			},
			sheetData: ''
		},

		watch: {
			showImage: function (newisshwo, oldisshow) {
				let data = this.sheetData
				if (newisshwo) {
					this.$refs.downloadsheet.style.backgroundImage = `url(${data.info[0].img_url})`
					this.$refs.downloadsheet.style.backgroundSize = `5800%`
					this.$refs.downloadsheet.style.backgroundPosition = `center center`
				}
			}
		},
		computed: {
			musicDisc () {
				return this.sheetData.disc === '' ? '暂无描述' : this.sheetData.disc
			}
		},
		methods: {
			cancelDownload () {
				this.$emit('hidedownloadimage')
			},
			download () {
				// alert('下载中!!!')
				console.log('下载中')
			}
		},
		mounted () {
			// alert(this.sheetData)
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	@import "../../common/stylus/border-1px"
	.downloadimage
		position:fixed
		top:0
		left:0
		right:0
		bottom:0
		z-index:10
		overflow:auto
		opacity:1
		-webkit-overflow-scrolling:touch
		&.fade-enter-to,&.fade-leave-to
			transition:all 0.3s
		&.fade-enter,&.fade-leave-to
			opacity:0
		// display: flex
		// flex-direction: column
		// justify-content: center
		// align-items: center
		.close
			position:fixed
			top:30px
			font-size:20px
			z-index:10
			width:50px
			height:50px
			line-height:50px
			text-align:right
			right:20px
			color:rgba(255,255,255,0.8)
		.imagecontent
			position:relative
			width:100%
			height:auto
			padding-top:80px
			padding-bottom:100px
			.imageArea
				display:block
				height:auto
				width:100%
				padding:0 36px
				margin:0 auto
				box-sizing:border-box
				.sheetimg
					width:180px
					height:180px
					display:block
					margin:0 auto
				.title
					color:#fff
					font-size:16px
					font-weight:400
					margin-top:10px
					text-align:center
					line-height:1.5
					margin-top:20px
			.detail
				padding: 0 36px
				.disc,.tips
					color:#fff
					font-size:12px
					font-weight:400
					line-height:1.5
				.tips
					margin-top:16px
					.title
						margin-right:5px
						font-size:14px
						font-weight:400
					.span-tips
						padding:2px 8px
						border:1px solid rgba(244,244,244,0.6)
						margin-right:10px
						font-weight:400
						border-radius:9px
		.swith-line
			width:80%
			height:1px 
			background-image:-webkit-linear-gradient(to left, rgba(255,255,255,0),rgba(255,255,255,0.4),rgba(255,255,255,0)); 
			background-image:linear-gradient(to left, rgba(255,255,255,0),rgba(255,255,255,0.4),rgba(255,255,255,0));
			margin:0 auto
			margin-bottom:15px
		.bottom
			position:fixed
			bottom:0
			right:0
			left:0
			height:100px
			z-index:9
			.linearbg
				width:100%
				height:100%
				background-image:-webkit-linear-gradient(to top, rgba(0,0,0,0.4),rgba(0,0,0,0))
				background-image:linear-gradient(to top, rgba(0,0,0,0.4),rgba(0,0,0,0))
				.download
					display:inline-block
					width:auto
					padding:6px 12px
					font-size:14px
					font-weight:400
					border:1px solid rgba(244,244,244,0.4)
					position:absolute
					left:50%
					top:20%
					color:#fff
					transform:translate(-50%,0)
					border-radius:12px
					&:active
						background:rgba(0,0,0,0.2)
		.top
			position:fixed
			top:0
			right:0
			left:0
			height:80px
			z-index:9
			.linearbg
				width:100%
				height:100%
				background-image:-webkit-linear-gradient(to bottom, rgba(0,0,0,0.4),rgba(0,0,0,0))
				background-image:linear-gradient(to bottom, rgba(0,0,0,0.4),rgba(0,0,0,0))
					
</style>

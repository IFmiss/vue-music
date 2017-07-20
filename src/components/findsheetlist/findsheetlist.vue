<template>
	<div class="findsheetlist" :style="{width:listwidth,padding:listpadding}" >
		<div class="content">
			<img class="image" :src="imagesrc" alt="">
			<span class="toprighttips" v-if="showtoprighttips"><i class="icon" :class="toprighticonclass"></i>{{formartTopRight}}</span>
			<span class="bottomtips" v-if="showbottomtips">{{bottomtips}}</span>
		</div>
		<div class="title" v-if="showbottomtitle">{{bottomtitle}}</div>
	</div>
</template>
<script>
	export default {
		props: {
			listpadding: {
				type: String,
				default: '0'
			},
			imagesrc: {
				type: String
			},
			showtoprighttips: {
				type: Boolean,
				default: true
			},
			toprighticonclass: {
				type: String
			},
			toprighttitle: {
				type: String
			},
			showbottomtips: {
				type: Boolean,
				default: true
			},
			bottomtips: {
				type: String
			},
			showbottomtitle: {
				type: Boolean,
				default: true
			},
			bottomtitle: {
				type: String
			},
			listwidth: {
				type: String
			}
		},
		computed: {
			formartTopRight () {
				const numberInfo = Number(this.toprighttitle)
				return numberInfo > 10000 ? `${Math.floor(numberInfo / 10000)}万` : numberInfo
			}
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	.findsheetlist
		display:inline-block
		width:100%
		box-sizing:border-box
		height:auto
		position:relative
		.content
			width:100%
			height:auto
			position:relative
			.image
				width:100%
			.toprighttips
				height:18px
				line-height:18px
				display:block
				position:absolute
				top:0
				left:0
				right:0
				color:#fff
				font-size:12px
				font-weight:400
				text-align:right
				padding:0 4px
				.icon
					margin-right:3px
			.bottomtips
				font-size:12px
				font-weight:400
				padding:0 6px
				color:#fff
				height:22px
				line-height:22px
				position:absolute
				bottom:0
				left:0
				right:0
				overflow: hidden
				white-space:nowrap
				text-overflow: ellipsis
				background-image:-webkit-linear-gradient(to top, rgba(22,22,22,0.2),rgba(255,255,255,0)); 
				background-image:linear-gradient(to top, rgba(22,22,22,0.2),rgba(255,255,255,0));
		.title
				width: 100%
				height:34px
				line-height:16px
				margin:4px 0
				padding:0 3px
				box-sizing:border-box
				overflow: hidden
				color:#333
				font-weight:400
				text-overflow: ellipsis
				font-size:12px
				display: -webkit-box
				-webkit-line-clamp: 2
				-webkit-box-orient: vertical
</style>

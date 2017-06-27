<template>
	<div class="typelist">	
		<i class="icon-music"></i>
		<div class="typelist-detail">
			<span class="name">{{listName}}</span>
			<span class="count">({{listCount}})</span>
			<p v-if="showBorder" class="border-1px"></p>
			<i v-if="isPlaying" class="icon-menu"></i>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			name: {
				type: String,
				default: '未曾遗忘的青春'
			},
			count: {
				type: String,
				default: '1'
			},
			hasBorder: {
				type: Boolean,
				default: true
			},
			playing: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				listName: '',
				listCount: '0',
				showBorder: true,
				isPlaying: false
			}
		},
		mounted () {
			this.listName = this.name
			this.listCount = this.count
			this.showBorder = this.hasBorder
			this.isPlaying = this.playing
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "./../../common/font-icon/style.css"
	@import "./../../common/stylus/border-1px/index.styl"
	@import "./../../common/stylus/global.styl"
	.typelist
		height:50px
		background:#f7f7f7
		position:relative
		&:active
			background:$list_active
		.icon-music
			font-size:20px
			position:absolute
			top:50%
			left:15px
			transform:translate(0,-50%)
		.typelist-detail
			height:100%
			line-height:50px
			margin-left:50px
			box-sizing:border-box
			font-size:0
			.name
				color:#333
				font-size:14px
				margin-right:6px
				vertical-align:middle
			.count
				color:#aaa
				font-size:10px
				font-weight:400
				vertical-align:middle
			.border-1px
				border-1px($border_1px)
		.icon-menu
			font-size:14px
			position:absolute
			top:50%
			right:15px
			transform:translate(0,-50%)
</style>

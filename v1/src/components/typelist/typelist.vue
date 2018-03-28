<template>
	<div class="typelist" @click="alert1" :style="{background:typelistbg}">	
		<i class="info" :class="iconInfo"></i>
		<div class="typelist-detail">
			<span class="name">{{listName}}</span>
			<span class="count" v-show="showCount">({{listCount}})</span>
			<p v-if="showBorder" class="border-1px"></p>
			<i v-if="isPlaying" class="isPlaying icon-volume-medium"></i>
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
			},
			iconinfo: {
				type: String
			},
			bgcolor: {
				type: String,
				default: '#f7f7f7'
			}
		},
		data () {
			return {
				listName: '',
				listCount: '0',
				showBorder: true,
				isPlaying: false,
				iconInfo: '',
				typelistbg: ''
			}
		},
		methods: {
			alert1 () {
				window.open('https://github.com/IFmiss/vue-cloud-music')
			}
		},
		computed: {
			showCount () {
				return this.count !== 'none'
			}
		},
		created () {
			this.listName = this.name
			this.listCount = this.count
			this.showBorder = this.hasBorder
			this.isPlaying = this.playing
			this.iconInfo = this.iconinfo
			this.typelistbg = this.bgcolor
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "./../../common/stylus/border-1px/index.styl"
	@import "./../../common/stylus/global.styl"
	.typelist
		height:50px
		background:#f7f7f7
		position:relative
		&:active
			background:$list_active
		.info
			font-size:20px
			position:absolute
			top:50%
			color:$primarycolor
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
		.isPlaying
			font-size:14px
			position:absolute
			top:50%
			color:$primarycolor
			right:5px
			width:36px
			height:36px
			line-height:36px
			text-align:center
			transform:translate(0,-50%)
			&:active
				background:$list_active
</style>

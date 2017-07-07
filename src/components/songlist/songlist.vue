<template>
	<div class="songlist">
		<div class="listIndex">
			<span class="index">{{musicIndex}}</span>
			<!-- <i class="iconIndex icon-volume-medium"></i> -->
		</div>
		<div class="songInfo">
			<div class="detail">
				<p class="name">{{musicName}}</p>
				<p class="singer">{{musicSinger}}</p>
			</div>
			<i class="rightSetting icon-list-circle"></i>
			<div class="border-1px"></div>
		</div>
	</div>
</template>
<script>
	export default {
		data () {
			return {
				isCurrentplay: false,
				musicName: '',
				musicSinger: '',
				musicIndex: 0
			}
		},
		porps: {
			iscurrent: {
				type: Boolean,
				default: false
			},
			musicname: {
				type: String,
				default: '未曾遗忘的青春'
			},
			musicsinger: {
				type: String,
				default: '未曾遗忘的青春'
			},
			musicindex: {
				type: Number,
				default: 1
			}
		},
		watch: {
			// musicName: function (newz) {
			// 	alert(newz)
			// }
		},
		mounted () {
			this.isCurrentplay = this.iscurrent
			this.musicName = this.musicname
			this.musicSinger = this.musicsinger
			this.musicIndex = this.musicindex
			// console.log(this.iscurrent)
			console.log(this.musicname)
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	@import "../../common/stylus/border-1px"
	.songlist
		display:flex
		height:54px
		position:relative
		&:active
			background:$list_active
		.listIndex
			width:54px
			height:54px
			flex: 0 0 54px
			font-size:0
			.iconIndex
				display:inline-block
				font-size:14px
				color:$primarycolor
				width:54px
				height:54px
				line-height:54px
				text-align:center
			.index
				display:inline-block
				font-size:16px
				font-weight:500
				color:#BABABA
				width:54px
				height:54px
				line-height:54px
				text-align:center
		.songInfo
			flex:1 1 auto
			height:54px
			max-width: calc(100% - 54px)
			box-sizing:border-box
			.border-1px
				border-1px($border_1px)
			.detail
				width:auto
				max-width: calc(100% - 54px)
				height:100%
				display:flex
				padding:5px
				box-sizing:border-box
				flex-direction: column
				justify-content: space-around
				p
					margin: 0
					&.name
						font-size:14px
						color:#333
						font-weight:500
					&.singer
						font-size:10px
						color:#aaa
						font-weight:300
			.rightSetting
				position:absolute
				right:0
				top:0
				width:54px
				height:54px
				line-height:54px
				font-size:14px
				text-align:center
				color:#aaa
			&:active
				background:$list_active
</style>

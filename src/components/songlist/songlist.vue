<template>
	<div class="songlists">
		<div class="songlist" v-if="getSongSheet.info" v-for="(item, index) in getSongSheet.info" @click="playIndex(index)">
			<div class="warpper">
				<div class="listIndex">
					<span v-show="!showVolume || getCurrentIndex !== index" class="index">{{index + 1}}</span>
					<i v-show="showVolume && getCurrentIndex === index" class="iconIndex icon-volume-medium"></i>
				</div>
				<div class="songInfo">
					<div class="detail">
						<p class="name">{{item.name}}</p>
						<p class="singer">{{item.singer}}</p>
					</div>
					<div class="border-1px"></div>
				</div>
			</div>
			<i class="rightSetting icon-list-circle" @click.stop="showmenu(item.name)"></i>
		</div>
	</div>
</template>
<script>
	import store from './../../store'
	export default {
		methods: {
			playIndex (index) {
				if (index === this.$store.getters.getCurrentIndex && this.$store.getters.getMusicSheetList.type === this.$store.getters.getMusiSheetType) {
					return
				}
				store.commit({
					type: 'setMusiSheetType',
					sheettype: this.$store.getters.getMusicSheetList.type
				})
				store.commit({
					type: 'setMusicList',
					list: this.$store.getters.getMusicSheetList.info
				})
				store.commit({
					type: 'playIndex',
					index: index
				})
			},
			showmenu (name) {
				store.dispatch({
					type: 'showMenuList',
					amount: {
						title: name,
						content: [
							{
								name: '删除',
								iconinfo: 'icon-delete',
								count: 'none',
								bgcolor: '#fff'
							}
						]
					}
				})
			}
		},
		computed: {
			getSongSheet () {
				return this.$store.getters.getMusicSheetList ? this.$store.getters.getMusicSheetList : ''
			},
			showVolume () {
				let sheetType = this.$store.getters.getMusiSheetType
				let thisSheetType = this.$store.getters.getMusicSheetList.type
				if (sheetType === thisSheetType) {
					return true
				} else {
					return false
				}
			},
			getCurrentIndex () {
				return this.$store.getters.getCurrentIndex
			}
		},
		mounted () {
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	@import "../../common/stylus/border-1px"
	.songlists
		padding-bottom:46px
		.songlist
			height:54px
			position:relative
			.warpper
				display:flex
				height:54px
				position:absolute
				top:0
				left:0
				right:0
				botttom:0
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
							width: 100%;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
							&.name
								font-size:14px
								color:#333
								font-weight:400
							&.singer
								font-size:10px
								color:#aaa
								font-weight:400
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

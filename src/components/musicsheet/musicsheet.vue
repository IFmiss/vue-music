<template>
		<div>
			<div class="musicsheet">
				<div class="title" @click="toggleSheets($event)">
					<i class="toggle icon-down" ref="toggleicon"></i>
					<div class="detail">
						<span class="name">{{data_item.name}}</span>
						<span class="count">({{data_item.count}})</span>
						<i class="setting icon-setting"></i>
					</div>
				</div>
				<div v-show="showSheets" v-for="(list, listindex) in data_item.detail">
					<div class="content">
						<img class="sheetimg" :src="list.info[0].img_url" alt="">
						<div class="detail">
							<p class="name">{{list.name}}</p>
							<p class="count">{{list.count}}首歌曲</p>
							<i class="setting icon-list-circle" @click.stop="showSheetInfo"></i>
							<p v-show="data_item.detail.length != listindex + 1" class="border-1px"></p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div >
</template>

<script>
	export default {
		props: {
			item: {
				type: Object
			},
			index: {
				type: Number
			}
		},
		data () {
			return {
				showSheets: true,
				data_item: {},
				data_index: {}
			}
		},
		computed: {
			getSheets () {
				return this.$store.getters.getMusicAllList.sheets
			}
		},
		methods: {
			toggleSheets (event) {
				this.$refs.toggleicon.style.transform = this.showSheets ? 'rotate(-90deg) translate3d(50%, 0, 0)' : 'rotate(0) translate3d(0, -50%, 0)'
				this.showSheets = !this.showSheets
			},
			showSheetInfo () {
				// alert(1)
			}
		},
		mounted () {
			this.data_item = this.item
			this.data_index = this.index
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "./../../common/font-icon/style.css"
	@import "./../../common/stylus/border-1px/index.styl"
	@import "./../../common/stylus/global.styl"
	.musicsheet
		height:auto
		width:100%
		background:#f7f7f7
		.title
			display:block
			height:28px
			line-height:28px
			background:#e1e1e1
			position:relative
			.toggle
				position:absolute
				top:50%
				left:10px
				font-size:16px
				color:#666
				transition:all 0.5s;
				transform:translate3d(0,-50%,0)
			.detail
				margin-left:35px
				color:#666
				.name
					display:inline-block
					vertical-align:middle
					font-weight:400
				.count
					display:inline-block
					vertical-align:middle
					font-weight:300
					font-size:10px
				.setting
					font-size:16px
					position:absolute
					top:50%
					right:15px
					transform:translate(0,-50%)
		.content
			height:60px
			width:100%
			box-sizing:border-box
			position:relative
			display:flex
			&:active
				background:$list_active
			.sheetimg
				margin:5px
				width:50px
				height:50px
				flex:0 0 50px
			.detail
				height:60px
				padding-left:5px
				flex:1 1 auto
				box-sizing:border-box
				position:relative
				.name,.count
					width:80%
					text-overflow:ellipsis
					overflow:hidden
					white-space:nowrap
					margin:0
					height:25px
					line-height:25px
				.name
					margin-top:5px
					color:#333
					font-size:14px
				.count
					margin-bottom:5px
				.border-1px
					margin:0
					border-1px($border_1px)
				.setting
					position:absolute
					right:5px
					width:36px
					height:36px
					line-height:36px
					text-align:center
					top:50%
					color:$icon_color
					transform:translate3d(0,-50%,0)
					&:active
						background:$list_active
				
</style>

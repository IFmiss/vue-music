<template>
	<div class="sideabr" @touchmove.stop="stopTouch($event)" v-show="isReallShow">
		<transition name="fade" @enter="enter">
			<div class="menu-mask" @click="hideMenu"></div>
		</transition>	

		<transition name="side">
			<div class="menu-content">
				<div class="menu-detail">
					<div class="menu-userInfo">
						<img class="avatar" src="../../assets/images/userlogo.jpg" width="56" height="56">
						<div class="user-detail">
							<span class="name">未曾遗忘的青春</span>
							<img class="isvip" src="../../assets/images/vip.png" alt="">
							<span class="progress">Lv.8</span>
						</div>
						<span class="sign"><i v-show="true" class="icon-coin"></i>签到</span>
					</div>
				</div>
				<div class="content">
					<sidelist iconclass="icon-music" sidetitle="你好" disc="2012"></sidelist>
					<sidelist iconclass="icon-music" sidetitle="你好" disc="2012"></sidelist>
					<sidelist iconclass="icon-music" sidetitle="你好" disc="2012"></sidelist>
					<sidelist iconclass="icon-music" sidetitle="你好" disc="2012"></sidelist>
					<split background="#f0f0f0" height="5" border="#eee"></split>
					<sidelist iconclass="icon-music" sidetitle="你好" disc="2012"></sidelist>
					<sidelist iconclass="icon-music" sidetitle="你好" disc="2012"></sidelist>
					<split background="#f0f0f0" height="5" border="#eee"></split>
					<sidelist iconclass="icon-music" sidetitle="你好" disc="2012"></sidelist>
					<sidelist iconclass="icon-music" sidetitle="你好" disc="2012"></sidelist>
				</div>
				<div class="footer">
					<p class="border-1px"></p>
					<div class="nightmode">
						<i class="icon-music"></i>
						<span>夜间模式</span>
					</div>

					<div class="setting">
						<i class="icon-music"></i>
						<span>设置</span>
					</div>

					<div class="exit">
						<i class="icon-music"></i>
						<span>退出</span>
					</div>
				</div>
			</div>
		</transition>
	</div>
</template>

<script>
	import store from './../../store'
	import split from './../split/split'
	import sidelist from './../sidelist/sidelist'
	export default {
		methods: {
			stopTouch (event) {
				return
			},
			hideMenu () {
				store.dispatch({
					type: 'hideSideBar'
				})
			},
			enter () {
				alert(1)
			}
		},
		computed: {
			isReallShow () {
				return store.state.sideBar.isShow
			}
		},
		components: {
			split: split,
			sidelist: sidelist
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/font-icon/font.css"
	@import "../../common/stylus/border-1px/index.styl"
	@import "../../common/stylus/global.styl"
	.sideabr
		.menu-mask
			position:fixed
			top:0
			left:0
			bottom:0
			right:0
			opacity: 1
			background:rgba(0,0,0,0.5)
			&.fade-enter-active, &.fade-leave-active
				transition: opacity 11s
			&.fade-enter, &.fade-leave-active
				opacity: 0
		.menu-content
			position:fixed
			width:286px
			height:100%	
			top:0
			left:0
			bottom:0
			background:#fff	
			transfrom:translate3d(0,0,0)
			&.side-enter-to, &.side-leave-to
				transition: all 1s ease;
			&.side-enter, &.side-leave-to
				transfrom:translate3d(280px,0,0)
			.menu-userInfo
				box-sizing:border-box
				width:100%
				height:168px
				background:#FC5151	
				position:relative
				padding:50px 15px 15px 15px
				.avatar
					position:absolute
					bottom:50px
					left:15px
					border-radius:50%
				.user-detail
					position:absolute
					bottom:20px
					left:15px
					font-size:0
					.name
						display:inline-block
						font-size:16px
						font-weight:500
						color:#fff
						vertical-align:middle
						max-width:130px
						text-overflow:ellipsis
						white-space:nowrap
						overflow:hidden
					.isvip
						width:14px
						height:14px
						vertical-align:middle
						margin-left:6px
					.progress
						font-size:8px
						padding:1px 4px 
						border-radius:8px
						color:#fff
						border:1px solid #fff
						margin-left:6px
						vertical-align:middle
				.sign
					display:inline-block
					position:absolute
					bottom:15px
					right:15px
					padding:4px 8px
					border:1px solid #e1e1e1
					border-radius:12px
					color:#fff
					i
						margin-right:3px
						vertical-align:top
			.content
				display:block
			.footer
				background:red
				position:fixed
				transfrom:translateZ(0)
				bottom:0
				height:40px
				width:286px
				font-size:0
				background:#fff
				.border-1px
					border-1px($border_1px)
				div
					display:inline-block
					font-size:16px
					height:100%
					text-align:center
					i
						font-size:18px
						vertical-align:middle
					span
						font-size:16px
						vertical-align:middle

					&:active
						background:$list_active
					&.nightmode
						width:40%
						line-height:40px
					&.setting,&.exit
						width:30%
						line-height:40px
					
</style>

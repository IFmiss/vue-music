<template>
	<div class="header">
		<div class="header-warpper">
			<i class="menu icon-menu" @click="showMueu"></i>
			<div class="centermenu" @click="hideMenu">
				<router-link tag="i" to="/mymusic">
					<i class="music icon-music" :class= "selectIndex===0?'active':''" ></i>
				</router-link>
				<router-link tag="i" to="/findmusic">
					<i class="find icon-wangyi"></i>
				</router-link>
				<router-link tag="i" to="/community">
					<i class="community icon-community"></i>
				</router-link>
			</div>
			<!-- <router-link tag="i" to="/search"> -->
				<i class="search icon-search"></i>
			<!-- </router-link> -->
			<router-view></router-view>
			<!-- <Counter class="counter"></Counter> -->
		</div>
	</div>
</template>
<script>
	import store from '../../store'
	import { mapState, mapMutations, mapActions } from 'vuex'

	const Counter = {
		template: `<div><p>{{ getdone }}</p><p>{{countAlias}}</p><p>{{countPlusLocalState}}</p></div>`,
		// computed: mapState({
		// 	count: state => state.count,
		// 	countAlias: () => 'count',
		// 	countPlusLocalState (state) {
		// 		return state.count + 11
		// 	}
		// })
		computed: {
			localComputed () {
				return this.$store.state.count
			},
			getdone () {
				return this.$store.getters.doneTodos
			},
			...mapState({
				count: state => state.count,
				countAlias: () => 'count',
				countPlusLocalState (state) {
					return state.count + 11
				}
			})
		}
	}

	export default {
		props: {
			index: {
				type: Number,
				default: 0
			},
			showMenu: {
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				selectIndex: this.index,
				isShowMenu: this.showMenu
			}
		},

		methods: {
			showMueu () {
				store.dispatch({
					type: 'showSideBar'
				})
			},
			hideMenu () {
				store.dispatch({
					type: 'hideSideBar'
				})
			},

			...mapMutations({
				adds: 'increment'
			}),

			...mapActions({}),
			add () {
				this.$store.dispatch({
					type: 'myactionAsync',
					count: 10
				})
			}

			// sideBar () {
			// 	alert(store.state.sideBar.isShow)
			// }
			// add () {
			// 	try {
			// 		store.dispatch({
			// 			type: 'myactionAsync',
			// 			count: 10
			// 		})
			// 	} catch (error) {
			// 		alert(error)
			// 	}
			// }
		},

		components: {
			Counter
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	.header
		position:fixed
		top:0
		left:0
		right:0
		height:50px
		z-index:10
		background:$primarycolor
		.header-warpper
			height:100%
			background:$primarycolor
			display:flex
			align-items:center
			justify-content:space-between
			.icon-menu,.icon-search
				color:#fff
				font-size:26px
				padding:10px 15px
			.centermenu
				font-size:24px
				i
					margin:0 5px
					color:#eee
					&.router-link-active
						i
							color:$link_active
					&.active
						color:#4AE0A8

					&.music
						font-size:22px
			.counter
				position:absolute
				background:green
				width:600px
				height:150px
				color:#fff
				font-size:20px
				top:0
				left:120px
				p
					height:30px
					line-height:30px

</style>

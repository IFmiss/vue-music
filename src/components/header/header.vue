<template>
	<div class="header">
		<div class="header-warpper">
			<i class="menu icon-menu" @click="add"></i>
			<div class="centermenu">
				<i class="music icon-music" :class= "selectIndex===0?'active':''" ></i>
				<i class="find icon-wangyiyun"></i>
				<i class="community icon-community"></i>
			</div>
			<router-link tag="i" to="/search">
				<i class="search icon-search"></i>
			</router-link>
			<Counter class="counter"></Counter>
		</div>
	</div>
</template>
<script>
	import store from '../../store'
	import { mapState, mapMutations } from 'vuex'

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
			toggleMueu () {
				store.commit({
					type: 'increment',
					count: 2,
					silent: true
				})
				// this.$store.commit('increment')
				// alert(store.state.count)
			},
			...mapMutations({
				adds: 'increment'
			}),

			add () {
				store.dispatch('myactions')
			}
		},

		components: {
			Counter
		}
	}
</script>
<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/font-icon/font.css"
	@import "../../common/stylus/global.styl"
	.header
		height:50px
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

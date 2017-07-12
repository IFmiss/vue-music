<template>
	<div class="menulist">
		<transition name="sideUp">
			<div class="content" ref="content" v-show="showMenu">
				<p class="title">
					{{menuList.title}}
				</p>
				<type-list v-for="(item, index) in menuList.content" :item="item" :index="index" :key="item.id" :name="item.name" :iconinfo="item.iconinfo" :count="item.count" :bgcolor="item.bgcolor"></type-list>
			</div>
		</transition>
		<transition name="fade">
			<div class="mask" v-show="showMenu" @click="hideMenuList" @touchmove.stop.prevent="stopTouch($event)">
			</div>
		</transition>
	</div>
</template>

<script>
	import store from './../../store'
	import typelist from '../typelist/typelist.vue'
	export default {
		data () {
			return {
				isShow: false
			}
		},
		methods: {
			stopTouch (event) {
				return
			},
			hideMenuList () {
				store.dispatch({
					type: 'hideMenuList'
				})
			}
		},
		computed: {
			showMenu () {
				this.isShow = this.$store.getters.getIsShow ? this.$store.getters.getIsShow : false
				return this.$store.getters.getIsShow ? this.$store.getters.getIsShow : false
			},
			menuList () {
				return this.$store.getters.getShowMenuInfo ? this.$store.getters.getShowMenuInfo : ''
			}
		},
		watch: {
			isShow: function (newisShow) {
				if (newisShow) {
					this.$refs.content.style.height = `${this.$store.getters.getShowMenuInfo.content.length * 50 + 20}px`
				}
			}
		},
		components: {
			'type-list': typelist
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/border-1px/index.styl"
	@import "../../common/stylus/global.styl"
	
	.menulist
		font-size:12px
		.content
			background:#fff
			position:fixed
			z-index:16
			height:auto
			bottom:0
			left:0
			right:0
			padding:25px 0 10px 0
			&.sideUp-enter-to,&.sideUp-leave-to
				transition: transform 0.3s
			&.sideUp-enter,&.sideUp-leave-to
				transform:translate3d(0,100%,0)
			.title
				margin:0
				height:20px
				line-height:20px
				padding:0 15px
		.mask
			position:fixed
			top:0
			left:0
			bottom:0
			right:0
			z-index:15
			opacity:1
			background:$maskBackground
			&.fade-enter-to,&.fade-leave-to
				transition: all 0.3s
			&.fade-enter,&.fade-leave-to
				opacity:0
</style>

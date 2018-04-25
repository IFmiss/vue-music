<template>
	<div ref="wrapper">
		<slot></slot>
	</div>
</template>
<script>
	import BScroll from 'better-scroll'
	export default {
		props: {
			probeType: {
				type: Number,
				default: 1
			},
			click: {
				type: Boolean,
				default: true
			},
			data: null,
			pullUpLoad: false,
			mouseWheel: {
				type: Object,
				default: function () {
					return {
						speed: 20,
						invert: false,
						easeTime: 300
					}
				}
			}
		},
		methods: {
			_initScroll () {
				if (!this.$refs.wrapper) {
					return
				}
				this.scroll = new BScroll(this.$refs.wrapper, {
					probeType: this.probeType,
					click: this.click,
					pullUpLoad: this.needPullUp,
					mouseWheel: this.mouseWheel
				})
				this._initPullUpLoad()
				this.finishPullUp()
			},
			enable () {
				this.scroll && this.scroll.enable()
			},
			disable () {
				this.scroll && this.scroll.disable()
			},
			refresh () {
				this.scroll && this.scroll.refresh()
			},
			finishPullUp () {
				this.scroll && this.scroll.finishPullUp()
			},
			_initPullUpLoad () {
				if (this.needPullUp) {
					this.scroll.on('pullingUp', () => {
						// this.isPullUpLoad = true
						this.$emit('pullingUp', this)
					})
				}
			}
		},
		mounted () {
			this.$nextTick(() => {
				this._initScroll()
			})
		},
		watch: {
			data () {
				setTimeout(() => {
					this.finishPullUp()
					this.refresh()
				}, 20)
			}
		}
	}
</script>
<style lang="scss" rel="stylesheet/scss">
</style>

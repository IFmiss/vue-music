<template>
	<div class="range" @mousemove.stop()="mouseMove($event)"  @mouseup.stop()="mouseUp" @mouseleave.stop()="mouseUp">
		<span class="span-left" v-show="type === 'progress'">{{timerFomart(musicCurrentTime)}}</span>
		<i class="rangeicon icon-volume-medium" v-show="type === 'volume'"></i>
		<div class="duration" ref="duration" @click.stop="setCurrentProgress($event)">
			<span class="currentProgress" :style="progressWidth" ref="currentProgress" ></span>
			<span class="ball" ref="ball" @mousedown.stop()="mouseDown" @touchstart.stop()="mouseDown" @touchmove.stop()="touchMove($event)" @touchend.stop()="touchEnd($event)" ></span>
		</div>
		<span class="span-right" v-show="type === 'progress'">{{timerFomart(musicDuration)}}</span>
	</div>
</template>

<script>
let canDrag = false
let persentWidth = 0
export default {
	data () {
		return {
			type: '',
			currentcolor: '',
			ballwidth: '',
			currenttime: 0,
			volume: 0.9
		}
	},
	props: {
		// progress 和 volume  一个是显示进度样式一个是显示声音大小
		rangeType: {
			type: String,
			default: 'progress'
		},
		currentColor: {
			type: String,
			default: '#C62F2F'
		},
		ballWidth: {
			type: String,
			default: '16'
		}
	},
	computed: {
		musicCurrentTime () {
			if (this.type === 'progress') {
				return this.$store.getters.getCurrentTime ? this.$store.getters.getCurrentTime : '00:00'
			}
			if (this.type === 'volume') {
				return false
			}
		},
		musicDuration () {
			if (this.type === 'progress') {
				return this.$store.getters.getMusicDuration ? this.$store.getters.getMusicDuration : '00:00'
			}
			if (this.type === 'volume') {
				return false
			}
		},
		progressWidth () {
			if (this.type === 'progress') {
				if (this.$store.getters.getIsLoadStart) {
					return {
						'width': '0'
					}
				} else {
					return {
						'width': `calc(${(this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2)}%`
					}
				}
			}
			if (this.type === 'volume' && this.$store.getters.getAudioElement) {
				this.$store.getters.getAudioElement.volume = this.volume
				return {
					'width': `${this.volume * 100}%`
				}
			}
		}
	},
	methods: {
		mouseDown () {
			canDrag = true
		},
		mouseMove (event) {
			if (canDrag) {
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.duration.offsetLeft
				persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
				persentWidth = persentWidth > 100 ? 100 : persentWidth
				persentWidth = persentWidth < 0 ? 0 : persentWidth
				if (this.type === 'progress') {
					// this.$store.getters.getAudioElement.currentTime = this.duration * persentWidth / 100
					this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
					this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
				}
			} else {
				return
			}
		},
		mouseUp () {
			if (canDrag !== false) {
				canDrag = false
				if (this.type === 'progress') {
					if (isNaN(this.$store.getters.getAudioElement.duration)) return
					this.$store.getters.getAudioElement.currentTime = this.$store.getters.getAudioElement.duration * persentWidth / 100
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
				}
			}
		},
		touchMove (event) {
			if (canDrag) {
				if (this.type === 'progress') {
					let mouseX = event.touches[0].pageX
					let offsetLeft = this.$refs.duration.offsetLeft
					persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
					persentWidth = persentWidth > 100 ? 100 : persentWidth
					persentWidth = persentWidth < 0 ? 0 : persentWidth
					// this.$store.getters.getAudioElement.currentTime = this.duration * persentWidth / 100
					this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
				}
				if (this.type === 'volume') {
					let mouseX = event.touches[0].pageX
					let offsetLeft = this.$refs.duration.offsetLeft
					persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
					// alert(Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100))
					this.$store.getters.getAudioElement.volume = persentWidth / 100
					this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
				}
			} else {
				return
			}
		},
		touchEnd (event) {
			if (canDrag !== false) {
				canDrag = false
				if (this.type === 'progress') {
					if (isNaN(this.$store.getters.getAudioElement.duration)) return
					this.$store.getters.getAudioElement.currentTime = this.$store.getters.getAudioElement.duration * persentWidth / 100
				}
				if (this.type === 'volume') {
					this.$store.getters.getAudioElement.volume = persentWidth / 100
				}
			}
		},
		setCurrentProgress (event) {
			if (this.type === 'progress') {
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.duration.offsetLeft
				persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
				persentWidth = persentWidth > 100 ? 100 : persentWidth
				persentWidth = persentWidth < 0 ? 0 : persentWidth
				if (isNaN(this.$store.getters.getAudioElement.duration)) return
				this.$store.getters.getAudioElement.currentTime = Math.floor(this.$store.getters.getAudioElement.duration * persentWidth) / 100
				this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
			}
			if (this.type === 'volume') {
				let e = event || window.event
				let mouseX = e.pageX
				let offsetLeft = this.$refs.duration.offsetLeft
				persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
				this.$store.getters.getAudioElement.volume = persentWidth / 100
				this.$refs.currentProgress.style.width = `calc(${persentWidth}%`
			}
		},
		timerFomart (time) {
			if (isNaN(time)) return '00:00'
			let min = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
			let miao = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)
			return min + ':' + miao
		}
	},
	mounted () {
		this.type = this.rangeType
		this.currentcolor = this.currentColor
		this.ballwidth = this.ballWidth
		this.$refs.ball.style.width = `${this.ballwidth}px`
		this.$refs.ball.style.height = `${this.ballwidth}px`
		this.$refs.ball.style.marginTop = `-${this.ballwidth / 2 - 1}px`
		if (!this.currentcolor.length > 0 || this.type === 'progress') return
		this.$refs.currentProgress.style.background = this.currentcolor
	}
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import "../../common/stylus/global.styl"
	.range
		width:90%
		height:100%
		display:flex
		margin: 0 auto
		align-items:center
		display:flex
		box-sizing:border-box
		padding:0 10px
		.rangeicon
			font-size:14px
			color:rgba(255,255,255,0.7)
			margin-right:10px
		.span-left
			font-size:12px
			color:rgba(255,255,255,0.8)
			margin-right:10px
		.duration
			flex:1
			height:2px
			border-radius:1px
			background:rgba(244,244,244,0.3)
			margin:0 auto
			font-size:0
			cursor:pointer
			position:relative
			.currentProgress
				display:inline-block
				width:0%
				height:2px
				background:red
				float:left
				background:$primarycolor
			.ball
				// display:inline-block
				position:absolute
				width:14px
				height:14px
				// margin-top:-6px
				background:#fff
				// transform:translate(-50%,0)
				border-radius:50%
				float:left
				cursor:pointer
		.span-right
			font-size:12px
			color:rgba(255,255,255,0.8)
			margin-left:10px
</style>

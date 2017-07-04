<template>
	<div class="range" @mousemove="mouseMove($event)"  @mouseup="mouseUp" @mouseleave="mouseUp">
		<span class="span-left" v-show="type === 'progress'">{{musicCurrentTime}}</span>
		<i class="rangeicon icon-volume-medium" v-show="type === 'volume'"></i>
		<div class="duration" ref="duration">
			<span class="currentProgress" :style="progressWidth" ref="currentProgress"></span>
			<span class="ball" @mousedown="mouseDown"></span>
		</div>
		<span class="span-right" v-show="type === 'progress'">{{musicDuration}}</span>
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
			duration: 0
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
			return this.$store.getters.getCurrentTime ? this.$store.getters.getCurrentTime : '00:00'
		},
		musicDuration () {
			return this.$store.getters.getMusicDuration ? this.$store.getters.getMusicDuration : '**:**'
		},
		progressWidth () {
			return {
				'width': (this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2) + '%'
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
				this.$refs.currentProgress.style.width = persentWidth + '%'
			} else {
				return
			}
		},
		mouseUp () {
			if (canDrag !== false) {
				canDrag = false
				if (this.type === 'progress') {
					this.$store.getters.getAudioElement.currentTime = this.duration * persentWidth / 100
				}
				if (this.type === 'volume') {
					return
				}
			}
		}
	},
	mounted () {
		this.type = this.rangeType
		this.currentcolor = this.currentColor
		this.ballwidth = this.ballWidth
		this.duration = this.$store.getters.getAudioElement.duration
	}
}

</script>

<style lang="stylus" rel="stylesheet/stylus">
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
			margin-right:10px
		.span-left
			margin-right:10px
		.duration
			flex:1
			height:2px
			border-radius:1px
			background:rgba(244,244,244,0.3)
			margin:0 auto
			font-size:0
			.currentProgress
				display:inline-block
				width:10%
				height:2px
				background:red
				float:left
			.ball
				display:inline-block
				width:14px
				height:14px
				margin-left:-7px
				margin-top:-6px
				background:#fff
				border-radius:50%
				float:left
				cursor:pointer
		.span-right
			margin-left:10px
</style>

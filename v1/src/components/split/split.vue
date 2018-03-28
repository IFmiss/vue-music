<template>
	<span class="split" ref="split"></span>
</template>

<script>
	export default {
		props: {
			height: {
				type: String,
				default: '10'
			},
			background: {
				type: String,
				default: '#f3f5f7'
			},
			border: {
				type: String,
				default: 'transparent'
			}
		},

		mounted () {
			this.$refs.split.style.background = this.background
			this.$refs.split.style.height = `${this.height}px`
			this.$refs.split.style.borderColor = this.border
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.split
		display:block
		width:100%
		box-sizing:border-box
		border-width:1px
		border:none
		border-top-width:1px
		border-top-style:solid
		border-bottom-width:1px
		border-bottom-style:solid
		
</style>

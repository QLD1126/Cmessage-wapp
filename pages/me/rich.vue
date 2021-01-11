<template>
	<view class="container_0">
		<van-nav-bar
		  :title="info.title"
		  left-arrow
		  @click-left="onClickLeft"
		/>
		<view class="rich" v-html="info.content">
		</view>
	</view>
</template>
<script>
	export default{
		data(){
			return{
				info:{}
			}
		},
		onLoad(options) {
			this.$apis.ARTICLE(options.title).then(res=>{
				this.info=res
			})
		},
		methods:{
			onClickLeft(){
				uni.navigateBack({
					delta:1
				})
			}
		}
	}
</script>

<style lang="scss">
	.container_0{
		.rich{
			margin-top: 20rpx;
			background: #fff;
		}
	}
</style>

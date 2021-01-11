<template>
	<view class="container">
		<view class="li_106 flex-between" v-for="item in datalist" :key='item.id'>
			<view class="">
				<image src="../../static/WechatIMG884.jpg" mode="widthFix"></image>
				<view class="">
					事实上
				</view>
			</view>
			<button type="warn" v-if="1==2">关注</button>
			<button type="default" v-else>互相关注</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				datalist: [{
						title: '小点点',
						id: 1
					},
					{
						title: '大点点',
						id: 2
					},
				]
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.li_106{
			height: 144rpx;
			line-height: 1;
			>view:first-child{
				display: flex;
				align-items: center;
				image{
					width: 88rpx;
					border-radius: 50%;
					margin-right: 20rpx;
					+view{
						font-weight: bold;
					}
				}
			}
			button{
				margin: 0;
				padding: 0;
				width: 140rpx;
				height: 54rpx;
				line-height: 54rpx;
				font-size:24rpx ;
			}
		}
	}
</style>

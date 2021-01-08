<template>
	<view class="container">
		<view>
			<view>
				<image src="../../static/WechatIMG884.jpg" mode="widthFix"></image>
				<text>啊啊等哈悲剧啊</text>
			</view>
			<view>
				<view>
					<view>
						今日收益（¥）
					</view>
					<view>
						120.00
					</view>
				</view>
				<view>
					<view>
						累计收益（¥）
					</view>
					<view>
						120.00
					</view>
				</view>
			</view>
		</view>
		<view>
			<view>
				<image src="../../static/fabu1.png" mode=""></image>
					我的发布
			</view>
			<view>
				<image src="../../static/goumai.png" mode=""></image>
				我的购买
			</view>
			<view>
				<image src="../../static/qianbao.png" mode=""></image>
				我的钱包
			</view>

		</view>
		<view class="list_between_106">
			<view v-for="(item,index) in ulArr" :key='index' @click="toPage(item.url)">
				<view>
					<text>{{item.title}}</text>
				</view>
				<text class="iconfont icon-fanhuizuojiantouxiangzuoshangyibuxianxing"></text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ulArr:[{
					title: '实名认证',
					url: './name'
				},{
					title: '我的关注',
					url: './follow'
				},{
					title: '我的粉丝',
					url: './fans'
				},{
					title: '常见问题',
					url: './questions'
				},{
					title: '联系客服',
					url: './costomer'
				},{
					title: '关于我们',
					url: './we'
				}]
			};
		},
		methods: {
			a() {
				uni.navigateTo({
					url: './customer'
				})
			}
		}
	}
</script>

<style lang="scss">
.container{
	>view{
		background: #fff;
	}
	>view:first-child{
		background-image: linear-gradient(to bottom,#FF3D3B,#FE4543);
		height: 370rpx;
		// 头像部分
		position: relative;
		>view{
			display: flex;
			align-items: center;
			color: #fff;
			>image{
				width: 130rpx;
				border: 2rpx solid #fff;	
				border-radius: 50%;
				margin-right: 20rpx;
				+text{
					font-weight: bold;
					font-size: 36rpx;
				}
			}
		}
		>view:last-child{
			position: absolute;
			bottom: 0;
			width: 700rpx;
			height: 160rpx;
			border-radius: 10rpx 10rpx 0 0;
			background-image:linear-gradient(to bottom,#9CBAF7,#6C84B2) ;
			left: 25rpx;
			>view{
				flex:0 0 50%;
				text-align: center;
				>view:first-child{
					font-size: 24rpx;
					+view{
						font-size: 48rpx;
						font-weight: bold;
					}
				}
			}
			>view:first-child{
				border-right: 1rpx solid #fff;
			}
		}
		
	}
>view:nth-child(2){
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 172rpx;
	>view{
		text-align: center;
		display: flex;
		    flex-flow: column nowrap;
		    align-items: center;
		>image{
			width: 44rpx;
			height: 44rpx;
		}
	}
}
>view:last-child{
	margin-top: 20rpx;
}
}
</style>

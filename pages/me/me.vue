<template>
	<view class="container_0">
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
		<view >
			<view v-for="item in meArr" :key='item.title' @click="toPage(item.url)">
				<image :src="item.image"></image>
				{{item.title}}
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
				meArr: [{
					title: '我的发布',
					image: '../../static/fabu1.png',
					url: '/pages/index/index'
				}, {
					title: '我的购买',
					image: '../../static/goumai.png',
					url: '/pages/record/record'
				}, {
					title: '我的钱包',
					image: '../../static/qianbao.png',
					url: '/pages/me/wallet'
				}],
				ulArr: [{
					title: '实名认证',
					url: '/pages/me/name'
				}, {
					title: '我的关注',
					url: '/pages/me/follow'
				}, {
					title: '我的粉丝',
					url: '/pages/me/fans'
				}, {
					title: '常见问题',
					url: '/pages/me/questions'
				}, {
					title: '联系客服',
					url: '/pages/me/costomer'
				}, {
					title: '关于我们',
					url: '/pages/me/we'
				}]
			};
		},
		methods: {
			aa(e) {
				console.log('子元素',e)
			},
			toPage(url) {
				let isTab=['/pages/index/index','/pages/record/record'].indexOf(url)
				if(isTab<0){
					console.log(1111)
					uni.navigateTo({
						url:url
					})
				}else{
					uni.switchTab({
						url:url
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container_0 {
		>view {
			background: #fff;
		}

		>view:first-child {
			background-image: linear-gradient(to bottom, #FF3D3B, #FE4543);
			height: 370rpx;
			// 头像部分
			position: relative;

			>view {
				display: flex;
				align-items: center;
				color: #fff;
				>image {
					width: 130rpx;
					border: 2rpx solid #fff;
					border-radius: 50%;
					margin-right: 20rpx;
					+text {
						font-weight: bold;
						font-size: 36rpx;
					}
				}
			}

			>view:last-child {
				position: absolute;
				bottom: 0;
				width: 700rpx;
				height: 160rpx;
				border-radius: 10rpx 10rpx 0 0;
				// background-image: linear-gradient(to bottom, #9CBAF7, #6C84B2);
				background: #2C3240;
				left: 25rpx;
				>view {
					flex: 0 0 50%;
					text-align: center;
					>view:first-child {
						font-size: 24rpx;

						+view {
							font-size: 48rpx;
							font-weight: bold;
						}
					}
				}

				>view:first-child {
					border-right: 1rpx solid #fff;
				}
			}

		}

		>view:nth-child(2) {
			display: flex;
			justify-content: space-around;
			align-items: center;
			height: 172rpx;
			>view {
				flex: 0 0 33%;
				height: 100%;
				text-align: center;
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				justify-content: center;

				>image {
					width: 44rpx;
					height: 44rpx;
				}
			}
		}

		>view:last-child {
			margin-top: 20rpx;
		}
	}
</style>

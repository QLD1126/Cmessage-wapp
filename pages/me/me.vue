<template>
	<view class="container_0">

		<view>
			<view v-if="isLogged">
				<image :src="userInfo.avatar"></image>
				<text>{{userInfo.nickname}}</text>
				<image src="../../static/metop2.png" mode="" class="metop2"></image>
				<image src="../../static/metop1.png" mode="" class="metop1"></image>
				<image src="../../static/metop3.png" mode="" class="metop3"></image>
			</view>
			<navigator v-else open-type="navigate" url="/pages/login/login">
				<text style="  border: 10rpx solid;
					    width: 40vw;
					    margin: auto;
					    padding: 20rpx;
						text-align: center;">
					前往登录
				</text>
			</navigator>
			<view>
				<view>
					<view>
						今日收益（¥）
					</view>
					<view>
						{{userInfo.todayEarnings||0}}
					</view>
				</view>
				<view>
					<view>
						累计收益（¥）
					</view>
					<view>
						{{userInfo.totalEarnings||0}}
					</view>
				</view>
			</view>
		</view>
		<view>
			<navigator v-for="item in meArr" :key='item.title' :url="item.url"
				:open-type="item.url.match(/wallet/)?'navigate':'switchTab'" @click="toPage(item)">
				<image :src="item.image"></image>
				{{item.title}}
			</navigator>
		</view>
		<view class="list_between_106">
			<navigator v-for="(item,index) in ulArr" :key='index' open-type="navigate" :url="item.url">
				<view>
					<text>{{item.title}}</text>
				</view>
				<view class="">
					<text
						v-if="item.title=='实名认证'">{{userInfo.check_status==-1?'未通过':userInfo.check_status==0?'待审核':'通过'}}</text>
					<text class="iconfont icon-fanhuizuojiantouxiangzuoshangyibuxianxing"></text>
				</view>
			</navigator>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				loadOver: false,
				meArr: [{
					title: '我的发布',
					image: '../../static/fabu1.png',
					url: '/pages/record/record'
				}, {
					title: '我的购买',
					image: '../../static/goumai.png',
					url: '/pages/record/record'
				}, {
					title: '我的钱包',
					image: '../../static/qianbao.png',
					url: '/pages/me/wallet?type=1'
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
					url: '/pages/me/rich?title=联系客服'
				}, {
					title: '关于我们',
					url: '/pages/me/rich?title=关于我们'
				}]
			};
		},
		computed: mapState(['userInfo', 'isLogged', 'SYS']),
		onShow() {
			this.getuserInfo().then(() => {
				this.loadOver = true
			})
			console.log(this.userInfo)
		},
		methods: {
			...mapActions(['getuserInfo']),
			toPage(item) {
				uni.setStorageSync('RECORY_TYPE', item.title == '我的发布' ? 0 : 1)
			}
		}
	}
</script>

<style lang="scss">
	.container_0 {
		>view {
			background: #fff;
		}

		>view:nth-child(1) {
			background-image: linear-gradient(to bottom, #FF3D3B, #FE4543);
			height: 370rpx;
			padding-top: 220rpx;
			// 头像部分
			position: relative;

			>view,
			navigator {
				display: flex;
				align-items: center;
				color: #fff;

				>image:not(:first-child) {
					position: absolute;
					z-index: 99;
				}

				>image:first-child {
					position: relative !important;
					width: 130rpx;
					height: 130rpx;
					border: 4rpx solid #fff;
					border-radius: 50%;
					margin-right: 20rpx;
				}

				>.metop2 {
					width: 371rpx;
					height: 136rpx;
					top: 50rpx;
					left: 192rpx;
				}

				>.metop1 {
					width: 80rpx;
					height: 80rpx;
					right: 30rpx;
					bottom: 178rpx;
				}

				>.metop3 {
					width: 547rpx;
					height: 57rpx;
					left: 50rpx;
					bottom: 170rpx;
				}


				>text,
				navigator {
					font-weight: bold;
					font-size: 36rpx;

				}

				>.bg-txt {
					position: absolute;
					display: flex;
					flex-flow: column nowrap;
					align-items: flex-end;
					position: absolute;
					right: 30rpx;
					bottom: 190rpx;

					>text:first-child {
						font-size: 60rpx;

						+text {
							font-size: 40rpx;
						}
					}

				}
			}

			>navigator {
				justify-content: center;
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

			>navigator {
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
			color: #999;
		}
	}
</style>

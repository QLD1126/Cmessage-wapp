<template>
	<view class="container_0" v-show="loadOver">
		<view>
			<view v-if="isLogged">
				<image :src="userInfo.avatar"></image>
				<text>{{userInfo.nickname}}</text>
			</view>
			<navigator v-else open-type="navigate" url="/pages/login/login">
				<text>
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
			<navigator v-for="item in meArr" :key='item.title' :url="item.url" :open-type="item.url.match(/wallet/)?'navigate':'switchTab'" @click="toPage(item)">
				<image :src="item.image"></image>
				{{item.title}}
			</navigator>
		</view>
		<view class="list_between_106">
			<navigator v-for="(item,index) in ulArr" :key='index' open-type="navigate" :url="item.url">
				<view>
					<text>{{item.title}}</text>
				</view>
				<text class="iconfont icon-fanhuizuojiantouxiangzuoshangyibuxianxing"></text>
			</navigator>
		</view>
	</view>
</template>

<script>
	let a='/pages/me/wallet'
	let b=a.match(/wallet/)?'navigate':'switchTab'
	console.log(b,111)
	import {
		mapState,mapActions
	} from 'vuex';
	export default {
		data() {
			return {
				loadOver:false,
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
		computed:mapState(['userInfo','isLogged']),
		onShow() {
			this.getuserInfo().then(()=>{
				this.loadOver=true
			})
			console.log(this.userInfo)
		},
		methods: {
			...mapActions(['getuserInfo']),
			toPage(item){
					uni.setStorageSync('RECORY_TYPE',item.title=='我的发布'?0:1)
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

			>view,navigator {
				display: flex;
				align-items: center;
				color: #fff;
				>image {
					width: 130rpx;
					height: 130rpx;
					border: 4rpx solid #fff;
					border-radius: 50%;
					margin-right: 20rpx;
				}
				>text,navigator {
					font-weight: bold;
					font-size: 36rpx;
				}
			}
			>navigator{
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

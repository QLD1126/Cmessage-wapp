<template>
	<view class="container_0">
		<van-nav-bar title="我的钱包" @click-left="onClickLeft" custom-style='background: transparent;' title-class='natab' fixed
		 :border='false' style='color: #fff !important;'>
			<view class="iconfont icon-fanhuizuojiantouxiangzuoshangyibuxianxing1" slot='left'></view>
			<left>111</left>
		</van-nav-bar>
		<image src="../../static/qbbg.png" mode=""></image>
		<view class="top" :style="{'text-align':pageType==1?'center':'left'}">
			<view class="" v-show="pageType==1" @click="toRich">
				提现规则
			</view>
			<view class="" v-if="pageType==1">

				<text>余额</text>
				<view class="money">
					<text>¥</text>{{userInfo.balance||0}}
				</view>
				<button type="default" @click="toPage">提现</button>
			</view>
			<view class="" v-else="pageType==1">
				<view class="">
					可提现金额（元）
				</view>
				<view class="money">
					<text>¥</text>
					{{userInfo.balance||0}}
				</view>
			</view>

		</view>

		<navigator open-type="navigate" url="/pages/me/wallet_list" class="li_106 flex-between" v-if="pageType==1">
			<text>提现记录</text>
			<text class="iconfont icon-fanhuizuojiantouxiangzuoshangyibuxianxing"></text>
		</navigator>
		<view class="input" v-else>
			<view class="">

				<view class="">
					提现金额
				</view>
				<input type="digit" v-model="formdata.money" :placeholder="'请输入提现金额(最低'+userInfo.min_extract_price+')'" confirm-type="done" />
			</view>
			<view class="">
				<view class="选择提现方式">
					<view class="li_106 flex-between" v-for="item in method" :key='item.type' @click="formdata.type=item.type">
						<view class="">
							<image :src="item.image" mode="" class="icon_44"></image>{{item.title}}
						</view>
						<radio class="radio" :checked="item.type==formdata.type" @change='radiochange' />
					</view>
				</view>
			</view>
		</view>
		<button type="warn" v-if="pageType==2" class="btn_squre" @click="sure">确认提现</button>
	</view>
</template>

<script>
	import {
		mapState,
		mapActions
	}
	from 'vuex';
	export default {
		data() {
			return {
				formdata: {
					money: '',
					type: 'wechat'

				},
				method: [{
						title: '微信支付',
						checked: true,
						image: '../../static/wxdz.png',
						type: 'wechat'
					},
					{
						title: '支付宝支付',
						checked: false,
						image: '../../static/zfb.png',
						type: 'alipay'
					},
				],
				pageType: 1
			}
		},
		computed: (mapState(['userInfo'])),
		onLoad(options) {
			this.pageType = options.type
			this.getuserInfo()
		},
		methods: {
			...mapActions(['getuserInfo']),
			toRich() {
				uni.navigateTo({
					url: '/pages/me/rich?title=提现规则'
				})
			},
			sure() {
				// this.$apis.CASH(this.formdata).then(() => {
					this.getuserInfo().then(()=>{
						this.onClickLeft()
					})
				// })
			},
		
			// radiochange(e) {
			// 	console.log(e)
			// },
			toPage() {
				if (parseInt(this.userInfo.balance) < parseInt(this.userInfo.min_extract_price)) {
					uni.showToast({
						title: '最低提现金额为' + this.userInfo.min_extract_price,
						icon: 'none'
					})
				} else {
					uni.navigateTo({
						url: '/pages/me/wallet?type=2'
					})
				}
			},
			onClickLeft() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.van-nav-bar__text {
		color: #fff !important;
	}

	.radio {
		transform: scale(.5);
	}

	.container_0 {
		>image {
			width: 750rpx;
			height: 450rpx;
			position: fixed;
			z-index: -1;
		}

		.top {
			background: #F83C3B;
			color: #fff;
			width: 702rpx;
			padding: 160rpx 25rpx 10rpx;
			text-align: center;
			height: 300rpx;
			align-items: center;

			>view:first-child {
				text-align: right;
				font-size: 24rpx;
			}

			>view:last-child {
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-around;
				height: 250rpx;

				button {
					color: #f00;
					width: 340rpx;
					height: 64rpx;
					line-height: 64rpx;
					font-size: 32rpx;
				}
			}
		}

		.input {
			margin-top: 30rpx;

			>view:first-child {
				padding: 0 25rpx;
				margin-bottom: 20rpx auto 40rpx;
			}

			>view:last-child {
				padding: 0;

				>view {
					>view {
						background: transparent;
						line-height: 0;

						>view {
							display: flex;
							align-items: center;

							>image {
								margin-right: 10rpx;
							}
						}
					}
				}
			}

			input {
				width: 656rpx;
				background: #F3F3F3;
			}
		}

		.money {
			font-size: 48rpx;

			>text {
				font-size: 28rpx;
			}
		}

		+view {
			margin-top: -10rpx;
		}
	}

	.icon-fanhuizuojiantouxiangzuoshangyibuxianxing1 {
		color: #fff;
	}

	.van-nav-bar__title {
		color: #fff !important;
	}
</style>

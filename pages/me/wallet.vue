<template>
	<view class="container_0">
		<van-nav-bar title="我的钱包" @click-left="onClickLeft" custom-style='color:#f00;background: transparent;' title-class='natab'
		 fixed :border='false'>
			<left><text class="iconfont icon-fanhuizuojiantouxiangzuoshangyibuxianxing1"></text></left>
		</van-nav-bar>
		<image src="../../static/qbbg.png" mode=""></image>
		<view class="top" :style="{'text-align':pageType==1?'center':'left'}">
			<view class="" v-show="pageType==1">
				提现规则
			</view>
			<view class="" v-if="pageType==1">

				<text>余额</text>
				<view class="money">
					<text>¥</text>8000.00
				</view>
				<button type="default">提现</button>
			</view>
			<view class="" v-else="pageType==1">
				<view class="">
					可提现金额（元）
				</view>
				<view class="money">
					<text>¥</text>
					10000.00
				</view>
			</view>

		</view>

		<view class="li_106 flex-between" v-if="pageType==1">
			<text>提现记录</text>
			<text class="iconfont icon-fanhuizuojiantouxiangzuoshangyibuxianxing"></text>
		</view>
		<view class="input" v-else>
			<view class="">

				<view class="">
					提现金额
				</view>
				<input type="digit" value="" placeholder="请输入提现金额" confirm-type="done" />
			</view>
			<view class="">
				<view class="选择提现方式">
					<view class="li_106 flex-between" v-for="item in method" :key='item.type'>
						<view class="">
							<image :src="item.image" mode="" class="icon_44"></image>{{item.title}}
						</view>
							<radio class="radio" value="" :checked="item.checked"/>
					</view>
				</view>
			</view>
		</view>
		<button type="warn" v-if="pageType==2"class="btn_squre">确认提现</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				method: [{
						title: '微信支付',
						checked: true,
						image: '../../static/wxdz.png',
						type: 'wx'
					},
					{
						title: '支付宝支付',
						checked: false,
						image: '../../static/zfb.png',
						type: 'zfb'
					},
				],
				pageType: 2
			}
		},
		methods: {
			onClickLeft() {
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss">
	.radio{
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
			color: #fff;
			width: 700rpx;
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
			>view:first-child {
				padding: 0 25rpx;
				margin-bottom: 40rpx;
			}
			>view:last-child {
				padding: 0;
				>view{
					>view{
						background: transparent;
						line-height: 0;
						>view{
							display: flex;
							align-items: center;
							>image{
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
		color: #f00;
	}

	.van-nav-bar__title {
		color: #fff !important;
	}
</style>

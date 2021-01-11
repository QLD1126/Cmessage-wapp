<template>
	<view class="container">
		<view class="">
			<input type="text" value="" placeholder="请输入搜索关键词" />
			<text class="iconfont icon-sousuo"></text>
		</view>
		<van-tabs swipeable @change='tabchange' animated>
			<!-- <van-tab v-for='item in datalist' :key='item.id' :title="item.type">{{item.content}}</van-tab> -->
			<van-tab v-for='item in datalist' :key='item.id' :title="item.type">
				<view class='item' v-if="fromdata.name==0">
					<view class="">
						<view class="">

							<image src="../../static/fan.png" mode="" class="icon_44"></image>
							<text class="t_32_333">必须红</text>
						</view>
						<view class="" @click="openPop('res')">
							选结果
						</view>

					</view>
					<text>我说了就是必须红，那它就得红，不红也是红......</text>
					<view class="flex-between">
						<text>正在审核</text>
						<text class="t_24_9">2020-10-20 15:25:00 拷贝</text>
					</view>
					<view class="flex-around">
						<text class="iconfont icon-fenxiang" @click="openPop('share')">分享</text>
						<text class="iconfont icon-delete2">删除</text>
					</view>
				</view>
				<view class='item' v-else>
					<view class="flex-between">
						<view class="">
							<text class="t_32_333">必须红</text>
						</view>
						<view :class="a==1?'red':a==0?'hui':'fff'">
							正确
						</view>

					</view>
					<view class="flex-between">
						<view class="t_24_9">2020-10-20 15:25:00 拷贝</view>
						<text>
							¥ 88.00
						</text>
					</view>
				</view>
			</van-tab>
		</van-tabs>
		<van-action-sheet :show="show" :actions=" actions" @close="show=false" @select="onSelect" cancel-text="取消" />
		<!-- 二维码弹窗 -->
		<van-popup :show="ewmShow" @close="ewmShow=false">
			<view class="pop">
				<view class="">

					<text class="t_32_333">必须红</text>
					<image src="../../static/denglutishi.png" mode="widthFix"></image>
					<text class="t_24_9">信息发布小程序</text>
					<button class="btn_round_line">保存</button>
				</view>
				<image src="../../static/indexclose.png" mode="widthFix" @click="ewmShow=false"></image>
			</view>
		</van-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				ewmShow: true,
				a: 1,
				show: false,
				fromdata: {
					name: 0
				},
				datalist: [{
						id: 1,
						type: '我卖的料',
						content: '1111'
					},
					{
						id: 2,
						type: '我买的料',
						content: '2222'
					}
				],
				btntype: 'share',
				actions: [{
					name: '分享到微信好友'
				}, {
					name: '二维码分享'
				}],
			};
		},
		methods: {
			tabchange(e) {
				// detail: {index: 1, name: 1, title: "我买的料"}
				Object.assign(this.fromdata, {
					name: e.detail.name
				})
				console.log(e.detail)
			},
			openPop(type) {
				// this.btntype=type
				this.actions = type == 'share' ? [{
						name: '分享到微信好友'
					}, {
						name: '二维码分享'
					}] : [{
						name: '结果正确'
					}, {
						name: '结果错误'
					}],
					this.show = true

			},
			onSelect() {},
		}
	}
</script>

<style lang="scss">
	.van-tab__pane--active {
		// background: #f00;
		// height: 300rpx;
		// width: 100vw;
	}

	.container {
		width: 100vw;

		>view:first-child {
			position: relative;
			background: #fff;

			>input {
				width: 644rpx;
				height: 54rpx;
				border-radius: 27rpx;
				margin: 0 auto;
				background: #f3f3f3;
				padding-left: 54rpx;

				+text {
					position: absolute;
					left: 40rpx;
					top: 12rpx;
					color: #999;

				}
			}

		}

		.item {
			width: 700rpx;
			background: #fff;
			margin: 20rpx 0;
			padding: 0 25rpx;

			>view,
			text {
				margin: 17rpx 0;
			}

			>view:first-child {
				position: relative;
				display: flex;
				align-items: center;
				height: 88rpx;

				>view {
					display: flex;
					align-items: center;
					justify-content: space-between;

					>image {
						margin-right: 10rpx;
					}
				}

				>view:last-child {
					display: inline;
					text-align: right;
					border-radius: 20rpx;
					padding: 0 20rpx;
					min-width: 100rpx;
					text-align: center;
				}
			}

			>.flex-between {
				>text:first-child {
					color: #f00;
					font-size: 24rpx;
				}

				.t_24_9+text {
					color: #999;
				}
			}

			>.flex-around {
				width: 100vw;
				height: 104rpx;
				line-height: 104rpx;
				margin-left: -25rpx;

				>text {
					flex: 0 0 50%;
					border: 1rpx solid #f8f8f8;
					text-align: center;
					font-size: 24rpx;
					color: #333;
				}
			}
		}
	}

	.pop {
		width: 486rpx;
		height: 658rpx;
		text-align: center;
		>view {
			padding: 30rpx 0;
			display: flex;
			flex-flow: column wrap;
			justify-content: space-around;
			align-items: center;
			background: #fff;
			border-radius: 10rpx;

			>text:first-child {
				// margin-top: 40rpx;
			}
			>image {
				width: 294rpx;
			}
		}

		>image {
			margin-top: 40rpx;
			width: 64rpx;
		}

	}

	// 按钮
	.red {
		color: #fff;
		background: red;
		border: 0;
	}

	.hui {
		background: #666;
	}

	.fff {
		border: 1rpx solid #666;
	}
</style>

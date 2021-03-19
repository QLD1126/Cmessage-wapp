<template>
	<view class="container sell_info" v-show="loadOver">
		<view>
			<view>
				<view class="">
					<text class="t_32_333">{{info.goods.title}}</text>
					<view>{{info.goods.title}}</view>

				</view>
				<text :style="{color:info.goods.status>2?'#999':'#FE4543'}">{{info.goods._status}}</text>
			</view>
			<view class="user" v-if="info.api!=='FOLLOW_SALE_INFO'">
				<view class="">
					<image :src="info.mch_user.avatar" mode=""></image>
					{{info.mch_user.nickname}}
				</view>
				<button type="warn" class="btn_squre" @click="follow(info.mch_user)">{{is_follow? '已关注':'+关注'}}</button>
			</view>
			<view v-if="pageType=='isbuy'">
				<text>内容：</text>
				<text>{{info.goods.content}}</text>
			</view>
			<view v-if="info.goods.image!==''&&pageType=='isbuy'">
				<text>图片：</text>
				<image :src="info.goods.image" mode="widthFix" @click="lookImg(info.goods.image)"></image>
			</view>
			<view class="nobuy" v-if="pageType=='share'">
				购买后可查看详情
			</view>
		</view>
		<view class="list_between_106">
			<view>
				<text>价格</text>
				<text>¥ {{info.goods.price}}</text>
			</view>
			<view v-if="pageType=='isbuy'">
				<text>不对返还</text>
				<text>{{info.goods.is_return==1?'开':'关'}}</text>
			</view>
			<view>
				<text>销售截止时间</text>
				<text>{{info.goods.end_time}}</text>
			</view>
			<view v-if="pageType=='isbuy'">
				<text>内容公开时间</text>
				<text>{{info.goods.open_time}}</text>
			</view>
			<view v-if="info.goods.status==3&&pageType=='isbuy'">
				<text>结果</text>
				<text>{{info.status==-1?'结果错误':'结果正确'}}</text>
			</view>
		</view>
		<button type="warn" class="btn_round" @click="buy(info.goods.id,info.goods.price)"
			v-if="pageType=='share'">购买</button>
		<!-- <button type="warn" class="btn_round" @click="buy(info.goods.id)">购买</button> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				is_follow: false,
				pageType: 'isbuy',
				loadOver: false,
				info: {},
				resShow: false,
				actions: [{
						name: '结果正确',
					},
					{
						name: '结果错误',
					},
				],
			}
		},
		onLoad(options) {
			console.log(options,'options-byinfo')
			this.pageType = options.type
			console.log(options,this.pageType,'onload')
			let {
				api
			} = options

			// 刷新页面用
			if (options.type == 'isbuy') {
				this.$apis[api || 'BUY_INFO'](options.id).then(res => {
					res.goods = api ? {
						...res
					} : res.goods
					if(res.user){
						res.mch_user=res.user
					}
					Object.assign(this.info, options, res)
					console.log(this.info)
					this.is_follow = api ? true : res.mch_user.is_follow
					this.loadOver = true
				})
			} else {
				this.$apis['BUY_SHARE_INFO'](options.id).then(res => {
					console.log(res,999)
					if (res.is_buy||res.status==3) {
						uni.reLaunch({
							url: `/pages/record/buyinfo?type=isbuy&id=${res.id}&api=BUY_SHARE_INFO`
						})
					} else {
						let goods = {
							...res
						}
						Object.assign(this.info, options, {
							mch_user: res.user,
							goods: goods,
						})
						this.is_follow = api ? true : res.user.is_follow
						this.loadOver = true
					}
				})
			}
		},
		methods: {
			lookImg(url) {
				uni.previewImage({
					urls: [url]
				})
			},
			buy(id, p) {
				if (Math.ceil(p) > 0) {
					this.$apis.BUY_CREATE(id).then(res => {
						wx.requestPayment({
							...res.jsConfig,
							success: pay => {
								console.log('支付结果', pay)
								uni.reLaunch({
									url: '/pages/record/buyinfo?type=isbuy&id=' + res.id
								})
							},
							fail: err => {
								console.log(err)
								uni.showToast({
									title: '您已取消支付',
									icon: 'none',
									duration: 2000
								});
							},
						})
					})
				} else {
					// 免费订单无需支付
					uni.showModal({
						title: '提示',
						content: '确认购买?',
						success: (tos) => {
							if (tos.confirm) {
								this.$apis.BUY_CREATE(id).then(res => {
									uni.reLaunch({
										url: '/pages/record/buyinfo?type=isbuy&id=' + res.id
									})
								})
							}
						}
					})
				}
			},
			follow(user) {
				if (user.uid == uni.getStorageSync('USERINFO').uid) {
					uni.showToast({
						title: '自己不能关注自己',
						icon: 'none'
					})
					return
				} else {
					this.is_follow ? this.$apis.UNFOLLOW(user.uid) : this.$apis.ISFOLLOW(user.uid)
					this.is_follow = !this.is_follow
				}
			},
			btnClick() {
				// 不同状态不同操作
				this.resShow = true
			}
		}
	}
</script>

<style lang="scss">
	.t_32_333+view {
		margin-top: 10rpx;
	}

	.container {
		>view:first-child {
			>.user {
				justify-content: space-between;
				padding: 20rpx 0;

				>view {
					display: flex;
					align-items: center;

					>image {
						width: 94rpx;
						height: 94rpx;
						border-radius: 50%;
						margin-right: 20rpx;
					}
				}

				>.btn_squre {
					position: relative;
					width: 140rpx;
					height: 54rpx;
					line-height: 54rpx;
					padding: 0;
					font-size: 24rpx;
					margin: 0;
					top: 0;
					left: 0;
				}
			}

			>.nobuy {
				height: 240rpx;
				color: #999;
				justify-content: center;
				border-top: 1rpx solid #f3f3f3;
			}
		}

		>.btn_round {
			position: absolute;
			bottom: 20rpx;
			left: 25rpx;
		}
	}
</style>

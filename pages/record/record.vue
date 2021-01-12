<template>
	<view class="container_0">
		<view class="">
			<input type="text" v-model="formdata.keyword" placeholder="请输入搜索关键词" confirm-type="search" @confirm="getList(formdata)" />
			<text class="iconfont icon-sousuo"></text>
		</view>
		<van-tabs swipeable @change='tabchange' animated>
			<!-- <van-tab v-for='item in datalist' :key='item.id' :title="item.type">{{item.content}}</van-tab> -->
			<van-tab v-for='(item,index) in datalist' :key='item.id' :title="item.type">
				<view class="" v-if="item.content.length>0">

					<view v-if="formdata.type==0">
						<navigator class='item' v-for="(item,index) in datalist[0].content" :key="item.id" open-type="navigate" :url="'/pages/record/detail?id='+item.id">
							<view class="flex-between">
								<view class="">
									<image src="../../static/fan.png" mode="" class="icon_44"></image>
									<text class="t_32_333">{{item.title}}</text>
								</view>
								<!-- <view class="" @click.stop="openPop('res')">
									选结果
								</view> -->
								<view :class="item.status==1?'red':item.status==-1?'hui':'fff'"  v-if="item.status==3" @click.stop="openPop('res',item.status)">
									<!-- {{item.status==3?'选结果':''}} -->选结果
									<!-- {{item.status==-1?'结果错误':item.status==0?'等待结果':'结果正确'}} -->
								</view>

							</view>
							<text>{{item.subhead}}</text>
							<view class="flex-between">
								<text>{{item._status}}</text>
								<text class="t_24_9">{{item.add_time}}</text>
							</view>
							<view class="flex-around">
								<button type="default" plain @click.stop="openPop('share')"><text class="iconfont icon-fenxiang">分享</text></button>
								<button type="default" plain @click.stop="remove(item.id,index)"><text class="iconfont icon-delete2">删除</text></button>
							</view>
						</navigator>
					</view>
					<view class='' v-else-if="formdata.type==1">
						<navigator class="item" v-for="(item,index) in datalist[1].content" :key='itme.id' open-type="navigate" :url="'/pages/record/buyinfo?type=isbuy&id='+item.id">
							<view class="flex-between">
								<view class="">
									<text class="t_32_333">{{item.title}}</text>
								</view>
								<view :class="item.status==1?'red':item.status==-1?'hui':'fff'">
									{{item.status==-1?'错误':item.status==0?'等待结果':'正确'}}
								</view>

							</view>
							<view class="flex-between">
								<view class="t_24_9">{{item.add_time}}</view>
								<text>
									¥ {{item.pay_price}}
								</text>
							</view>
						</navigator>
					</view>
					<uni-load-more :status="loadStatus"></uni-load-more>
				</view>
				<van-empty description="暂无记录" v-else />
			</van-tab>
		</van-tabs>
		<van-action-sheet :show="shareShow" :actions="actions" @close="shareShow=false" @select="onSelect" cancel-text="取消"
		 class='s-action' />
		<!-- 二维码弹窗 -->
		<van-popup :show="ewmShow" @close="ewmShow=false">
			<view class="pop">
				<view class="">

					<text class="t_32_333">必须红</text>
					<image src="../../static/denglutishi.png" mode="widthFix"></image>
					<text class="t_24_9">信息发布小程序</text>
					<button class="btn_round_line" @click.stop="saveImage">保存</button>
				</view>
				<image src="../../static/indexclose.png" mode="widthFix" @click.stop="ewmShow=false"></image>
			</view>
		</van-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 加载列表
				loadStatus: 'loading',
				formdata: {
					type: 0,
					page: 1,
					limit: 10,
					keyword: null,
				},
				ewmShow: false,
				shareShow: false,
				current: 1,
				datalist: [{
						id: 0,
						type: '我卖的料',
						content: []
					},
					{
						id: 1,
						type: '我买的料',
						content: []
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
		onLoad() {
			this.getList(this.formdata)
		},
		methods: {
			getList(data) {
				data.page = 1
				console.log(data)
				if (data.type == 0) {
					// uni.showLoading({

					// })
					// 卖料
					this.$apis.SELL_LIST(data).then(res => {
						this.loadStatus = res.length < data.limit ? 'noMore' : 'more'
						this.datalist[0].content = res
						// console.log(this.datalist[].content, 777)
						// uni.hideLoading()
					})
				} else {
					this.$apis.BUY_LIST(data).then(res => {
						this.loadStatus = res.length < data.limit ? 'noMore' : 'more'
						this.datalist[1].content = res
						// uni.hideLoading()

					})
					// 
				}
			},
			loadMore(data) {
				if (data.type == 0) {
					uni.showLoading({})
					// 卖料
					this.$apis.SELL_LIST(data).then(res => {
						this.loadStatus = res.length < data.limit ? 'noMore' : 'more'
						this.datalist[0].content.push(...res)
						uni.hideLoading()
					})
				} else {
					// 
				}
			},
			// 删除
			remove(id, index) {
				uni.showModal({
					title: '提示',
					content: '确定删除该记录？',
					success: (res) => {
						if (res.confirm) {
							this.$apis.SELL_DEL(id).then(res => {
								this.datalist[this.formdata.type].content.splice(index, 1)
							})
						}
					}
				})
			},
			tabchange(e) {
				Object.assign(this.formdata, {
					type: e.detail.name
				})
				this.getList(this.formdata)
				console.log(e.detail)
			},
			openPop(type,status) {
				// this.btntype=type
				this.actions = type == 'share' ? [{
						name: '分享到微信好友',
						value: 'wx',
					}, {
						name: '二维码分享',
						value: 'ewm',
					}] : [{
						name: '结果正确',

					}, {
						name: '结果错误'
					}]
					this.shareShow = true
					// this.show = true

			},
			onSelect(e) {
				console.log(e.detail)
				let res = e.detail.value
				if (res == 'wx') {
				} else {
					this.shareShow = false
					this.ewmShow = true
				}
			},
			saveImage() {
							// console.log(123)
							uni.saveImageToPhotosAlbum({
								filePath: 'https://img-home.csdnimg.cn/images/20201124032511.png',
								success: () => {
									uni.showToast({
										title: '保存成功',
										duration: 2000
									});
								},
								fail: (err) => {
									console.log(err)
									uni.showToast({
										title: '保存失败',
										duration: 2000,
										icon: "none"
									});
								}
							});
							return
							uni.showActionSheet({
								itemList: ['保存图片', '取消'],
								success: res => {
									if (res.tapIndex == 0) {
			
									}
								},
								fail: function(res) {
									console.log(res.errMsg);
								}
							});
						}
		},
		onShareAppMessage: function() {
			return {
				title: '邀请好友领积分',
				imageUrl: this.imgurl, //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
				path: '/pages/index/index',
				success: function(res) {
					console.log(res);
				}
			};
		},
		onReachBottom() {
			if (this.loadStatus !== 'noMore') {
				// Object.assign(this.formdata,{page++})
				this.formdata.page++
				this.loadMore(this.formdata)
			}
		}
	}
</script>

<style lang="scss">
	.s-action {
		button {
			border-radius: 0;
		}
	}

	.van-tab__pane--active {
		// background: #f00;
		// height: 300rpx;
		// width: 100vw;
	}

	.container_0 {
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

				>button {
					flex: 0 0 50%;
					border: 1rpx solid #f8f8f8;

					>text {
						font-size: 24rpx;
						color: #333;
					}
				}
			}
		}
	}

	.pop {
		width: 486rpx;
		height: 658rpx;
		text-align: center;

		>view {
			height: 490rpx;
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
		color: #fff;
	}

	.fff {
		background: #fff;
		border: 1rpx solid #666;
	}
</style>

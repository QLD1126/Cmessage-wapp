<template>
	<view class="container_0 sell-list">
		<!-- <image src="../../static/shareimg.png" mode=""></image> -->
		<view class="">
			<view class="">
				<text class="iconfont icon-sousuo"></text>
				<input type="text" v-model="formdata.keywords" placeholder="请输入搜索关键词" confirm-type="search"
					@confirm="getList(formdata)" />
				<view @click="getList(formdata)">搜索</view>
			</view>
		</view>
		<van-tabs class="sell-content" swipeable @change='tabchange' animated :active='formdata.type'>
			<!-- <van-tab v-for='item in datalist' :key='item.id' :title="item.type">{{item.content}}</van-tab> -->
			<van-tab v-for='(item,index) in datalist' :key='item.id' :title="item.type">
				<view v-if="item.content.length>0">
					<view v-if="formdata.type==0">
						<navigator class='item' v-for="(item,index) in datalist[0].content" :key="item.id"
							open-type="navigate" :url="'/pages/record/detail?id='+item.id">
							<view class="flex-between">
								<view class="">
									<image v-if="item.is_return==1" src="../../static/fan.png" mode="" class="icon_44">
									</image>
									<text class="t_32_333">{{item.title}}</text>
								</view>
								<view :class="item.result==1?'red':item.result==-1?'hui':'fff'"
									:style="{display:item.status>=3?'inline':'none'}" @click.stop="openPop('res',item)">
									{{item.result==-1?'黑':item.result==1?'红':'选结果'}}
									<!-- {{item.status==-1?'结果错误':item.status==0?'等待结果':'结果正确'}} -->
								</view>

							</view>
							<text>{{item.subhead}}</text>
							<view class="flex-between">
								<text>{{item._status}}</text>
								<!-- <text v-if="item.status==2">已售份</text> -->
								<view class="t_24_9" v-if="item.status>=1">已售<text
										style="color: #f00;">{{item.sales}}</text> 份</view>
								<text class="t_24_9">{{item.add_time}}</text>
							</view>
							<view class="flex-around">
								<button type="default" plain @click.stop="openPop('share',item)"
									:disabled="item.status<1"><text class="iconfont icon-fenxiang"
										:style='{color:item.status<1?"#999":"#000"}'>分享</text></button>
								<button type="default" plain @click.stop="remove(item.id,index)"
									:disabled="item.status==2||item.status==1"><text
										:style='{color:item.status==2||item.status==1?"#999":"#000"}'
										class="iconfont icon-delete2">删除</text></button>
							</view>
						</navigator>
					</view>
					<view class='' v-else-if="formdata.type==1">
						<navigator class="item" v-for="(item,index) in datalist[1].content" :key='itme.id'
							open-type="navigate" :url="'/pages/record/buyinfo?type=isbuy&id='+item.id">
							<view class="flex-between">
								<view class="">
									<text class="t_32_333">{{item.title}}</text>
								</view>
								<view :class="item.status==1?'red':item.status==-1?'hui':'fff'">
									{{item.status==-1?'':item.status==0?'等待结果':'红'}}
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
		<van-action-sheet :safe-area-inset-bottom='false' :show="shareShow" :actions="actions" @close="shareShow=false"
			@select="onSelect" cancel-text="取消" class='s-action' />
		<!-- 二维码弹窗 -->
		<van-popup :show="ewmShow" @close="ewmShow=false">
			<view class="pop">
				<view class="">
					<image src="../../static/sbg.png"></image>
					<view class="">
						<text class="t_32_333">{{item.title}}</text>
						<text class="">{{item.subhead}}</text>
						<!-- <image src="../../static/WechatIMG884.jpg" mode="widthFix"></image> -->
						<image :src="item.wxaCode" mode="heightFix"></image>
						<text class="t_24_9">{{sys.site_name}}</text>
						<view class="flex-between">
							<view class="">
								¥{{item.price}}
							</view>
							<view class="">
								{{item.is_return==1?'不对返还':''}}
							</view>
						</view>
						<button class="btn_round_line" @click.stop="saveBase64">保存</button>
					</view>
				</view>
				<image src="../../static/indexclose.png" mode="widthFix" @click.stop="ewmShow=false"></image>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				sys: uni.getStorageSync('SYS'),
				wxaCode: '',
				item: {},
				// 加载列表
				loadStatus: 'loading',
				formdata: {
					type: 0,
					page: 1,
					limit: 10,
					keywords: '',
				},
				ewmShow: false,
				shareShow: false,
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
				actions: [],
			};
		},
		computed: (mapState(['isLogged', 'userInfo'])),
		onLoad() {
			this.getList(this.formdata)
		},
		onShow() {
			console.log(this.isLogged)
			if (this.isLogged) {
				uni.getStorage({
					key: 'RECORY_TYPE',
					complete: res => {
						Object.assign(this.formdata, {
							type: res.data || 0
						})
					}
				})
			}
			// tabs的active绑定了当前选中值，会自动发送请求
		},
		methods: {
			getList(data) {
				data.page = 1
				console.log(data)
				if (data.type == 0) {
					// 卖料
					this.$apis.SELL_LIST(data).then(res => {
						this.loadStatus = res.length < data.limit ? 'noMore' : 'more'
						this.datalist[0].content = res
						uni.stopPullDownRefresh()
					})
				} else {
					// 买料
					this.$apis.BUY_LIST(data).then(res => {
						this.loadStatus = res.length < data.limit ? 'noMore' : 'more'
						this.datalist[1].content = res
					})
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
				console.log('tabchange', e)
				Object.assign(this.formdata, {
					type: e.detail.name
				})
				this.getList(this.formdata)
				console.log(e.detail, e)
			},
			openPop(type, i) {
				// this.btntype=type
				i.select = type
				i.path = i.status == 1 ?
					`/pages/record/buyinfo?type=share&id=${i.id}` :
					`/pages/record/detail?id=${i.id}&api=FOLLOW_SALE_INFO`
				this.item = i //分享用
				console.log(this.item)
				if (i && i.result !== 0 && type == 'res') {
					uni.showToast({
						title: '结果已选',
						icon: 'none'
					})
					return
				}
				this.actions = type == 'share' ? [{
						name: '分享到微信好友',
						value: 'wx',
						openType: 'share'
					}, {
						name: '二维码分享',
						value: 'ewm',
					}] : [{
						name: '结果正确',
						value: '1'

					}, {
						name: '结果错误',
						value: '2'
					}],
					this.shareShow = true
			},
			onSelect(e) {
				let item = this.item
				console.log(e.detail)
				let res = e.detail.value
				if (item.select == 'share') {
					if (res == 'wx') {} else {
						console.log(item, item.wxaCode)
						if (item.wxaCode) {
							this.ewmShow = true
						} else {
							this.getToken()
						}
					}
				} else {
					this.$apis.FINISH(item.id, res).then(() => {
						item.result = res == 1 ? '1' : '-1'
					})
				}

			},
			// 获取访问相册权限
			getAuthorize() {
				let that = this
				//判断用户是否授权"保存到相册"
				wx.getSetting({
					success(res) {
						//没有权限，发起授权
						if (!res.authSetting['scope.writePhotosAlbum']) {
							wx.authorize({
								scope: 'scope.writePhotosAlbum',
								success() { //用户允许授权，保存图片到相册
									that.saveImage();
								},
								fail() { //用户点击拒绝授权，跳转到设置页，引导用户授权
									wx.openSetting({
										success() {
											wx.authorize({
												scope: 'scope.writePhotosAlbum',
												success() {
													that.saveImage();
												}
											})
										}
									})
								}
							})
						} else { //用户已授权，保存到相册
							that.saveImage()
						}
					}
				})
			},
			//保存图片到相册，提示保存成功
			saveImage() {
				let that = this
				wx.downloadFile({
					url: 'https://profile.csdnimg.cn/4/0/2/0_weixin_48888726',
					success: function(res) {
						wx.saveImageToPhotosAlbum({
							filePath: res.tempFilePath,
							success(res) {
								wx.showToast({
									title: '保存成功',
									icon: "success",
									duration: 1000
								})
							}
						})
					}
				})
			},
			// 保存base64
			saveBase64() {
				var that = this
				var aa = wx.getFileSystemManager(); //获取文件管理器对象
				// console.log('that.data.wxaCode:', that.data.wxaCode)
				aa.writeFile({
					filePath: wx.env.USER_DATA_PATH + '/cmessage.png',
					data: this.wxaCode.slice(22),
					encoding: 'base64',
					success: res => {
						wx.saveImageToPhotosAlbum({
							filePath: wx.env.USER_DATA_PATH + '/cmessage.png',
							success: function(res) {
								wx.showToast({
									title: '保存成功',
								})
							},
							fail: function(err) {
								console.log(err, '失败')
							}
						})
						console.log(res)
					},
					fail: err => {
						console.log(err)
					}
				})
			},
			// 二维码
			//获取access_token
			getToken() {
				uni.showLoading({
					title: '生成中...'
				})
				uni.request({
					url: 'https://api.weixin.qq.com/cgi-bin/token',
					method: 'GET',
					data: {
						grant_type: 'client_credential',
						appid: 'wxff7578518bec0a09',
						secret: 'c04ac48be3603ee577de3cc7a493095d'
					},
					header: {
						'content-type': 'application/json' // 默认值
					},
					success: res => {
						// wx.setStorageSync('access_token', res.data.access_token)
						let access_token = res.data.access_token
						wx.request({
							url: 'https://api.weixin.qq.com/cgi-bin/wxaapp/createwxaqrcode?access_token=' +
								access_token,
							method: 'POST',
							responseType: 'arraybuffer',
							data: {
								path: this.item.path,
								width: 200
							},
							success: (res) => {
								// console.log('二维码', res.data)
								var base64 = wx.arrayBufferToBase64(res.data).replace(/\. +/g, '')
								base64 = base64.replace(/[\r\n]/g, '')
								// uni.setStorageSync('wxaCode', 'data:image/png;base64,' + base64)
								let wxaCode = 'data:image/png;base64,' + base64
								this.wxaCode = wxaCode
								// 存入当前item避免再次生成
								Object.assign(this.item, {
									wxaCode: wxaCode
								})
								uni.hideLoading()
								this.ewmShow = true
							},
						})
					},
					complete: res => {
						console.log(res)
					}
				})
			},
		},
		onShareAppMessage() {
			let item = this.item
			// console.log(item)
			return {
				title: item.title,
				desc: item.content,
				imageUrl: '../../static/shareimg.png', //自定义图片路径，可以是本地文件路径、代码包文件路径或者网络图片路径。支持PNG及JPG。显示图片长宽比是 5:4。
				path: item.path,
				success: function(res) {
					console.log(res, '分享', path);
				}
			};
		},
		onReachBottom() {
			if (this.loadStatus == 'more') {
				this.formdata.page++
				this.loadMore(this.formdata)
			}
		},
		onPullDownRefresh() {
			// if (this.loadStatus !== 'loading') {
			this.getList(this.formdata)
			// }
		}
	}
</script>

<style lang="scss" scoped>
	van-tab {
		height: 90vh;
		overflow-y: scroll;
	}

	.s-action {
		button {
			border-radius: 0;
		}
	}

	.sell-list {
		width: 100vw;
		>view:first-child {
			position: relative;
			background: #fff;
			>view {
				display: flex;
				align-items: center;
				width: 644rpx;
				height: 54rpx;
				border-radius: 27rpx;
				margin: 0 auto;
				background: #f3f3f3;
				padding-left: 54rpx;
				>input {
					flex: 0 0 80%;
				}

				>text,
				view {
					position: absolute;
					color: #999;
				}

				>text {
					left: 40rpx;
				}

				>view {
					border-left: 1rpx solid #999;
					padding-left: 20rpx;
					right: 50rpx;
				}
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
			border: 1rpx solid #ccc;
		}
	}

	.pop {
		width: 486rpx;
		font-size: 24rpx;
		height: 900rpx;
		text-align: center;

		>view {
			background: #fff;
			height: 794rpx;
			border-radius: 10rpx;

			>image:first-child {
				width: 406rpx;
				height: 586rpx;
				position: absolute;
				top: 40rpx;
				left: 40rpx;
			}

			>view {
				height: 794rpx;
				padding: 30rpx 0;
				display: flex;
				flex-flow: column wrap;
				justify-content: flex-start;
				align-items: center;
				position: relative;
				z-index: 888;

				>text:first-child {
					color: #fff;
					margin: 20rpx auto;

					+text {
						color: #F2D539;
					}
				}

				>image {
					height: 294rpx;
					border-radius: 10rpx;
					margin: 20rpx 0;

					+text {
						color: #fff;
						font-size: 40rpx;
						font-weight: bold;
					}
				}

				>view {
					padding: 0 20rpx;
					height: 64rpx;
					line-height: 64rpx;
					background: #fff;
					color: #E92C2A;
					width: 326rpx;
					border-radius: 10rpx;
					margin: 15rpx auto 30rpx;

				}

				>.btn_round_line {
					height: 88rpx;
					line-height: 88rpx;
					width: 406rpx;
					border-radius: 88rpx;
					background: #FA3D06;
					margin-top: 40rpx;
				}
			}
		}

		>image {
			margin-top: 40rpx;
			width: 64rpx;
		}

	}
</style>

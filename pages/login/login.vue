<template>
	<view>
		<view class="login">
			<!-- <image :src="logo" mode=""></image> -->
			<view class="">

				<image :src="logo" mode=""></image>
				信息发布
			</view>
			<view class="t_32_333">
				{{getphone?'登录后该应用将获得以下权限':'授权后将获得您的手机号'}}
			</view>
			<text class="t_24_9 iconfont icon-circle" v-show="getphone">
				<!-- {{getphone?'获得你的公开信息（昵称、头像等）':'获得你的手机号'}} -->
				获得你的公开信息（昵称、头像等）
			</text>
			<view class="flex-between">
				<button type="primary" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfoclick" v-if="getphone">确认登录</button>
				<button type="primary" open-type="getPhoneNumber" lang="zh_CN" @getphonenumber="getPhoneNumberClick" v-else>确认授权</button>
				<button type="default" @click="toPage">取消</button>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		mapActions,
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				getphone: true,
				loginData: {},
				logo: '',
			};
		},
		onShow() {
			// console.log(this.$apis)
			this.$apis.LOGO().then(res => {
				this.logo = res.logo_url
				console.log('show')
			}).catch(err => {
				console.log(err, '失败')
			})
		},
		computed: mapState(['userInfo']),
		methods: {
			...mapActions(['login', 'getuserInfo']),
			toPage(){
				uni.navigateBack({
					delta:1
				})
			},
			//微信授权登录
			getUserInfoclick(e) {
				// let that = this;
				uni.getSetting({
					success: (isAuth) => {
						if (isAuth.authSetting['scope.userInfo']) {
							uni.showLoading({
								title: '登录中...'
							})
							let res = e.detail
							Object.assign(this.loginData, {
								iv: res.iv,
								encryptedData: res.encryptedData,
							})
							this.goLogin(this.loginData)
						} else {
							uni.showModal({
								title: '提示',
								content: '授权失败，请确认授权已开启',
								success: (res) => {
									if (res.confirm) {
										uni.openSetting({})
									}
								}
							})
						}
					}
				})
			},

			goLogin(data) {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						Object.assign(data, {
							jsCode: res.code,
						})
						// this.login(data)
						this.login(data).then(res => {
							if (res.cache_key !== '') {
								Object.assign(this.loginData, {
									cache_key: res.cache_key
								})
							}
							getApp().globalData.hasLogin = true
							this.getuserInfo().then(info => {
								if (info.phone!=='') {
									this.getuserInfo()
									this.toPage()
								} else {
									this.getphone = false
								}
								uni.hideLoading()
							})
						}).catch(err => {
							console.log('登录失败', err)
						})
					}
				});
			},
			getPhoneNumberClick(e) {
				let data = {
					iv: e.detail.iv,
					encryptedData: e.detail.encryptedData,
					cache_key: uni.getStorageSync('CATCH_KEY')
				}
				this.$apis.PHONE(data).then(() => {
					this.getuserInfo()
					uni.switchTab({
						url: '/pages/index/index'
					})
				})
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
	.login {
		padding: 20rpx;

		>view:first-child {
			text-align: center;
			margin: 101rpx auto 150rpx;

			>image {
				width: 160rpx;
				height: 160rpx;
				border-radius: 20rpx;
				display: block;
				margin: 1rpx auto;
			}
		}

		>view:last-child {
			button {
				margin-top: 70rpx;
				width: 702rpx;
				color: #fff;
				flex: 0 0 45%;
			}

			>button:last-child {
				color: #333;
			}
		}
	}
</style>

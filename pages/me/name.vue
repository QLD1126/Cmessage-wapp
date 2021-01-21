<template>
	<view class="container_0">
		<van-notice-bar left-icon="volume-o" text="实名认证信息只用于提现，信息发布平台不会向任何渠道泄露您的个人信息，请放心填写！" />
		<view class="input" v-for="(item,index) in re_list" :key='item.key'>
			<view class="">
				<view class="">
					<text>*</text>{{item.name}}
				</view>
				<!-- <input v-model="item.value||userInfo[item.key]" type="text" :placeholder="item.placeholder" @blur="blur($event,index)"
				 :disabled="userInfo.check_status>=0&&userInfo.real_name!==''" /> -->
				<input v-model="item.value" type="text" :placeholder="item.placeholder" @blur="blur($event,index)" :disabled="userInfo.check_status>=0&&userInfo.real_name!==''" />
			</view>
		</view>
		<text>单笔提现金额超过4500元，将使用支付宝支付</text>
		<button type="warn" class="btn_squre" @click="sure(userInfo.real_name)" :disabled="userInfo.check_status>=0&&userInfo.real_name!==''">{{userInfo.check_status==1?'已认证':userInfo.check_status==0&&userInfo.real_name==''?'提交':'审核中...'}}</button>
		<!-- <button type="warn" class="btn_squre" @click="sure(userInfo.real_name)" >{{userInfo.check_status==0?'审核中...':userInfo.check_status==1?'已认证':'提交'}}</button> -->
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
				re_list: [{
						placeholder: '请输入您的姓名',
						value: '',
						key: 'real_name',
						name: '姓名',
					},
					{
						placeholder: '请输入您的手机号',
						type: 'number',
						value: '',
						key: 'phone',
						name: '手机号',
					},
					{
						placeholder: '请输入您的支付宝账号',
						value: '',
						key: 'alipay_account',
						name: '支付宝账号',
					}
				]
			}
		},
		onLoad() {
			this.getuserInfo().then(res => {
				// 说明已经通提交过实名认证
				if (res.check_status >= 0 && res.real_name !== '') {
					// res.real_name = '烟雨'
					// res.phone = '17628274150'
					// res.alipay_account = '12345678765'
					res.phone = String(res.phone).slice(0, 3) + '****' + String(res.phone).slice(-4)
					res.alipay_account = String(res.alipay_account).slice(0, 3) + '****' + String(res.alipay_account).slice(-4)
					this.re_list.forEach(item => {
						item.value= res[item.key]
					})
				}
			})
		},
		computed: mapState(['userInfo']),
		methods: {
			...mapActions(['getuserInfo']),
			blur(e, index) {
				this.re_list[index].value = e.detail.value
			},
			sure(state) {
				let formdata = {}
				console.log(this.re_list)
				this.re_list.map(item => {
					formdata[item.key] = item.value
				})
				this.$apis.NAME(formdata).then(res => {
					this.getuserInfo()
				})
			}
		}
	}
</script>

<style lang="scss">
	.container_0 {
		height: 100vh;
		background: #fff;

		>view:first-child {
			height: 50rpx;
		}

		text {
			padding: 20rpx;
		}

		.input {
			>view {
				padding: 20rpx;
				position: relative;

				>view {
					font-size: 30rpx;
					font-weight: bold;
					margin-bottom: 30rpx;

					>text {
						color: #FE4543;
					}
				}

				>input {
					background: #F3F3F3;
					width: 95%;
					font-size: 26rpx;
					border-radius: 10rpx;
					margin-top: 20rpx;
					height: 68rpx;
					padding: 0 22rpx;
				}

				// >text {
				// 	position: absolute;
				// 	right: 30rpx;
				// 	bottom: 60rpx;
				// }
			}
		}

		>text {
			color: #f00;
			font-size: 24rpx;
		}
	}
</style>

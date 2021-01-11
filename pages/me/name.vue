<template>
	<view class="container_0">
		<van-notice-bar
		  left-icon="volume-o"
		  text="实名认证信息只用于提现，信息发布平台不会向任何渠道泄露您的个人信息，请放心填写！"
		/>
		<view class="input" v-for="item in re_list" :key='item.key'>
			<view class="" @click="open(item.key)">
				<view class="">
					<text>*</text>{{item.name}}
				</view>
				<input v-model="item.value" type="text" :placeholder="item.placeholder" :confirm-type="item.confirm_type">
				</input>
			</view>
		</view>
		<text>单笔提现金额超过4500元，将使用支付宝支付</text>
		<button type="warn" class="btn_squre">提交</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				re_list: [{
						placeholder: '请输入您的姓名',
						value: '',
						key: 'title',
						name: '姓名',
						confirm_type: 'next',
					},
					{
						placeholder: '请输入您的手机号',
						type: 'number',
						value: '',
						key: 'title_2',
						name: '手机号',
						confirm_type: 'next',
					},
					{
						placeholder: '请输入您的支付宝账号',
						value: '',
						key: 'content',
						name: '支付宝账号',
						confirm_type: 'down',
					}
				]
			}
		}
	}
</script>

<style lang="scss">
	.container_0{
		height: 100vh;
		background: #fff;
		>view:first-child{
			height: 50rpx;
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
				>input{
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
		>text{
			color: #f00;
			font-size: 24rpx;
		}
	}
</style>

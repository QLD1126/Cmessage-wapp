<template>
	<view class="container">
		<view class="">
			<view class="">
				<text class="t_32_333">必须红</text>
				<text>正在审核</text>
			</view>
			<view class="">
				<text>副标题：</text>
				<text>西部红</text>
			</view>
			<view class="">
				<text>内容：</text>
				<text>我说了就是必须红那它就得红，红也是红 不红也是红我说了就是必须红那它就得红 红也是红不红也是红。</text>
			</view>
			<view class="">
				<text>图片：</text>
				<image src="../../static/WechatIMG884.jpg" mode="widthFix"></image>
			</view>
		</view>
		<view class="list_between_106">
			<view class="">
				<text>价格</text>
				<text>¥ 88.00</text>
			</view>
			<view class="">
				<text>不对返还</text>
				<text>¥ 88.00</text>
			</view>
			<view class="">
				<text>销售截止时间</text>
				<text>¥ 88.00</text>
			</view>
			<view class="">
				<text>内容公开时间</text>
				<text>¥ 88.00</text>
			</view>
			<view class="">
				<text>失败原因</text>
				<text>内容描述模糊不清</text>
			</view>
			<view class="">
				<text>销售截止时间</text>
				<text>2020-10-21 15:25:00</text>
			</view>
			<view class="">
				<text>销售公开时间</text>
				<text>2020-10-21 15:25:00</text>
			</view>
			<view class="">
				<text>选择结果</text>
				<text>结果正确</text>
			</view>
		</view>
		<button type="warn" class="btn_round" @click="btnClick">重新填写</button>
		<van-action-sheet
		  :show="resShow"
		  :actions=" actions"
		  @close="resShow=false"
		  @select="onSelect"
		   cancel-text="取消"
		/>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				resShow:false,
				actions: [
				     {
				       name: '结果正确',
				     },
				     {
				       name: '结果错误',
				     },
				  ],
			}
		},
		methods:{
			btnClick(){
				// 不同状态不同操作
				this.resShow=true
			}
		}
	}
</script>

<style lang="scss">
	.container {
		>view {
			margin-top: 20rpx;
			background-color: #fff;
		}
		>view:first-child {
			width: 700rpx;
			padding: 0 25rpx;
			>view {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				min-height: 54rpx;
				padding: 10rpx 0;
				>text:first-child {
					flex: 0 0 25%;
				}
				>image {
					width: 200rpx;
					border-radius: 20rpx;
				}
			}
			>view:first-child {
				border-bottom: 1rpx solid #F8F8F8;
				justify-content: space-between;
				height: 88rpx;
				>text:last-child {
					color: #f00;
					font-size: 24rpx;
				}
			}
		}
	}
</style>

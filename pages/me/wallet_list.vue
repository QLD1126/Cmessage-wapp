<template>
	<view class="container">
		<van-empty description="暂无记录" v-if='datalist.length==0' />
		<view class="li_106 flex-between" v-else>
			<view class="">
				<view class="">
					提现到微信
				</view>
				<view class="t_24_9">
					2020-08-08 12:30
				</view>
			</view>
			<view class="">
				<view class="">
					-10000.00
				</view>
				<view class="">
					审核失败
				</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				loadStatus:'more',
				datalist:[]
			}
		},
		methods:{
		}
	}
</script>

<style lang="scss">
	.container{
		.li_106{
			padding: 20rpx;
			line-height: 2;
			>view:first-child{
				>view{
					
				}
			}
			>view:last-child{
				text-align: right;
				>view:last-child{
					color: #f00;
				}
			}
			>view>view:last-child{
				font-size: 24rpx;
			}
		}
	}
</style>

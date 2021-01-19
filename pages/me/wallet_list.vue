<template>
	<view class="container">
		<van-empty description="暂无记录" v-if='datalist.length==0' />
		<view class="" v-else>
			
		<view class="li_106 flex-between" v-for="item in datalist" :key='item.id'>
			<view class="">
				<view class="">
					提现到{{item.extract_type=='wechat'?'微信':'支付宝'}}
				</view>
				<view class="t_24_9">
					{{item.add_time}}
				</view>
			</view>
			<view class="">
				<view class="">
					{{item.extract_price}}
				</view>
				<view class="">
					{{item._status}}
				</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return {
				loadStatus:'loading',
				datalist:[],
				formdata:{
					page:1,
					limit:10,
				},
			}
		},
		onLoad() {
			this.getList(this.formdata)
		},
		methods:{
			getList(data){
				data.page=1
				this.$apis.CASH_LIST(data).then(res=>{
					this.loadStatus=res.length>data.limit?'more':'noMore'
					this.datalist=res
				})
			},
			loadMore(data){
				this.$apis.CASH_LIST(data).then(res=>{
					this.loadStatus=res.length>data.limit?'more':'noMore'
					this.datalist.push(...res)
				})
			}
		},
		onReachBottom() {
			if(this.loadStatus=='more'){
				this.formdata.page++
				this.loadMore(this.formdata)
			}
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

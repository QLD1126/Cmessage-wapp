<template>
	<view class="sell-content">
		<view v-if="list.length>0||loadStatus=='loading'">
			<navigator class='item' v-for="i in list" :key="i.id" open-type="navigate" :url="i.url">
				<!-- :url="i.status>0?i.url:null" -->
				<view class="flex-between">
					<view class="">
						<image v-if="i.is_return==1" src="../../static/fan.png" mode="" class="icon_44"></image>
						<text class="t_32_333">{{i.title}}</text>
					</view>
					<view :class="i.result==1?'red':i.result==-1?'hui':'fff'"
						:style="{display:i.status>=3?'inline':'none'}">
						{{i.result==-1?'黑':i.result==1?'红':'等待结果'}}
						<!-- {{i.status==-1?'结果错误':i.status==0?'等待结果':'结果正确'}} -->
					</view>
				</view>
				<text>{{i.subhead}}</text>
				<view class="flex-between">
					<text>{{i._status}}</text>
					<!-- <text v-if="i.status==2">已售份</text> -->
					<view class="t_24_9" v-if="i.status>=1">已售<text style="color: #f00;">{{i.sales}}</text> 份
					</view>
					<text class="t_24_9">{{i.add_time}}</text>
				</view>
			</navigator>
			<uni-load-more :status="loadStatus"></uni-load-more>
		</view>
		<van-empty description="暂无记录" v-else />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'loading',
				formdata: {},
				list: [],
			}
		},
		onLoad(options) {
			this.getOneList(options)
		},
		methods: {
			// 卖料
			async getList(formdata) {
				this.loadStatus = 'loading'
				let data = {
					page: 1,
					limit: 10
				}
				Object.assign(data, formdata)
				console.log(formdata,data)
				const res = await this.$apis.FOLLOW_SALE_LIST(data.id, data)
				if (res.length) {
					res.forEach(i => {
						i.url = i.status == 1 ?
							`/pages/record/buyinfo?type=${i.is_buy?'isbuy':'share'}&id=${i.id}&api=FOLLOW_SALE_INFO` :
							`/pages/record/detail?api=FOLLOW_SALE_INFO&id=${i.id}`
					})
				}
				this.loadStatus = res.length < data.limit ? 'noMore' : 'more'
				return res
			},
			getOneList(data) {
				this.getList(data).then(res => {
					this.list = res
				})
			},
			loadMore(data) {
				this.getList(data).then(res => {
					this.list.push(...res)
				})
			},
		},
		onReachBottom() {
			if (this.loadStatus == 'more') {
				this.formdata.page++
				this.loadMore(this.formdata)
			}
		},

	}
</script>

<style lang="scss" scoped>
	page {
		background: #f3f3f3;
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
</style>

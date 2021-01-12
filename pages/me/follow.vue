<template>
	<view class="container">
		<van-empty description="暂无关注" v-if='datalist.length==0' />
		<view class="" v-else>
			<view class="li_106 flex-between" v-for="item in datalist" :key='item.id'>
				<view class="">
					<image :src="item.follow.avatar" mode=""></image>
					<view class="">
						{{item.follow.nickname}}
					</view>
				</view>
				<button :type="item.status==1?'default':'warn'"  @click="unfollow(item.follow.uid)">{{item.status==1?'取消关注':'互相关注'}}</button>
			</view>
			<uni-load-more :status="loadstate"></uni-load-more>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadstate: 'loading',
				formdata: {
					page: 1,
					limit: 10
				},
				datalist: []
			}
		},
		onLoad() {
			this.getList(this.formdata)
		},
		methods: {
			unfollow(id, index) {
				uni.showModal({
					title: '确定取消关注该用户吗？',
					success: (res) => {
						if (res.confirm) {
							this.$apis.UNFOLLOW(id).then(() => {
								// this.datalist.splice(index, 1)
								this.getList(this.formdata)
								uni.showToast({
									title: '取消关注成功',
									icon: 'none'
								})
							})
						}
					}
				})

			},
			getList(data) {
				this.$apis.FOLLOW_LIST(data).then(res => {
					this.loadstate = res.length < data.limit ? 'noMore' : 'more'
					this.datalist = res
				})
			},
			loadMore(data) {
				this.$apis.FANS(data).then(res => {
					this.loadstate = res.length < data.limit ? 'noMore' : 'more'
					this.datalist.push(...res)
				})
			}
		},
		onReachBottom() {
			// if(thi)
			this.formdata.page++
			this.loadMore(this.formdata)
		}
	}
</script>

<style lang="scss">
	.container {
		.li_106 {
			height: 144rpx;
			line-height: 1;

			>view:first-child {
				display: flex;
				align-items: center;

				image {
					width: 88rpx;
					height: 88rpx;
					border-radius: 50%;
					margin-right: 20rpx;

					+view {
						font-weight: bold;
					}
				}
			}

			button {
				margin: 0;
				padding: 0;
				width: 140rpx;
				height: 54rpx;
				line-height: 54rpx;
				font-size: 24rpx;
			}
		}
	}
</style>

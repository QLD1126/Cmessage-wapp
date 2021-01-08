<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import url("./static/iconfont.css");
	@import "/wxcomponents/vant/dist/common/index.wxss";
	page {
		width: 750rpx;
		font-size: 28rpx;
		color: #333;
		background: #F8F8F8;
	}
.container{
	overflow: hidden;
}
	button {
		background-color: #FE4543;
	}

	.t_24_9 {
		font-size: 24rpx;
		color: #999;
	}

	.t_32_333 {
		font-size: 32rpx;
		font-weight: bold;
	}

	.flex-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28rpx;
		font-weight: 400;
	}
	.flex-around {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.li_106 {
		width: 660rpx;
		padding: 0 20rpx;
		background: #fff;
		border-bottom: 1rpx solid #F3F3F3;
		height: 106rpx;
		line-height: 106rpx;
	}
	.btn_round{
		width: 700rpx;
		border-radius: 44rpx;
		margin: 40rpx auto;
	}
.li_109{
	height: 109rpx;
	line-height: 109rpx;
}
.list_between_106{
	width: 700rpx;
	padding: 0 25rpx;
	background: #fff;
	>view{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 106rpx;
		// line-height: 106rpx;
		border-bottom: 1rpx solid #f8f8f8;
	}
}
	/* .flex-between_list{
		
	} */
	.icon_44 {
		width: 44rpx;
		height: 44rpx;
		position: relative;
	}

	/*每个页面公共css */
</style>

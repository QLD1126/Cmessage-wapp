<script>
	export default {
		data() {
			return {
				hasLogin: false
			}
		},
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
	.sell_info{
		>view {
			background-color: #fff;
		}
		
		>view:first-child {
			width: 700rpx;
			padding: 0 25rpx;
			margin-bottom: 20rpx;
		
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
		
		>.btn_round {
			background: #f00;
			color: #fff;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
		}
	}
.van-popup{
		background-color: transparent !important;
	}
	.container {
		overflow: hidden;
		margin-top: 20rpx;
	}

	.container_0 {
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
			>input,
			textarea {
				background: #fff;
				width: 95%;
				font-size: 26rpx;
				border-radius: 10rpx;
				margin-top: 20rpx;
			}

			>input {
				height: 68rpx;
				padding: 0 22rpx;
			}
		}
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
		width: 710rpx;
		padding: 0 20rpx;
		background: #fff;
		border-bottom: 1rpx solid #F3F3F3;
		height: 106rpx;
		line-height: 106rpx;
	}

	.btn_round {
		width: 700rpx;
		border-radius: 44rpx;
		margin: 40rpx auto;
	}
	.btn_round_line{
		color: #fff;
		width: 262rpx;
		height: 64rpx;
		line-height: 64rpx;
		border-radius: 32rpx;
		background: linear-gradient(to right,#FF4F4D,#F03A3A);
		font-size: 32rpx;
	}
.btn_squre{
		position: fixed;
		bottom: 30rpx;
		width: 700rpx;
		left: 25rpx;
}
	.li_109 {
		height: 109rpx;
		line-height: 109rpx;
	}

	.list_between_106 {
		width: 700rpx;
		padding: 0 25rpx;
		background: #fff;

		>view ,navigator{
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

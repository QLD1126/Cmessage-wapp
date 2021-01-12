<template>
	<view class="content">
	<picker mode="multiSelector" :value="dateTime1" @change="changeDateTime1" @columnchange="changeDateTimeColumn1"
					 :range="dateTimeArray1" style="width: 100%;">
						<view class="tui-picker-detail" style="color: #323233;">
							<!-- {{formdata.visit_at}} -->
							{{dateTimeArray1[0][dateTime1[0]]}}-{{dateTimeArray1[1][dateTime1[1]]}}-{{dateTimeArray1[2][dateTime1[2]]}}
							{{dateTimeArray1[3][dateTime1[3]]}}:{{dateTimeArray1[4][dateTime1[4]]}}
						</view>
					</picker>
	</view>
</template>

<script>
		let dateTimePicker = require('../../common/dateTimePicker.js');

console.log(dateTimePicker)
	export default {
		data() {
			 const currentDate = this.getDate({
						            format: true
						        })
			return {
 startYear: 2000,
				     endYear: 2050,
				dateTimeArray1: null,
				    dateTime1: null,
				 date: currentDate,
				            time: '12:01',
			}
		},
		onLoad() {
			 var obj1 = dateTimePicker.dateTimePicker(this.startYear, this.endYear);
			this.dateTimeArray1=obj1.dateTimeArray,
			this.dateTime1= obj1.dateTime
		},
		computed:{
			  startDate() {
					            return this.getDate('start');
					        },
					        endDate() {
					            return this.getDate('end');
					        }
		},
		methods:{
			// 时间选择开始
			getDate(type) {
						            const date = new Date();
						            let year = date.getFullYear();
						            let month = date.getMonth() + 1;
						            let day = date.getDate();
						
						            if (type === 'start') {
						                year = year - 60;
						            } else if (type === 'end') {
						                year = year + 2;
						            }
						            month = month > 9 ? month : '0' + month;;
						            day = day > 9 ? day : '0' + day;
						            return `${year}-${month}-${day}`;
						        },
						 changeDateTime1(e) {
						    this.dateTime1= e.detail.value ;
						  },
						 changeDateTimeColumn1(e) {
						    var arr = this.dateTime1, dateArr = this.dateTimeArray1;
						    arr[e.detail.column] = e.detail.value;
						    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
						
						      this.dateTimeArray1=dateArr;
						     this.dateTime1=arr;
							 this.formdata.visit_at=dateArr[0][arr[0]]+'-'+dateArr[1][arr[1]]+'-'+dateArr[2][arr[2]]+' '+dateArr[3][arr[3]]+':'+dateArr[4][arr[4]]
						  },
			// 时间选择结束
			
		}
	}
</script>

<style lang="scss">
	.switch {
		transform: scale(.5) translateX(36rpx);
	}

	.van-enter-active-class,
	.van-leave-active-class {
		transition-property: background-color, transform;
	}

	.van-enter-class,
	.van-leave-to-class {
		background-color: red;
		transform: rotate(-360deg) translate3d(-100%, -100%, 0);
	}

	.content {
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

				>textarea {
					padding: 22rpx 20rpx;
					max-height: 200rpx;
				}

				>text {
					position: absolute;
					right: 30rpx;
					bottom: 60rpx;
				}

				>.flex-between {}

				button {
					width: 148rpx;
					height: 48rpx;
					line-height: 48rpx;
					position: absolute;
					right: 40rpx;
					bottom: 30rpx;
					font-size: 22rpx;
					z-index: 10;
				}
			}

			.van-uploader__upload {
				background: #fff;
			}

			.li_106 {
				width: 660rpx;
			}
		}
	}

	.pop {
		text-align: center;

		>image:first-child {
			margin-top: 194rpx;
			width: 282rpx;
			position: relative;
			z-index: 11;
		}

		>view {
			margin: -144rpx auto 0;
			background: #fff;
			width: 578rpx;
			height: 476rpx;
			border-radius: 10rpx;
			overflow: hidden;

			>view {

				height: 60%;
				margin-top: 160rpx;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-around;
				align-items: center;

				>view:first-child {
					color: #f00;
					font-size: 36rpx;

					+view {
						color: #666;
					}
				}

				>view:last-child {
					width: 80%;
					text-align: left;
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-between;

					>button {
						width: 180rpx;
						height: 64rpx;
						line-height: 64rpx;
						border-radius: 32rpx;
						font-size: 28rpx;
						padding: 0;
					}

					>button:first-child {
						color: #fff;
					}
				}
			}

			+image {
				width: 64rpx;
				margin-top: 40rpx;
			}
		}
	}

	// 组件背景透明

	.van-action-sheet__cancel,
	.van-action-sheet__item {
		border-radius: 0;
	}
</style>

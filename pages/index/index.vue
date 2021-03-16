<template>
	<view class="content">
		<view class="input" v-for="item in re_list" :key='item.key'>
			<view class="">
				<view class="">
					<text
						v-show="item.key!=='image'">*</text>{{item.key=='image'?item.name+'(1/'+images+')':item.name}}
				</view>
				<textarea v-model="formdata[item.key]" :placeholder="item.placeholder" v-if="item.key=='content'"
					:auto-blur='true' :adjust-position='false' />
				<view class="unload" v-else-if="item.key=='image'">
					<!-- <van-uploader :file-list="fileList" max-count="1" accept='image' :multiple='true' :deletable='true'
						capture="['album','camera']" @after-read="afterRead" @delete='deleteImg' /> -->
					<view v-if="formdata.image" class="main">
						<image :src="formdata.image" mode="" @click.stop="lookPic(formdata.image)" class="main"></image>
						<image src="../../static/closered.png" class="icon_44" mode="" @click="formdata.image=''">
						</image>
					</view>
					<view v-else class="upload" @click="uploadImg">
						<image src="../../static/creame.png" mode="" class="icon_44"></image>
						<text>上传图片</text>
					</view>
				</view>

				<view class="" v-else-if="item.name=='可选功能'">
					<view class="flex-between li_106" v-for="o_item in Optional" :key='o_item.key'
						@click="timetype=o_item.key">
						<text>{{o_item.name}}</text>
						<!-- 不返还 -->
						<switch :checked=" formdata[ o_item.key]" @change="change($event,'is_return')"
							v-if="o_item.key=='is_return'" class="switch" />
						<!-- 截止时间/内容公开时间 -->
						<picker v-else mode="multiSelector" v-model="dateTime1" @change="changeDateTime1"
							@columnchange="changeDateTimeColumn1" class="pickertime" :range="dateTimeArray1">

							<image src="../../static/date.png" mode="" class="icon_44"
								v-if="formdata[ o_item.key]==''||  formdata[ o_item.key]==undefined"></image>
							<text v-else>{{formdata[o_item.key]}}</text>
						</picker>
					</view>
				</view>
				<view class="input" v-else>

					<input v-model="formdata[item.key]" :style="{width:item.key=='price'?'60vw':null}"
						:placeholder="item.placeholder" confirm-type="next" />
					<button type="warn" v-if="item.name=='价格'" @click.stop="priceShow=true">快速定价</button>
				</view>
			</view>
		</view>

		<button type="warn" class="btn_round" @click="sure">发布</button>
		<van-action-sheet :show="priceShow" :actions=" priceAction" @close="priceShow=false"
			@select="change($event,'price')" :safe-area-inset-bottom='false' />
		<van-popup :show="loginShow" @close="loginShow=false">
			<view class="pop">
				<image src="../../static/denglutishi.png" mode="widthFix"></image>
				<view class="">

					<view class="">
						<view class="">
							未登录
						</view>
						<view class="">
							请先登录再进行操作~~
						</view>
						<view class="">
							<button type="warn" @click="toPage">前往登录</button>
							<button type="default" @click="loginShow=false">暂不登录</button>
						</view>
					</view>
				</view>
				<image src="../../static/indexclose.png" mode="widthFix" @click="loginShow=false"></image>
			</view>
		</van-popup>
	</view>
</template>

<script>
	import ruiDatePicker from '@/components/rattenking-dtpicker/rattenking-dtpicker.vue';
	import {
		mapState
	} from 'vuex'
	let dateTimePicker = require('../../common/dateTimePicker.js');
	// console.log()
	export default {
		components: {
			ruiDatePicker
		},
		data() {
			// 时间选择
			const currentDate = this.getDate({
				format: true
			})
			return {
				formdata: {
					price: '',
					image: '',
					title: '',
					subhead: '',
					content: '',
					end_time: '',
					open_time: '',
					is_return: 1,
				},
				// 上传
				fileList: [],
				// 时间选择器
				startYear: 2000,
				currentDate: '',
				endYear: 2050,
				dateTimeArray1: null,
				dateTime1: null,
				// date: currentDate,
				time: '12:01',
				loginShow: uni.getStorageSync('TOKEN') == '' ? true : false,
				// 价格选择下拉菜单
				priceShow: false,
				priceAction: [
					{
						name: '10元',
						value: 10,
					},
					{
						name: '38元',
						value: 38,
					},
					{
						name: '58元',
						value: 58,
					},
					{
						name: '88元',
						value: 88,
					},
					{
						name: '138元',
						value: 138,
					},
					{
						name: '188元',
						value: 188,
					},
				],
				fileList: [],
				// 可选功能
				Optional: [{
					name: '开启不对返还',
					key: 'is_return'
				}, {
					name: '内容公开时间',
					key: 'open_time'
				}, {
					name: '销售截止时间',
					key: 'end_time'
				}],
				re_list: [{
						placeholder: '请输入信息标题',
						key: 'title',
						name: '信息标题',
					},
					{
						placeholder: '请输入信息副标题',
						key: 'subhead',
						name: '信息副标题',
					},
					{
						placeholder: '请输入信息内容',
						key: 'content',
						name: '信息内容',
					},
					{
						key: 'image',
						name: '信息图片',
					},
					{
						placeholder: '请输入价格或点击右侧按钮快速定价',
						key: 'price',
						name: '价格',
					},
					{
						key: 'Optional',
						name: '可选功能',
					},
				],
				title: 'Hello',
				timetype: 'end_time',
				nowTime: '',
				// nowTimeStamp: 0,
				// currentDateStamp: 0,
			}
		},
		onLoad() {
			var obj1 = dateTimePicker.dateTimePicker(this.startYear, this.endYear);
			Object.assign(this.formdata, {
				open_time: obj1.defaultDate_1,
				end_time: obj1.defaultDate_1
			})
			this.nowTime = obj1.defaultDate_1
			// this.nowTimeStamp =new Date(obj1.defaultDate_1)
			this.dateTimeArray1 = obj1.dateTimeArray;
			this.dateTime1 = obj1.dateTime
		},
		onShow() {
			// this.loginShow=true
			uni.getStorage({
				key: 'TOKEN',
				success: res => {
					if (res.data !== '') {
						this.loginShow = false
					}
				}
			})
		},
		computed: {
			images(){
				return this.formdata.image?1:0
			},
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			changeTime(e) {
				this.formdata[this.nowTime] = e
			},
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
				month = month > 9 ? month : '0' + month;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			// 改变行
			changeDateTimeColumn1(e) {
				var arr = this.dateTime1,
					dateArr = this.dateTimeArray1;
				arr[e.detail.column] = e.detail.value;
				dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
				this.dateTimeArray1 = dateArr;
				this.dateTime1 = arr;
				this.currentDate =
					`${dateArr[0][arr[0]]}/${dateArr[1][arr[1]]}/${dateArr[2][arr[2]]} ${dateArr[3][arr[3]]}:${ dateArr[4][arr[4]]}`;
				console.log(this.currentDate, '改变行');
			},
			// 确定最终结果
			changeDateTime1(e) {
				// console.log(data.currentDate,'确定时间')
				// this.dateTime1= e.detail.value ;
				new Promise((resolve, reject) => {
					// 当前时间戳
					let nowTimeStamp = new Date(this.nowTime).getTime()
					let currentDate = this.currentDate
					// 选中时间戳
					let currentDateStamp = new Date(currentDate).getTime()
					// 截止时间戳
					let endStamp = new Date(this.formdata.end_time).getTime()
					// 公开时间戳
					let openStamp = new Date(this.formdata.open_time).getTime()
					// console.log(nowTimeStamp, endStamp, openStamp, currentDate,currentDateStamp, 777,new Date(currentDate).getTime())
					console.log(currentDate, currentDateStamp, new Date('2021-03-15 00:08').getTime(), new Date(
						'2021/03/15 00:08').getTime(), 777, this.nowTime)
					if (currentDateStamp < nowTimeStamp) {
						reject('now_time')
					} else {
						if (this.timetype == 'open_time') {
							currentDateStamp > endStamp ? resolve([currentDate, currentDateStamp]) : reject(
								'open_time')
						} else {
							currentDateStamp < openStamp ? resolve([currentDate, currentDateStamp]) : reject(
								'end_time')
						}
					}
				}).then(res => {
					this.formdata[this.timetype] = res[0]
				}).catch(err => {
					console.log(err, 'err')
					// this.formdata[this.timetype] = err[0]

					uni.showModal({
						title: '提示',
						content: err == 'open_time' ? '公开时间应大于截止时间' : err == 'end_time' ? '截止时间应小于公开时间' :
							'所选时间应大于当前时间',
						showCancel: false
					})

				})
			},

			// 发布
			sure() {
				this.$apis.SELL(this.formdata).then(res => {
					this.re_list.forEach(item => {
						item.value = ''
					})
					this.Optional.forEach(item => {
						item.value = ''
					})
					this.fileList = []
					uni.navigateTo({
						url: '/pages/record/detail?id=' + res.id
					})
				})
			},
			change(e, type) {
				this.formdata[type] = e.detail.value
			},
			// 上拉价格菜单
			// onSelect(e){
			// 	Object.assign(this.formdata,{price:e.detail.value})
			// },
			// 删除图片
			deleteImg(e) {
				let index = e.detail.index
				this.fileList.splice(index, 1)
			},
			// 上传图片
			lookPic(url) {
				uni.previewImage({
					urls: [url]
				})
			},
			uploadImg() {
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res, 777)
						uni.showLoading({title:'上传中'})
						const tempFilePaths = res.tempFilePaths;
						uni.uploadFile({
							url: this.public_data.host + '/api/upload/image',
							filePath: tempFilePaths[0],
							header: {
								'Authori-zation': 'Bearer' + ' ' + uni.getStorageSync('TOKEN')
							},
							name: 'image',
							formData: {
								filename: 'image'
							},
							success: (uploadFileRes) => {

								let data = JSON.parse(uploadFileRes.data).data
								Object.assign(this.formdata, {
									image: data.url
								})
								console.log('成功', uploadFileRes, data, this.formdata)
								uni.hideLoading()
							}
						});
					},
					error: function(e) {
						console.log(e);
					}
				});
			},
			afterRead(event) {
				const file = event.detail.file
				uni.showLoading({

				})
				file.map(item => {
					uni.uploadFile({
						url: this.public_data.host + '/api/upload/image',
						filePath: item.url,
						header: {
							'Authori-zation': 'Bearer' + ' ' + uni.getStorageSync('TOKEN')
						},
						name: 'image',
						formData: {
							filename: 'image'
						},
						success: (uploadFileRes) => {
							console.log('成功', uploadFileRes)

							// const { fileList = [] } = this.data;
							let data = JSON.parse(uploadFileRes.data).data
							this.fileList.push(data);
							Object.assign(this.formdata, {
								image: data.url
							})
							Object.assign(this.re_list[3], {
								value: data.url
							})
							console.log(this.re_list)
							uni.hideLoading()
						}
					});
				})

			},
			toPage() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			},

		},
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
		>.input {
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
				textarea,
				.input {
					background: #fff;
					width: 95vw;
					font-size: 26rpx;
					border-radius: 10rpx;
					margin-top: 20rpx;
				}

				textarea {
					width: 670rpx;
				}

				.input {
					width: 95vw;

					>input {
						font-weight: 400;
						height: 68rpx;
						padding: 0 22rpx;
					}

					button {
						width: 148rpx;
						height: 48rpx;
						line-height: 48rpx;
						font-size: 22rpx;
						position: absolute;
						right: 40rpx;
						bottom: 60rpx;
						z-index: 90;
					}
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

			}

			.van-uploader__upload {
				background: #fff;
			}

			.li_106 {
				width: 95%;

				.pickertime {
					flex: 0 0 65%;
					text-align: right;
				}
			}
		}

		>.btn_round {
			margin-top: 0;
		}
	}

	// 登录弹窗
	.pop {
		text-align: center;

		>image:first-child {
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

	.rui-picker {
		width: 60vw;
		height: 106rpx;
		line-height: 106rpx;
		background: #FF6034;
	}

	.unload {
		>view {
			width: 200rpx;
			height: 200rpx;
			text-align: center;
			background: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #999;
			flex-flow: column nowrap;
			font-size: 20rpx;
			>text {
				margin-top: 20rpx;
			}
		}

		>.main {
			position: relative;
			image {
				width: 200rpx;
				height: 200rpx;
			}
			>.icon_44 {
				width: 50rpx;
				height: 50rpx;
				position: absolute;
				right: -15rpx;
				top: -15rpx;
			}

		}

		>.upload {}
	}
</style>

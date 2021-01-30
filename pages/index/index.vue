<template>
	<view class="content">
		<view class="input" v-for="item in re_list" :key='item.key'>
			<view class="">
				<view class="">
					<text v-show="item.key!=='image'">*</text>{{item.key=='image'?item.name+'(1/'+fileList.length+')':item.name}}
				</view>
				<textarea v-model="item.value" :placeholder="item.placeholder" v-if="item.key=='content'" :auto-blur='true'
				 :adjust-position='false' />
				<view class="unload" v-else-if="item.key=='image'">
					<van-uploader :file-list="fileList" max-count="1" accept='image' :multiple='true' :deletable='true' capture="['album','camera']"
					 @after-read="afterRead" @delete='deleteImg' />
				</view>
								
				<view class="" v-else-if="item.name=='可选功能'">
				<view class="flex-between li_106" v-for="o_item in Optional" :key='o_item.key' @click="timetype=o_item.key">
					<text>{{o_item.name}}</text>
					<!-- 不返还 -->
					<switch :checked="o_item.value" @change="change($event,0)" v-if="o_item.key=='is_return'" class="switch"/>
					<!-- 截止时间/内容公开时间 -->
					<picker v-else mode="multiSelector" v-model="dateTime1" @change="changeDateTime1" @columnchange="changeDateTimeColumn1" class="pickertime"
										 :range="dateTimeArray1" >
										
										<image src="../../static/date.png" mode="" class="icon_44" v-if="o_item.value==''||o_item.value==undefined"></image>
						<text v-else>{{o_item.value}}</text>
						</picker>
				</view>
				</view>
					<view class="input" v-else>
						
				<input v-model="item.value" :style="{width:item.key=='price'?'60vw':null}" type="text" :placeholder="item.placeholder" :confirm-type="item.confirm_type" />
				<button type="warn" v-if="item.name=='价格'" @click.stop="priceShow=true">快速定价</button>
				</view>
			</view>
		</view>
	
		<button type="warn" class="btn_round" @click="sure">发布</button>
		<van-action-sheet
		  :show="priceShow"
		  :actions=" priceAction"
		  @close="priceShow=false"
		  @select="change($event,4)"
		  :safe-area-inset-bottom='false'
		/>
		<van-popup :show="loginShow" @close="loginShow=false"  >
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
	// let a=Date.parse("2018-09-09 12:30")
	// let b=Date.parse("2020-09-09 12:30")
	// console.log(a,b,'time')
	import {mapState} from 'vuex'
		let dateTimePicker = require('../../common/dateTimePicker.js');
		// console.log()
	export default {
		data() {
			// 时间选择
			const currentDate = this.getDate({
									            format: true
									        })
			return {
				// nowtime:'',
				formdata:{},
				// 上传
				 fileList: [],
				// 时间选择器
				startYear: 2000,
				currentDate:'',
								     endYear: 2050,
								dateTimeArray1: null,
								    dateTime1: null,
								 // date: currentDate,
								            time: '12:01',
											timetype:'end_time',
				loginShow:uni.getStorageSync('TOKEN')==''?true:false,
				// 价格选择下拉菜单
				priceShow:false,
				priceAction: [
				      {
				        name: '免费',
						value:'0',//避免选了之后没有结果
				      },
				      {
				        name: '1元',
						value:1,
				      },
				     {
				       name: '38元',
				     						value:38,
				     },
					 {
					   name: '58元',
					 						value:58,
					 },
					 {
					   name: '88元',
					 						value:88,
					 },
					 {
					   name: '138元',
					 						value:138,
					 },
					 {
					   name: '188元',
					 						value:188,
					 },
					 ],
				 fileList: [],
				// 可选功能
				Optional:[{
					name:'开启不对返还',
					value:1,
					key:'is_return'
				},{
					name:'销售截止时间',
					value:'',
					key:'end_time'
				},{
					name:'内容公开时间',
					value:'',
					key:'open_time'
				}],
				re_list: [{
						placeholder: '请输入信息标题',
						value: '',
						key: 'title',
						name: '信息标题',
						confirm_type: 'next',
					},
					{
						placeholder: '请输入信息副标题',
						value: '',
						key: 'subhead',
						name: '信息副标题',
						confirm_type: 'next',
					},
					{
						placeholder: '请输入信息内容',
						value: '',
						key: 'content',
						name: '信息内容',
						confirm_type: 'done',
					},
					{
						value: '',
						key: 'image',
						name: '信息图片',
					},
					{
						placeholder: '请输入价格或点击右侧按钮快速定价',
						value: '',
						key: 'price',
						name: '价格',
						confirm_type: 'down',
					},
					{
						value: '',
						key: 'Optional',
						name: '可选功能',
					},
				],
				title: 'Hello',
				
			}
		},
		onLoad() {
			 var obj1 = dateTimePicker.dateTimePicker(this.startYear, this.endYear);
			// this.Optional[2].value=obj1.defaultDate_1
			// Object.assign(this.Optional[2])
			let open_time=this.Optional[2]
			let end_time=this.Optional[1]
			let timeStamp=Date.parse(obj1.defaultDate_1)
			// 当前时间的时间戳
			 // console.log(nowTime,timestamp,'onlaod')
			this.Optional.splice(2,1,Object.assign(open_time,{timeStamp:timeStamp,value:obj1.defaultDate_1}))
			this.dateTimeArray1=obj1.dateTimeArray,
			this.dateTime1= obj1.dateTime
		},
		onShow() {
			// this.loginShow=true
			uni.getStorage({
				key:'TOKEN',
				success:res=>{
					if(res.data!==''){
						this.loginShow=false
						}
				}
			})
		},
		computed:{
			  startDate() {
					            return this.getDate('start');
					        },
					        endDate() {
					            return this.getDate('end');
					        }
		},
		methods: {
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
								// 确定最终结果
						 changeDateTime1(e) {
						    // this.dateTime1= e.detail.value ;
							new Promise((resolve,reject)=>{
								console.log(this.currentDate,this.Optional[2].value,222)
								let currentDate=this.currentDate==''?this.Optional[2].value:this.currentDate
								console.log(currentDate,this.Optional[2].value,333)
								// 当前选中时间戳
								let currentDateStamp=Date.parse(currentDate)
								// 截止时间戳
								let endStamp=this.Optional[1].timeStamp
								// 公开时间戳
								let openStamp=this.Optional[2].timeStamp
								if(this.timetype=='open_time'){
									if(currentDateStamp<=openStamp||currentDateStamp>endStamp){
										reject('open_time')
									}else{
										resolve([currentDate,currentDateStamp])
									}
								}else{
									if(currentDateStamp<=openStamp){
										reject('end_time')
									}else{
										resolve([currentDate,currentDateStamp])
									}
								}
							}).then(res=>{
								// console.log(currentDateStamp)
								this.Optional.forEach(item=>{
								 		if(item.key==this.timetype){
								 			item.value=res[0]
											item.timeStamp=res[1]
								 		}
								 	})
							}).catch(err=>{
								console.log(err,'err')
								uni.showModal({
									title:'提示',
									content:err=='open_time'?'公开时间应大于当前时间且小于截止时间':'截止时间应大于公开时间',
										showCancel:false
								})
								
							})
						  },
						  // 改变行
						 changeDateTimeColumn1(e) {
							 console.log('滚动',e)
						    var arr = this.dateTime1,
							 dateArr = this.dateTimeArray1;
						    arr[e.detail.column] = e.detail.value;
						    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);
						      this.dateTimeArray1=dateArr;
						     this.dateTime1=arr;
							this.currentDate=dateArr[0][arr[0]]+'-'+dateArr[1][arr[1]]+'-'+dateArr[2][arr[2]]+' '+dateArr[3][arr[3]]+':'+dateArr[4][arr[4]]
							 // console.log(currentDate,888)
							 // this.currentDate=currentDate
							 // this.formdata.visit_at=dateArr[0][arr[0]]+'-'+dateArr[1][arr[1]]+'-'+dateArr[2][arr[2]]+' '+dateArr[3][arr[3]]+':'+dateArr[4][arr[4]]
							 
						  },
			// 发布
			sure(){
				let formdata={}
				this.re_list.map(item=>{
					let key=item.key
					let value=item.value
					formdata[key]=value
				})
				this.Optional.map(item=>{
					// let
					formdata[item.key]=item.value
				})
				console.log(formdata)
				this.$apis.SELL(formdata).then(res=>{
					this.re_list.forEach(item=>{
						item.value=''
					})
					this.Optional.forEach(item=>{
						item.value=''
					})
					this.fileList=[]
					uni.navigateTo({
						url:'/pages/record/detail?id='+res.id
					})
				})
			},
			change(e,index){
				if(index==0){
					//额外
					Object.assign(this.Optional[index],{value:e.detail.value?1:0})
				}else{
					Object.assign(this.re_list[index],{value:e.detail.value})
				}
				console.log(this.re_list,this.Optional)
			},
			// 上拉价格菜单
			// onSelect(e){
			// 	Object.assign(this.formdata,{price:e.detail.value})
			// },
				// 删除图片
						deleteImg(e){
							let index=e.detail.index
							this.fileList.splice(index,1)
						},
						
						 afterRead(event) {
							 // this.fileList=[]
							const file=event.detail.file
							uni.showLoading({
								
							})
							file.map(item=>{
								uni.uploadFile({
									url:this.public_data.host + '/api/upload/image',
									filePath: item.url,
									header: {
										'Authori-zation': 'Bearer' + ' ' + uni.getStorageSync('TOKEN')
									},
									name: 'image',
									formData: {
										filename: 'image'
									},
									success: (uploadFileRes)=> {
										console.log('成功',uploadFileRes)
										
										        // const { fileList = [] } = this.data;
										        this.fileList.push(JSON.parse(uploadFileRes.data).data);
												
												Object.assign(this.re_list[3],{value:JSON.parse(uploadFileRes.data).data.url})
			console.log(this.re_list)									
												uni.hideLoading()
									}
								});
							})
							
						  },
			toPage(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},

		},
	}
</script>

<style lang="scss">
	.switch{
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
			>view{
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
				>input,textarea,.input{
					background: #fff;
					width: 95vw;
					font-size: 26rpx;
					border-radius: 10rpx;
					margin-top: 20rpx;
				}
				textarea{
					width: 670rpx;
				}
				.input{
					width: 95vw;
				>input{
					font-weight: 400;
					height: 68rpx;
					padding: 0 22rpx;
				}	
				button{
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
				>textarea{
					padding: 22rpx 20rpx;
					max-height: 200rpx;
				}
				>text {
					position: absolute;
					right: 30rpx;
					bottom: 60rpx;
				}
				
			}
			.van-uploader__upload{
				background: #fff;
			}
			.li_106 {
				width: 95%;
				.pickertime{
					flex:0 0 65%;
					text-align: right;
				}
			}
		}
	>.btn_round{
		margin-top: 0;
	}
	}
	// 登录弹窗
	.pop{
		text-align: center;
		>image:first-child{
			width: 282rpx;
			position: relative;
			z-index: 11;
		}
		>view{
			margin: -144rpx auto 0;
			background: #fff;
			width: 578rpx;
			height: 476rpx;
			border-radius: 10rpx;
			overflow: hidden;
			>view{
				
				height: 60%;
				margin-top: 160rpx;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-around;
			align-items: center;
			>view:first-child{
				color: #f00;
				font-size: 36rpx;
				+view{
					color: #666;
				}
			}
			>view:last-child{
				width: 80%;
				text-align: left;
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				>button{
					width: 180rpx;
					height: 64rpx;
					line-height: 64rpx;
					border-radius: 32rpx;
					font-size: 28rpx;
					padding: 0;
				}
				>button:first-child{
					color: #fff;
				}
			}
			}
			+image{
				width: 64rpx;
				margin-top: 40rpx;
			}
		}
	}
	// 组件背景透明
	
	.van-action-sheet__cancel, .van-action-sheet__item {
		border-radius: 0;
	}
</style>

<template>
	<view class="content">
		<view class="input" v-for="item in re_list" :key='item.key'>
			<view class="" @click="open(item.key)">
				<view class="">
					<text v-show="item.key!=='iamge'">*</text>{{item.name}}
				</view>
				<textarea value="" placeholder="请输入信息内容" v-if="item.name=='信息内容'" :auto-blur='true' :adjust-position='false' />
				<view class="unload" v-else-if="item.key=='image'">
					<van-uploader :file-list="fileList" max-count="1" accept='image' :multiple='true' :deletable='true' capture="['album','camera']"
					 @after-read="afterRead" @delete='deleteImg' />
				</view>
								
				<view class="" v-else-if="item.name=='可选功能'">
				<view class="flex-between li_106" v-for="o_item in Optional" :key='o_item.key'>
					<text>{{o_item.name}}</text>
					<!-- 不返还 -->
					<switch :checked="o_item.value" @change="" v-if="o_item.key=='fanhuan'" />
					<!-- 截止时间 -->
					<text v-else-if="o_item.key=='end_time'">{{o_item.value}}</text>
					<!-- 内容公开时间 -->
					<view v-else class="" @click="timeShow=true">
						
						<image src="../../static/日期.png" mode="" class="icon_44" v-if="o_item.value==''"></image>
						<!-- <text v-else>{{o_item.value}}</text> -->
						<text v-else>{{currentDate}}</text>
				</view>	
				</view>
				</view>
				<input v-else v-model="item.value" type="text" :placeholder="item.placeholder" :confirm-type="item.confirm_type">
				<button type="warn" v-if="item.name=='价格'" @click.stop="priceShow=true">快速定价</button>
				</input>
			</view>
		</view>
		<button type="warn" class="btn_round">发布</button>
		<van-action-sheet
		  :show="priceShow"
		  :actions=" actions"
		  @close="priceShow=false"
		  @select="onSelect"
		/>
		<van-popup :show="timeShow" @close="timeShow=false"  position="bottom">
		<van-datetime-picker
		  type="datetime"
		  :value="currentDate"
		  :min-date="minDate"
		  :max-date="maxDate"
		  @input="onInput"
		/>
		</van-popup>
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
		let dateTimePicker = require('../../common/dateTimePicker.js');
	export default {
		data() {
			return {
				// 时间选择器
				// loginShow:uni.getStorageSync('TOKEN')?false:true,
				loginShow:true,
				timeShow:false,
				  minHour: 10,
				    maxHour: 20,
				    minDate: new Date().getTime(),
				    maxDate: new Date(2019, 10, 1).getTime(),
				    currentDate: new Date().getTime(),
				// 价格选择下拉菜单
				priceShow:false,
				 actions: [
				      {
				        name: '免费',
				      },
				      {
				        name: '选项',
				      },
				      {
				        name: '选项',
				        subname: '描述信息',
				        openType: 'share',
				      }],
				 fileList: [],
				// 可选功能
				Optional:[{
					name:'开启不对返还',
					value:1,
					key:'fanhuan'
				},{
					name:'销售截止时间',
					value:'2020-11-12 16:58',
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
						key: 'title_2',
						name: '信息副标题',
						confirm_type: 'next',
					},
					{
						placeholder: '请输入信息内容',
						value: '',
						key: 'content',
						name: '信息内容',
						confirm_type: 'next',
					},
					{
						value: '',
						key: 'image',
						name: '信息图片1/1',
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
			// uni.request({
			// 	url:'/api/wechat/mp_auth',
			// 	method:'POST',
			// 	data:object
			// })
		},
		  // computed: {
				//         startDate() {
				//             return this.getDate('start');
				//         },
				//         endDate() {
				//             return this.getDate('end');
				//         }
				//     },
		methods: {
			toPage(){
				uni.navigateTo({
					url:'/pages/login/login'
				})
			},
			
			setAnimation(){
			console.log(this.$refs)	
			},
			// 上拉价格菜单
			onSelect(){
				
			},
			// 时间选择
			 onInput(event) {
			      this.currentDate=event.detail
				  console.log(event,999)
			  },

		}
	}
</script>

<style lang="scss">
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
				>input,textarea{
					background: #fff;
					width: 95%;
					font-size: 26rpx;
					border-radius: 10rpx;
					margin-top: 20rpx;
				}
				>input{
					height: 68rpx;
					padding: 0 22rpx;
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
				>.flex-between{
					
				}
				button{
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
			.van-uploader__upload{
				background: #fff;
			}
		}
	}
	.pop{
		text-align: center;
		>image:first-child{
			margin-top: 194rpx;
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

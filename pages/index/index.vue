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
	</view>
</template>

<script>
		let dateTimePicker = require('../../common/dateTimePicker.js');
	export default {
		data() {
			return {
				// 时间选择器
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
</style>

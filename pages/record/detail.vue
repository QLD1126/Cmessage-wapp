<template>
	<view class="container sell_info">
		<view>
			<view>
				<text class="t_32_333">{{info.title}}</text>
				<text>{{info.status==-1?'发布失败':info.status==0?'审核中':info.status==1?'发布成功':info.status==2?'销售中':info.status==3?'销售截止':'销售完成'}}</text>
			</view>
			
			<view>
				<text>副标题：</text>
				<text>{{info.subhead}}</text>
			</view>
			<view>
				<text>内容：</text>
				<text>{{info.content}}</text>
			</view>
			<view>
				<text>图片：</text>
				<image :src="info.image" mode="widthFix"></image>
			</view>
		</view>
		<view class="list_between_106">
			<view>
				<text>价格</text>
				<text>¥ {{info.price}}</text>
			</view>
			<view v-if="info.status>=2">
				<text>销量</text>
				<text>¥ {{info.sales}}</text>
			</view>
			<view v-if="info.status>=2">
				<text>收益</text>
				<text>¥ {{parseInt(info.price)*info.sales}}</text>
			</view>
			<view>
				<text>不对返还</text>
				<text>{{info.is_return==1?'开':'关'}}</text>
			</view>
			<view>
				<text>销售截止时间</text>
				<text>{{info.end_time}}</text>
			</view>
			<view>
				<text>内容公开时间</text>
				<text>{{info.open_time}}</text>
			</view>
			<view v-if="info.status==-1">
				<text>失败原因</text>
				<text>{{info.check_mark||'暂无'}}</text>
			</view>

			<view v-if="info.status==4">
				<text>选择结果</text>
				<text>结果正确</text>
			</view>
		</view>
		<navigator open-type="switchTab" url="/pages/index/index" class="btn_round" v-if="info.status==-1">重新填写</navigator>
		<button type="warn" class="btn_round" @click="resShow=true" v-if="info.status==3">选结果</button>
		<van-action-sheet :show="resShow" :actions=" actions" @close="resShow=false" @select="onSelect" cancel-text="取消" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadOver: false,
				info: {},
				resShow: false,
				actions: [{
						name: '结果正确',
					},
					{
						name: '结果错误',
					},
				],
			}
		},
		onLoad(options) {
			console.log(options)
				this.$apis.SELL_INFO(options.id).then(res => {
					this.info = res
					this.loadOver = true
				})
		},
		methods: {
			btnClick() {
				// 不同状态不同操作
				this.resShow = true
			}
		}
	}
</script>

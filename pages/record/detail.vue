<template>
	<view class="container sell_info" v-show="loadOver">
		<view>
			<view>
				<text class="t_32_333" style="flex: 0 0 80%;">{{info.title}}</text>
				<text :style="{color:info.status<3?'red':'#ccc'}">{{info._status}}</text>
			</view>

			<view>
				<text>副标题：</text>
				<text>{{info.subhead}}</text>
			</view>
			<view>
				<text>内容：</text>
				<text>{{info.content}}</text>
			</view>
			<view v-if="info.image">
				<text>图片：</text>
				<image @click="lookImg(info.image)" :src="info.image" mode="widthFix"></image>
			</view>
		</view>
		<view class="list_between_106">
			<view>
				<text>价格</text>
				<text>¥ {{info.price}}</text>
			</view>
			<view v-if="info.status>=1">
				<text>销量</text>
				<text>{{info.sales}}</text>
			</view>
			<view v-if="info.status>=1">
				<text>收益</text>
				<text>¥ {{Number(info.price)*Number(info.sales)}}</text>
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

			<view v-if="info.status==2">
				<text>选择结果</text>
				<text>{{info.result==-1?'结果错误':'结果正确'}}</text>
			</view>
		</view>
		<navigator open-type="switchTab" url="/pages/index/index" class="btn_round" v-if="info.status==-1">重新填写</navigator>
		<button type="warn" class="btn_round" @click="resShow=true" v-if="info.status==2&&info.is_return">选结果</button>
		<van-action-sheet :show="resShow" :actions=" actions" @close="resShow=false" @select="onSelect" cancel-text="取消" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				url:'',
				loadOver: false,
				info: {},
				resShow: false,
				actions: [{
					name: '结果正确',
					value: '1'

				}, {
					name: '结果错误',
					value: '2'
				}],
				options:{},
			}
		},
		onLoad(options) {
			let params={}
			if (options.scene) {
			      //扫描小程序码进入 -- 解析携带参数
			      let scene = decodeURIComponent(options.scene);
				  Object.assign(params,{type:this.getUrlParam(scene,'type'),id:this.getUrlParam(scene,'id')})
				  
			    }else{
					params=options
				}
			this.options=params
			console.log(this.options,'onload')
		},
		onShow() {
			console.log(this.options,'onhsow')
			this.getInfo(this.options.id,this.options.api)
		},
		methods: {
			getInfo(id,api){
				this.$apis[api||'SELL_INFO'](id).then(res => {
					this.info = res
					this.loadOver = true
				})
			},
			onSelect(e){
				this.$apis.FINISH(this.info.id, e.detail.value==1?1:2).then(() => {
					this.getInfo(this.info.id)
				})
			},
			lookImg(url) {
				uni.previewImage({
					urls: [url]
				})
			},
			btnClick() {
				// 不同状态不同操作
				this.resShow = true
			}
		}
	}
</script>
<style scoped>
	button{
		border-radius: 0;
	}
</style>

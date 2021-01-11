<template>
	<view class="container">
			<navigator class="li_106 flex-between" v-for="item in datalist" :key='item.id' :url="'/pages/me/rich?title='+item.title">
				<text>{{item.title}}</text>
				<text class="iconfont icon-fanhuizuojiantouxiangzuoshangyibuxianxing"></text>
			</navigator>
			<!-- <uni-load-more :status="loadStatus"></uni-load-more> -->
		</view>
</template>

<script>
	export default {
			data() {
				return {
					datalist:[],
					loadStatus:'loading',
				};
			},
			created() {
				this.$apis.ARTICLE_LIST('常见问题').then(res=>{
					this.datalist=res
					this.loadStatus='noMore'
				}).catch(()=>{
				})
			},
			// methods:{
			// 	toPage(id){
			// 		uni.nav
			// 	}
			// }
		}
</script>

<style>
	.li_106{
		border-radius: 0;
		background: #fff;
	}
</style>

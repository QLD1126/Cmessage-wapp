export default({
	request
})=>({
	LOGIN(data){
		return request({
			url:'/api/wechat/mp_auth',
			method:'post',
			data
		})
	},
	PHONE(data){
		return request({
			url:'/api/wechat/decryptData',
			method:'post',
			data
		})
	},
	LOGO(){
		return request({
			url:'/api/wechat/get_logo'
		})
	},
	USERINFO(){
		return request({
			url:'/api/order/user/info'
		})
	},
	NAME(data){
		return request({
			url:'/api/order/user/real_name',
			method:'post',
			data
		})
	},
	WALLET_LIST(params){
		return request({
			url:'/api/order/user/bill',
			params
		})
	},
	ISFOLLOW(id){
		return request({
			url:'/api/order/user/follow/'+id
		})
	},
	UNFOLLOW(id){
		return request({
			url:'/api/order/user/unfollow/2'
		})
	},
	FOLLOW_LIST(params){
		return request({
			url:'/api/order/user/myFollow',
			params
		})
	},
	FANS(params){
		return request({
			url:'/api/order/user/myFans',
			params
		})
	}
})
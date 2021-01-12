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
			url:'/api/user/info'
		})
	},
	NAME(data){
		return request({
			url:'/api/user/real_name',
			method:'post',
			data
		})
	},
	WALLET_LIST(params){
		return request({
			url:'/api/user/bill',
			params
		})
	},
	ISFOLLOW(id){
		return request({
			url:'/api/user/follow/'+id
		})
	},
	UNFOLLOW(id){
		return request({
			url:'/api/user/unfollow/'+id
		})
	},
	FOLLOW_LIST(params){
		return request({
			url:'/api/user/myFollow',
			params
		})
	},
	FANS(params){
		return request({
			url:'/api/user/myFans',
			params
		})
	},
	CASH(data){
		return request({
			url:'/api/extract/cash',
			method:'post',
			data
		})
	},
	CASH_LIST(params){
		return request({
			url:'/api/extract/list',
			params
		})
	}
	
})
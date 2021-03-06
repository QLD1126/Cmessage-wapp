export default ({
	request
}) => ({
	SELL(data) {
		return request({
			url: '/api/sell/issue',
			method: 'post',
			data
		})
	},
	SELL_LIST(params){
		return request({
			url: '/api/sell/list',
			params
		})
	},
	SELL_INFO(id) {
		return request({
			url: '/api/sell/detail/' + id
		})
	},
	SELL_DEL(id) {
		return request({
			url: '/api/sell/del/' + id
		})
	},
	//
	BUY_LIST(params){
		return request({
			url:'/api/order/list',
			params
		})
	},
	
	BUY_INFO(id) {
		return request({
			url: '/api/order/detail/' + id
		})
	},
	BUY_CREATE(id){
		return request({
			url:'/api/order/create/'+id
		})
	},
	BUY_SHARE_INFO(id){
		return request({
			url:'/api/buy/detail/'+id
		})
	},
	FINISH(id,r){
		return request({
			url:`/api/sell/finish/${id}/${r}`
		})
	},
	FOLLOW_SALE_LIST(id,params){
		return request({
			url:'/api/home/sell/'+id,
			params
		})
	},
	FOLLOW_SALE_INFO(id){
		return request({
			url:'/api/home/sellDetail/'+id
		})
	},
	SPARED(id,status){
		return request({
			url:'/api/sell/spared/qr/'+id+'/'+status
		})
	}
})

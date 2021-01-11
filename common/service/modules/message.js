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
	// 买
	BUY_INFO(id) {
		return request({
			url: '/api/buy/detail/' + id
		})
	},
	BUY_CREATE(id){
		return request({
			url:'/api/order/create/'+id
		})
	}
})

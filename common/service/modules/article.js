export default({request})=>({
	ARTICLE_LIST(id){
		return request({
			url:'/api/article/list/'+id
		})
	},
	ARTICLE(id){
		return request({
			url:'/api/article/detail/'+id
		})
	}
})
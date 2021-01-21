import {
	public_data
} from '../public_data.js'

function req(obj) {
	uni.showLoading({
		title:'加载中...'
	})
	return new Promise((resolve, reject) => {
		const HOST = public_data.host
		var method = obj.method || "GET";
		var url = HOST + obj.url || "";
		var data = obj.data || {};
		var params = obj.params || {};
		var token = uni.getStorageSync('TOKEN');
		var header = obj.header || {
			'Content-Type': obj.contentType || 'application/json',
			'Authori-zation': 'Bearer ' + token
		};
		// console.log(header,'aaaaaa')
		var success = obj.success; // 成功回调函数
		var fail = obj.fail; //表示失败后，要执行的回调函数
		uni.request({
			url: url,
			data: method == 'post' ? data:params,
			header: header,
			method: method,
			success: ((res) => {
				if (res.statusCode === 403 || res.statusCode === 401) {
					// 错误处理，返回登录页
					uni.reLaunch({
						url: '/pages/index/index'
					})
				} else if (res.statusCode === 500) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})

				} else {
					let status = res.data.status
					if (status == 200) {
						uni.hideLoading()
						resolve(res.data.data)
					} else if ([410000, 410001, 410002].indexOf(status) >= 0) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none',
						})
						uni.removeStorageSync('TOKEN')
						uni.removeStorageSync('USERINFO')
						uni.removeStorageSync('CATCH_KEY')
						uni.navigateTo({
							url: '/pages/login/login'
						})
						reject(res.data)
					} else {
						uni.showToast({
							title: res.data.msg ,
							icon: 'none'
						})
						reject(res.data)
					}
				}
			}),
			fail: ((err) => {
				reject(err)
				uni.showToast({
					title: err
				})
			})
		})
	})
}
export default req
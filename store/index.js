import Vue from 'vue'
import Vuex from 'vuex'
import apis from '../common/service/index.js'
Vue.use(Vuex)
const store=new Vuex.Store({
	state:{
		isLogged:uni.getStorageSync('TOKEN')==''?false:true,
		userInfo:{},
	},
	actions:{
		async login({
			commit
		}, data) {
			try {
				
				const res = await apis.LOGIN(data)
				uni.setStorageSync('TOKEN', res.token)
				uni.setStorageSync('CATCH_KEY',res.cache_key)
				// uni.navigateBack({
				// 	delta: 1
				// })
				commit('loginSet', true)
				return Promise.resolve(res)
			} catch (error) {
				return Promise.reject(error)
			}
		},
		async getuserInfo({commit}){
			try{
				const res=await apis.USERINFO()
				// 实名认证页面需要用到
				if(res.phone!==''){
					res.phone=String(res.phone).slice(0,3)+'****'+String(res.phone).slice(-4)
				}
				if(res.alipay_account!==''){
					res.alipay_account=String(res.alipay_account).slice(0,3)+'****'+String(res.alipay_account).slice(-4)
				}
				uni.setStorageSync('USERINFO',res)
				commit('userinfoSet',res)
				return Promise.resolve(res)
			}catch(Error){
				return Promise.reject(Error)
			}
		}
	},
	mutations:{
		loginSet(state,value){
			state.isLogged=value
		},
		userinfoSet(state, value) {
			state.userInfo = value
		}
	}
})
export default store
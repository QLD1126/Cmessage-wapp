import Vue from 'vue'
import App from './App'
import apis from './common/service/index.js'
import store from './store'
Vue.prototype.$apis = apis
Vue.config.productionTip = false
import {public_data} from 'common/public_data.js'
Vue.prototype.public_data=public_data
App.mpType = 'app'

const app = new Vue({
	store,
	...App
})
app.$mount()

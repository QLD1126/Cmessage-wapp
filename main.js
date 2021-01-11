import Vue from 'vue'
import App from './App'
import apis from './common/service/index.js'
import store from './store'
Vue.prototype.$apis = apis
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.aa='暂无内容'

const app = new Vue({
	store,
	...App
})
app.$mount()

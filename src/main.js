import Vue from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
Vue.prototype.$http = axios

Vue.config.productionTip = false

// 判断是否登陆
router.beforeEach((to, from, next) => {
	if (to.path === '/login') {
		sessionStorage.removeItem('user')
	}
	let user = JSON.parse(sessionStorage.getItem('user'))
	if (!user && to.path !== '/login') {
		if (to.path.substring(1)) {
			next({ path: '/login', query: { redirect: to.path.substring(1), no: to.query.no } })
		} else {
			next({ path: '/login' })
		}
	} else {
		next()
	}
})

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

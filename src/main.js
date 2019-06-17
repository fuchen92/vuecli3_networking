import Vue from 'vue'
import VueI18n from "vue-i18n"
import LangZh from "@/lang/zh.json"
import LangEn from "@/lang/en.json"

import App from './App.vue'
import router from './router'

Vue.use(VueI18n)

console.log(LangZh)

const i18n = new VueI18n({
	locale: "zh",
	messages: {
		"zh": LangZh,
		"en": LangEn
	}
})

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
	i18n,
	router,
	render: h => h(App)
}).$mount('#app')

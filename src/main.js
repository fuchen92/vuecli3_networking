import Vue from 'vue'
import VueI18n from "vue-i18n"
import LangZh from "@/lang/zh"
import LangEn from "@/lang/en"

import App from './App.vue'
import store from "./store"
import router from './router'

Vue.use(VueI18n)

// const i18n = new VueI18n({
// 	locale: store.state.Lang,
// 	messages: {
// 		"zh": LangZh,
// 		"en": LangEn
// 	}
// })
const i18n = new VueI18n({
	locale: localStorage.getItem("localeLanguage") || store.state.Lang || "zh",
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
		localStorage.removeItem('user')
	}
	let user = JSON.parse(localStorage.getItem('user'))
	if (!user && to.path !== '/login') {
		console.log("重定向到登录页")
		next({ path: '/login' })
		if (to.path.substring(1)) {
			next({ path: '/login', query: { redirect: to.path.substring(1), no: to.query.no } })
		} else {
			next({ path: '/login' })
		}
	} else {
		// console.log("无重定向，直接进入下一步")
		next()
	}
})

new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app')

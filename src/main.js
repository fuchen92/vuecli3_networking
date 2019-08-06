import Vue from 'vue'
import VueI18n from "vue-i18n"
import LangZh from "@/lang/zh"
import LangEn from "@/lang/en"

// import Toast from "@/plugins/toast/index"

import App from './App.vue'
import store from "./store"
import router from './router'

Vue.use(VueI18n)
// Vue.use(Toast)

const i18n = new VueI18n({
	locale: localStorage.getItem("localeLanguage") || store.state.Lang || "zh",
	messages: {
		"zh": LangZh,
		"en": LangEn
	}
})

import axios from 'axios'
Vue.prototype.$http = axios

Vue.prototype.$pattern = function(time, fmt) {
	let t;
	if (/\d[-T]\d/.test(time)) {
		t = time.replace('T', ' ').replace(RegExp("-", "g"), "/").slice(0, 19);
	} else {
		t = time;
	}
	let _this = new Date(t);
	let o = {
		"M+": _this.getMonth() + 1, //月份         
		"d+": _this.getDate(), //日         
		"h+": _this.getHours() % 12 == 0 ? 12 : _this.getHours() % 12, //小时         
		"H+": _this.getHours(), //小时         
		"m+": _this.getMinutes(), //分         
		"s+": _this.getSeconds(), //秒         
		"q+": Math.floor((_this.getMonth() + 3) / 3), //季度         
		"S": _this.getMilliseconds() //毫秒         
	};
	let week = {
		"0": "\u65e5",
		"1": "\u4e00",
		"2": "\u4e8c",
		"3": "\u4e09",
		"4": "\u56db",
		"5": "\u4e94",
		"6": "\u516d"
	};
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
	}
	if (/(E+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "\u661f\u671f" : "\u5468") : "") + week[_this.getDay() + ""]);
	}
	for (let k in o) {
		if (new RegExp("(" + k + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		}
	}
	return fmt;
}

Vue.config.productionTip = false

// 判断是否登陆
router.beforeEach((to, from, next) => {
	let lang = localStorage.getItem("localeLanguage") || store.state.Lang || "zh";
	document.title = lang == "zh" ? "会议交流平台 - 环球旅讯(TravelDaily)" : "TravelDaily Conference Networking Platform";
	if (to.path === '/login') {
		localStorage.removeItem('token')
	}
	let token = localStorage.getItem('token')
	if (!token && to.path !== '/login') {
		next({ path: '/login' })
	} else {
		next()
	}
})

new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app')

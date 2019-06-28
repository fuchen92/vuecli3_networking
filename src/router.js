import Vue from 'vue'
import Router from 'vue-router'

import Layout from "@/views/Layout.vue";
import Program from "@/views/Program.vue";
// import Home from './views/Home.vue'

import Login from "@/views/Login.vue"

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			component: Layout,
			children: [
				{
					path: "",
					component: Program
				},
				{
					path: "attendees",
					component: () => import(/* webpackChunkName: "attendees" */ "@/views/Attendees.vue")
				},
				{
					path: "plaza",
					component: () => import(/* webpackChunkName: "plaza" */ "@/views/Plaza.vue")
				},
				{
					path: "me",
					component: () => import(/* webpackChunkName: "me" */"@/views/Me.vue")
				},
				{
					path: "message",
					component: () => import(/* webpackChunkName: "message" */ "@/views/Message.vue")
				}
			]
		},
		{
			path: "/programdetail",
			component: () => import(/* webpackChunkName: "programdetail" */ "@/views/ProgramDetail.vue")
		},
		{
			path: "/invite",
			component: () => import(/* webpackChunkName: "invite" */ "@/views/Invite.vue")
		},
		{
			path: "/exhibitor",
			component: () => import(/* webpackChunkName: "exhibitor" */ "@/views/Exhibitor.vue")
		},
		{
			path: "/product",
			component: () => import(/* webpackChunkName: "product" */ "@/views/Product.vue")
		},
		{
			path: "/publish",
			component: () => import(/* webpackChunkName: "publish" */ "@/views/Publish.vue")
		},
		{
			path: "/meinfomation",
			component: () => import(/* webpackChunkName: "meinfomation" */ "@/views/MeInfomation.vue")
		},
		{
			path: "/chat",
			component: () => import(/* webpakChunkName: "chat" */ "@/views/Chat.vue")
		},
		{
			path: "/qrcode",
			component: () => import(/* webpackChunkName: "qrcode" */ "@/views/QrCode.vue")
		},
		{
			path: "/myneed",
			component: () => import(/* webpackChunkName: "myneed" */ "@/views/MyNeed.vue")
		},
		{
			path: "/login",
			name: "login",
			component: Login
		},
		// {
		// 	path: '/about',
		// 	name: 'about',
		// 	// route level code-splitting
		// 	// this generates a separate chunk (about.[hash].js) for this route
		// 	// which is lazy-loaded when the route is visited.
		// 	component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
		// }
	]
})

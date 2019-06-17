<template>
	<div class="login">
		<img class="loginLogo" src="../assets/loginLogo.png" alt="">
		<div class="languageSwitch">
			<label class="languageLabel">
				<input class="languageRadio" type="radio" name="language" value="1" v-model="language" @change="switchLanguage">
				<span class="languageLabelText">
					中文
				</span>
			</label>
			<b class="languageDivide"></b>
			<label class="languageLabel">
				<input class="languageRadio" type="radio" name="language" value="2" v-model="language" @change="switchLanguage">
				<span class="languageLabelText">
					EN
				</span>
			</label>
		</div>
		<div class="loginBox">
			<div class="formGroup">
				<input class="formInput" type="text" placeholder="请输入报名时提交的手机号/邮箱">
			</div>
			<div class="formGroup clear">
				<input class="formInput valicodeInput lt" type="text" placeholder="输入验证码">
				<button class="btn btnRed getValicode rt" @click="getValicode">获取验证码</button>
			</div>
			<div class="formGroup">
				<p class="formTips" v-show="hasError">{{ errText }}</p>
			</div>
			<div class="formGroup">
				<button class="btn btnRed loginBtn" @click="submitLogin">登录</button>
				<p class="loginTip">{{ loginTip }}</p>
			</div>
		</div>
		<p class="copyright">
			Copyright 2006-2019 TravelDaily All Rights Reserved <br> 环球旅讯 版权所有
		</p>
	</div>
</template>
<style>
html, body {
	width: 100%;
	height: 100%;
}
#app {
	position: relative;
	width: 100%;
	height: 100%;
	background-color: #F8F8F8;
}
.login {
	width: 90%;
	margin: 0 auto;
	overflow: hidden;
}
.loginLogo {
	width: 4.19rem;
	margin: 2rem auto 0.6rem;
}
.languageSwitch {
	font-size: 0;
	text-align: right;
}
.languageLabel, .languageDivide {
	display: inline-block;
	vertical-align: middle;
}
.languageLabel {
	font-size: 0.28rem;
	line-height: 0.4rem;
}
.languageRadio {
	display: none;
}
.languageLabelText {
	color: #aaaaaa;
}
.languageRadio:checked + .languageLabelText {
	color: #000000;
}
.languageDivide {
	height: 0.2rem;
	margin: 0 0.3rem;
	border-left: 1px solid #181818;
}
.loginBox {
	box-sizing: border-box;
	margin-top: 0.2rem;
	padding: 0.4rem 0.2rem;
	background-color: #fff;
}
.formGroup:last-child {
	margin-bottom: 0;
}
.valicodeInput {
	width: 65%;
	border-right: 0;
}
.getValicode {
	width: 35%;
}
.loginTip {
	margin-top: 0.2rem;
	font-size: 0.24rem;
	line-height: 0.3rem;
	text-align: center;
}
.copyright {
	position: fixed;
	left: 0;
	bottom: 0.3rem;
	width: 100%;
	font-size: 0.24rem;
	line-height: 0.4rem;
	text-align: center;
	color: #aaaaaa;
}
</style>
<script>
export default {
	name: "login",
	data: function() {
		return {
			language: 1,
			hasError: false,
			errText: "请输入报名时提交的手机号/邮箱",
			loginTip: "如有疑问，请联系 020-2882 9750"
		}
	},
	methods: {
		switchLanguage: function() {
			console.log(this.language)
		},
		getValicode: function() {
			console.log("获取验证码");
		},
		submitLogin: function() {
			console.log("登录");
		}
	}
}
</script>

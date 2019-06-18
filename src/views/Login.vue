<template>
	<div class="login">
		<img class="loginLogo" src="../assets/loginLogo.png" alt="">
		<div class="languageSwitch">
			<label class="languageLabel">
				<!-- <input class="languageRadio" type="radio" name="language" value="zh" v-model="language" @change="switchLanguage"> -->
				<input class="languageRadio" type="radio" name="language" value="zh" v-model="language">
				<span class="languageLabelText">
					中文
				</span>
			</label>
			<b class="languageDivide"></b>
			<label class="languageLabel">
				<!-- <input class="languageRadio" type="radio" name="language" value="en" v-model="language" @change="switchLanguage"> -->
				<input class="languageRadio" type="radio" name="language" value="en" v-model="language">
				<span class="languageLabelText">
					EN
				</span>
			</label>
		</div>
		<div class="loginBox">
			<div class="formGroup">
				<input class="formInput" type="text" v-bind:placeholder="accountPlaceholder">
			</div>
			<div class="formGroup clear">
				<input class="formInput valicodeInput lt" type="text" v-bind:placeholder="valicodePlaceholder">
				<!-- <button class="btn btnRed getValicode rt" @click="getValicode" v-t="{ path: 'login.getValicode', locale: language }">{{ $t('login.getValicode') }}</button> -->
				<button class="btn btnRed getValicode rt" @click="getValicode">{{ showNum ? (countDown + "s") : $t('login.getValicode') }}</button>
				<!-- <button class="btn btnRed getValicode rt" @click="getValicode" v-t="'login.getValicode'"></button> -->
			</div>
			<div class="formGroup">
				<p class="formTips" v-show="hasError">{{ $t("login.errTip['" + errType + "']") }}</p>
			</div>
			<div class="formGroup">
				<button class="btn btnRed loginBtn" @click="submitLogin">{{ $t('login.loginBtn') }}</button>
				<!-- <p class="loginTip">{{ loginTip }}</p> -->
				<p class="loginTip">{{ $t('login.loginTip') }}</p>
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
			showNum: false,
			countDown: 59,
			hasError: false,
			errType: "empty",
			errText: "请输入报名时提交的手机号/邮箱",
			loginTip: "如有疑问，请联系 020-2882 9750"
		}
	},
	computed: {
		// 计算属性设置setter，参考vuex文档（表单处理）
		language: {
			get() {
				return this.$store.state.lang
			},
			set(value) {
				this.$store.commit("CHANGELANGUAGE", value);
				this.$i18n.locale = value;
			}
		},
		lang: function() {
			return this.$i18n.messages[this.$store.state.lang]
		},
		accountPlaceholder: function() {
			return this.lang.login.account
		},
		valicodePlaceholder: function() {
			return this.lang.login.valicode
		}
	},
	methods: {
		getValicode: function() {
			console.log("获取验证码");
		},
		submitLogin: function() {
			console.log("登录");
		}
	}
}
</script>

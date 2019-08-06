<template>
	<div class="login">
		<img class="loginLogo" src="../assets/loginLogo.png" alt="">
		<div class="languageSwitch">
			<label class="languageLabel">
				<input class="languageRadio" type="radio" name="language" value="zh" v-model="language">
				<span class="languageLabelText">
					中文
				</span>
			</label>
			<b class="languageDivide"></b>
			<label class="languageLabel">
				<input class="languageRadio" type="radio" name="language" value="en" v-model="language">
				<span class="languageLabelText">
					EN
				</span>
			</label>
		</div>
		<div class="loginBox">
			<div class="formGroup">
				<input class="formInput" type="text" ref="account" :placeholder="$t('login.accountPlaceholder')" v-model.trim="account">
			</div>
			<div class="formGroup clear">
				<input class="formInput valicodeInput lt" type="text" maxlength="6" ref="valicode" :placeholder="$t('login.valicodePlaceholder')" v-model.trim="valicode">
				<button class="btn btnRed getValicode rt" @click="getValicode" :disabled="isGettedCode">
					{{ isGettedCode ? (countDown + "s") : $t("login.getCode[" + valicodeTipIndex + "]") }}
				</button>
			</div>
			<div class="formGroup">
				<p class="formTips" v-show="hasError">
					{{ $t("login.errTip['" + errType + "']") }}
				</p>
			</div>
			<div class="formGroup">
				<button class="btn btnRed loginBtn" @click="submitLogin">
					{{ $t('login.loginBtn') }}
				</button>
				<p class="loginTip">
					{{ $t('login.loginTip') }}
				</p>
			</div>
		</div>
		<p class="copyright">
			Copyright 2006-2019 TravelDaily All Rights Reserved <br> 环球旅讯 版权所有
		</p>
	</div>
</template>
<script>
import { mapActions, mapState } from "vuex"
export default {
	name: "login",
	data: function() {
		return {
			isGettedCode: false,
			countDown: 59,
			hasError: false,
			errType: "empty",
			account: "",
			valicode: "",
			valicodeTipIndex: 0,
			timer: ""
		}
	},
	computed: {
		// 计算属性设置setter，参考vuex文档（表单处理）
		language: {
			get() {
				return this.$store.state.Lang
			},
			set(value) {
				document.title = value == "zh" ? "会议交流平台 - 环球旅讯(TravelDaily)" : "TravelDaily Conference Networking Platform";
				this.$store.commit("CHANGELANGUAGE", value);
				this.$i18n.locale = value;
				localStorage.setItem("localeLanguage", value);
			}
		},
		...mapState({
			apiDomain: state => state.ApiDomain,
			eventNo: state => state.eventNo,
			lang: state => state.Lang
		}),
	},
	methods: {
		// 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
		// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
		...mapActions({
			initProgram: "getProgramList",
			initMyInfo: "getMyInfo",
			initToken: "initToken",
			getNewChatCount: "getNewChatCount"
		}),
		_validate: function(type) {
			let { account, valicode } = this;
			switch(type) {
				case "account":
					if(account == "" || account.length == 0) {
						this.hasError = true;
						this.$refs.account.focus();
						return false;
					}
					if(account.indexOf("@") != -1) {
						if(!/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(account)) {
							this.errType = "emailErr";
							this.hasError = true;
							this.$refs.account.focus();
							return false;
						}
					} else {
						if(!/(^(13[0-9]|15[012356789]|18[0-9]|14[57]|17[0-9])[0-9]{8}$)|(^09\d{8}$)|(^[569]\d{7}$)|(^(66|62)\d{6}$)/.test(account)) {
							this.errType = "mobileErr";
							this.hasError = true;
							this.$refs.account.focus();
							return false;
						}
					}
					break;
				case "valicode":
					if(valicode == "" || valicode.length == 0) {
						this.errType = "valicodeEmpty";
						this.hasError = true;
						this.$refs.valicode.focus();
						return false;
					} else if(!/\d{6}/.test(valicode)) {
						this.errType = "valicodeErr";
						this.hasError = true;
						this.$refs.valicode.focus();
						return false;
					}
					break;
			}
			return true;
		},
		getValicode: function() {
			if(this.isGettedCode == true) {
				return;
			}
			if(this._validate("account")) {
				this.hasError = false;
				this.isGettedCode = true;
				this.$refs.valicode.focus();
				this.$http.post(`${this.apiDomain}/Home/SendCode`, {
					eventNo: this.eventNo,
					loginName: this.account,
					lang: this.language
				}).then(res => {
					if(res.data.Code == 0) {
						this.timer = setInterval(() => {
							this.countDown--;
							if(this.countDown <= 0) {
								this.countDown = 59;
								clearInterval(this.timer);
								this.timer = null;
								this.isGettedCode = false;
								this.valicodeTipIndex = 1;
							}
						}, 1000);
					} else if(res.data.Code != 0) {
						alert(res.data.Message)
					}
					
				})
			}
		},
		submitLogin: function() {
			let { account, valicode } = this;
			if(!this._validate("account")) {
				return false;
			}
			if(!this._validate("valicode")) {
				return false;
			}
			if(this._validate("account") && this._validate("valicode")) {
				this.hasError = false;
				this.$http.post(`${this.apiDomain}/Home/Login`, {
					eventNo: this.eventNo,
					loginName: this.account,
					code: this.valicode,
					lang: this.language == 'zh' ? 1 : 2
				}).then(res => {
					if(res.data.Code == 0) {
						let account = {
							token: res.data.Data,
							isFirstLogin: res.data.Message == 0 ? true : false
						}
            			localStorage.setItem("token", account.token);
						// 触发初始化account的actions（token）
						this.initToken({ account });
						this.getNewChatCount({ eventNo: this.eventNo, token: account.token, lang: this.language == "zh" ? 1 : 2 });
						this.$router.push({ path: "/" })
					} else if(res.data.Code != 0) {
						alert(res.data.Message)
					}
					
				}).catch(err => {
					alert(err);
				})
			}
			
		}
	},
	created: function() {
	},
	beforeDestroy() {
		clearInterval(this.timer)
		this.timer = null;
		// 初始化日程列表
		// 应在此处根据语言初始化日程列表，暂时注释，后续再放开
		// this.initProgram({ eventNo: 63, token: "", lang: this.lang == 'zh' ? 1 : 2 });

		// this.initMyInfo({ eventNo: this.$store.state.eventNo, token: this.$store.state.Account.Token })
	}
}
</script>
<style>
.login {
	width: 90%;
	margin: 0 auto;
	overflow: hidden;
}
.loginLogo {
	width: 4.19rem;
	margin: 1rem auto 0.4rem;
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

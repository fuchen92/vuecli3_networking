<template>
    <div class="me">
        <!-- <h1>This is an about page</h1> -->
		<div class="container">
			<div class="meCard">
				<router-link class="meInfoLink" to="/meinfomation">
					<div class="meAvatar">
						<img class="meAvatarImg" v-bind:src="myInfo.Photo" alt="">
					</div>
					<div class="meInfo">
						<p class="meName">{{ myInfo.Name }}</p>
						<p class="meCompany">{{ myInfo.Company }}</p>
						<p class="meJob">{{ myInfo.JobTitle }}</p>
						<!-- <p class="meName">宇智波 ● 鼬</p>
						<p class="meCompany">木叶暗部</p>
						<p class="meJob">暗部杀手</p> -->
					</div>
				</router-link>
				<div class="qrCode">
					<router-link class="qrCodeLink" to="/qrcode">
						<img class="qrCodeIcon" src="../assets/iconQrCode.svg" alt="">
						<!-- 签到码 -->
						{{ $t("me.qrcode") }}
					</router-link>
				</div>
			</div>
			<div class="menuCard clear">
				<p class="menuLabel lt">{{ $t("me.language") }}</p>
				<select class="languageChoose rt" v-model="language">
					<option value="zh">中文</option>
					<option value="en">EN</option>
				</select>
			</div>
			<div class="menuCard">
				<router-link class="menuCardLink clear" to="/myneed">
					<p class="menuLabel lt">{{ $t("me.need") }}</p>
					<span class="menuCardLinkIcon rt">{{ $t("me.view") }}</span>
				</router-link>
			</div>
			<div class="menuCard">
				<a class="menuCardLink clear" href="">
					<p class="menuLabel lt">{{ $t("me.venue") }}</p>
					<span class="menuCardLinkIcon rt"></span>
				</a>
			</div>
			<div class="menuCard">
				<a class="menuCardLink clear" href="">
					<p class="menuLabel lt">{{ $t("me.contact") }}</p>
					<span class="menuCardLinkIcon rt"></span>
				</a>
			</div>
			<div class="menuCard">
				<a class="menuCardLink clear" href="">
					<p class="menuLabel lt">{{ $t("me.faq") }}</p>
					<span class="menuCardLinkIcon rt"></span>
				</a>
			</div>
			<div class="menuCard">
				<a class="menuCardLink clear" href="">
					<p class="menuLabel lt">{{ $t("me.service") }}</p>
					<span class="menuCardLinkIcon rt"></span>
				</a>
			</div>
		</div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
	name: "Me",
	computed: {
		language: {
			// 计算属性设置setter，参考vuex文档（表单处理）
			get() {
				return this.$store.state.Lang
			},
			set(value) {
				this.$store.commit("CHANGELANGUAGE", value);
				// 应在此处修改语言之后重新请求日程英文数据，暂时注释，后续再放开
				// this.initProgram({ eventNo: 63, token: "", lang: value == 'zh' ? 1 : 2 });
				this.$i18n.locale = value;
				localStorage.setItem("localeLanguage", value);
			}
		},
		...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
			token: state => state.Account.Token,
		}),
		myInfo: function() {
			return this.$store.getters.getMyInfoByLang(this.lang)
		}
	},
	methods: {
		...mapActions({
			initMyInfo: "getMyInfo"
        })
	},
	created: function() {
		this.initMyInfo({ eventNo: this.eventNo, token: this.token, lang: this.lang == 'zh' ? 1 : 2 });
	}
};
</script>
<style>
.me {
	padding: 1rem 0;
}
.me > .container {
	width: 90%;
}
.meCard {
	box-sizing: border-box;
	margin: 0.2rem 0;
	padding: 0.4rem 0.2rem;
	font-size: 0;
	background-color: #fff;
}
.meInfoLink, .qrCode {
	display: inline-block;
	vertical-align: middle;
	font-size: 0;
}
.meInfoLink {
	width: calc(100% - 1rem);
	color: #2c3e50;
}
.meAvatar, .meInfo {
	display: inline-block;
	vertical-align: top;
}
.meAvatar {
	width: 1.2rem;
	height: 1.2rem;
	margin-right: 0.2rem;
	border-radius: 100%;
	overflow: hidden;
}
.meAvatarImg {
	width: 100%;
}
.meInfo {
	box-sizing: border-box;
	width: calc(100% - 1.4rem);
	padding-right: 0.2rem;
	font-size: 0.28rem;
}
.meName, .meCompany, .meJob {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.meName {
	font-weight: bold;
}
.qrCode {
	width: 0.9rem;
	text-align: center;
}
.qrCodeLink {
	font-size: 0.28rem;
	color: #2c3e50;
}
.qrCodeIcon {
	width: 0.4rem;
	margin: 0 auto 0.1rem;
}
.menuCard {
	box-sizing: border-box;
	margin: 0.2rem 0;
	padding: 0.4rem 0.2rem;
	font-size: 0;
	background-color: #fff;
}
.menuLabel {
	font-size: 0.28rem;
	color: #2c3e50;
}
.languageChoose {
	padding-right: 0.4rem;
	font-size: 0.24rem;
	line-height: 0.4rem;
	border: 0;
	background: url(../assets/dropdown32.png) right center/0.32rem auto no-repeat;
	/* color: #cccccc; */
}
.menuCardLinkIcon {
	/* width: 0.4rem; */
	height: 0.4rem;
	padding-right: 0.4rem;
	font-size: 0.24rem;
	line-height: 0.4rem;
	background: url(../assets/rightArrow32.png) right center/0.3rem auto no-repeat;
	color: #2c3e50;
}
</style>

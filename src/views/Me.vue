<template>
    <div class="me">
		<div class="container">
			<div class="meCard">
				<router-link class="meInfoLink" to="/meinfomation">
					<div class="meAvatar">
						<img class="meAvatarImg" :src="myInfo.Photo" alt="">
					</div>
					<div class="meInfo">
						<p class="meName">
							{{ myInfo.Name }}
						</p>
						<p class="meCompany">
							{{ myInfo.Company }}
						</p>
						<p class="meJob">
							{{ myInfo.JobTitle }}
						</p>
					</div>
				</router-link>
				<!-- <div class="qrCode">
					<router-link class="qrCodeLink" to="/qrcode">
						<img class="qrCodeIcon" src="../assets/iconQrCode.svg" alt="">
						{{ $t("me.qrcode") }}
					</router-link>
				</div> -->
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
				<a class="menuCardLink clear" :href="`https://event.traveldaily.cn/tdc2019/service/venue${ lang == 'zh' ? '' : '_en' }`" target="_blank">
					<p class="menuLabel lt">{{ $t("me.venue") }}</p>
					<span class="menuCardLinkIcon rt"></span>
				</a>
			</div>
			<div class="menuCard">
				<a class="menuCardLink clear" :href="`https://event.traveldaily.cn/tdc2019/contact${ lang == 'zh' ? '' : '_en' }`" target="_blank">
					<p class="menuLabel lt">{{ $t("me.contact") }}</p>
					<span class="menuCardLinkIcon rt"></span>
				</a>
			</div>
			<div class="menuCard" v-if="lang != 'en'">
				<a class="menuCardLink clear" :href="`https://event.traveldaily.cn/tdc2019/service/fqa`" target="_blank">
					<p class="menuLabel lt">{{ $t("me.faq") }}</p>
					<span class="menuCardLinkIcon rt"></span>
				</a>
			</div>
			<div class="menuCard">
				<a class="menuCardLink clear" :href="`https://event.traveldaily.cn/tdc2019/service/recommended${ lang == 'zh' ? '' : '_en' }`" target="_blank">
					<p class="menuLabel lt">{{ $t("me.service") }}</p>
					<span class="menuCardLinkIcon rt"></span>
				</a>
			</div>
		</div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
	name: "Me",
	computed: {
		language: {
			// 计算属性设置setter，参考vuex文档（表单处理）
			get() {
				return this.$store.state.Lang
			},
			set(value) {
				document.title = value == "zh" ? "旅讯峰会 - 环球旅讯(TravelDaily)" : "TravelDaily Conference Networking Platform";
				localStorage.removeItem("exhibitorLoadIndex");		// 重置广场页展商列表加载页码
				localStorage.removeItem("exhibitorLoadAll");		// 重置广场页展商列表加载状态
				localStorage.removeItem("exhibitorListScrollTop");

				localStorage.removeItem("recommendLoadIndex");		// 重置人脉页推荐列表加载页码
				localStorage.removeItem("recommendLoadAll");		// 重置人脉页推荐列表加载状态
				localStorage.removeItem("recommendScrollTop");

				localStorage.removeItem("attendsLoadIndex");		// 人脉页全部嘉宾
				localStorage.removeItem("attendsLoadAll");
				localStorage.removeItem("attendsScrollTop");

				this.$store.commit("CHANGELANGUAGE", value);
				/* 应在此处修改语言之后重新请求日程，人脉页全部参会嘉宾，人脉页推荐筛选面板，广场展商列表，英文数据，暂时注释，后续再放开
					语言修改之后应当清空state中人脉页全部参会嘉宾中文数据，广场页展商列表中文数据
				*/
				this.EMPTYATTENDSLIST();
				this.EMPTYRECOMMENDLIST();
				this.EMPTYEXHIBITORLIST();
				this.getProgramList({ eventNo: this.eventNo, token: this.token, lang: value == 'zh' ? 1 : 2 });
				this.getAttendsList({ eventNo: this.eventNo, index: 1, size: 20, token: this.token, lang: value == 'zh' ? 1 : 2 });
				this.getAttendsFilter({ eventNo: this.eventNo, token: this.token, lang: value == 'zh' ? 1 : 2 });
				this.getExhibitorList({ eventNo: this.eventNo, index: 1, size: 50, token: this.token, lang: value == 'zh' ? 1 : 2 });
				this.getChatList({ eventNo: this.eventNo, token: this.token, lang: value == 'zh' ? 1 : 2 });
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
		...mapActions([
			"getProgramList",
			"getAttendsList",
			"getAttendsFilter",
			"getExhibitorList",
			"getChatList"
		]),
		...mapMutations([
			"EMPTYATTENDSLIST",
			"EMPTYEXHIBITORLIST",
			"EMPTYRECOMMENDLIST"
		]),
	},
	created: function() {
		
	}
};
</script>
<style>
.me {
	box-sizing: border-box;
	position: relative;
	width: 100%;
	height: 100%;
	padding: 1rem 0;
}
.me > .container {
	box-sizing: border-box;
	width: 95%;
	height: 100%;
	overflow: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
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
	width: calc(100% - 2rem);
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
	width: 2rem;
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

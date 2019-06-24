<template>
    <div class="meInfomation">
        <NavBar :showSearch="false" :backUrl="backUrl" :navBarTitle="navBarTitle"></NavBar>
        <div class="infomationWrapper">
            <div class="infomationCard">
                <div class="infomationAvatar">                
                    <img class="avatarPhoto" v-bind:src="myInfo.Photo || '../assets/avatar.jpg'" alt="">
                </div>
                <div class="infomationCardContent">
                    <button class="uploadBtn">{{ $t("meinfomation.upload") }}</button>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.name") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.Name }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.nameEn") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.NameEn }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.company") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.Company }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.companyEn") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.CompanyEn }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.job") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.JobTitle }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.jobEn") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.JobTitleEn }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.mobile") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.ContactList[0].Name }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.email") }}</p>
                        <p class="infomationItemValue rt">{{ myInfo.ContactList[1].Name }}</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">{{ $t("meinfomation.wechat") }}</p>
                        <input class="wechatInput" type="text" :value="myInfo.WeChat" :placeholder="$t('meinfomation.wechatplaceholder')">
                    </div>
                </div>
            </div>
            <div class="infomationCard">
                <textarea class="infomationIntro" :placeholder="$t('meinfomation.intro')"></textarea>
            </div>
            <button class="saveInfomation">{{ $t("meinfomation.save") }}</button>        
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar";
export default {
    name: "MeInfomation",
    data: function() {
        return {
            backUrl: "/me",
            navBarTitle: this.$i18n.messages[this.$store.state.Lang].meinfomation.navBarTitle,
            // myInfo: {}
        }
    },
    components: {
        NavBar
    },
    computed: {
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            myInfo: state => state.MyInfomation
		}),
        // myInfo: function() {
		// 	return this.$store.getters.getMyInfoByLang(this.lang)
		// }
    },
    methods: {
		...mapActions({
			initMyInfo: "getMyInfo"
        })
	},
	created: function() {
		// this.initMyInfo({ eventNo: this.eventNo, token: this.token, lang: this.lang == 'zh' ? 1 : 2 });
	}
}
</script>
<style scoped>
.meInfomation {
    position: relative;
    width: 100%;
    height: 100%;
}
.infomationWrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.infomationCard {
    box-sizing: border-box;
    width: 90%;
    margin: 0 auto 0.2rem;
    padding: 0.4rem 0.2rem 0.2rem;
    background-color: #ffffff;
}
.infomationCard:first-child {
    margin-top: 1.15rem;
}
.infomationAvatar {
    position: relative;
    top: -1rem;
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 auto;
    border-radius: 100%;
    overflow: hidden;
}
.avatarPhoto {
    width: 100%;
}
.infomationCardContent {
    margin-top: -1rem;
    font-size: 0;
}
.uploadBtn {
    display: block;
    width: 1.6rem;
    height: 0.6rem;
    margin: 0.2rem auto 0.3rem;
    border-radius: 0.4rem;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.6rem;
    background-color: var(--themeColor);
    color: #ffffff;
}
.infomationItem:not(:last-child) {
    border-bottom: 1px solid #F0F1F2;
}
.infomationItemLabel, .infomationItemValue, .wechatInput {
    width: 2rem;
    font-size: 0.28rem;
    line-height: 0.8rem;
}
.infomationItemValue {
    width: calc(100% - 2rem);
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.wechatInput {
    width: calc(100% - 2rem);
    border: 0;
    text-align: right;
}
.infomationIntro {
    width: 100%;
    height: 1rem;
    resize: none;
    border: 0;
}
.saveInfomation {
    display: block;
    width: 90%;
    height: 0.8rem;
    margin: 0 auto;
    font-size: 0.28rem;
    line-height: 0.8rem;
    text-align: center;
    background-color: var(--themeColor);
    color: #fff;
}
</style>



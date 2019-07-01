<template>
    <div class="programdDetail">
        <NavBar :showSearch="false" :backUrl="'/'" :navBarTitle="navBarTitle"></NavBar>
        <div class="programDetailBox">
            <div class="detailBanner">
                <video class="afterVideo" v-if="programDetail.IsEnd && programDetail.Video != null" controls :src="programDetail.Video[0]"></video>
                <div class="detailBannerBox" v-else>
                    <div class="detailBannerContent">
                        <h3 class="detailBannerTitle">{{ programDetail.Topic }}</h3>
                        <p class="detailTime">{{ programDetail.LocalTime }}</p>
                        <p class="detailBannerTip">{{ $t("programDetail.videoTip") }}</p>
                    </div>
                </div>
            </div>
            <div class="detailWrapper">
                <div class="detailTabs">
                    <div class="detailTab" v-for="(tab, index) in tabs" :key="index" :class="{ active: currentIndex == index }" @click="currentIndex = index">
                        {{ tab.name }}
                    </div>
                </div>
                <div class="detailContent">
                    <div class="detailList" :class="{ active: currentIndex == 0 }">
                        <div class="detailIntro" v-html="programDetail.Summary"></div>
                        <div class="detailSpeakerList">
                            <template v-for="(speaker, idx) in programDetail.Details">
                                <p v-if="speaker.DataType.Title != programDetail.Details[0].DataType.Title || idx == 0" :key="idx" class="speakerType">{{ speaker.DataType.Title }}</p>
                                <router-link class="detailSpeaker" v-bind:to="speaker.Speaker.SocialId > 0 ? '/guest?guestId=' + speaker.Speaker.SocialId : '/speaker?speakerId=' + speaker.Speaker.Id" v-bind:key="speaker.Speaker.Id">
                                    <div class="detailSpeakerAvatar">
                                        <img class="detailSpeakerPhoto" v-bind:src="speaker.Speaker.Photo" alt="">
                                    </div>
                                    <div class="detailSpeakerInfo">
                                        <h4 class="detailSpeakerName">{{ speaker.Speaker.Name }}</h4>
                                        <p class="detailSpeakerCompany">{{ speaker.Speaker.Company }}</p>
                                        <p class="detailSpeakerJob">{{ speaker.Speaker.JobTitle }}</p>
                                    </div>
                                </router-link>
                            </template>
                        </div>
                    </div>
                    <div class="detailList" :class="{ active: currentIndex == 1, empty: programDetail.NewsList == null }">
                        <template v-if="programDetail.NewsList == null">
                            <div class="noArticle">
                                <img class="noArticleImg" src="../assets/nullState.png" alt="">
                                <p class="noArticleDesc">{{ $t("programDetail.noArticle") }}</p>
                            </div>
                        </template>
                        <template v-else>
                            <div class="article" v-for="article in programDetail.NewsList" :key="article.Id">
                                <a class="articleLink" :href="'http://m.traveldaily.cn/article/' + article.Id">{{ article.Title }}</a>
                                <p class="articleSummary">{{ article.Summary }}</p>
                            </div>
                        </template>
                    </div>
                    <div class="detailList" :class="{ active: currentIndex == 2, empty: programDetail.PptList == null && programDetail.PptListEn == null }">
                        <template v-if="programDetail.PptList == null && programDetail.PptListEn == null">
                            <div class="noPPT">
                                <img class="noPPTImg" src="../assets/nullState.png" alt="">
                                <p class="noPPTDesc">{{ $t("programDetail.noPPT") }}</p>
                            </div>
                        </template>
                        <template v-else>
                            <div class="pptList zhPPT">
                                <div class="pptBlock" v-for="(pptzh, index) in programDetail.PptList" :key="index">
                                    <img class="pptImg" :src="pptzh">
                                </div>
                            </div>
                            <div class="pptList enPPT">
                                <div class="pptBlock" v-for="(ppten, index) in programDetail.PptListEn" :key="index">                                    
                                    <img class="pptImg" :src="ppten">
                                </div>
                            </div>
                        </template>
                    </div>
                    
                </div>
                <button class="subscribeBtn" v-if="!programDetail.IsSubscribed" :disabled="isSubscribed" @click="subscribe">{{ $t("programDetail.subscribeBtn[" + subscribeIndex + "]") }}</button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar";
export default {
    name: "ProgramDetail",
    data: function() {
        return {
            programId: this.$route.query.programId,
            backUrl: "/",
            currentIndex: 0,
            // pptIndex: 1,
            subscribeIndex: 0,
            isSubscribed: false
        }
    },
    components: {
        NavBar
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].programDetail.navBarTitle
        },
        tabs: function() {
            return this.$i18n.messages[this.lang].programDetail.tabs
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            programDetail: state => state.ProgramDetail
        })
    },
    methods: {
        ...mapActions([
            "getProgramDetail"
        ]),
        subscribe: function() {
            this.isSubscribed = true;
            this.$http.post("http://192.168.1.21:89/Program/ProgramSubscribe", {
                programId: this.programId,
                token: this.token,
                lang: this.lang == "zh" ? 1 : 2
            }).then(res => {
                console.log(res)
                if(res.data.Code == 0) {
                    this.subscribeIndex = 1;
                } else {
                    this.isSubscribed = false;
                    alert(res.data.Message)
                }
            }).catch(err => {
                this.isSubscribed = false;
                this.subscribeIndex = 0;
                alert(err);
            })
            
            
            console.log("订阅开始提醒")
        }
    },
    created: function() {
        this.getProgramDetail({ eventNo: this.eventNo, id: this.programId, token: this.token, lang: this.lang == "zh" ? 1 : 2 });
    }
}
</script>
<style>
.programdDetail {
    position: relative;
    width: 100%;
    height: 100%;
}
.programDetailBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0 0;
}
.detailBanner {
    height: 4.2rem;
}
.afterVideo {
    display: block;
    width: 100%;
    height: auto;
}
.detailBannerBox {
    position: relative;
    height: 100%;
    background: url(../assets/detailBanner.jpg) center center no-repeat;
}
.detailBannerBox::before {
    content: "";
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.65);
}
.detailBannerContent {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: 0 0.3rem;
    color: #fff;
}
.detailBannerTitle {
    margin-bottom: 0.4rem;
    font-size: 0.32rem;
    font-weight: normal;
    text-align: center;
}
.detailTime {
    margin-bottom: 0.4rem;
    font-size: 0.28rem;
}
.detailBannerTip {
    font-size: 0.24rem;
}
.detailWrapper {
    position: relative;
    height: calc(100% - 4.2rem);
}
.detailTabs {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 0.8rem;
    background-color: #fff;
}
.detailTab {
    padding: 0 0.2rem;
    font-size: 0.28rem;
    line-height: 0.76rem;
    border-bottom: 0.04rem solid transparent;
}
.detailTab.active {
    color: var(--themeColor);
    border-bottom-color: var(--themeColor);
}
.detailContent {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.detailList {
    display: none;
    width: 95%;
    margin: 0 auto;
}
.detailList.active {
    display: block;
}
.detailList.empty {
    height: 100%;
}
.detailIntro {
    margin-bottom: 0.2rem;
    padding: 0.4rem 0.2rem;
    font-size: 0.28rem;
    background-color: #fff;
}
.detailIntro p:not(:last-child) {
    margin-bottom: 0.2rem;
}
.detailSpeakerList {
    margin-bottom: 0.2rem;
    padding: 0.4rem 0.2rem;
    font-size: 0.28rem;
    background-color: #fff;
}
/* .speakerType {
    font-size: 0.28rem;
} */
.detailSpeaker {
    margin-bottom: 0.2rem;
    font-size: 0;
}
.detailSpeakerAvatar, .detailSpeakerInfo {
    display: inline-block;
    vertical-align: middle;
}
.detailSpeakerAvatar {
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
    border-radius: 100%;
    overflow: hidden;
}
.detailSpeakerPhoto {
	width: 100%;
}
.detailSpeakerInfo {
    width: calc(100% - 1.2rem);
	font-size: 0.28rem;
}
.detailSpeakerName, .detailSpeakerCompany, .detailSpeakerJob {
    font-size: 0.28rem;
    line-height: 0.4rem;
	color: #2c3e50;
}
.noArticle, .noPPT {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.noArticleImg, .noPPTImg {
    width: 2rem;
}
.noArticleDesc, .noPPTDesc {
    margin-top: 0.2rem;
    font-size: 0.24rem;
    color: #666666;
}
.article {
    margin-bottom: 0.2rem;
    padding: 0.4rem 0.2rem;
    background-color: #fff;
}
.article:last-child {
    margin-bottom: 0;
}
.articleLink {
    font-size: 0.28rem;
    font-weight: bold;
    color: #2c3e50;
}
.articleSummary {
    margin-top: 0.1rem;
    font-size: 0.28rem;
}
.pptBlock {
    margin-bottom: 0.2rem;
    padding: 0.4rem 0.2rem;
    background-color: #fff;
}
.pptImg {
    max-width: 100%;
    height: auto;
}
.subscribeBtn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.8rem;
    font-size: 0.28rem;
    line-height: 0.8rem;
    text-align: center;
    background-color: var(--themeColor);
    color: #fff;
}
</style>

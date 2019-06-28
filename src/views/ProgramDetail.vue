<template>
    <div class="programdDetail">
        <NavBar :showSearch="false" :backUrl="'/'" :navBarTitle="navBarTitle"></NavBar>
        <div class="programDetailBox">
            <div class="detailBanner">
                <video class="afterVideo" v-if="programDetail.IsEnd" controls :src="programDetail.Video[0]"></video>
                <div class="detailBannerBox" v-else>
                    <div class="detailBannerContent">
                        <h3 class="detailBannerTitle">{{ programDetail.Topic }}</h3>
                        <p class="detailTime">{{ programDetail.LocalTime }}</p>
                        <p class="detailBannerTip">会后视频将发布在此，请保持关注</p>
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
                                <p v-if="speaker.DataType != programDetail.Details[0].DataType || idx == 0" :key="idx" class="speakerType">{{ speaker.DataType.Title }}</p>
                                <router-link class="detailSpeaker" v-bind:to="'/speaker?id=' + speaker.Speaker.Id" v-bind:key="speaker.Speaker.Id">
                                    <span class="detailSpeakerAvatar">
                                        <img class="detailSpeakerPhoto" v-bind:src="speaker.Speaker.Photo" alt="">
                                    </span>
                                    <span class="detailSpeakerName">{{ speaker.Speaker.Company }} {{ speaker.Speaker.JobTitle }} {{ speaker.Speaker.Name }}</span>
                                </router-link>
                            </template>
                        </div>
                    </div>
                    <div class="detailList" :class="{ active: currentIndex == 1 }">
                        222
                    </div>
                    <div class="detailList" :class="{ active: currentIndex == 2 }">
                        333
                    </div>
                </div>
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
            currentIndex: 0
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
        ])
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
    color: #fff;
}
.detailBannerTitle {
    margin-bottom: 0.4rem;
    font-size: 0.4rem;
    font-weight: normal;
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
.detailSpeakerAvatar, .detailSpeakerName {
    display: inline-block;
    vertical-align: middle;
}
.detailSpeakerAvatar {
    width: 0.6rem;
    overflow: hidden;
}
.detailSpeakerPhoto {
	width: 100%;
}
.detailSpeakerName {
    width: calc(100% - 0.9rem);
	margin-left: 0.3rem;
	font-size: 0.28rem;
	color: #2c3e50;
}
</style>

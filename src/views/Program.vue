<template>
    <div class="program">
        <div class="programTabs">
            <div class="programTabsWrapper" ref="tabWrapper">
                <div v-for="(tab, tabIndex) in tabs" :key="tabIndex" class="programTab" :class="{ active: currentIndex == tabIndex, en: lang == 'en' }" @click="switchProgram(tabIndex)">
                    <span class="programTabTime">{{ tab.time }}</span>
                    <span class="programTabName">{{ tab.name }}</span>
                </div>
            </div>
            <div class="rightTip" @click="showAllTab"></div>
        </div>
        <div class="programBox" ref="programBox">
            <!-- <div class="programList" :class="{ active: currentIndex == 0 }">
                <div class="container">
                    <div class="programItem programItemSite">{{ lang == 'zh' ? '会场：上海国际会议中心7楼 【明珠厅】' : 'Venue: Pearl Hall, 7th Floor, Shanghai International Convention Center' }}</div>
                    <div class="programItem">
                        <div class="programItemDesc">
                            <p class="programItemDescText">{{ $t("program.awardDesc1") }}</p>
                        </div>
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">{{ $t("program.awardFlowTime1") }}</p>
                            <p class="programItemType" :class="{ en: lang == 'en' }">{{ $t("program.awardFlowTime1Desc") }}</p>
                        </div>
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">{{ $t("program.awardFlowTime2") }}</p>
                            <p class="programItemType" :class="{ en: lang == 'en' }">{{ $t("program.awardFlowTime2Desc") }}</p>
                        </div>
                        <div class="programItemBody">
                            <div class="programItemSpeakerList">
                                <p class="speakerType">{{ $t("program.awardFlowSpeakerType1") }}</p>
                                <div class="programItemSpeaker">
                                    <span class="programItemSpeakerName">{{ $t("program.awardFlowTime2Speaker1") }}</span>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">{{ $t("program.awardFlowTime3") }}</p>
                            <p class="programItemType" :class="{ en: lang == 'en' }">{{ $t("program.awardFlowTime3Desc") }}</p>
                        </div> 
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">{{ $t("program.awardFlowTime4") }}</p>
                            <p class="programItemType" :class="{ en: lang == 'en' }">{{ $t("program.awardFlowTime4Desc") }}</p>
                        </div> 
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">{{ $t("program.awardFlowTime5") }}</p>
                            <p class="programItemType" :class="{ en: lang == 'en' }">{{ $t("program.awardFlowTime5Desc") }}</p>
                        </div> 
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">{{ $t("program.awardFlowTime6") }}</p>
                            <p class="programItemType" :class="{ en: lang == 'en' }">{{ $t("program.awardFlowTime6Desc") }}</p>
                        </div>
                        <div class="programItemBody">
                            <div class="programItemSpeakerList">
                                <p class="speakerType">{{ $t("program.awardFlowSpeakerType1") }}</p>
                                <div class="programItemSpeaker">
                                    <span class="programItemSpeakerName">{{ $t("program.awardFlowTime6Speaker1") }}</span>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">{{ $t("program.awardFlowTime7") }}</p>
                            <p class="programItemType" :class="{ en: lang == 'en' }">{{ $t("program.awardFlowTime7Desc") }}</p>
                        </div> 
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">{{ $t("program.awardFlowTime8") }}</p>
                            <p class="programItemType" :class="{ en: lang == 'en' }">{{ $t("program.awardFlowTime8Desc") }}</p>
                        </div> 
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">{{ $t("program.awardFlowTime9") }}</p>
                            <p class="programItemType" :class="{ en: lang == 'en' }">{{ $t("program.awardFlowTime9Desc") }}</p>
                            <p class="programItemTitle">{{ $t("program.awardFlowTime9Title") }}</p>
                        </div>
                        <div class="programItemBody">
                            <div class="programItemDesc">
                                <p class="programItemDescText">{{ $t("program.awardFlowTime9Summary") }}</p>
                            </div>
                            <div class="programItemSpeakerList">
                                <p class="speakerType" style="margin-top: 0.2rem;">{{ $t("program.awardFlowSpeakerType2") }}</p>
                                <div class="programItemSpeaker">
                                    <span class="programItemSpeakerName">{{ $t("program.awardFlowTime9Speaker1") }}</span>
                                </div>
                                <div class="programItemSpeaker">
                                    <span class="programItemSpeakerName">{{ $t("program.awardFlowTime9Speaker2") }}</span>
                                </div>
                                <div class="programItemSpeaker">
                                    <span class="programItemSpeakerName">{{ $t("program.awardFlowTime9Speaker3") }}</span>
                                </div>
                                <div class="programItemSpeaker">
                                    <span class="programItemSpeakerName">{{ $t("program.awardFlowTime9Speaker4") }}</span>
                                </div>
                                <p class="speakerType">{{ $t("program.awardFlowSpeakerType3") }}</p>
                                <div class="programItemSpeaker">
                                    <span class="programItemSpeakerName">{{ $t("program.awardFlowTime9Speaker5") }}</span>
                                </div>
                            </div>
                        </div>  
                    </div>
                    <div class="programItem">
                        <div class="programItemDesc">
                            <p class="programItemDescText">{{ $t("program.awardNote1") }}</p>
                            <p class="programItemDescText">{{ $t("program.awardNote2") }}</p>
                        </div>
                    </div>
                </div>
            </div> -->
            <template v-for="(prgList, index) in programList">
                <div class="programList" :key="index" :class="{ active: currentIndex == index }">
                    <div class="container">
                        <div class="programItem programItemSite">
                            <template v-if="lang == 'zh'">
                                {{ index == 0 ? "会场：上海国际会议中心7楼 【明珠厅】" : "会场：上海国际会议中心7楼 【上海厅】" }}
                            </template>
                            <template v-else>
                                {{ index == 0 ? "Venue: Pearl Hall, 7th Floor, Shanghai International Convention Center" : "Venue: the 7th floor of the Shanghai International Convention Center" }}
                            </template>
                        </div>
                        <div class="programItem" v-if="index == 0">
                            <div class="programItemDesc">
                                <p class="programItemDescText">{{ $t("program.awardDesc1") }}</p>
                            </div>
                        </div>
                        <template v-for="prg in prgList">
                            <div class="programItem" :key="prg.Id">
                                <div class="programItemHead">
                                    <p class="programItemTime">
                                        {{ $pattern(prg.Begin, "HH:mm") }} - {{ $pattern(prg.End, "HH:mm") }}
                                    </p>
                                    <p class="programItemType">
                                        {{ prg.TypeName }}
                                    </p>
                                    <router-link v-if="prg.Topic != ''" class="programItemTitle" :to="`/programdetail?programId=${prg.Id}`">
                                        {{ prg.Topic }}
                                    </router-link>
                                </div>
                                <template v-if="prg.Details.length != 0">
                                    <div class="programItemBody">
                                        <div class="programItemSpeakerList">
                                            <template v-for="(detail, didx) in prg.Details">
                                                <p v-if="detail.DataType != prg.Details[0].DataType || didx == 0" :key="didx" class="speakerType">
                                                    {{ detail.DataType }}
                                                </p>
                                                <router-link class="programItemSpeaker" v-if="detail.Speaker.SocialId > 0" :to="`/guest?guestId=${detail.Speaker.SocialId}`" :key="detail.Speaker.SocialId">
                                                    <span class="programItemSpeakerAvatar">
                                                        <img class="programItemSpeakerPhoto" :src="detail.Speaker.Photo" />
                                                    </span>
                                                    <span class="programItemSpeakerName">
                                                        {{ detail.Speaker.Company }} {{ detail.Speaker.JobTitle }} {{ detail.Speaker.Name }}
                                                    </span>
                                                </router-link>
                                                <router-link v-else class="programItemSpeaker" :to="`/speaker?speakerId=${detail.Speaker.Id}`" :key="detail.Speaker.Id">
                                                    <span class="programItemSpeakerAvatar">
                                                        <img class="programItemSpeakerPhoto" :src="detail.Speaker.Photo"/>
                                                    </span>
                                                    <span class="programItemSpeakerName">
                                                        {{ detail.Speaker.Company }} {{ detail.Speaker.JobTitle }} {{ detail.Speaker.Name }}
                                                    </span>
                                                </router-link>
                                            </template>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </template>
                        <div class="programItem" v-if="index == 0">
                            <div class="programItemDesc">
                                <p class="programItemDescText">{{ $t("program.awardNote1") }}</p>
                                <p class="programItemDescText">{{ $t("program.awardNote2") }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "Program",
    data: function() {
        return {
            isCurrent: true,
            // currentIndex: (localStorage.getItem("programTabIndex") == null ? 1 : localStorage.getItem("programTabIndex")),
            currentIndex: 1,
            timer: null
        };
    },
    computed: {
        tabs: function() {
            return this.$i18n.messages[this.lang].program.tabs;
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            programList: state => state.ProgramList
        })
    },
    methods: {
        // 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
        // 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
        ...mapActions({
            initProgram: "getProgramList"
        }),
        showAllTab: function() {
            this.$refs.tabWrapper.scrollLeft = 9999;
        },
        switchProgram: function(tabIndex) {
            this.currentIndex = tabIndex;
            this.$refs.programBox.scrollTop = 0;
            // localStorage.setItem("programTabIndex", tabIndex);
        }
    },
    created: function() {
        let language = this.lang == "zh" ? 1 : 2;
        if (this.programList.length == 0) {
            this.initProgram({
                eventNo: this.eventNo,
                token: this.token,
                lang: language
            });
        }
    }
};
</script>
<style>
.program {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
}
.programTabs {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    height: 1rem;
    padding: 0 0.4rem 0 0.2rem;
    background-color: #fff;
    z-index: 100;
}
.programTabsWrapper {
    font-size: 0;
    white-space: nowrap;
    overflow: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
}
.programTabsWrapper::-webkit-scrollbar {
    display: none;
}
.rightTip {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    display: block;
    width: 0.4rem;
    height: 1rem;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: -0.2rem 0 0.4rem #ccc;
    z-index: 900;
}
.rightTip::before {
    position: absolute;
    top: 0.4rem;
    right: 0.15rem;
    content: "";
    display: block;
    width: 0.2rem;
    height: 0.2rem;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
    transform: rotate(45deg);
    z-index: 1000;
}
.programTab {
    box-sizing: border-box;
    display: inline-block;
    width: calc((100% - 0.4rem) / 3.2);
    height: 1rem;
    margin-right: 0.2rem;
    font-size: 0.28rem;
    text-align: center;
}
.programTab.en {
    padding: 0 0.1rem;
}
.programTab:last-child {
    margin-right: 0;
}
@media screen and (max-width: 750px) {
    .programTab {
        width: calc((100% - 0.4rem) / 3.2);
    }
    .programTab.en {
        width: auto;
    }
}
.programTabTime,
.programTabName {
    display: block;
}
.programTabTime {
    margin-top: 0.1rem;
    line-height: 0.4rem;
}
.programTabName {
    line-height: 0.4rem;
}
.programTab.active {
    color: var(--themeColor);
}
.programBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 1.2rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.programList {
    display: none;
}
.programList.active {
    display: block;
}
.programList > .container {
    width: 95%;
    margin: 0 auto;
}
.programItem {
    box-sizing: border-box;
    margin-bottom: 0.2rem;
    padding: 0.4rem 0.2rem;
    font-size: 0.28rem;
    line-height: 0.4rem;
    background-color: #fff;
}
.programItemTime,
.programItemType {
    display: inline-block;
}
.programItemType {
    margin-left: 0.4rem;
}
.programItemType.en {
    display: block;
    margin-left: 0;
}
.programItemTitle {
    margin-top: 0.2rem;
    font-size: 0.32rem;
    line-height: 0.4rem;
    color: var(--themeColor);
}
.programItemDesc {
    overflow: hidden;
}
.programItemDescText:not(:last-child) {
    margin-bottom: 0.4rem;
}
.awardFlowItem:not(:last-child) {
    margin-bottom: 0.3rem;
}
.awardFlowLabel,
.awardFlowItemDesc {
    display: inline-block;
    vertical-align: top;
}
.awardFlowLabel {
    width: 3rem;
    margin-right: 0.2rem;
}
.awardFlowItemDesc {
    width: calc(100% - 3.2rem);
}
.programItemBody {
    margin-top: 0.2rem;
}
.speakerType {
    margin-bottom: 0.2rem;
    font-size: 0.24rem;
}
.programItemSpeaker {
    margin-bottom: 0.2rem;
    font-size: 0;
}
.programItemSpeakerAvatar,
.programItemSpeakerName {
    display: inline-block;
    vertical-align: middle;
}
.programItemSpeakerAvatar {
    width: 0.6rem;
    overflow: hidden;
}
.programItemSpeakerPhoto {
    width: 100%;
}
.programItemSpeakerName {
    width: calc(100% - 0.9rem);
    margin-left: 0.3rem;
    font-size: 0.28rem;
    color: #2c3e50;
}
div.programItemSpeaker .programItemSpeakerName {
    width: 100%;
    margin-left: 0;
}
</style>

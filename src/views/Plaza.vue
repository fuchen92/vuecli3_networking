<template>
    <div class="plaza">
        <div class="plazaTabs">
            <div v-for="(tab, index) in tabs" v-bind:key="index" class="plazaTab" v-bind:class="{ active: currentIndex == index }" v-on:click="currentIndex = index">
                <span class="plazaTab">{{ tab.name }}</span>
            </div>
        </div>
        <div class="plazaBox">
            <div class="plazaList" v-bind:class="{ active: currentIndex == 0 }">
                <div class="container">
                    <router-link v-for="exhibitor in exhibitorList" class="exhibitorLink" v-bind:key="exhibitor.Id" v-bind:to="'/exhibitor?id=' + exhibitor.Id">
                        <div class="exhibitorAvatar">
                            <img class="exhibitorLogo" :src="exhibitor.Photo" alt="">
                            <p class="exhibitorBooth">
                                <img class="exhibitorBoothImg" src="../assets/iconBooth.svg" alt="">
                                <span class="exhibitorBoothText">{{ exhibitor.Booth }}</span>
                            </p>
                        </div>
                        <div class="exhibitorInfo">
                            <h4 class="exhibitorName">{{ exhibitor.Name }}</h4>
                            <div class="exhibitorTags">
                                <span class="exhibitorTag" v-for="(industry, index) in exhibitor.Industry" :key="index">{{ industry.Name }}</span>
                            </div>
                            <p class="exhibitorSlogan" v-if="exhibitor.Intro2 != ''">{{ exhibitor.Intro2 }}</p>
                            <div class="interestList" v-if="exhibitor.AttendeesPhoto != null">
                                <template v-for="(attend, index) in exhibitor.AttendeesPhoto">
                                    <template v-if="index < 3">
                                        <img class="interestPeople" :src="attend[index]" :key="index" alt="">
                                    </template>
                                </template>
                                <span class="interestSummary">
                                    <!-- {{ $tc("plaza.attendExpected", {count: 5}) }} -->
                                    {{ $tc("plaza.attendExpected", exhibitor.AttendeesPhoto.length) }}
                                    <!-- 等{{ exhibitor.AttendeesPhoto.length }}人出席 -->
                                </span>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="plazaList supplyList" v-bind:class="{ active: currentIndex == 1, empty: supplyList.length == 0 }">
                <div class="container">
                    <div class="emptyList" v-if="supplyList.length == 0">
                        <img class="emptyListImg" src="../assets/nullState.png" alt="">
                        <p class="emptyListDesc">{{ $t("plaza.emptySupplyDesc") }}</p>
                    </div>
                </div>
            </div>
            <div class="plazaList requirementList" v-bind:class="{ active: currentIndex == 2, empty: requirementList.length == 0 }">
                <div class="container">
                    <div class="emptyList" v-if="requirementList.length == 0">
                        <img class="emptyListImg" src="../assets/nullState.png" alt="">
                        <p class="emptyListDesc">{{ $t("plaza.emptyRequirementDesc") }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="publishTabs">
            <router-link class="publishTab" to="/publish?type=1">
                <img class="publishTabIcon" src="../assets/publishSupply.svg" alt="">
                <span class="publishTabText">
                    {{ $t("plaza.publishTab") }}
                </span>
            </router-link>
            <b class="publishTabDivide"></b>
            <router-link class="publishTab" to="/publish?type=2">
                <img class="publishTabIcon" src="../assets/publishRequirement.svg" alt="">
                <span class="publishTabText">
                    {{ $t("plaza.requirementTab") }}
                </span>
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "Plaza",
    data: function() {
        return {
            currentIndex: 0,
            supplyList: [],
            requirementList: []
        }
    },
    computed: {
        tabs: function() {
            return this.$i18n.messages[this.lang].plaza.tabs
            // return this.$i18n.messages[this.$store.state.Lang].program.tabs
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            exhibitorList: state => state.ExhibitorList
        })
    },
    methods: {
        ...mapActions([
            "getExhibitorList"
        ])
    },
    created: function() {
        this.getExhibitorList({ eventNo: this.eventNo, index: 1, size: -1, token: this.token, lang: this.lang == "zh" ? 1 : 2});
    }
}
</script>
<style>
.plaza {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
}
.plazaTabs {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 0.8rem;
    background-color: #fff;
}
.plazaTab {
    padding: 0 0.2rem;
    font-size: 0.28rem;
    line-height: 0.76rem;
    border-bottom: 0.04rem solid transparent;
}
.plazaTab.active {
    color: var(--themeColor);
    border-bottom-color: var(--themeColor);
}
.plazaBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0 1.9rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.plazaList {
    display: none;
}
.plazaList.active {
    display: block;
    width: 100%;
}
.plazaList > .container {
    width: 95%;
}
.exhibitorLink {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 0.2rem;
    padding: 0.4rem 0.2rem;
    font-size: 0;
    background-color: #fff;
}
.exhibitorLink:last-child {
    margin-bottom: 0;
}
.exhibitorAvatar, .exhibitorInfo {
    display: inline-block;
    vertical-align: top;
}
.exhibitorAvatar {
    width: 1.6rem;
    margin-right: 0.2rem;
}
.exhibitorLogo {
    width: 100%;
}
.exhibitorBooth {
    margin-top: 0.2rem;
    text-align: center;
}
.exhibitorBoothImg, .exhibitorBoothText {
    display: inline-block;
    vertical-align: middle;
}
.exhibitorBoothImg {
    width: 0.3rem;
    margin-right: 0.1rem;
}
.exhibitorBoothText {
    font-size: 0.24rem;
    color: #777;
}
.exhibitorInfo {
    width: calc(100% - 1.8rem);
}
.exhibitorName {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: var(--themeColor);
}
.exhibitorTags {
    margin: 0.15rem 0 0;
    font-size: 0;
    overflow: hidden;
}
.exhibitorTag {
    display: inline-block;
    margin: 0 0.1rem 0.1rem 0;
    padding: 0.04rem 0.2rem;
    font-size: 0.24rem;
    line-height: 0.3rem;
    background-color: #f0f1f2;
    border-radius: 0.4rem;
    color: var(--themeColor);
}
.exhibitorSlogan {
    font-size: 0.24rem;
    line-height: 0.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.interestList {
    margin-top: 0.1rem;
}
.interestPeople, .interestSummary {
    display: inline-block;
    vertical-align: middle;
}
.interestPeople {
    width: 0.5rem;
    margin-right: 0.1rem;
    border-radius: 100%;
}
.interestSummary {
    width: calc(100% - 1.8rem);
    font-size: 0.24rem;
    color: #777;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.supplyList.empty,
.supplyList.empty > .container,
.requirementList.empty,
.requirementList.empty > .container {
    width: 100%;
    height: 100%;
}
.emptyList {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.emptyListImg {
    width: 4rem;
    margin: 0 auto 0.2rem;
}
.emptyListDesc {
    font-size: 0.24rem;
    text-align: center;
    color: #666666;
}
.publishTabs {
    position: absolute;
    left: 50%;
    bottom: 1.4rem;
    width: 6.4rem;
    height: 1rem;
    font-size: 0;
    transform: translateX(-50%);
    background-color: var(--themeColor);
    border-radius: 0.5rem;
}
.publishTab, .publishTabDivide {
    display: inline-block;
    vertical-align: middle;
}
.publishTabDivide {
    width: 0.02rem;
    height: 0.4rem;
    background-color: #fff
}
.publishTab {
    width: 3.19rem;
    font-size: 0;
    line-height: 1rem;
    text-align: center;
    color: #fff;
}
.publishTabIcon, .publishTabText {
    display: inline-block;
    vertical-align: middle;
}
.publishTabIcon {
    width: 0.32rem;
    margin-right: 0.2rem;
}
.publishTabText {
    font-size: 0.28rem;
}
</style>

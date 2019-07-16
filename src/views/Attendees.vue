<template>
    <div class="attendees">
        <div class="attendTabs">
            <div v-for="(tab, index) in tabs" v-bind:key="index" class="attendTab" v-bind:class="{ active: currentIndex == index }" v-on:click="currentIndex = index">
                {{ tab.name }}
            </div>
        </div>
        <div class="reRecommend clear" v-show="(currentIndex == 0 && (recommends != null) && showTopRecommend)">
        <!-- <div class="reRecommend clear" v-show="showRecommendBar"> -->
            <p class="reRecommendText lt">{{ $t("attendees.notFind") }}</p>
            <span class="closeReRecommend rt" @click="hideRecommendBar"></span>
            <button class="reRecommendBtn rt" @click="showFilter = true">{{ $t("attendees.reRecommend") }}</button>
        </div>
        <div class="attendBox">
            <div class="attendWrapper" v-bind:class="{ active: currentIndex == 0, empty: recommends == null }">
                <div class="emptyList" v-if="recommends == null">
                    <img class="emptyListImg" src="../assets/nullState.png" alt="">
                    <p class="emptyListDesc">{{ $t("attendees.emptyListDesc") }}</p>
                    <button class="openFilter" @click="openFilter">{{ $t("attendees.openFilter") }}</button>
                </div>
                <div class="recommendList" v-else :class="{ hasRecommendBar: showTopRecommend }">
                    <GuestCard v-for="(guest, index) in recommends" :key="index" :guest="guest"></GuestCard>
                </div>
            </div>
            <div class="attendWrapper" :class="{ active: currentIndex == 1 }">
                <div class="attendsList">
                    <GuestCard v-for="(guest, index) in attends" :key="index" :guest="guest"></GuestCard>
                </div>
            </div>
        </div>
        <div class="filterPanel" v-show="showFilter">
            <form class="filterForm" @submit.prevent="submitFilter" @reset="reset">
                <div class="filterBox">
                    <template v-for="(category, index) in filterMenu">
                        <template v-if="category.Id > 100">
                            <template v-for="(industry, industryIndex) in category.Value">
                                <div class="filterCard" :key="industryIndex">
                                    <p class="filterCardCaption">
                                        {{ industry.Name }}
                                        <span class="filterCaptionTip">（{{ $t("attendees.multiTip") }}）</span>
                                    </p>
                                    <div class="filterTags">
                                        <label class="filterLabel" v-for="(tag, tagidx) in industry.Value" :key="tagidx" :value="tag.Id">
                                            <input class="filterCheckBox" type="checkbox" :value="tag.Id" v-model="industryArr">
                                            <i class="filterTag">{{ tag.Name }}</i>
                                        </label>
                                    </div>
                                </div>                
                            </template>
                        </template>
                        <template v-else>
                            <div class="filterCard" :key="index">
                                <p class="filterCardCaption">
                                    {{ category.Name }}
                                    <span class="filterCaptionTip">（{{ $t("attendees.multiTip") }}）</span>
                                </p>
                                <div class="filterTags">
                                    <label class="filterLabel" v-for="(tag, tagidx) in category.Value" :key="tagidx" :value="tag.Id">
                                        <template v-if="index == 1">
                                            <input class="filterCheckBox" type="checkbox" :value="tag.Id" v-model="functionArr">
                                        </template>
                                        <template v-else-if="index == 2">
                                            <input class="filterCheckBox" type="checkbox" :value="tag.Id" v-model="identityArr">
                                        </template>
                                        <i class="filterTag">{{ tag.Name }}</i>
                                    </label>
                                </div>
                            </div> 
                        </template>
                    </template>       
                </div>
                <div class="filterBtns">
                    <button class="filterBtn" type="reset">{{ $t("attendees.resetBtn") }}</button>
                    <button class="filterBtn submitFilterBtn" type="submit">{{ $t("attendees.submit") }}</button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import GuestCard from "@/components/GuestCard";
export default {
    name: "Attendees",
    data: function() {
        var filterObj = JSON.parse(localStorage.getItem("filter"));
        return {
            currentIndex: 1,
            industryArr: filterObj != null ? filterObj.filter1 : [],
            functionArr: filterObj != null ? filterObj.filter2 : [],
            identityArr: filterObj != null ? filterObj.filter3 : [],
            showFilter: false,
            showTopRecommend: localStorage.getItem("showTopRecommend") != null ? localStorage.getItem("showTopRecommend") : true,
        }
    },
    components: {
        GuestCard
    },
    computed: {
        tabs: function() {
            return this.$i18n.messages[this.lang].attendees.tabs
        },
        showRecommendBar: function() {
            return (this.currentIndex == 0 && this.recommends != null && this.showTopRecommend == true);
            // return true;
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            filterMenu: state => state.FilterMenu,
            attends: state => state.AttendsList,
            recommends: state => state.RecommendList
        })
    },
    methods: {
        ...mapActions([
            "getAttendsFilter",
            "getAttendsList",
            "getRecommendList"
        ]),
        openFilter: function() {
            this.showFilter = true;
        },
        reset: function() {
            this.industryArr.length = 0;
            this.functionArr.length = 0;
            this.identityArr.length = 0;
        },
        hideRecommendBar: function() {
            this.showTopRecommend = false;
            localStorage.setItem("showTopRecommend", false);
        },
        submitFilter: function() {
            if(this.industryArr.length == 0 && this.functionArr.length == 0 && this.identityArr.length == 0) {
                alert("请选中任意筛选项");
                return false;
            }
            var filterObj = {
                eventNo: this.eventNo,
                keyword: "",
                filter1: this.industryArr,
                index: 1,
                size: -1,
                filter2: this.functionArr,
                filter3: this.identityArr,
                token: this.token,
                lang: this.lang == "zh" ? 1 : 2
            }
            localStorage.setItem("filter", JSON.stringify(filterObj));
            this.getRecommendList({
                eventNo: this.eventNo,
                keyword: "",
                filter1: this.industryArr.join(","),
                index: 1,
                size: 9999,
                filter2: this.functionArr.join(","),
                filter3: this.identityArr.join(","),
                token: this.token,
                lang: this.lang == "zh" ? 1 : 2
            });
            this.showFilter = false;
        }
    },
    created: function() {
        console.log("created")
        this.getRecommendList({
            eventNo: this.eventNo,
            keyword: "",
            filter1: this.industryArr.join(","),
            index: 1,
            size: -1,
            filter2: this.functionArr.join(","),
            filter3: this.identityArr.join(","),
            token: this.token,
            lang: this.lang == "zh" ? 1 : 2
        })
        this.getAttendsList({ eventNo: this.eventNo, index: 1, size: -1, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
        this.getAttendsFilter({ eventNo: this.eventNo, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
    },
    activated: function() {
        console.log("keep-alive activated生命周期")
    }
}
</script>
<style>
.attendees {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
}
.attendTabs {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 0.8rem;
    background-color: #fff;
    z-index: 100;
}
.attendTab {
    padding: 0 0.2rem;
    font-size: 0.28rem;
    line-height: 0.76rem;
    border-bottom: 0.04rem solid transparent;
}
.attendTab.active {
    color: var(--themeColor);
    border-bottom-color: var(--themeColor);
}
.reRecommend {
    box-sizing: border-box;
    position: absolute;
    top: 1.8rem;
    left: 0;
    width: 100%;
    height: 0.8rem;
    padding: 0 2.5%;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 100;
}
.closeReRecommend {
    width: 0.4rem;
    height: 0.4rem;
    margin: 0.2rem 0.1rem 0 0.3rem;
    border-radius: 100%;
    background: url(../assets/iconCloseBlack.svg) #ffffff center center/0.3rem auto no-repeat;
}
.reRecommendText {
    font-size: 0.24rem;
    line-height: 0.8rem;
    color: #fff;
}
.reRecommendBtn {
    width: 2rem;
    height: 0.5rem;
    margin: 0.15rem 0 0;
    font-size: 0.24rem;
    line-height: 0.5rem;
    text-align: center;
    border-radius: 0.4rem;
    background-color: var(--themeColor);
    color: #fff;
}
.attendBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0 0.2rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.attendWrapper {
    display: none;
    width: 100%;
}
.attendWrapper.active {
    display: block;
}
.attendWrapper.empty {
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
.recommendList.hasRecommendBar {
    padding-top: 0.8rem;
}
.openFilter {
    margin-top: 0.2rem;
    padding: 0 0.8rem;
    font-size: 0.24rem;
    line-height: 0.8rem;
    background-color: var(--themeColor);
    border-radius: 0.4rem;
    color: #fff;
}
.filterPanel {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    background-color: #f0f1f2;
    z-index: 100;
}
.filterForm {
    position: relative;
    width: 100%;
    height: 100%;
}
.filterBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0.2rem 0 1.2rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.filterCard {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto 0.2rem;
    padding: 0.2rem;
    background-color: #fff;
}
.filterCard:last-child {
    margin-bottom: 0;
}
.filterCardCaption {
    padding-bottom: 0.1rem;
    font-size: 0.28rem;
    border-bottom: 0.02rem solid #f0f1f2;
}
.filterCaptionTip {
    font-size: 0.24rem;
}
.filterTags {
    margin-top: 0.2rem;
    font-size: 0;
}
.filterLabel {
    display: inline-block;
    margin: 0 0.3rem 0.2rem 0;
}
.filterCheckBox {
    display: none;
}
.filterTag {
    box-sizing: border-box;
    display: block;
    height: 0.4rem;
    padding: 0 0.2rem;
    font-style: normal;
    font-size: 0.24rem;
    line-height: 0.4rem;
    background-color: #f0f1f2;
    border-radius: 0.4rem;
    color: #666;
}
.filterCheckBox:checked + .filterTag {
    background-color: var(--themeColor);
    color: #ffffff;
}
.filterBtns {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1rem;
    font-size: 0;
}
.filterBtn {
    display: inline-block;
    width: 50%;
    height: 1rem;
    font-size: 0.28rem;
    line-height: 1rem;
    text-align: center;
    background-color: #fff;
    color: #2c3e50;
}
.submitFilterBtn {
    background-color: var(--themeColor);
    color: #ffffff;
}
</style>

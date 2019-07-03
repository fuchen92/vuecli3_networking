<template>
    <div class="attendees">
        <div class="attendTabs">
            <div v-for="(tab, index) in tabs" v-bind:key="index" class="attendTab" v-bind:class="{ active: currentIndex == index }" v-on:click="currentIndex = index">
                {{ tab.name }}
            </div>
        </div>
        <div class="attendBox">
            <div class="attendList recommendList" v-bind:class="{ active: currentIndex == 0, empty: recommendList.length == 0 }">
                <div class="emptyList" v-if="recommendList.length == 0">
                    <img class="emptyListImg" src="../assets/nullState.png" alt="">
                    <p class="emptyListDesc">{{ $t("attendees.emptyListDesc") }}</p>
                    <button class="openFilter" @click="openFilter">{{ $t("attendees.openFilter") }}</button>
                </div>
            </div>
            <div class="attendList" :class="{ active: currentIndex == 1 }">
                <GuestCard v-for="(guest, index) in Attends" :key="index" :guest="guest"></GuestCard>
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
        return {
            currentIndex: 0,
            recommendList: [],
            industryArr: [],
            functionArr: [],
            identityArr: [],
            showFilter: false
        }
    },
    components: {
        GuestCard
    },
    computed: {
        tabs: function() {
            return this.$i18n.messages[this.lang].attendees.tabs
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            filterMenu: state => state.FilterMenu,
            Attends: state => state.AttendsList
        })
    },
    methods: {
        ...mapActions([
            "getAttendsFilter",
            "getAttendsList"
        ]),
        openFilter: function() {
            this.showFilter = true;
        },
        reset: function() {
            this.industryArr.length = 0;
            this.functionArr.length = 0;
            this.identityArr.length = 0;
        },
        submitFilter: function() {
            if(this.industryArr.length == 0 && this.functionArr.length == 0 && this.identityArr.length == 0) {
                alert("请选中任意筛选项");
                return false;
            }
            console.log(this.industryArr)
            console.log(this.functionArr)
            console.log(this.identityArr)
        }
    },
    created: function() {
        this.getAttendsList({ eventNo: this.eventNo, index: 1, size: -1, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
        this.getAttendsFilter({ eventNo: this.eventNo, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
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
.attendBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0 0.2rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.attendList {
    display: none;
    width: 100%;
}
.attendList.active {
    display: block;
}
.recommendList.empty {
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

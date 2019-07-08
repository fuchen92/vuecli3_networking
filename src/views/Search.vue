<template>
    <div class="search">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="searchBox">
            <div class="searchBar">
                <input class="searchInput" type="text" placeholder="搜索参会嘉宾或企业">
                <select class="searchSelect" v-model="category">
                    <option value="1">参会嘉宾</option>
                    <option value="2">现场展商</option>
                </select>
                <button class="openFilterBtn" @click="showFilter = !showFilter">{{ showFilter ? "取消" : "筛选" }}</button>
            </div>
            <div class="searchWrapper">
                <div class="resultBox">
                    <div class="emptyResult" v-if="attends.length == 0">
                        <img class="emptyResultImg" src="../assets/nullState.png" alt="">
                        <p class="emptyResultDesc">请输入关键字或选中任意筛选项</p>
                    </div>
                    <div class="resultList" v-else>
                        <GuestCard v-for="(guest, index) in attends" :key="index" :guest="guest"></GuestCard>
                    </div>
                </div>
                <div class="filterPanel" v-show="showFilter">
                    <form class="filterForm" @submit.prevent="submitFilter" @reset="reset">
                        <div class="filterCategory" v-show="category == 1">
                            <div class="filterCategoryList">
                                <template v-for="(category, index) in attendFilterMenu">
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
                        </div>
                        <div class="filterCategory" v-show="category == 2">
                            <div class="filterCategoryTabs">
                                <div v-for="(filterTab, index) in filterCategory" :key="index" class="filterCategoryTab" :class="{ active: filterTabIndex == index }" @click="filterTabIndex = index">
                                    {{ filterTab }}
                                </div>
                            </div>
                            <div class="filterCategoryList exhibitorCategoryList">
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar";
import GuestCard from "@/components/GuestCard";
import ExhibitorCard from "@/components/ExhibitorCard";
export default {
    name: "Search",
    data: function() {
        return {
            resultList: [],
            showFilter: false,
            industryArr: [],
            functionArr: [],
            identityArr: [],
            category: 1,
            filterCategory: ["行业", "产品/服务"],
            filterTabIndex: 0
        }
    },
    components: {
        NavBar,
        GuestCard,
        ExhibitorCard
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].search.navBarTitle
        },
         ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            attendFilterMenu: state => state.FilterMenu,
            exhibitorFilterMenu: state => state.ExhibitorFilterMenu,
            attends: state => state.AttendsList,
            recommends: state => state.RecommendList
        })
    },
    methods: {
        ...mapActions([
            "getAttendsFilter",
            "getExhibitorFilter"
        ]),
        submitFilter: function() {

        },
        reset: function() {

        }
    },
    created: function() {
        this.getAttendsFilter({ eventNo: this.eventNo, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
        this.getExhibitorFilter({ eventNo: this.eventNo, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
    }
}
</script>
<style scoped>
.search {
    position: relative;
    width: 100%;
    height: 100%;
}
.searchBox {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0 0;
}
.searchBar {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    height: 0.8rem;
    padding: 0.1rem 2.5% 0;
    font-size: 0;
    background-color: #ffffff;
    z-index: 200;
}
.searchInput, .searchSelect, .openFilterBtn {
    display: inline-block;
    vertical-align: middle;
}
.searchInput {
    width: 4rem;
    height: 0.6rem;
    padding: 0 0.2rem 0 0.6rem;
    background: url(../assets/search.png) #f0f1f2 left 0.1rem center/0.4rem auto no-repeat;
    border-radius: 0.04rem;
    border: 0;
}
.searchSelect {
    box-sizing: border-box;
    width: 1.9rem;
    height: 0.6rem;
    margin-right: 0.2rem;
    padding: 0 0.5rem 0 0.2rem;
    background: url(../assets/downArrowWhite32.png) var(--themeColor) right 0.04rem center/0.4rem auto no-repeat;
    color: #fff;
    border: 0;
}
.openFilterBtn {
    width: calc(100% - 6.1rem);
    height: 0.6rem;
    background-color: #fff;
    border: 0.02rem solid #999;
}
.searchWrapper {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0.8rem 0 0;
}
.emptyResult {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.emptyResultImg {
    width: 4rem;
    margin: 0 auto 0.2rem;
}
.emptyResultDesc {
    font-size: 0.24rem;
    text-align: center;
    color: #666666;
}
.resultBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 0.2rem 0 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.filterPanel {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    background-color: #f0f1f2;
    z-index: 100;
}
.filterForm {
    position: relative;
    width: 100%;
    height: 100%;
}
.filterCategory {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 0 1rem;
}
.filterCategoryList {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.filterCategoryTabs {
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
.filterCategoryTab {
    padding: 0 0.2rem;
    font-size: 0.28rem;
    line-height: 0.76rem;
    border-bottom: 0.04rem solid transparent;
}
.filterCategoryTab.active {
    color: var(--themeColor);
    border-bottom-color: var(--themeColor);
}
.exhibitorCategoryList {
    padding-top: 1rem;
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

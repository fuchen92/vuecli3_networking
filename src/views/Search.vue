<template>
    <div class="search">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="searchBox">
            <div class="searchBar">
                <input class="searchInput" type="text" :placeholder="$t('search.searchInput')" v-model.trim="keyWord" @keyup.enter="submitFilter">
                <select class="searchSelect" v-model="identity">
                    <option value="1">
                        {{ $t("search.attendOption") }}
                    </option>
                    <option value="2">
                        {{ $t("search.exhibitorOption") }}
                    </option>
                </select>
                <button class="openFilterBtn" @click="showFilter = !showFilter">
                    {{ showFilter ? $t("search.cancelFilterBtn") : $t("search.openFilterBtn") }}
                </button>
            </div>
            <div class="searchWrapper">
                <div class="resultBox">
                    <div class="emptyResult" v-if="resultList.length == 0">
                        <img class="emptyResultImg" src="../assets/nullState.png" alt="">
                        <p class="emptyResultDesc">
                            {{ $t("search.emptyDesc") }}
                        </p>
                    </div>
                    <div class="resultList" v-else>
                        <template v-if="resultType == 1">
                            <GuestCard v-for="(guest, index) in resultList" :key="index" :guest="guest"></GuestCard>
                        </template>
                        <template v-else-if="resultType == 2">
                            <ExhibitorCard v-for="exhibitor in resultList" :key="exhibitor.Id" :exhibitor="exhibitor"></ExhibitorCard>
                        </template>
                    </div>
                </div>
                <div class="filterPanel" v-show="showFilter">
                    <form class="filterForm" @submit.prevent="submitFilter" @reset="reset">
                        <div class="filterCategory" v-show="identity == 1">
                            <div class="filterCategoryList">
                                <template v-for="(category, index) in attendFilterMenu">
                                    <template v-if="category.Id > 100">
                                        <template v-for="(industry, industryIndex) in category.Value">
                                            <div class="filterCard" :key="industryIndex">
                                                <p class="filterCardCaption">
                                                    {{ industry.Name }}
                                                    <span class="filterCaptionTip">
                                                        （{{ $t("search.multiTip") }}）
                                                    </span>
                                                </p>
                                                <div class="filterTags">
                                                    <label class="filterLabel" v-for="(tag, tagidx) in industry.Value" :key="tagidx" :value="tag.Id">
                                                        <input class="filterCheckBox" type="checkbox" :value="tag.Id" v-model="industryArr">
                                                        <i class="filterTag">
                                                            {{ tag.Name }}
                                                        </i>
                                                    </label>
                                                </div>
                                            </div>                
                                        </template>
                                    </template>
                                    <template v-else>
                                        <div class="filterCard" :key="index">
                                            <p class="filterCardCaption">
                                                {{ category.Name }}
                                                <span class="filterCaptionTip">
                                                    （{{ $t("search.multiTip") }}）
                                                </span>
                                            </p>
                                            <div class="filterTags">
                                                <label class="filterLabel" v-for="(tag, tagidx) in category.Value" :key="tagidx" :value="tag.Id">
                                                    <template v-if="index == 1">
                                                        <input class="filterCheckBox" type="checkbox" :value="tag.Id" v-model="functionArr">
                                                    </template>
                                                    <template v-else-if="index == 2">
                                                        <input class="filterCheckBox" type="checkbox" :value="tag.Id" v-model="identityArr">
                                                    </template>
                                                    <i class="filterTag">
                                                        {{ tag.Name }}
                                                    </i>
                                                </label>
                                            </div>
                                        </div> 
                                    </template>
                                </template>
                            </div>
                        </div>
                        <div class="filterCategory" v-show="identity == 2">
                            <div class="filterCategoryTabs">
                                <div v-for="(filterTab, index) in categoryTabs" :key="index" class="filterCategoryTab" :class="{ active: filterTabIndex == index }" @click="filterTabIndex = index">
                                    {{ filterTab }}
                                </div>
                            </div>
                            <div class="filterCategoryList exhibitorCategoryList">
                                <template v-for="category2 in exhibitorFilterMenu">
                                    <template v-if="category2.Id > 100">
                                        <template v-for="industry2 in category2.Value">
                                            <div class="filterCard" :key="industry2.Id" v-show="filterTabIndex == 0">
                                                <p class="filterCardCaption">
                                                    {{ industry2.Name }}
                                                    <span class="filterCaptionTip">
                                                        （{{ $t("search.multiTip") }}）
                                                    </span>
                                                </p>
                                                <div class="filterTags">
                                                    <label class="filterLabel" v-for="(tag2, tagidx2) in industry2.Value" :key="tagidx2" :value="tag2.Id">
                                                        <input class="filterCheckBox" type="checkbox" :value="tag2.Id" v-model="exhibitorIdstryArr">
                                                        <i class="filterTag">
                                                            {{ tag2.Name }}
                                                        </i>
                                                    </label>
                                                </div>
                                            </div>
                                        </template>
                                    </template>
                                    <template v-else-if="category2.Id == 3">
                                        <template v-for="product in category2.Value">
                                            <div class="filterCard" :key="product.Id" v-show="filterTabIndex == 1">
                                                <p class="filterCardCaption">
                                                    {{ product.Name }}
                                                    <span class="filterCaptionTip">
                                                        （{{ $t("search.multiTip") }}）
                                                    </span>
                                                </p>
                                                <div class="filterTags">
                                                    <label class="filterLabel" v-for="(pro, proIdx) in product.Value" :key="proIdx" :value="pro.Id">                                                        
                                                        <input class="filterCheckBox" type="checkbox" :value="pro.Id" v-model="exhibitorProArr">                                                        
                                                        <i class="filterTag">
                                                            {{ pro.Name }}
                                                        </i>
                                                    </label>
                                                </div>
                                            </div>
                                        </template>
                                    </template>
                                </template>
                            </div>
                        </div>
                        <div class="filterBtns">
                            <button class="filterBtn" type="reset">
                                {{ $t("search.resetBtn") }}
                            </button>
                            <button class="filterBtn submitFilterBtn" type="submit">
                                {{ $t("search.submitBtn") }}
                            </button>
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
        let searchAttendFilter = JSON.parse(localStorage.getItem("searchAttendFilter"));
        let searchExhibitorFilter = JSON.parse(localStorage.getItem("searchExhibitorFilter"));
        let type = localStorage.getItem("resultType");
        return {
            keyWord: "",
            identity: this.$route.query.searchType == "attendees" ? 1 : 2,
            resultList: [],
            resultType: type != null ? type : 1,
            showFilter: true,
            industryArr: searchAttendFilter != null ? searchAttendFilter.filter1 : [],
            functionArr: searchAttendFilter != null ? searchAttendFilter.filter2 : [],
            identityArr: searchAttendFilter != null ? searchAttendFilter.filter3 : [],
            filterTabIndex: 0,
            exhibitorIdstryArr: searchExhibitorFilter != null ? searchExhibitorFilter.filter1 : [],
            exhibitorProArr: searchExhibitorFilter != null ? searchExhibitorFilter.filter2 : []
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
        categoryTabs: function() {
            return this.$i18n.messages[this.lang].search.categoryTabs
        },
        ...mapState({
            apiDomain: state => state.ApiDomain,
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            attendFilterMenu: state => state.FilterMenu,
            exhibitorFilterMenu: state => state.ExhibitorFilterMenu
        })
    },
    methods: {
        ...mapActions([
            "getAttendsFilter",
            "getExhibitorFilter"
        ]),
        submitFilter: function() {
            switch(Number(this.identity)) {
                case 1:
                    if(this.keyWord.length == 0 && this.industryArr.length == 0 && this.functionArr.length == 0 && this.identityArr.length == 0) {
                        this.lang == "zh" ? alert("请输入关键字或选中任意筛选项") : alert("Please enter keyword or select filter options.");
                        return false;
                    }
                    var attendFilterObj = {
                        eventNo: this.eventNo,
                        keyword: this.keyWord,
                        filter1: this.industryArr,
                        index: 1,
                        size: 9999,
                        filter2: this.functionArr,
                        filter3: this.identityArr,
                        token: this.token,
                        lang: this.lang == "zh" ? 1 : 2
                    }
                    localStorage.setItem("searchAttendFilter", JSON.stringify(attendFilterObj));
                    this.$http.post(`${this.apiDomain}/Attendees/Search`, {
                        eventNo: this.eventNo,
                        keyword: this.keyWord,
                        filter1: this.industryArr.join(","),
                        index: 1,
                        size: 9999,
                        filter2: this.functionArr.join(","),
                        filter3: this.identityArr.join(","),
                        token: this.token,
                        lang: this.lang == "zh" ? 1 : 2
                    }).then(res => {
                        this.resultList = res.data.Data;
                        this.resultType = 1;
                        this.showFilter = false;
                        localStorage.setItem("searchResult", JSON.stringify(this.resultList));
                        localStorage.setItem("resultType", this.resultType);
                    })
                    break;
                case 2:
                    if(this.keyWord.length == 0 && this.exhibitorIdstryArr.length == 0 && this.exhibitorProArr.length == 0) {
                        this.lang == "zh" ? alert("请输入关键字或选中任意筛选项") : alert("Please enter keyword or select filter options.");
                        return false;
                    }
                    let exhibitorFilterObj = {
                        eventNo: this.eventNo,
                        keyword: this.keyWord,
                        filter1: this.exhibitorIdstryArr,
                        filter2: this.exhibitorProArr,
                        token: this.token,
                        lang: this.lang == "zh" ? 1 : 2,
                        index: 1,
                        size: 9999
                    }
                    localStorage.setItem("searchExhibitorFilter", JSON.stringify(exhibitorFilterObj));
                    this.$http.post(`${this.apiDomain}/Exhibitors/Search`, {
                        eventNo: this.eventNo,
                        keyword: this.keyWord,
                        filter1: this.exhibitorIdstryArr.join(","),
                        filter2: this.exhibitorProArr.join(","),
                        token: this.token,
                        lang: this.lang == "zh" ? 1 : 2,
                        index: 1,
                        size: 9999
                    }).then(res => {
                        this.resultList = res.data.Data;
                        this.resultType = 2;
                        this.showFilter = false;
                        localStorage.setItem("searchResult", JSON.stringify(this.resultList));
                        localStorage.setItem("resultType", this.resultType);
                        localStorage.setItem("searchFilterTab", this.filterTabIndex);
                    })
                    break;
            }
        },
        reset: function() {
            this.industryArr.length == 0;
            this.functionArr.length == 0;
            this.identityArr.length == 0;
            this.exhibitorIdstryArr.length == 0;
            this.exhibitorProArr.length == 0;
        }
    },
    created: function() {
        let searchResult = JSON.parse(localStorage.getItem("searchResult"));
        let resType = localStorage.getItem("resultType");
        if(searchResult != null) {
            if(resType == 1) {
                this.identity = 1
            } else {
                this.identity = 2;
                this.filterTabIndex = localStorage.getItem('searchFilterTab');
            }
            this.resultList = searchResult;
            this.showFilter = false;
        }
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
    border: 0;
    border-radius: 0;
    padding: 0 0.5rem 0 0.2rem;
    background: url(../assets/downArrowWhite32.png) var(--themeColor) right 0.04rem center/0.4rem auto no-repeat;
    color: #fff;
}
.openFilterBtn {
    width: calc(100% - 6.1rem);
    height: 0.6rem;
    line-height: 0.56rem;
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
    padding: 0.2rem 0;
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
    padding-top: 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.filterCategoryTabs {
    box-sizing: border-box;
    position: absolute;
    top: 0.8rem;
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
    padding-top: 1.8rem;
}
.filterCard {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto 0.2rem;
    padding: 0.2rem;
    background-color: #fff;
}
/* .filterCard:last-child {
    margin-bottom: 0;
} */
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

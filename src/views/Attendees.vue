<template>
    <div class="attendees">
        <div class="attendTabs">
            <div v-for="(tab, index) in tabs" :key="index" class="attendTab" :class="{ active: tabIndex == index }" @click="tabIndex = index">
                {{ tab.name }}
            </div>
        </div>
        <div class="reRecommend clear" v-show="(tabIndex == 0 && (recommends.length != 0) && showTopRecommend)">
            <p class="reRecommendText lt">
                {{ $t("attendees.notFind") }}
            </p>
            <span class="closeReRecommend rt" @click="hideRecommendBar"></span>
            <button class="reRecommendBtn rt" @click="showFilter = true">
                {{ $t("attendees.reRecommend") }}
            </button>
        </div>
        <div class="attendBox">
            <div class="emptyList" v-if="recommends.length == 0" :class="{ active: tabIndex == 0 }">
                <img class="emptyListImg" src="../assets/nullState.png" alt="">
                <p class="emptyListDesc">
                    {{ $t("attendees.emptyListDesc") }}
                </p>
                <button class="openFilter" @click="showFilter = true">
                    {{ $t("attendees.openFilter") }}
                </button>
            </div>
            <div class="recommendList" ref="recommendList" v-else :class="{ hasRecommendBar: showTopRecommend, active: tabIndex == 0 }" @scroll="loadMore">
                <GuestCard v-for="(guest, index) in recommends" :key="index" :guest="guest"></GuestCard>
                <Loading :loading="recommendLoading"></Loading>
            </div>
            <div class="attendsList" ref="attendsList" :class="{ active: tabIndex == 1 }" @scroll="loadMore">
                <GuestCard v-for="(guest, index) in attends" :key="index" :guest="guest"></GuestCard>
                <Loading :loading="attendsLoading"></Loading>
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
                                        <span class="filterCaptionTip">
                                            （{{ $t("attendees.multiTip") }}）
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
                                        （{{ $t("attendees.multiTip") }}）
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
                <div class="filterBtns">
                    <button class="filterBtn" type="reset">
                        {{ $t("attendees.resetBtn") }}
                    </button>
                    <button class="filterBtn submitFilterBtn" type="submit">
                        {{ $t("attendees.submit") }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import GuestCard from "@/components/GuestCard";
import Loading from "@/components/Loading.vue";
import { Throttle } from "@/utils.js"
export default {
    name: "Attendees",
    data: function() {
        var filterObj = JSON.parse(localStorage.getItem("filter"));
        return {
            tabIndex: 1,
            pageIndex: (localStorage.getItem("attendLoadIndex") == null ? 1 : localStorage.getItem("attendLoadIndex")),
            size: 20,
            recommendLoading: false,
            recommendLoadIndex: (localStorage.getItem("recommendLoadIndex") == null ? 1 : localStorage.getItem("recommendLoadIndex")),
            recommendLoadAll: (localStorage.getItem("recommendLoadAll") == null ? false : localStorage.getItem("recommendLoadAll")),
            attendsLoading: false,
            attendsLoadIndex: (localStorage.getItem("attendsLoadIndex") == null ? 1 : localStorage.getItem("attendsLoadIndex")),
            attendsLoadAll: (localStorage.getItem("attendsLoadAll") == null ? false : localStorage.getItem("attendsLoadAll")),
            industryArr: filterObj != null ? filterObj.filter1 : [],
            functionArr: filterObj != null ? filterObj.filter2 : [],
            identityArr: filterObj != null ? filterObj.filter3 : [],
            showFilter: false,
            showTopRecommend: localStorage.getItem("showTopRecommend") != null ? localStorage.getItem("showTopRecommend") : true,
        }
    },
    components: {
        GuestCard,
        Loading
    },
    computed: {
        tabs: function() {
            return this.$i18n.messages[this.lang].attendees.tabs
        },
        showRecommendBar: function() {
            return (this.tabIndex == 0 && this.recommends != null && this.showTopRecommend == true);
        },
        ...mapState({
            apiDomain: state => state.ApiDomain,
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
        ...mapMutations([
            "INITATTENDSLIST",
            "INITRECOMMENDLIST",
            "EMPTYRECOMMENDLIST"
        ]),
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
                this.lang == "zh" ? alert("请选中任意筛选项") : alert("Please select filter options.")
                return false;
            }
            var filterObj = {
                eventNo: this.eventNo,
                keyword: "",
                filter1: this.industryArr,
                index: 1,
                size: this.size,
                filter2: this.functionArr,
                filter3: this.identityArr,
                token: this.token,
                lang: this.lang == "zh" ? 1 : 2
            }
            localStorage.setItem("filter", JSON.stringify(filterObj));
            localStorage.removeItem("recommendLoadIndex");
            localStorage.removeItem("recommendLoadAll");
            localStorage.removeItem("recommendScrollTop");
            this.recommendLoadIndex = 1;
            this.recommendLoadAll = false;
            this.EMPTYRECOMMENDLIST();
            this.getRecommendList({
                eventNo: this.eventNo,
                keyword: "",
                filter1: this.industryArr.join(","),
                index: 1,
                size: this.size,
                filter2: this.functionArr.join(","),
                filter3: this.identityArr.join(","),
                token: this.token,
                lang: this.lang == "zh" ? 1 : 2
            });
            this.showFilter = false;
        },
        loadMore: Throttle(function() {
            var box = null;
            var scrlTop = 0,
                scrlHeight = 0,
                cliHeight = 0;
            switch(this.tabIndex) {
                case 0:
                    box = this.$refs.recommendList;
                    scrlTop = box.scrollTop,
                    scrlHeight = box.scrollHeight,
                    cliHeight = box.clientHeight;

                    localStorage.setItem('recommendScrollTop', scrlTop);
                    break;
                case 1:
                    box = this.$refs.attendsList;
                    scrlTop = box.scrollTop,
                    scrlHeight = box.scrollHeight,
                    cliHeight = box.clientHeight;

                    localStorage.setItem('attendsScrollTop', scrlTop);
                    break;
            }
            
            if((scrlTop + cliHeight) >= scrlHeight - 150) {
                if(this.tabIndex == 0) {
                    if(this.recommendLoading) {
                        return false;
                    } else {
                        if(!this.recommendLoadAll) {
                            this.recommendLoading = true;
                            this.recommendLoadIndex++;        
                            this.$http.post(`${this.apiDomain}/Attendees/Search`, {
                                eventNo: this.eventNo,
                                keyword: "",
                                filter1: this.industryArr.join(","),
                                index: this.recommendLoadIndex,
                                size: this.size,
                                filter2: this.functionArr.join(","),
                                filter3: this.identityArr.join(","),
                                token: this.token,
                                lang: this.lang == "zh" ? 1 : 2
                            }).then(res => {
                                let data = res.data;
                                if(data.Code == 0) {
                                    this.recommendLoading = false;
                                    if(data.Data.length < this.size) {
                                        this.recommendLoadAll = true;
                                        localStorage.setItem("recommendLoadIndex", this.recommendLoadIndex);
                                        localStorage.setItem("recommendLoadAll", this.recommendLoadAll);
                                    }
                                    if(data.Data.length != 0) {
                                        this.INITRECOMMENDLIST({ recommendList: data.Data });
                                    }
                                } else {
                                    alert(data.Message)
                                }
                            }).catch(err => {
                                alert(err)
                            })
                        }
                    }
                } else if(this.tabIndex == 1) {
                    if(this.attendsLoading) {
                        return false;
                    } else {
                        if(!this.attendsLoadAll) {
                            this.attendsLoading = true;
                            this.attendsLoadIndex++;             
                            this.$http.post(`${this.apiDomain}/Attendees/List`, {
                                eventNo: this.eventNo,
                                index: this.attendsLoadIndex,
                                size: this.size,
                                token: this.token,
                                lang: this.lang == "zh" ? 1 : 2
                            }).then(res => {
                                let data = res.data;
                                if(data.Code == 0) {
                                    this.attendsLoading = false;
                                    if(data.Data.length < this.size) {
                                        this.attendsLoadAll = true;
                                        localStorage.setItem("attendsLoadIndex", this.attendsLoadIndex);
                                        localStorage.setItem("attendsLoadAll", this.attendsLoadAll);
                                    }
                                    if(data.Data.length != 0) {
                                        this.INITATTENDSLIST({ attendsList: data.Data });
                                    }
                                } else {
                                    alert(data.Message)
                                }
                            }).catch(err => {
                                alert(err)
                            })
                        }
                    }
                }
            }
        })
    },
    created: function() {
        if(this.industryArr.length != 0 || this.functionArr.length != 0 || this.identityArr.length != 0) {
            this.getRecommendList({
                eventNo: this.eventNo,
                keyword: "",
                filter1: this.industryArr.join(","),
                index: this.recommendLoadIndex,
                size: this.size,
                filter2: this.functionArr.join(","),
                filter3: this.identityArr.join(","),
                token: this.token,
                lang: this.lang == "zh" ? 1 : 2
            })
        }
        if(this.attends.length == 0) {
            this.getAttendsList({ eventNo: this.eventNo, index: 1, size: this.size, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
        }
        if(this.filterMenu.length == 0) {
            this.getAttendsFilter({ eventNo: this.eventNo, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
        }
    },
    mounted: function() {
        
    },
    activated: function() {
        
    },
    beforeDestroy: function() {
        localStorage.removeItem("recommendLoadIndex");
        localStorage.removeItem("recommendLoadAll");
        localStorage.removeItem("recommendScrollTop");
        this.EMPTYRECOMMENDLIST();
    }
}
</script>
<style scoped>
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
    padding: 1rem 0 0;
    /* overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; */
}
.attendsList, .recommendList {
    box-sizing: border-box;
    display: none;
    width: 100%;
    height: 100%;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.attendsList.active, .recommendList.active {
    display: block;
}
.emptyList {
    display: none;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.emptyList.active {
    display: flex;
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

<template>
    <div class="plaza">
        <div class="plazaTabs">
            <div v-for="(tab, index) in tabs" v-bind:key="index" class="plazaTab" v-bind:class="{ active: currentIndex == index }" v-on:click="switchPlaza(index)">
                <span class="plazaTab">{{ tab.name }}</span>
            </div>
        </div>
        <div class="plazaBox" ref="plazaBox" v-scroll="{ position: y }">
        <!-- <div class="plazaBox" ref="plazaBox" @scroll="loadMore"> -->
            <div class="plazaList" v-bind:class="{ active: currentIndex == 0 }">
                    <!-- <router-link v-for="exhibitor in exhibitorList" class="exhibitorLink" v-bind:key="exhibitor.Id" v-bind:to="'/exhibitor?exhibitorId=' + exhibitor.Id">
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
                                    {{ $tc("plaza.attendExpected", exhibitor.AttendeesPhoto.length) }}
                                </span>
                            </div>
                        </div>
                    </router-link> -->
                <ExhibitorCard v-for="exhibitor in exhibitorList" :key="exhibitor.Id" :exhibitor="exhibitor"></ExhibitorCard>
            </div>
            <div class="plazaList supplyList" v-bind:class="{ active: currentIndex == 1, empty: supplyList.length == 0 }">
                <div class="emptyList" v-if="supplyList.length == 0">
                    <img class="emptyListImg" src="../assets/nullState.png" alt="">
                    <p class="emptyListDesc">{{ $t("plaza.emptySupplyDesc") }}</p>
                </div>
                <template v-else>
                    <PostCard v-for="(post, index) in supplyList" :key="index" :post="post">
                        <div class="postCardHead" slot="postCardHead">
                            <router-link class="postUser" v-bind:to="'/guest?guestId=' + post.User.Id">
                                <div class="postUserAvatar">
                                    <img class="postUserPhoto" v-bind:src="post.User.Photo" alt="">
                                </div>
                                <div class="postUserInfo">
                                    <p class="postUserName">{{ post.User.Name }}</p>
                                    <p class="postUserJob">{{ post.User.JobTitle }}</p>
                                    <p class="postUserCompany">{{ post.User.Company }}</p>
                                </div>
                            </router-link>
                        </div>
                    </PostCard>
                </template>
            </div>
            <div class="plazaList demandList" v-bind:class="{ active: currentIndex == 2, empty: demandList.length == 0 }">
                <div class="emptyList" v-if="demandList.length == 0">
                    <img class="emptyListImg" src="../assets/nullState.png" alt="">
                    <p class="emptyListDesc">{{ $t("plaza.emptyRequirementDesc") }}</p>
                </div>
                <template v-else>
                    <PostCard v-for="(post, index) in demandList" :key="index" :post="post">
                        <div class="postCardHead" slot="postCardHead">
                            <router-link class="postUser" v-bind:to="'/guest?guestId=' + post.User.Id">
                                <div class="postUserAvatar">
                                    <img class="postUserPhoto" v-bind:src="post.User.Photo" alt="">
                                </div>
                                <div class="postUserInfo">
                                    <p class="postUserName">{{ post.User.Name }}</p>
                                    <p class="postUserJob">{{ post.User.JobTitle }}</p>
                                    <p class="postUserCompany">{{ post.User.Company }}</p>
                                </div>
                            </router-link>
                        </div>
                    </PostCard>
                </template>
            </div>
            <div class="loading" v-show="loading">
                <img class="loadingImg" src="../assets/loading.gif" alt="">
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
import { mapActions, mapMutations, mapState } from "vuex";
import PostCard from "@/components/PostCard.vue";
import ExhibitorCard from "@/components/ExhibitorCard"
import { Throttle } from "@/utils.js"
export default {
    name: "Plaza",
    data: function() {
        return {
            y: 0,
            currentIndex: (localStorage.getItem("plazaTabIndex") == null ? 0 : localStorage.getItem("plazaTabIndex")),
            pageIndex: (localStorage.getItem("exhibitorLoadIndex") == null ? 1 : localStorage.getItem("exhibitorLoadIndex")),
            // pageIndex: 1,
            size: 50,
            loading: false,
            loadAll: (localStorage.getItem("exhibitorLoadAll") == null ? false : localStorage.getItem("exhibitorLoadAll"))
            // loadAll: false
        }
    },
    components: {
        PostCard,
        ExhibitorCard
    },
    computed: {
        tabs: function() {
            return this.$i18n.messages[this.lang].plaza.tabs
        },
        ...mapState({
            apiDomain: state => state.ApiDomain,
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            exhibitorList: state => state.ExhibitorList,
            supplyList: state => state.SupplyList,
            demandList: state => state.DemandList
        })
    },
    methods: {
        ...mapActions([
            "getExhibitorList",
            "getPlazaList"
        ]),
        ...mapMutations([
            "INITEXHIBITORLIST"
        ]),
        switchPlaza: function(index) {
            this.currentIndex = index;
            localStorage.setItem("plazaTabIndex", index);
        },
        loadMore: Throttle(function() {
            let box = this.$refs.plazaBox;
            let scrlTop = box.scrollTop,
                scrlHeight = box.scrollHeight,
                cliHeight = box.clientHeight;

            console.log(scrlTop)

            localStorage.setItem('plazaBoxScrollTop', scrlTop);

            if((scrlTop + cliHeight) >= scrlHeight) {
                if(this.loading) {
                    return false;
                } else {
                    if(!this.loadAll) {
                        this.loading = true;
                        this.pageIndex++;                    
                        this.$http.post(`${this.apiDomain}/Exhibitors/List`, {
                            eventNo: this.eventNo,
                            index: this.pageIndex,
                            size: this.size,
                            token: this.token,
                            lang: this.lang == "zh" ? 1 : 2
                        }).then(res => {
                            console.log(this.pageIndex);
                            let data = res.data;
                            if(data.Code == 0) {
                                this.loading = false;
                                if(data.Data.length < this.size) {
                                    this.loadAll = true;
                                    localStorage.setItem("exhibitorLoadIndex", this.pageIndex);
                                    localStorage.setItem("exhibitorLoadAll", this.loadAll);
                                }
                                if(data.Data.length != 0) {
                                    this.INITEXHIBITORLIST({ exhibitorList: data.Data });
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
        })
    },
    created: function() {
        if(this.exhibitorList.length == 0) {
            this.getExhibitorList({ eventNo: this.eventNo, index: this.pageIndex, size: this.size, token: this.token, lang: this.lang == "zh" ? 1 : 2});
        }
        // if(this.supplyList.length == 0) {
            this.getPlazaList({ eventNo: this.eventNo, index: 1, size: 9999, type: 1, token: this.token, lang: this.lang == "zh" ? 1 : 2 });
        // }
        // if(this.demandList.length == 0) {
            this.getPlazaList({ eventNo: this.eventNo, index: 1, size: 9999, type: 2, token: this.token, lang: this.lang == "zh" ? 1 : 2 });
        // }
    },
    mounted: function() {
        console.log("广场页挂载")
        // this.$refs.plazaBox.scrollTop = localStorage.getItem('plazaBoxScrollTop')
    },
    beforeDestroy: function() {
        console.log("beforeDestroy")
        let box = this.$refs.plazaBox;
        let scrlTop = box.scrollTop;
        console.log(scrlTop)
        
    },
    destroyed: function() {
        console.log("plaza destroyed")
    },
    activated: function() {
        console.log("keep-alive activated生命周期")
        console.log(this.pageIndex);
        console.log(this.loading);
        console.log(this.loadAll);
        // this.$refs.plazaBox.scrollTop = localStorage.getItem('plazaBoxScrollTop')
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
    z-index: 100;
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
.supplyList.empty,
.supplyList.empty > .container,
.demandList.empty,
.demandList.empty > .container {
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
.loading {
    display: block;
    font-size: 0;
    text-align: center;
}
.loadingImg {
    display: inline-block;
    width: 0.6rem;
    height: auto;
    margin: 0.2rem 0;
}
</style>

<template>
    <div class="plaza">
        <div class="plazaTabs">
            <div v-for="(tab, index) in tabs" :key="index" class="plazaTab" :class="{ active: tabIndex == index }" @click="switchPlaza(index)">
                <span class="plazaTab">
                    {{ tab.name }}
                </span>
            </div>
        </div>
        <div class="plazaBox">
            <div class="plazaList" ref="exhibitorList" :class="{ active: tabIndex == 0 }" @scroll="loadMore">
                <ExhibitorCard v-for="exhibitor in exhibitorList" :key="exhibitor.Id" :exhibitor="exhibitor"></ExhibitorCard>
                <Loading :loading="loading"></Loading>
            </div>
            <div class="plazaList supplyList" :class="{ active: tabIndex == 1, empty: supplyList.length == 0 }">
                <div class="emptyList" v-if="supplyList.length == 0">
                    <img class="emptyListImg" src="../assets/nullState.png" alt="">
                    <p class="emptyListDesc">
                        {{ $t("plaza.emptySupplyDesc") }}
                    </p>
                </div>
                <template v-else>
                    <PostCard v-for="(post, index) in supplyList" :key="index" :post="post">
                        <template #postCardHead>
                            <div class="postCardHead">
                                <router-link class="postUser" :to="`/guest?guestId=${post.User.Id}`">
                                    <div class="postUserAvatar">
                                        <img class="postUserPhoto" :src="post.User.Photo" alt="">
                                    </div>
                                    <div class="postUserInfo">
                                        <p class="postUserName">
                                            {{ lang == "zh" ? post.User.Name : post.User.NameEn }}
                                        </p>
                                        <p class="postUserJob">
                                            {{ lang == "zh" ? post.User.JobTitle : post.User.JobTitleEn }}
                                        </p>
                                        <p class="postUserCompany">
                                            {{ lang == "zh" ? post.User.Company : post.User.CompanyEn }}
                                        </p>
                                    </div>
                                </router-link>
                            </div>
                        </template>
                    </PostCard>
                </template>
            </div>
            <div class="plazaList demandList" :class="{ active: tabIndex == 2, empty: demandList.length == 0 }">
                <div class="emptyList" v-if="demandList.length == 0">
                    <img class="emptyListImg" src="../assets/nullState.png" alt="">
                    <p class="emptyListDesc">
                        {{ $t("plaza.emptyRequirementDesc") }}
                    </p>
                </div>
                <template v-else>
                    <PostCard v-for="(post, index) in demandList" :key="index" :post="post">
                        <div class="postCardHead" slot="postCardHead">
                            <router-link class="postUser" :to="`/guest?guestId=${post.User.Id}`">
                                <div class="postUserAvatar">
                                    <img class="postUserPhoto" :src="post.User.Photo" alt="">
                                </div>
                                <div class="postUserInfo">
                                    <p class="postUserName">
                                        {{ lang == "zh" ? post.User.Name : post.User.NameEn }}
                                    </p>
                                    <p class="postUserJob">
                                        {{ lang == "zh" ? post.User.JobTitle : post.User.JobTitleEn }}
                                    </p>
                                    <p class="postUserCompany">
                                        {{ lang == "zh" ? post.User.Company : post.User.CompanyEn }}
                                    </p>
                                </div>
                            </router-link>
                        </div>
                    </PostCard>
                </template>
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
import ExhibitorCard from "@/components/ExhibitorCard";
import Loading from "@/components/Loading.vue";
import { Throttle } from "@/utils.js"
export default {
    name: "Plaza",
    data: function() {
        return {
            tabIndex: (localStorage.getItem("plazaTabIndex") == null ? 0 : localStorage.getItem("plazaTabIndex")),
            pageIndex: (localStorage.getItem("exhibitorLoadIndex") == null ? 1 : localStorage.getItem("exhibitorLoadIndex")),
            size: 50,
            loading: false,
            loadAll: (localStorage.getItem("exhibitorLoadAll") == null ? false : localStorage.getItem("exhibitorLoadAll"))
        }
    },
    components: {
        PostCard,
        ExhibitorCard,
        Loading
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
            this.tabIndex = index;
            localStorage.setItem("plazaTabIndex", index);
        },
        loadMore: Throttle(function() {
            let box = this.$refs.exhibitorList;
            let scrlTop = box.scrollTop,
                scrlHeight = box.scrollHeight,
                cliHeight = box.clientHeight;

            localStorage.setItem('exhibitorListScrollTop', scrlTop);

            if((scrlTop + cliHeight) >= scrlHeight - 150) {
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
                            let data = res.data;
                            if(data.Code == 0) {
                                this.loading = false;
                                localStorage.setItem("exhibitorLoadIndex", this.pageIndex);
                                if(data.Data.length < this.size) {
                                    this.loadAll = true;
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
        this.getPlazaList({ eventNo: this.eventNo, index: 1, size: 9999, type: 1, token: this.token, lang: this.lang == "zh" ? 1 : 2 });
        this.getPlazaList({ eventNo: this.eventNo, index: 1, size: 9999, type: 2, token: this.token, lang: this.lang == "zh" ? 1 : 2 });
    },
    mounted: function() {
        // this.$refs.plazaBox.scrollTop = localStorage.getItem('exhibitorListScrollTop')
    },
    destroyed: function() {
    },
    activated: function() {
        
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
    padding: 1rem 0 0;
    /* overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch; */
}
.plazaList {
    box-sizing: border-box;
    display: none;
    width: 100%;
    height: 100%;
    padding-bottom: 1.8rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.plazaList.active {
    display: block;
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

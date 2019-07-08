<template>
    <div class="search">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="searchBox">
            <div class="searchBar">
                <input class="searchInput" type="text" placeholder="搜索参会嘉宾或企业">
                <select class="searchSelect">
                    <option value="1">参会嘉宾</option>
                    <option value="2">现场展商</option>
                </select>
                <button class="openFilterBtn">筛选</button>
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
                <div class="filterPanel">

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar";
import GuestCard from "@/components/GuestCard";
export default {
    name: "Search",
    data: function() {
        return {
            resultList: []
        }
    },
    components: {
        NavBar,
        GuestCard
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].search.navBarTitle
        },
         ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            attends: state => state.AttendsList,
            recommends: state => state.RecommendList
        })
    },
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
    padding: 1rem 0 0;
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
    padding: 0 0 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>

<template>
    <div class="navBar">
        <div class="container clear">
            <template v-if="showSearch">
                <router-link class="searchLink" :to="`/search?searchType=${searchType}`">
                    <!-- 搜索参会嘉宾或企业 -->
                    {{ $t("navBar.search") }}
                </router-link>
            </template>
            <template v-else>
                <div class="navBarLinks lt">
                    <div class="navBarLink navBarBack" @click="goBack"></div>
                    <b class="navBarLinkDivide"></b>
                    <router-link class="navBarLink navBarHome" to="/"></router-link>
                </div>
                <p class="navBarTitle">{{ navBarTitle }}</p>
            </template>
        </div>
    </div>
</template>
<script>
export default {
    name: "NavBar",
    props: {
        showSearch: {
            type: Boolean,
            default: true
        },
        navBarTitle: {
            type: String
        },
        searchType: {
            type: String,
            default: "attendees"
        }
    },
    methods: {
        goBack: function() {
            this.$router.go(-1);
        }
    }
}
</script>
<style>
.navBar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1rem;
    background-color: var(--themeColor);
    z-index: 1000;
}
.navBar > .container {
    width: 95%;
}
.searchLink {        
    height: 0.6rem;
    margin-top: 0.2rem;
    padding-left: 0.6rem;
    font-size: 0.28rem;
    line-height: 0.6rem;
    background: url(../assets/search.png) #fff left 0.1rem center/0.4rem auto no-repeat;
    border-radius: 0.04rem;
    color: #666;
}
.navBarLinks {
    width: 1.45rem;
    height: 0.6rem;
    margin-top: 0.2rem;
    padding: 0 0.1rem;
    font-size: 0;
    background-color: #fff;
    border-radius: 0.4rem;
}
.navBarLink, .navBarLinkDivide {
    display: inline-block;
    vertical-align: middle;
}
.navBarLinkDivide {
    height: 0.3rem;
    margin: 0 0.1rem;
    border-left: 0.02rem solid #000;
}
.navBarLink {
    width: 0.6rem;
    height: 0.6rem;
}
.navBarBack {
    background: url(../assets/backArrow32.png) center center/0.4rem auto no-repeat;
}
.navBarHome {
    background: url(../assets/home32.png) center center/0.4rem auto no-repeat;
}
.navBarTitle {
    font-size: 0.28rem;
    line-height: 1rem;
    text-align: center;
    text-indent: -1.45rem;
    color: #fff;
}
</style>



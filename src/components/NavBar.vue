<template>
    <div class="navBar">
        <div class="container clear">
            <template v-if="showSearch">
                <router-link class="searchLink" to="/search">
                    <!-- 搜索参会嘉宾或企业 -->
                    {{ $t("navBar.search") }}
                </router-link>
            </template>
            <template v-else>
                <div class="navBarLinks lt">
                    <router-link class="navBarLink navBarBack" v-bind:to="backUrl"></router-link>
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
        backUrl: {
            type: String
        },
        navBarTitle: {
            type: String
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
    width: 90%;
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
    width: 1.42rem;
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
    border-left: 1px solid #000;
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
    text-indent: -1.42rem;
    color: #fff;
}
</style>



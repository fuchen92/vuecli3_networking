<template>
    <div class="tabBar">
        <router-link class="tabBarItemLink" to="/" active-class="active" exact>
            <span class="tabBarItemIcon tabBarHome"></span>
            {{ $t('tabBar.home') }}
        </router-link>
        <router-link class="tabBarItemLink" to="/attendees" active-class="active">
            <span class="tabBarItemIcon tabBarAttendees"></span>
            {{ $t('tabBar.attendees') }}
        </router-link>
        <router-link class="tabBarItemLink" to="/plaza" active-class="active">
            <span class="tabBarItemIcon tabBarPlaza"></span>
            {{ $t('tabBar.plaza') }}
        </router-link>
        <router-link class="tabBarItemLink" to="/message" active-class="active">
            <b class="tabBarRedDot" v-show="this.$route.path != '/message' && showRedDot"></b>
            <span class="tabBarItemIcon tabBarMsg"></span>
            {{ $t('tabBar.message') }}
        </router-link>
        <router-link class="tabBarItemLink" to="/me" active-class="active">
            <span class="tabBarItemIcon tabBarMe"></span>
            <!-- 我的 -->
            {{ $t('tabBar.me') }}
        </router-link>
    </div>
</template>
<script>
import { masState, mapState } from "vuex";
export default {
    name: "TabBar",
    data: function() {
        return {
            
        }
    },
    computed: {
        ...mapState({
            showRedDot: state => state.showRedDot
        })
    }
}
</script>
<style>
.tabBar {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 1rem;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
    border-top: 0.02rem solid #f0f1f2;
    z-index: 1000;
}
.tabBarItemLink {
    position: relative;
    width: 100%;
    height: 100%;
    font-size: 0.24rem;
    text-align: center;
    color: #666;
}
.tabBarItemLink.active {
    color: var(--themeColor);
}
.tabBarRedDot {
    position: absolute;
    display: block;
    width: 0.2rem;
    height: 0.2rem;
    top: 0.1rem;
    right: 0.3rem;
    border-radius: 100%;
    background-color: var(--themeColor);
}
.tabBarItemIcon {
    display: block;
    width: 0.6rem;
    height: 0.6rem;
    margin: 0 auto;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 0.6rem auto;
}
.tabBarHome {
    background-image: url(../assets/tabHome.png);
}
.tabBarAttendees {
    background-image: url(../assets/tabConnection.png);
}
.tabBarPlaza {
    background-image: url(../assets/tabPlaza.png);
}
.tabBarMsg {
    background-image: url(../assets/tabMsg.png);
}
.tabBarMe {
    background-image: url(../assets/tabMe.png);
}
.tabBarItemLink.active > .tabBarHome {
    background-image: url(../assets/tabHome1.png);
}
.tabBarItemLink.active > .tabBarAttendees {
    background-image: url(../assets/tabConnection1.png);
}
.tabBarItemLink.active > .tabBarPlaza {
    background-image: url(../assets/tabPlaza1.png);
}
.tabBarItemLink.active > .tabBarMsg {
    background-image: url(../assets/tabMsg1.png);
}
.tabBarItemLink.active > .tabBarMe {
    background-image: url(../assets/tabMe1.png);
}
</style>


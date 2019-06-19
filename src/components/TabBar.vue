<template>
    <div class="tabBar">
        <router-link class="tabBarItemLink" to="/" active-class="active">
            <span class="tabBarItemIcon tabBarHome"></span>
            日程
        </router-link>
        <router-link class="tabBarItemLink" to="/connection" active-class="active">
            <span class="tabBarItemIcon tabBarConnection"></span>
            人脉
        </router-link>
        <router-link class="tabBarItemLink" to="/plaza" active-class="active">
            <span class="tabBarItemIcon tabBarPlaza"></span>
            广场
        </router-link>
        <router-link class="tabBarItemLink" to="/message" active-class="active">
            <span class="tabBarItemIcon tabBarMsg"></span>
            消息
        </router-link>
        <router-link class="tabBarItemLink" to="/me" active-class="active">
            <span class="tabBarItemIcon tabBarMe"></span>
            我的
        </router-link>
    </div>
</template>
<script>
export default {
    name: "TabBar"
}
</script>
<style>
.tabBar {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 1rem;
    justify-content: space-around;
    align-items: center;
    background-color: #ffffff;
    z-index: 1000;
}
.tabBarItemLink {
    width: 100%;
    height: 100%;
    font-size: 0.24rem;
    text-align: center;
    color: #666;
}
.tabBarItemLink.active {
    color: var(--themeColor);
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
.tabBarConnection {
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
.tabBarItemLink.active > .tabBarConnection {
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


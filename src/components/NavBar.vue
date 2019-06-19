<template>
    <div class="navBar">
        <div class="container">
            <router-link class="searchLink" to="/search">
                搜索参会嘉宾或企业
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "NavBar"
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
</style>



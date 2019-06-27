<template>
    <div class="layout">
        <NavBar :showSearch="true" backUrl="" navBarTitle=""></NavBar>
        <keep-alive>
            <router-view></router-view>
        </keep-alive>
        <TabBar></TabBar>
    </div>
</template>
<script>
import NavBar from "@/components/NavBar";
import TabBar from "@/components/TabBar";

export default {
    name: "layout",
    data: function() {
        return {

        }
    },
    components: {
        NavBar,
        TabBar
    }
}
</script>
<style>
.layout {
    position: relative;
    width: 100%;
    height: 100%;
}
</style>

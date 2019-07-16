<template>
    <div class="layout">
        <NavBar :showSearch="true" :searchType="searchType"></NavBar>
        <!-- <keep-alive> -->
            <router-view></router-view>
        <!-- </keep-alive> -->
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
            searchType: "attendees"
        }
    },
    components: {
        NavBar,
        TabBar
    },
    watch: {
        $route: function() {
            let path = this.$route.path;
            if(path != "/plaza") {
                this.searchType = "attendees";
            } else {
                this.searchType = "exhibitor"
            }
        }
    },
    created: function() {
        let path = this.$route.path;
        if(path == "/plaza") {
            this.searchType = "exhibitor";
        }
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

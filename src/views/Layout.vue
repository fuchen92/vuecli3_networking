<template>
    <div class="layout">
        <NavBar :showSearch="true" :searchType="searchType"></NavBar>
            <router-view></router-view>
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
        localStorage.removeItem("searchAttendFilter");
        localStorage.removeItem("searchExhibitorFilter");
        localStorage.removeItem("searchResult");
        localStorage.removeItem("resultType");
        localStorage.removeItem("searchFilterTab");
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

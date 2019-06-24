<template>
    <div class="myNeed">
        <NavBar :showSearch="false" :backUrl="backUrl" :navBarTitle="navBarTitle"></NavBar>
        <div class="myNeedWrapper">
            <template v-if="needList.length <= 0">
                <div class="emptyNeed">
                    <img class="emptyNeedImg" src="../assets/nullState.png" alt="">
                    <p class="emptyNeedDesc">{{ $t("myneed.emptyNeedDesc") }}</p> 
                </div>
            </template>                
            <template v-else>
                <div v-for="(need, index) in needList" v-bind:key="index">

                </div>
            </template>
        </div>
    </div>
</template>

<script>
import NavBar from "@/components/NavBar";
export default {
    name: "MyNeed",
    data: function() {
        return {
            backUrl: "/me",
            navBarTitle: this.$i18n.messages[this.$store.state.Lang].myneed.navBarTitle,
            needList: []
        }
    },
    components: {
        NavBar
    },
    created: function() {
        console.log("created")
        console.log(this)
        this.$http.post("http://192.168.1.21:89/Me/SolutionList", {
            eventNo: 63,
            index: 1,
            size: -1,
            token: "",
            lang: 1
        }).then(res => {
            console.log(res)
        })
    },
    mounted: function() {
        console.log("mounted");
    }
}
</script>
<style>
.myNeed {
    position: relative;
    width: 100%;
    height: 100%;
}
.myNeedWrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.emptyNeed {
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.emptyNeedImg {
    width: 4rem;
    margin-bottom: 0.2rem;
}
.emptyNeedDesc {
    font-size: 0.24rem;
    text-align: center;
    color: #666666;
}
</style>

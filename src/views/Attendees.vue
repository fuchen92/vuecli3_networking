<template>
    <div class="attendees">
        <div class="attendTabs">
            <div v-for="(tab, index) in tabs" v-bind:key="index" class="attendTab" v-bind:class="{ active: currentIndex == index }" v-on:click="currentIndex = index">
                {{ tab.name }}
            </div>
        </div>
        <div class="attendBox">
            <div class="attendList recommendList" v-bind:class="{ active: currentIndex == 0, empty: recommendList.length == 0 }">
                <div class="emptyList" v-if="recommendList.length == 0">
                    <img class="emptyListImg" src="../assets/nullState.png" alt="">
                    <p class="emptyListDesc">{{ $t("attendees.emptyListDesc") }}</p>
                    <button class="openRecommend">{{ $t("attendees.openRecommend") }}</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "Attendees",
    data: function() {
        return {
            currentIndex: 0,
            recommendList: []
        }
    },
    computed: {
        tabs: function() {
            return this.$i18n.messages[this.lang].attendees.tabs
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token
        })
    }
}
</script>
<style>
.attendees {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
}
.attendTabs {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 0.8rem;
    background-color: #fff;
}
.attendTab {
    padding: 0 0.2rem;
    font-size: 0.28rem;
    line-height: 0.76rem;
    border-bottom: 0.04rem solid transparent;
}
.attendTab.active {
    color: var(--themeColor);
    border-bottom-color: var(--themeColor);
}
.attendBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0 0;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.recommendList.empty {
    width: 100%;
    height: 100%;
}
.emptyList {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
}
.emptyListImg {
    width: 4rem;
    margin: 0 auto 0.2rem;
}
.emptyListDesc {
    font-size: 0.24rem;
    text-align: center;
    color: #666666;
}
.openRecommend {
    margin-top: 0.2rem;
    padding: 0 0.8rem;
    font-size: 0.24rem;
    line-height: 0.8rem;
    background-color: var(--themeColor);
    border-radius: 0.4rem;
    color: #fff;
}
</style>

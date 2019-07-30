<template>
    <div class="myNeed">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="myNeedWrapper">
            <template v-if="solutionList.length <= 0">
                <div class="emptyNeed">
                    <img class="emptyNeedImg" src="../assets/nullState.png" alt="">
                    <p class="emptyNeedDesc">{{ $t("myneed.emptyNeedDesc") }}</p> 
                </div>
            </template>                
            <template v-else>
                <PostCard v-for="(post, index) in solutionList" :key="index" :post="post"></PostCard>
            </template>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import NavBar from "@/components/NavBar";
import PostCard from "@/components/PostCard.vue";
export default {
    name: "MyNeed",
    data: function() {
        return {

        }
    },
    components: {
        NavBar,
        PostCard
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].myneed.navBarTitle
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            solutionList: state => state.SolutionList
        })
    },
     methods: {
        // 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
		// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
		...mapActions([
			"getMySolutionList"
        ])
    },
    created: function() {
        this.getMySolutionList({ eventNo: this.eventNo, index: 1, size: 9999, token: this.token, lang: this.lang == "zh" ? 1 : 2 });
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
    padding: 1.2rem 0 1rem;
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

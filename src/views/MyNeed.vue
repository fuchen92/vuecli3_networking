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
                <!-- <PostCard v-for="(post, index) in needList" v-bind:key="index" v-bind:post="post"></PostCard> -->
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
            backUrl: "/me",
            navBarTitle: this.$i18n.messages[this.$store.state.Lang].myneed.navBarTitle,
            // needList: [
            //     {
            //         "Id": 100,
            //         "Type": 2,
            //         "Intro": "我的需求我的需求我的需求",
            //         "Contact": {
            //             "Id": 0,
            //             "Name": 13899998888,
            //             "Value": 1
            //         },
            //         "EventNo": 0,
            //         "IsLike": false,
            //         "Like": 0,
            //         "LikeUserPhoto": null,
            //         "SocialId": 0,
            //         "Tag": [
            //             {
            //                 "Id": 4,
            //                 "Name": "项目合作",
            //                 "Value": 0
            //             }
            //         ],
            //         "Time": "2019-06-24T11:01:51:67",
            //         "User": null
            //     },
            //     {
            //         "Id": 100,
            //         "Type": 2,
            //         "Intro": "我的需求我的需求我的需求",
            //         "Contact": {
            //             "Id": 0,
            //             "Name": 13899998888,
            //             "Value": 1
            //         },
            //         "EventNo": 0,
            //         "IsLike": false,
            //         "Like": 0,
            //         "LikeUserPhoto": null,
            //         "SocialId": 0,
            //         "Tag": [
            //             {
            //                 "Id": 4,
            //                 "Name": "项目合作",
            //                 "Value": 0
            //             }
            //         ],
            //         "Time": "2019-06-24T11:01:51:67",
            //         "User": null
            //     }
            // ]
        }
    },
    components: {
        NavBar,
        PostCard
    },
    computed: {
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token
        }),
        needList: function() {
            return this.$store.state.SolutionList
        },
    },
    created: function() {
        console.log("created");
        console.log(this);
        // this.$http.post("http://192.168.1.21:89/Me/SolutionList", {
        //     eventNo: 63,
        //     index: 1,
        //     size: -1,
        //     token: "",
        //     lang: 1
        // }).then(res => {
        //     console.log(res)
        // })
        let language = this.lang == "zh" ? 1 : 2;
        this.initNeedList({ eventNo: this.eventNo, token: this.token, lang: language });
    },
     methods: {
        // 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
		// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
		...mapActions({
			initNeedList: "getMySolutionList"
        })
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

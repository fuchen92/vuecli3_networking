<template>
    <div class="postCard">
        <slot name="postCardHead"></slot>
        <div class="postCardBody">
            <p class="postDesc">
                {{ post.Intro }}
            </p>
            <div class="postTags" v-if="post.Tag.length != 0">
                <span class="postTag">
                    {{ post.Tag[0].Name }}
                </span>
            </div>
        </div>
        <div class="postSummary clear">
            <div class="postTime lt">
                {{ $pattern(post.Time, "yyyy-MM-dd HH:mm") }}
            </div>
            <template v-if="this.$route.path == '/plaza'">
                <a class="postContact rt" :href="`tel:${post.Contact.Name}`">
                    {{ $t("postCard.tel") }}
                </a>
                <div class="postStar rt" :class="{ active: post.IsLike, star: isStared }" :data-from="post.User.Id" :data-pid="post.Id" @click="starPost(post.Id, $event)">
                    {{ isStared ? $tc("postCard.interest", starCount) : $tc("postCard.interest", post.Like) }}
                </div>
            </template>
            <div v-else class="postDelete rt" :data-pid="post.Id" @click="deletePost(post.Id)">
                {{ $t("postCard.del") }}
            </div>
        </div>
        <div class="postLike clear" v-if="post.LikeUserPhoto && this.$route.path == '/plaza'">
            <router-link class="likeCount rt" :to="`/postinterest?postId=${post.Id}`">
                {{ isStared ? $tc("postCard.likeCount", starCount) : $tc("postCard.likeCount", post.Like) }}
            </router-link>
            <template v-for="(likeUser, index) in post.LikeUserPhoto">
                <img class="likePhoto rt" v-if="index < 3" :key="index" :src="likeUser">
            </template>
        </div>
    </div>
</template>
<script>
import { mapMutations ,mapState } from "vuex";
export default {    
    props: {
        post: {
            type: Object
        }
    },
    data: function() {
        return {
            isStared: false,            
        }
    },
    computed: {
        starCount: function() {
            return ++this.post.Like
        },
        ...mapState({
            apiDomain: state => state.ApiDomain,
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            myInfo: state => state.MyInfomation,
        })
    },
    methods: {
        ...mapMutations([
            "DELETESOLUTION"
        ]),
        starPost: function(id, event) {
            let from = event.target.dataset.from;
            if(this.post.IsLike || from == this.myInfo.Id || this.isStared) {
                return false;
            }
            console.log(this.starCount)
            this.$http.post(`${this.apiDomain}/Plaza/SolutionLike`, {
                eventNo: this.eventNo,
                id: id,
                token: this.token,
                lang: this.lang == "zh" ? 1 : 2
            }).then(res => {
                if(res.data.Code == 0) {
                    this.isStared = true;
                } else {
                    alert(res.data.Message)
                }
            }).catch(err => {
                alert(err);
            })
        },
        deletePost: function(id) {     
            this.$http.post(`${this.apiDomain}/Me/SolutionDelete`, {
                eventNo: this.eventNo,
                id: id,
                token: this.token,
                lang: this.lang == "zh" ? 1 : 2
            }).then(res => {
                this.DELETESOLUTION({ id: id })
            }).catch(err => {
                alert(err);
            })
        }
    }
}
</script>
<style>
.postCard {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto 0.2rem;
    padding: 0.2rem;
    background-color: #fff;
}
.postCard:last-child {
    margin-bottom: 0;
}
.postCardHead {
    padding-bottom: 0.2rem;
    border-bottom: 0.02rem solid #f0f1f2;
}
.postUser {
    font-size: 0;
}
.postUserAvatar, .postUserInfo {
    display: inline-block;
    vertical-align: top;
}
.postUserAvatar {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.2rem;
    border-radius: 100%;
    overflow: hidden;
}
.postUserPhoto {
    width: 100%;
}
.postUserInfo {
    width: calc(100% - 1rem);
}
.postUserName, .postUserJob, .postUserCompany {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: #2c3e50;
}
.postUserName {
    font-weight: bold;
}
.postCardBody {
    padding-top: 0.2rem;
}
.postDesc {
    font-size: 0.28rem;
    line-height: 0.4rem;
}
.postTags {
    margin-top: 0.2rem;
    font-size: 0;
}
.postTag {
    display: inline-block;
    margin: 0 0.1rem 0.1rem 0;
    padding: 0.04rem 0.2rem;
    font-size: 0.24rem;
    line-height: 0.3rem;
    background-color: #f0f1f2;
    border-radius: 0.4rem;
    color: var(--themeColor);
}
.postSummary {
    margin-top: 0.2rem;
    padding-top: 0.2rem;
    border-top: 0.02rem solid #f0f1f2;
}
.postTime, .postContact, .postStar {
    height: 0.4rem;
    font-size: 0.24rem;
    line-height: 0.4rem;
    color: #777;
}
.postContact {
    margin-left: 0.4rem;
    padding-left: 0.4rem;
    background: url(../assets/iconMobile.svg) left center/0.3rem auto no-repeat;
}
.postStar {
    padding-left: 0.4rem;
    background: url(../assets/iconLike.svg) left center/0.3rem auto no-repeat;
}
.postStar.active, .postStar.star {
    background: url(../assets/iconLikeRed.svg) left center/0.3rem auto no-repeat;
}
.postLike {
    margin-top: 0.2rem;
    font-size: 0;
    text-align: right;
}
.likePhoto {
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.1rem;
    border-radius: 100%;
}
.likeCount {
    padding-right: 0.3rem;
    font-size: 0.24rem;
    line-height: 0.4rem;    
    background: url(../assets/rightArrow32.png) right center/0.2rem auto no-repeat;
    color: #777777;
}
.postDelete {
    padding-left: 0.6rem;
    font-size: 0.24rem;
    line-height: 0.4rem;
    background: url(../assets/iconDel.png) left center/0.4rem auto no-repeat;
}
</style>

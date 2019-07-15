<template>
    <div class="postCard">
        <!-- <div class="postCardHead">
            <router-link class="postUser" v-bind:to="'/guests?' + post.User.Id">
                <div class="postUserAvatar">
                    <img class="postUserPhoto" v-bind:src="post.User.Photo" alt="">
                </div>
                <div class="postUserInfo">
                    <p class="postUserName">{{ post.User.Name }}</p>
                    <p class="postUserJob">{{ post.User.JobTitle }}</p>
                    <p class="postUserCompany">{{ post.User.Company }}</p>
                </div>
            </router-link>
        </div> -->
        <slot name="postCardHead"></slot>
        <div class="postCardBody">
            <p class="postDesc">
                {{ post.Intro }}
            </p>
            <div class="postTags" v-if="post.Tag.length != 0">
                <span class="postTag">{{ post.Tag[0].Name }}</span>
            </div>
        </div>
        <div class="postSummary clear">
            <div class="postTime lt">{{ post.Time.split("T")[0] + " " + post.Time.split("T")[1].substr(0, 5) }}</div>
            <a class="postContact rt" v-bind:href="'tel:' + post.Contact.Name">{{ $t("postCard.tel") }}</a>
            <div class="postInterest rt" v-bind:class="{ active: post.IsLike }">{{ $tc("postCard.interest", post.Like) }}</div>
        </div>
        <!-- <slot name="postCardSummary"></slot> -->
    </div>
</template>
<script>
export default {
    props: {
        post: {
            type: Object
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
.postTime, .postContact, .postInterest {
    font-size: 0.24rem;
    color: #777;
}
.postContact {
    margin-left: 0.4rem;
    padding-left: 0.4rem;
    background: url(../assets/iconMobile.svg) left center/0.3rem auto no-repeat;
}
</style>

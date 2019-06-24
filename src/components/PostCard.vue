<template>
    <div class="postCard">
        <div class="postCardHead">
            <router-link class="postCardUser" v-bind:to="'/guests?' + post.User.Id">
                <div class="postCardAvatar">
                    <img class="postCardPhoto" v-bind:src="post.User.Photo" alt="">
                </div>
                <div class="postCardUserInfo">
                    <p class="postCardUserName">{{ post.User.Name }}</p>
                    <p class="postCardUserJob">{{ post.User.JobTitle }} {{ post.User.Company }}</p>
                </div>
            </router-link>
        </div>
        <!-- <slot name="postCardHead"></slot> -->
        <div class="postCardBody">
            <p class="postCardDesc">
                {{ post.Intro }}
            </p>
            <div class="postCardTags">
                <span class="postCardTag">{{ post.Tag[0].Name }}</span>
            </div>
        </div>
        <div class="postCardSummary clear">
            <div class="postCardTime lt">{{ post.Time }}</div>
            <a class="postCardContact rt" v-bind:href="'tel:' + post.Contact.Name">联系</a>
            <div class="postInterested rt" v-bind:class="{ active: post.IsLike }">{{ post.Like }}人感兴趣</div>
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
    width: 90%;
    margin: 0 auto 0.2rem;
    padding: 0.2rem;
    background-color: #fff;
}
</style>

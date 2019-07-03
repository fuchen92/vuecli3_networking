<template>
    <div class="guestCard">
        <router-link class="guestCardLink" :to="'/guest?guestId=' + guest.Id">
            <div class="guestAvatar">
                <img class="guestPhoto" :src="guest.Photo" alt="">
            </div>
            <div class="guestInfo">
                <p class="guestName">{{ guest.Name }}</p>
                <p class="guestCompany">{{ guest.Company }}</p>
                <p class="guestJob">{{ guest.JobTitle }}</p>
            </div>
        </router-link>
        <div class="guestOpts">
            <router-link class="inviteLink" :to="'/invite?inviteId=' + guest.Id" v-if="guest.Role != 4">
                邀约会面
            </router-link>
            <b class="guestOptDivide" v-if="guest.Role != 4"></b>
            <router-link class="guestChatLink" :class="{ large: guest.Role == 4 }" :to="'/chat?chatId=' + guest.Id">
                发消息
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
    name: "GuestCard",
    data: function() {
        return {

        }
    },
    props: {
        guest: {
            type: Object
        }
    }
}
</script>
<style>
.guestCard {
    width: 95%;
    margin: 0 auto 0.2rem;
    background-color: #fff;
}
.guestCard:last-child {
    margin-bottom: 0;
}
.guestCardLink {
    padding: 0.2rem;
    font-size: 0;
}
.guestAvatar, .guestInfo {
    display: inline-block;
    vertical-align: top;
}
.guestAvatar {
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
    border-radius: 100%;
    overflow: hidden;
}
.guestPhoto {
    width: 100%;
}
.guestInfo {
    width: calc(100% - 1.2rem);
}
.guestName, .guestCompany, .guestJob {
    font-size: 0.28rem;
    line-height: 0.4rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: #2c3e50;
}
.guestName {
    font-weight: bold;
}
.guestOpts {
    font-size: 0;
    border-top: 0.02rem solid #f0f1f2;
}
.inviteLink, .guestOptDivide, .guestChatLink {
    display: inline-block;
    vertical-align: middle;
}
.guestOptDivide {
    height: 0.4rem;
    border-left: 0.02rem solid #f0f1f2;
}
.inviteLink, .guestChatLink {
    width: calc((100% - 0.02rem) / 2);
    font-size: 0.24rem;
    line-height: 0.8rem;
    text-align: center;
    color: var(--themeColor);
}
.guestChatLink.large {
    width: 100%;
}
</style>

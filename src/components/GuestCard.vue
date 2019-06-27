<template>
    <div class="guestCard">
        <router-link class="guestLink" :to="'/guest?guestId=' + guestId">
            <div class="guestAvatar">
                <img class="guestPhoto" src="../assets/avatar.jpg" alt="">
            </div>
            <div class="guestInfo">
                <p class="guestName">张三</p>
                <p class="guestCompany">公安局</p>
                <p class="guestJob">警察</p>
            </div>
        </router-link>
        <div class="guestOpts">
            <router-link class="inviteLink" :to="'/invite?inviteId=' + guestId">
                邀约会面
            </router-link>
            <b class="guestOptDivide"></b>
            <router-link class="guestChatLink" :to="'/chat?chatId=' + guestId">
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
        guestId: {
            type: Number
        }
    }
}
</script>
<style>
.guestCard {
    margin-bottom: 0.2rem;
    background-color: #fff;
}
.guestCard:last-child {
    margin-bottom: 0;
}
.guestLink {
    padding: 0.4rem 0.2rem 0.2rem;
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
    font-size: 0.28rem;
    line-height: 0.8rem;
    text-align: center;
    color: #2c3e50;
}
</style>

<template>
    <div class="chat">
        <NavBar :showSearch="false" :backUrl="backUrl" :navBarTitle="navBarTitle"></NavBar>
        <div class="chatBox">
            <div class="container">
                <div class="chatRules">
                    <p class="ruleCaption">{{ $t("chat.chatRule") }}</p>
                    <p class="ruleItem">1. {{ $t("chat.rule1") }}</p>
                    <p class="ruleItem">2. {{ $t("chat.rule2") }}</p>
                    <p class="ruleItem">3. {{ $t("chat.rule3") }}</p>
                </div>
                <div class="chatList">
                    <template v-for="chat in chatList">
                        <template v-if="chat.Type == 0">
                            <div class="chatItem" v-bind:id="'msg' + chat.Id" v-bind:class="{ meItem: chat.NetUserId != chatId }" v-bind:key="chat.Id">
                                <div class="chatUserAvatar">
                                    <img v-bind:src="chat.NetUserId == chatId ? chatUserPhoto : myPhoto" alt="">
                                </div>
                                <div class="chatContent">{{ chat.Content }}</div>
                            </div>
                        </template>
                        <template v-else-if="chat.Type == 1">
                            <div class="chatItem" v-bind:id="'msg' + chat.Id" v-bind:class="{ meItem: chat.NetUserId != chatId }" v-bind:key="chat.Id">
                                <div class="chatUserAvatar">
                                    <img v-bind:src="chat.NetUserId == chatId ? chatUserPhoto : myPhoto" alt="">
                                </div>
                                <div class="chatContent">
                                    <p class="chatCardCaption">{{ $t("chat.businessCard") }}</p>
                                    <div class="chatCard">
                                        <div class="chatCardItem">
                                            <img class="chatCardIcon" src="../assets/iconName.svg" alt="">
                                            <span class="chatCardText">{{ chat.Content.Name || $t("chat.emptyVal") }}</span>
                                        </div>
                                        <div class="chatCardItem">
                                            <img class="chatCardIcon" src="../assets/iconCompany.svg" alt="">
                                            <span class="chatCardText">{{ chat.Content.Company || $t("chat.emptyVal") }}</span>
                                        </div>
                                        <div class="chatCardItem">
                                            <img class="chatCardIcon" src="../assets/iconJobtitle.svg" alt="">
                                            <span class="chatCardText">{{ chat.Content.JobTitle || $t("chat.emptyVal") }}</span>
                                        </div>
                                        <div class="chatCardItem">
                                            <img class="chatCardIcon" src="../assets/iconMobile.svg" alt="">
                                            <span class="chatCardText">{{ chat.Content.Mobile || $t("chat.emptyVal") }}</span>
                                        </div>
                                        <div class="chatCardItem">
                                            <img class="chatCardIcon" src="../assets/iconEmail.svg" alt="">
                                            <span class="chatCardText">{{ chat.Content.Mail || $t("chat.emptyVal") }}</span>
                                        </div>
                                        <div class="chatCardItem">
                                            <img class="chatCardIcon" src="../assets/iconWechat.svg" alt="">
                                            <span class="chatCardText">{{ chat.Content.WeChat || $t("chat.emptyVal") }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <template v-else-if="chat.Type == 2">
                            <div class="chatItem" v-bind:id="'msg' + chat.Id" v-bind:class="{ meItem: chat.NetUserId != chatId }" v-bind:key="chat.Id">
                                <div class="chatUserAvatar">
                                    <img v-bind:src="chat.NetUserId == chatId ? chatUserPhoto : myPhoto" alt="">
                                </div>
                                <div class="chatContent">
                                    <p class="chatCardCaption inviteCaption">{{ $t("chat.invite") }}</p>
                                    <div class="chatCard">
                                        <div class="chatCardItem">
                                            <img class="chatCardIcon" src="../assets/iconLocation.svg" alt="">
                                            <span class="chatCardText">{{ chat.Content.Location }}</span>
                                        </div>
                                        <div class="chatCardItem">
                                            <img class="chatCardIcon" src="../assets/iconTime.svg" alt="">
                                            <span class="chatCardText">{{ chat.Content.Time }}</span>
                                        </div>
                                    </div>
                                    <router-link class="inviteLink clear" v-bind:to="'/invite?id=' + chat.Content.Id">
                                        <span class="inviteLinkText lt">{{ $t("chat.checkDetail") }}</span>
                                        <span class="inviteLinkRightArrow"></span>
                                    </router-link>
                                </div>
                            </div>
                        </template>
                    </template>
                </div>
            </div>
        </div>
        <div class="chatOpts">
            <div class="sendCard">
                <img class="sendCardImg" src="../assets/iconSendcard.svg" alt="">
                {{ $t("chat.cardBtn") }}
            </div>
            <textarea class="chatInput"></textarea>
            <button class="sendMsgBtn">{{ $t("chat.sendBtn") }}</button>
        </div>
    </div>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
    name: "Chat",
    data: function() {
        return {
            backUrl: "/message",
            navBarTitle: this.$i18n.messages[this.$store.state.Lang].chat.navBarTitle,
            chatId: this.$route.query.chatId,
            chatUserPhoto: "",
            myPhoto: "../assets/avatar.jpg"
        }
    },
    components: {
        NavBar
    },
    created: function() {
        console.log(this);
    }
}
</script>
<style>
.chat {
    position: relative;
    width: 100%;
    height: 100%;
}
.chatBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1.2rem 0;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.chatBox > .container {
    width: 95%;
}
.chatRules {
    margin-bottom: 0.2rem;
    padding: 0.2rem;
    font-size: 0.28rem;
    line-height: 0.4rem;
    background-color: #fff;
}
.ruleCaption {
    margin-bottom: 0.1rem;
    padding-bottom: 0.1rem;
    font-weight: bold;
    border-bottom: 1px solid #f0f1f2;
}
.ruleItem {
    font-size: 0.24rem;
}
.chatOpts {
    position: absolute;
    left: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 1rem;
    background-color: #fff;
}
.sendCard {
    width: 1rem;
    margin-right: 0.2rem;
    font-size: 0.24rem;
    line-height: 0.3rem;
    text-align: center;
}
.sendCardImg {
    width: 0.5rem;
    margin: 0.1rem auto;
}
.chatInput {
    width: calc(100% - 2.4rem);
    height: 0.8rem;
    margin: 0.1rem 0 0;
    border: 0;
    border-bottom: 1px solid #f0f1f2;
}
.sendMsgBtn {
    width: 1rem;
    height: 0.6rem;
    margin: 0.2rem 0.1rem 0;
    font-size: 0.28rem;
    line-height: 0.6rem;
    text-align: center;
    background-color: var(--themeColor);
    border-radius: 0.1rem;
    color: #fff;
}
</style>

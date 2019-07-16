<template>
    <div class="chat">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="chatBox" ref="chatBox">
            <div class="chatRules">
                <p class="ruleCaption">{{ $t("chat.chatRule") }}</p>
                <p class="ruleItem">1. {{ $t("chat.rule1") }}</p>
                <p class="ruleItem">2. {{ $t("chat.rule2") }}</p>
                <p class="ruleItem">3. {{ $t("chat.rule3") }}</p>
            </div>
            <div class="chatList">
                <template v-for="chat in chatList">
                    <template v-if="chat.Type == 0">
                        <div class="chatItem clear" v-bind:id="'msg' + chat.Id" v-bind:class="[chat.NetUserId != chatUser.id ? 'meItem' : 'fromItem']" v-bind:key="chat.Id">
                            <div class="chatUserAvatar">
                                <img class="chatUserPhoto" v-bind:src="chat.NetUserId == chatUser.id ? chatUser.photo : myInfo.Photo" alt="">
                            </div>
                            <div class="chatContent">
                                {{ chat.Content }}
                            </div>
                        </div>
                    </template>
                    <template v-else-if="chat.Type == 1">
                        <div class="chatItem clear" v-bind:id="'msg' + chat.Id" v-bind:class="[chat.NetUserId != chatUser.id ? 'meItem' : 'fromItem']" v-bind:key="chat.Id">
                            <div class="chatUserAvatar">
                                <img class="chatUserPhoto" v-bind:src="chat.NetUserId == chatUser.id ? chatUser.photo : myInfo.Photo" alt="">
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
                                        <img class="chatCardIcon" src="../assets/iconMobileRed.svg" alt="">
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
                        <div class="chatItem clear" v-bind:id="'msg' + chat.Id" v-bind:class="[chat.NetUserId != chatUser.id ? 'meItem' : 'fromItem']" v-bind:key="chat.Id">
                            <div class="chatUserAvatar">
                                <img class="chatUserPhoto" v-bind:src="chat.NetUserId == chatUser.id ? chatUser.photo : myInfo.Photo" alt="">
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
                                <router-link class="inviteLink clear" v-bind:to="'/invitedetail?id=' + chat.Content.Id">
                                    <span class="inviteLinkText lt">{{ $t("chat.checkDetail") }}</span>
                                    <span class="inviteLinkRightArrow rt"></span>
                                </router-link>
                            </div>
                        </div>
                    </template>
                </template>
            </div>
        </div>
        <div class="chatOpts">
            <div class="sendCard" @click="sendCard">
                <img class="sendCardImg" src="../assets/iconSendcard.svg" alt="">
                {{ $t("chat.cardBtn") }}
            </div>
            <input class="chatInput" v-model.trim="chatMsg">
            <!-- <textarea class="chatInput" v-model.trim="chatMsg"></textarea> -->
            <button class="sendMsgBtn" @click="sendMsg" :disabled="sendDisabled">{{ $t("chat.sendBtn") }}</button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
import NavBar from "@/components/NavBar";
export default {
    name: "Chat",
    data: function() {
        return {     
            chatUser: {
                id: this.$route.query.chatId,
                // name: this.$route.query.uName,
                // company: this.$route.query.uCompany,
                // job: this.$route.query.uJob,
                photo: this.$route.query.uPhoto
            },
            chatMsg: "",
            sendDisabled: false,
            timer: null,
            myPhoto: require("../assets/avatar.jpg"),
            msgArr: []
        }
    },
    components: {
        NavBar
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].chat.navBarTitle
        },
        chatList: function() {
            return this.$store.getters.getChatListById(this.chatUser.id)
        },
        unReadList: function() {
            return this.$store.getters.getUnReadListById(this.chatUser.id)
        },
        ...mapState({
            apiDomain: state => state.ApiDomain,
			lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            // chatList: state => state.MessageList,
            myInfo: state => state.MyInfomation
		})
    },
    watch: {
        chatList: function() {            
            this.$nextTick(function() {
                this.$refs.chatBox.scrollTop = this.$refs.chatBox.scrollHeight;
            })
        }
    },
    methods: {
        ...mapActions([
            "getMessageList",
            "getMyInfo"
        ]),
        ...mapMutations([
            "ADDNEWCHAT",
            "RESETUNREADLIST"
        ]),
        sendMsg: function() {
            if(this.chatMsg == "" || this.chatMsg.length == 0) {
                return false;
            }
            this.sendDisabled = true;
            this.$http.post(`${this.apiDomain}/Attendees/ChatSend`, {
                eventNo: this.eventNo,
                target: this.chatUser.id,
                type: 0,
                content: this.chatMsg,
                token: this.token,
                lang: this.lang == "zh" ? 1 : 2
            }).then(res => {
                let msgId = res.data.Data
                this.sendDisabled = false;
                let temp = {
                    Content: this.chatMsg,
                    Id: msgId,
                    NetUserId: this.myInfo.Id,
                    ReadTime: "0001-01-01T00:00:00",
                    SentTime: new Date().toJSON().replace("T", " ").substr(0, 19),
                    TargetNetUserId: this.chatUser.id,
                    Type: 0
                }
                this.ADDNEWCHAT({ id: this.chatUser.id, item: temp });
                this.chatMsg = "";
            })
        },
        sendCard: function() {
            var r = window.confirm("即将发送您的联系方式（包括手机、邮箱、微信等）给对象，请确认");
            if(r) {
                console.log("确定发送名片")
                this.$http.post(`${this.apiDomain}/Attendees/ChatSend`, {
                    eventNo: this.eventNo,
                    target: this.chatUser.id,
                    type: 1,
                    content: "",
                    token: this.token,
                    lang: this.lang == "zh" ? 1 : 2
                }).then(res => {
                    console.log(res.data)
                    console.log(this.myInfo);
                    let msgId = res.data.Data
                    let { Name, Company, JobTitle, Mobile, Mail, WeChat } = this.myInfo;
                    
                    let temp = {
                        Content: {
                            Name: Name,
                            Company: Company,
                            JobTitle: JobTitle,
                            Mobile: Mobile,
                            Mail: Mail,
                            WeChat: WeChat
                        },
                        Id: msgId,
                        NetUserId: this.myInfo.Id,
                        ReadTime: "0001-01-01T00:00:00",
                        SentTime: new Date().toJSON().replace("T", " ").substr(0, 19),
                        TargetNetUserId: this.chatUser.id,
                        Type: 1
                    }
                    this.ADDNEWCHAT({ id: this.chatUser.id, item: temp });
                })
            }
        }
    },
    created: function() {
        this.getMyInfo({ eventNo: this.eventNo, token: this.token, lang: this.lang == 'zh' ? 1 : 2 });
        // this.getMessageList({
        //     eventNo: this.eventNo,
        //     target: this.chatUser.id,
        //     before: -1,
        //     size: -1,
        //     token: this.token,
        //     after: -1,
        //     lang: this.lang == "zh" ? 1 : 2
        // });
        // console.log(this.unReadList);
        if(this.unReadList != undefined && this.unReadList.length != 0) {
            this.$http.post(`${this.apiDomain}/Attendees/ChatReadList`, {
                ids: this.unReadList,
                token: this.token
            }).then(res => {
                console.log(res.data)
                if(res.data.Code == 0) {
                    this.RESETUNREADLIST({ targetId: this.chatUser.id })
                } else {
                    console.log('未知错误')
                }
            })
        }
        if(this.chatList == "" || this.chatList == null || this.chatList == undefined) {
            this.$http.post(`${this.apiDomain}/Attendees/UserChat`, {
                eventNo: this.eventNo,
                target: this.chatUser.id,
                before: -1,
                size: 999999,
                token: this.token,
                after: -1,
                lang: this.lang == "zh" ? 1 : 2
            }).then(res => {
                this.$store.commit("INITMESSAGELIST", { targetId: this.chatUser.id, msgList: res.data.Data });
                this.timer = setTimeout(() => {
                    this.$refs.chatBox.scrollTop = 999999;
                }, 1);
            })
        }
    },
    mounted: function() {
        // this.timer = setTimeout(() => {
            this.$refs.chatBox.scrollTop = 999999;
        // }, 1);
    },
    beforeDestroy: function() {
        clearTimeout(this.timer);
        this.timer = null;
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
    /* scroll-behavior: smooth; */
}
.chatRules {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto 0.4rem;
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
.chatList {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto;
    overflow: hidden;
}
.chatItem {
    width: 100%;
    margin-bottom: 0.4rem;
}
.chatUserAvatar, .chatContent {
    float: left;
}
.meItem .chatUserAvatar, .meItem .chatContent {
    float: right;
}
.chatUserAvatar {
    width: 0.8rem;
    height: 0.8rem;
    margin-right: 0.3rem;
    border-radius: 100%;
    overflow: hidden;
}
.meItem .chatUserAvatar {
    margin-right: 0;
    margin-left: 0.3rem;
}
.chatUserPhoto {
    width: 100%;
}
.chatContent {
    position: relative;
    width: auto;
    max-width: 5rem;
    padding: 0.2rem;
    font-size: 0.28rem;
    line-height: 0.4rem;
    background-color: #fff;
}
.chatContent::before {
    position: absolute;
    content: "";
    top: 0.2rem;
    border: 0.2rem solid transparent;
    z-index: 100;
}
.fromItem .chatContent::before {
    left: -0.4rem; 
    border-right-color: #fff;
    border-right-width: 0.3rem;
}
.meItem .chatContent::before {
    right: -0.4rem;
    border-left-color: #fff;
    border-left-width: 0.3rem;
}
.chatText {
    font-size: 0.28rem;
    line-height: 0.5rem;
}
.chatCardCaption {
    margin: 0.1rem 0;
    font-size: 0.28rem;
}
.chatCard {
    width: 5rem;
}
.chatCardItem {
    box-sizing: border-box;
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    font-size: 0;
    border: 0.02rem solid #f0f1f2;
}
.chatCardIcon, .chatCardText {
    display: inline-block;
    vertical-align: middle;
}
.chatCardIcon {
    width: 0.4rem;
    margin-right: 0.2rem;
}
.chatCardText {
    width: calc(100% - 0.6rem);
    font-size: 0.28rem;
    line-height: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.inviteLink {
    color: var(--themeColor);
}
.inviteLinkRightArrow {
    box-sizing: border-box;
    width: 0.4rem;
    height: 0.4rem;
    background: url(../assets/rightArrow32.png) center center/0.3rem auto no-repeat;
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
    height: 0.6rem;
    margin: 0.3rem 0 0;
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

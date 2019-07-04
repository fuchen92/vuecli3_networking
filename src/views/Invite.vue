<template>
    <div class="invite">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="inviteBox">
            <div class="inviteChunk">
                <h4 class="inviteChunkCaption">邀约对象</h4>
                <div class="invitePeople">
                    <div class="invitePeopleAvatar">
                        <img class="invitePeoplePhoto" :src="invitePeople.photo" alt="">
                    </div>
                    <div class="invitePeopleInfo">
                        <h4 class="invitePeopleName">{{ invitePeople.name }}</h4>
                        <p class="invitePeopleJob">{{ invitePeople.job }}</p>
                        <p class="invitePeopleCompany">{{ invitePeople.company }}</p>
                    </div>
                </div>
            </div>
            <div class="inviteChunk">
                <h4 class="inviteChunkCaption">邀约卡片</h4>
                <p class="inviteDesc">以下信息将发送给对方，包括您的手机号码和邮箱。</p>
                <div class="inviteCard">
                    <div class="inviteCardItem">
                        <img class="inviteCardItemIcon" src="../assets/iconName.svg" alt="">
                        <p class="inviteCardItemContent">{{ myInfo.Name }}</p>
                    </div>
                    <div class="inviteCardItem">
                        <img class="inviteCardItemIcon" src="../assets/iconMobileRed.svg" alt="">
                        <p class="inviteCardItemContent">{{ myInfo.Mobile }}</p>
                    </div>
                    <div class="inviteCardItem">
                        <img class="inviteCardItemIcon" src="../assets/iconEmail.svg" alt="">
                        <p class="inviteCardItemContent">{{ myInfo.Email }}</p>
                    </div>
                    <div class="inviteCardItem">
                        <img class="inviteCardItemIcon" src="../assets/iconTime.svg" alt="">
                        <div class="inviteCardItemContent">
                            <input class="inviteDate" type="date" v-model="inviteDate">
                            <input class="inviteTime" type="time" v-model="inviteTime">
                        </div>
                    </div>
                    <div class="inviteCardItem">
                        <img class="inviteCardItemIcon" src="../assets/iconLocation.svg" alt="">
                        <div class="inviteCardItemContent">
                            <input class="inviteAddr" type="text" placeholder="请输入邀约地址">
                        </div>
                    </div>
                </div>
            </div>
            <div class="inviteChunk">
                <h4 class="inviteChunkCaption">邀约事项</h4>
                <div class="inviteMatter">
                    <textarea class="inviteMatterInput" :placeholder="$t('invite.matterInput')"></textarea>
                </div>
            </div>
            <button class="inviteSubmitBtn">发出邀约</button>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar";
export default {
    name: "Invite",
    data: function() {
        let { inviteId, uName, uCompany, uJob, uPhoto } = this.$route.query;
        return {
            invitePeople: {
                id: inviteId,
                name: uName,
                company: uCompany,
                job: uJob,
                photo: uPhoto
            },
            inviteDate: "2019-08-27",
            inviteTime: "12:00"
        }
    },
    components: {
        NavBar
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].invite.navBarTitle
        },
         ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            myInfo: state => state.MyInfomation
        })
    },
    methods: {
        ...mapActions([
            "getMyInfo"
        ])
    },
    created: function() {
        this.getMyInfo({ eventNo: this.eventNo, token: this.token })
        console.log(this.invitePeople)
    }
}
</script>
<style>
.invite {
    position: relative;
    width: 100%;
    height: 100%;
}
.inviteBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1.2rem 0 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.inviteChunk {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto 0.2rem;
    padding: 0.2rem;
    font-size: 0;
    background-color: #fff;
}
.inviteChunkCaption {
    box-sizing: border-box;
    height: 0.8rem;
    font-size: 0.3rem;
    font-weight: normal;
    line-height: 0.78rem;
    border-bottom: 0.02rem solid #f0f1f2;
}
.invitePeople {
    margin-top: 0.2rem;
}
.invitePeopleAvatar, .invitePeopleInfo {
    display: inline-block;
    vertical-align: top;
}
.invitePeopleAvatar {
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
    border-radius: 100%;
    overflow: hidden;
}
.invitePeoplePhoto {
    width: 100%;
}
.invitePeopleInfo {
    width: calc(100% - 1.2rem);
}
.invitePeopleName, .invitePeopleJob, .invitePeopleCompany {
    font-size: 0.28rem;
    line-height: 0.4rem;
}
.inviteDesc {
    margin: 0.2rem 0;
    font-size: 0.24rem;
    color: #666;
}
.inviteCardItem {

    height: 0.8rem;
    margin: 0 auto 0.2rem;
    padding: 0 0.2rem;
    font-size: 0;
    border: 0.02rem solid #f0f1f2;
}
.inviteCardItemIcon, .inviteCardItemContent {
    display: inline-block;
    vertical-align: middle;
}
.inviteCardItemIcon {
    width: 0.4rem;
    margin-right: 0.2rem;
}
.inviteCardItemContent {
    width: calc(100% - 0.6rem);
    height: 0.8rem;
    font-size: 0.28rem;
    line-height: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.inviteDate, .inviteTime {
    width: 48%;
    height: 0.8rem;
    border: 0;
    background-color: #fff;
}
.inviteDate {
    margin-right: 4%;
}
.inviteAddr {
    width: 100%;
    height: 0.8rem;
    border: 0;
}
.inviteMatter {
    margin-top: 0.2rem;
}
.inviteMatterInput {
    width: 100%;
    height: 1.2rem;
    border: 0;
    resize: none;
}
.inviteSubmitBtn {
    display: block;
    width: 95%;
    height: 1rem;
    margin: 0 auto;
    font-size: 0.28rem;
    line-height: 1rem;
    text-align: center;
    background-color: var(--themeColor);
    color: #fff;
}
</style>

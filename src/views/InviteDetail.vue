<template>
    <div class="inviteDetail">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="inviteDetailBox">
            <div class="inviteDetailChunk">
                <div class="inviteDetailUser">
                    <div class="inviteDetailAvatar">
                        <img class="inviteDetailPhoto" :src="inviteDetail.NetUserInfo.Photo" alt="">
                    </div>
                    <div class="inviteDetailUserInfo">
                        <h4 class="inviteDetailUserName">{{ inviteDetail.NetUserInfo.Name }}</h4>
                        <p class="inviteDetailUserJob">{{ inviteDetail.NetUserInfo.JobTitle }}</p>
                        <p class="inviteDetailUserCompany">{{ inviteDetail.NetUserInfo.Company }}</p>
                    </div>
                </div>
                <p class="inviteDetailContent">{{ inviteDetail.Content }}</p>
            </div>
            <div class="inviteDetailChunk">
                <div class="inviteDetailInfoItem">
                    <img class="inviteDetailItemIcon" src="../assets/iconName.svg" alt="">
                    <p class="inviteDetailItemContent">{{ inviteDetail.NetUserInfo.ContactList[0].Name }}</p>
                </div>
                <div class="inviteDetailInfoItem">
                    <img class="inviteDetailItemIcon" src="../assets/iconEmail.svg" alt="">
                    <p class="inviteDetailItemContent">{{ inviteDetail.NetUserInfo.ContactList[1].Name }}</p>
                </div>
                <div class="inviteDetailInfoItem">
                    <img class="inviteDetailItemIcon" src="../assets/iconTime.svg" alt="">
                    <p class="inviteDetailItemContent">{{ $pattern(inviteDetail.Time, "yyyy-MM-dd HH:mm") }}</p>
                </div>
                <div class="inviteDetailInfoItem">
                    <img class="inviteDetailItemIcon" src="../assets/iconLocation.svg" alt="">
                    <p class="inviteDetailItemContent">{{ inviteDetail.Location }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar";
export default {
    name: "InviteDetail",
    data: function() {
        return {
            inviteDetailId: this.$route.query.id
        }
    },
    components: {
        NavBar
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].inviteDetail.navBarTitle
        },
        ...mapState({
			lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            inviteDetail: state => state.InviteDetail
		})
    },
    methods: {
        ...mapActions([
            "getInviteDetail"
        ])
    },
    created: function() {
        this.getInviteDetail({ eventNo: this.eventNo, id: this.inviteDetailId, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
    }
}
</script>
<style>
.inviteDetail {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1.2rem 0 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.inviteDetailChunk {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto 0.2rem;
    padding: 0.2rem;
    font-size: 0;
    background-color: #fff;
}
.inviteDetailUser {
    margin-bottom: 0.4rem;
}
.inviteDetailAvatar, .inviteDetailUserInfo {
    display: inline-block;
    vertical-align: top;
}
.inviteDetailAvatar {
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
    border-radius: 100%;
    overflow: hidden;
}
.inviteDetailPhoto {
    width: 100%;
}
.inviteDetailUserInfo {
    width: calc(100% - 1.2rem);
}
.inviteDetailUserName, .inviteDetailUserJob, .inviteDetailUserCompany {
    font-size: 0.28rem;
    line-height: 0.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.inviteDetailUserName {
    font-weight: bold;
}
.inviteDetailContent {
    font-size: 0.28rem;
    line-height: 0.4rem;
}
.inviteDetailInfoItem {
    height: 0.8rem;
    margin: 0 auto 0.2rem;
    padding: 0 0.2rem;
    font-size: 0;
    border: 0.02rem solid #f0f1f2;
}
.inviteDetailItemIcon, .inviteDetailItemContent {
    display: inline-block;
    vertical-align: middle;
}
.inviteDetailItemIcon {
    width: 0.4rem;
    margin-right: 0.2rem;
}
.inviteDetailItemContent {
    width: calc(100% - 0.6rem);
    height: 0.8rem;
    font-size: 0.28rem;
    line-height: 0.8rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

<template>
    <div class="guest">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="guestBox">
            <div class="guestChunk">
                <div class="guestAvatar">
                    <img class="guestPhoto" :src="guest.Photo" alt="">
                </div>
                <div class="guestInfo">
                    <h4 class="guestName">{{ guest.Name }}</h4>
                    <p class="guestJob">{{ guest.JobTitle }}</p>
                    <p class="guestCompany">{{ guest.Company }}</p>
                </div>
            </div>
            <div class="guestChunk">
                <h4 class="guestChunkCaption">{{ $t("guest.introLabel") }}</h4>
                <p class="guestIntro">
                    {{ (guest.Intro == "" || guest.Intro == null) ? $t("guest.emptyVal") : guest.Intro }}
                </p>
            </div>
            <div class="guestChunk" v-if="guest.ProgramList != null && guest.ProgramList.length != 0">
                <h4 class="guestChunkCaption">{{ $t("guest.participateCaption") }}</h4>
                <ul class="participateList">
                    <li class="participateItem" v-for="(participate, index) in guest.ProgramList" :key="index">
                        <div class="participateInfo">
                            <p class="participateTime">
                                {{ participate.Begin.split("T")[1].substr(0, 5) }} - {{ participate.End.split("T")[1].substr(0, 5) }}
                            </p>
                            <p class="participateType">
                                {{ participate.TypeName }}
                            </p>
                            <h4 class="participateTopic">{{ participate.Topic }}</h4>
                        </div>
                        <router-link class="participateLink" :to="'/programdetail?programId=' + participate.Id">
                            {{ $t("speaker.view") }}
                        </router-link>
                    </li>
                </ul>
            </div>
            <div class="guestChunk" v-if="guest.Role != 4 || guest.ContactList.length > 0">
                <div class="guestChunkContactTitle clear">
                    <h4 class="guestChunkCaption lt">{{ $t("guest.contactLabel") }}</h4>
                    <span class="sendCardLabel rt" v-if="guest.Id != myInfo.Id">{{ $t("guest.sendCard") }}</span>
                </div>
                <div class="guestContact">
                    <div class="guestContactItem clear">
                        <p class="guestContactItemName lt">{{ $t("guest.mobileLabel") }}</p>
                        <p class="guestContactItemVal rt">{{ (guest.ContactList[0] == "" || guest.ContactList[0] == null) ? $t("guest.emptyVal") : guest.ContactList[0].Name }}</p>
                    </div>
                    <div class="guestContactItem clear">
                        <p class="guestContactItemName lt">{{ $t("guest.emailLabel") }}</p>
                        <p class="guestContactItemVal rt">{{ (guest.ContactList[1] == "" || guest.ContactList[1] == null) ? $t("guest.emptyVal") : guest.ContactList[1].Name }}</p>
                    </div>
                    <div class="guestContactItem clear">
                        <p class="guestContactItemName lt">{{ $t("guest.wechatLabel") }}</p>
                        <p class="guestContactItemVal rt">{{ (guest.ContactList[2] == "" || guest.ContactList[2] == null) ? $t("guest.emptyVal") : guest.ContactList[2].Name }}</p>
                    </div>
                </div>
            </div>
            <template v-if="guest.SolutionList.length != 0">                
                <div class="guestChunk" v-for="(solution, index) in guest.SolutionList" :key="solution.Id">
                    <h4 class="guestChunkCaption" v-if="index == 0">{{ $t("guest.demandLabel") }}</h4>
                    <div class="guestDemand">
                        <p class="demandContent">{{ solution.Intro }}</p>
                        <div class="demandBottom clear">
                            <p class="demandTime lt">{{ solution.Time.split("T")[0].substr(5, 5) + " " + solution.Time.split("T")[1].substr(0, 5) }}</p>
                            <div class="demandLike rt" :class="{ active: solution.IsLike }" :data-id="solution.Id" :data-index="index">
                                {{ $tc("guest.interest", solution.Like) }}
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="guestLinks" v-if="guest.Id != myInfo.Id">
            <router-link v-if="guest.Role == 2" class="guestLink inviteLink" :to="`/invite?inviteId=${guest.Id}&uName=${guest.Name}&uCompany=${guest.Company}&uJob=${guest.JobTitle}&uPhoto=${guest.Photo}`">
                {{ $t("guest.inviteLabel") }}
            </router-link>
            <b class="guestLinkDivide" v-if="guest.Role == 2"></b>
            <router-link class="guestLink chatLink" :class="{ large: guest.Role != 2 }" :to="`/chat?chatId=${guest.Id}&uName=${guest.Name}&uCompany=${guest.Company}&uJob=${guest.JobTitle}&uPhoto=${guest.Photo}`">
                {{ $t("guest.chatLabel") }}
            </router-link>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar";
export default {
    name: "Guest",
    data: function() {
        return {
            guestId: this.$route.query.guestId
        }
    },
    components: {
        NavBar
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].guest.navBarTitle
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            guest: state => state.GuestDetail,
            myInfo: state => state.MyInfomation
        })
    },
    methods: {
        ...mapActions([
            "getGuestDetail",
            "getMyInfo"
        ])
    },
    created: function() {
        this.getMyInfo({ eventNo: this.eventNo, token: this.token })
        this.getGuestDetail({ eventNo: this.eventNo, id: this.guestId, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
    }
}
</script>
<style scoped>
.guest {
    position: relative;
    width: 100%;
    height: 100%;
}
.guestBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1.2rem 0 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.guestChunk {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto 0.2rem;
    padding: 0.3rem 0.2rem;
    font-size: 0;
    background-color: #fff;
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
.guestName, .guestJob, .guestCompany {
    font-size: 0.28rem;
    line-height: 0.4rem;
}
.guestChunkCaption {
    font-size: 0.28rem;
}
.guestIntro {
    margin-top: 0.1rem;
    font-size: 0.24rem;
    line-height: 0.4rem;
}
.participateList {
    margin-top: 0.2rem;
}
.participateItem {
    margin-bottom: 0.2rem;
    font-size: 0;
}
.participateInfo, .participateLink {
    display: inline-block;
    vertical-align: middle;
}
.participateLink {
    box-sizing: border-box;
    width: 2rem;
    height: 0.6rem;
    margin-left: 0.2rem;
    font-size: 0.24rem;
    line-height: 0.56rem;
    text-align: center;
    border: 0.02rem solid #f0f1f2;
    border-radius: 0.3rem;
    color: #999;
}
.participateInfo {
    width: calc(100% - 2.2rem);
}
.participateType, .participateTime {
    font-size: 0.24rem;
    line-height: 0.4rem;
}
.participateTopic {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: var(--themeColor);
}
.sendCardLabel {
    box-sizing: border-box;
    height: 0.4rem;
    padding: 0 0.2rem;
    font-size: 0.24rem;
    line-height: 0.36rem;
    text-align: center;
    border: 0.02rem solid #f0f1f2;
    border-radius: 0.3rem;
}
.guestContact {
    margin-top: 0.2rem;
}
.guestContactItem {
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    font-size: 0.24rem;
    line-height: 0.8rem;
    border: 0.02rem solid #f0f1f2;
}
.guestContactItemName, .guestContactItemVal {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.guestContactItemName {
    width: 2.4rem;
}
.guestContactItemVal {
    width: calc(100% - 2.4rem);
    text-align: right;
}
.guestDemand {
    margin-top: 0.2rem;
}
.demandContent {
    font-size: 0.24rem;
}
.demandBottom {
    margin-top: 0.2rem;
    padding-top: 0.2rem;
    font-size: 0.24rem;
    border-top: 0.02rem solid #f0f1f2;
}
.guestLinks {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1rem;
    font-size: 0;
    background-color: #fff;
}
.guestLink, .guestLinkDivide {
    display: inline-block;
    vertical-align: middle;
}
.guestLinkDivide {
    height: 0.4rem;
    border-left: 0.02rem solid #f0f1f2;
}
.guestLink {
    width: calc((100% - 0.02rem) / 2);
    height: 1rem;
    font-size: 0.28rem;
    line-height: 1rem;
    text-align: center;
    color: #2c3e50;
}
.guestLink.large {
    width: 100%;
}
</style>

<template>
    <div class="exhibitor">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="exhibitorBox">
            <div class="exhibitorChunk">
                <div class="exhibitorAvatar">
                    <img class="exhibitorLogo" :src="exhibitor.Photo" alt="">
                    <p class="exhibitorBooth">
                        <img class="exhibitorBoothImg" src="../assets/iconBooth.svg" alt="">
                        <span class="exhibitorBoothText">
                            {{ exhibitor.Booth }}
                        </span>
                    </p>
                </div>
                <div class="exhibitorInfo">
                    <h4 class="exhibitorName">
                        {{ exhibitor.Name }}
                    </h4>
                    <div class="exhibitorTags">
                        <span class="exhibitorTag" v-for="(industry, index) in exhibitor.Industry" :key="index">
                            {{ industry.Name }}
                        </span>
                    </div>
                    <p class="exhibitorSlogan" v-if="exhibitor.Intro2 != ''">
                        {{ exhibitor.Intro2 }}
                    </p>
                </div>
            </div>
            <div class="exhibitorChunk">
                <h4 class="exhibitorChunkCaption">
                    {{ $t("exhibitor.companyCaption") }}
                </h4>
                <p class="exhibitorIntro">
                    {{ exhibitor.Intro }}
                </p>
            </div>
            <div class="exhibitorChunk clear">
                <h4 class="exhibitorChunkCaption venueCaption lt">
                    {{ $t("exhibitor.boothCaption") }}
                </h4>
                <p class="venueCaret rt"></p>
            </div>
            <div class="exhibitorChunk" v-if="exhibitor.Products.length != 0">
                <h4 class="exhibitorChunkCaption">
                    {{ $t("exhibitor.schemeCaption") }}
                </h4>
                <div class="schemeList">
                    <router-link v-for="(scheme, index) in exhibitor.Products" :key="index" :to="`/product?productId=${scheme.Id}`" class="schemeItem">
                        <div class="schemeLogo">
                            <img class="schemeLogoImg" :src="scheme.Logo" alt="">
                        </div>
                        <div class="schemeInfo">
                            <h5 class="schemeTitle">
                                {{ scheme.Name }}
                            </h5>
                            <p class="schemeDesc">
                                {{ scheme.Summary }}
                            </p>
                        </div>
                    </router-link>
                </div>
            </div>
            <div class="exhibitorChunk">
                <h4 class="exhibitorChunkCaption">
                    {{ $t("exhibitor.contactCaption") }}
                </h4>
                <div class="exhibitorContact">
                    <div class="exhibitorContactItem clear">
                        <p class="exhibitorContactItemName lt">
                            {{ $t("exhibitor.contactLabel") }}
                        </p>
                        <p class="exhibitorContactItemVal rt">
                            {{ (exhibitor.localContactList[7] == "" || exhibitor.localContactList[7] == null) ? $t("exhibitor.emptyVal") : exhibitor.localContactList[7] }}
                        </p>
                    </div>
                    <div class="exhibitorContactItem clear">
                        <p class="exhibitorContactItemName lt">
                            {{ $t("exhibitor.mobileLabel") }}
                        </p>
                        <p class="exhibitorContactItemVal rt">
                            {{ (exhibitor.localContactList[0] == "" || exhibitor.localContactList[0] == null) ? $t("exhibitor.emptyVal") : exhibitor.localContactList[0] }}
                        </p>
                    </div>
                    <div class="exhibitorContactItem clear">
                        <p class="exhibitorContactItemName lt">
                            {{ $t("exhibitor.emailLabel") }}
                        </p>
                        <p class="exhibitorContactItemVal rt">
                            {{ (exhibitor.localContactList[1] == "" || exhibitor.localContactList[1] == null) ? $t("exhibitor.emptyVal") : exhibitor.localContactList[1] }}
                        </p>
                    </div>
                    <div class="exhibitorContactItem clear">
                        <p class="exhibitorContactItemName lt">
                            {{ $t("exhibitor.telLabel") }}
                        </p>
                        <p class="exhibitorContactItemVal rt">
                            {{ (exhibitor.localContactList[9] == "" || exhibitor.localContactList[9] == null) ? $t("exhibitor.emptyVal") : exhibitor.localContactList[9] }}
                        </p>
                    </div>
                    <div class="exhibitorContactItem clear">
                        <p class="exhibitorContactItemName lt">
                            {{ $t("exhibitor.siteLabel") }}
                        </p>
                        <p class="exhibitorContactItemVal rt">
                            {{ (exhibitor.localContactList[8] == "" || exhibitor.localContactList[8] == null) ? $t("exhibitor.emptyVal") : exhibitor.localContactList[8] }}
                        </p>
                    </div>
                </div>
            </div>
            <template v-if="exhibitor.Attendees.length > 0">
                <h4 class="exhibitorChunkCaption contactChunkCaption">{{ $t("exhibitor.designedContact") }}</h4>
                <template v-for="(guest, index) in exhibitor.Attendees">
                    <template v-if="guest.IsContact">
                        <GuestCard :guest="guest" :key="index"></GuestCard>
                    </template>
                </template>
                <h4 class="exhibitorChunkCaption contactChunkCaption">{{ $t("exhibitor.otherAttend") }}</h4>
                <template v-for="(guest, index) in exhibitor.Attendees">
                    <template v-if="!guest.IsContact">
                        <GuestCard :guest="guest" :key="index"></GuestCard>
                    </template>
                </template>
            </template>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar";
import GuestCard from "@/components/GuestCard";
export default {
    name: "Exhibitor",
    data: function() {
        return {
            exhibitorId: this.$route.query.exhibitorId
        }
    },
    components: {
        NavBar,
        GuestCard
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].exhibitor.navBarTitle
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            exhibitor: state => state.ExhibitorDetail
		})
    },
    methods: {
        ...mapActions([
            "getExhibitorDetail"
        ])
    },
    created: function() {
        this.getExhibitorDetail({ eventNo: this.eventNo, id: this.exhibitorId, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
    }
}
</script>
<style>
.exhibitor {
    position: relative;
    width: 100%;
    height: 100%;
}
.exhibitorBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1.2rem 0 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.exhibitorBox > .container {
    width: 95%;
}
.exhibitorChunk {
    box-sizing: border-box;
    width: 95%;
    /* width: 100%; */
    margin: 0 auto 0.2rem;
    padding: 0.4rem 0.2rem;
    font-size: 0;
    background-color: #fff;
}
.exhibitorChunk:last-child {
    margin-bottom: 0;
}
.exhibitorAvatar, .exhibitorInfo {
    display: inline-block;
    vertical-align: top;
}
.exhibitorAvatar {
    width: 1.6rem;
    margin-right: 0.2rem;
}
.exhibitorLogo {
    width: 100%;
}
.exhibitorBooth {
    margin-top: 0.2rem;
    text-align: center;
}
.exhibitorBoothImg, .exhibitorBoothText {
    display: inline-block;
    vertical-align: middle;
}
.exhibitorBoothImg {
    width: 0.3rem;
    margin-right: 0.1rem;
}
.exhibitorBoothText {
    font-size: 0.24rem;
    color: #777;
}
.exhibitorInfo {
    width: calc(100% - 1.8rem);
}
.exhibitorName {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: var(--themeColor);
}
.exhibitorChunk .exhibitorTags {
    height: auto;
    margin: 0.15rem 0 0;
    font-size: 0;
    overflow: hidden;
}
.exhibitorTag {
    display: inline-block;
    margin: 0 0.1rem 0.1rem 0;
    padding: 0.04rem 0.2rem;
    font-size: 0.24rem;
    line-height: 0.3rem;
    background-color: #f0f1f2;
    border-radius: 0.4rem;
    color: var(--themeColor);
}
.exhibitorSlogan {
    font-size: 0.24rem;
    line-height: 0.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666;
}
.exhibitorChunkCaption {
    font-size: 0.28rem;
}
.venueCaption {
    padding-left: 0.6rem;
    background: url(../assets/iconVenue.svg) left 0.1rem center/0.4rem auto no-repeat;
}
.venueCaret {
    width: 0.6rem;
    height: 0.4rem;
    background: url(../assets/rightArrow32.png) right 0.1rem center/0.3rem auto no-repeat;
}
.exhibitorIntro {
    margin-top: 0.1rem;
    font-size: 0.24rem;
    line-height: 0.4rem;
}
.schemeList {
    margin-top: 0.1rem;
}
.schemeItem {
    margin-bottom: 0.2rem;
    padding: 0.2rem;
}
.schemeItem:last-child {
    margin-bottom: 0;
}
.schemeLogo, .schemeInfo {
    display: inline-block;
    vertical-align: middle;
}
.schemeLogo {
    width: 1rem;
    margin-right: 0.2rem;
}
.schemeLogoImg {
    width: 100%;
}
.schemeInfo {
    width: calc(100% - 1.2rem);
}
.schemeTitle, .schemeDesc {
    font-size: 0.28rem;
    color: #666;
}
.schemeDesc {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    font-size: 0.24rem;
    line-height: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;

}
.exhibitorContact {
    margin-top: 0.2rem;
}
.exhibitorContactItem  {
    margin-bottom: 0.2rem;
    padding: 0 0.2rem;
    font-size: 0.28rem;
    line-height: 0.8rem;
    border: 0.02rem solid #f0f1f2;
}
.exhibitorContactItemName, .exhibitorContactItemVal {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.exhibitorContactItemName {
    width: 2.4rem;
}
.exhibitorContactItemVal {
    width: calc(100% - 2.4rem);
    text-align: right;
}
.contactChunkCaption {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto 0.2rem;
    padding: 0.1rem 0.2rem;
    background-color: #fff;
}
</style>

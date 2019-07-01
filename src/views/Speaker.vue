<template>
    <div class="speaker">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="speakerBox">
            <div class="speakerChunk">
                <div class="speakerAvatar">
                    <img class="speakerPhoto" :src="speakerDetail.Photo" alt="">
                </div>
                <div class="speakerInfo">
                    <h4 class="speakerName">{{ speakerDetail.Name }}</h4>
                    <p class="speakerJob">{{ speakerDetail.JobTitle }}</p>
                    <p class="speakerCompany">{{ speakerDetail.Company }}</p>
                </div>
            </div>
            <div class="speakerChunk">
                <h4 class="speakerChunkCaption">{{ $t("speaker.introCaption") }}</h4>
                <p class="speakerIntro">
                    {{ speakerDetail.Resume == null ? $t("speaker.emptyVal") : speakerDetail.Resume }}
                </p>
            </div>
            <div class="speakerChunk" v-if="speakerDetail.ProgramList.length != 0">
                <h4 class="speakerChunkCaption">{{ $t("speaker.participateCaption") }}</h4>
                <ul class="participateList">
                    <li class="participateItem" v-for="(participate, index) in speakerDetail.ProgramList" :key="index">
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
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar";
export default {
    name: "Speaker",
    data: function() {
        return {
            speakerId: this.$route.query.speakerId
        }
    },
    components: {
        NavBar
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].speaker.navBarTitle
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            speakerDetail: state => state.SpeakerDetail
        })
    },
    methods: {
        ...mapActions([
            "getSpeakerDetail"
        ])
    },
    created: function() {
        this.getSpeakerDetail({ eventNo: this.eventNo, id: this.speakerId, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
    }
}
</script>
<style>
.speaker {
    position: relative;
    width: 100%;
    height: 100%;
}
.speakerBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1.2rem 0 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.speakerChunk {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto 0.2rem;
    padding: 0.4rem 0.2rem;
    font-size: 0;
    background-color: #ffffff;
}
.speakerAvatar, .speakerInfo {
    display: inline-block;
    vertical-align: top;
}
.speakerAvatar {
    width: 1rem;
    height: 1rem;
    margin-right: 0.2rem;
    border-radius: 100%;
    overflow: hidden;
}
.speakerPhoto {
    width: 100%;
}
.speakerInfo {
    width: calc(100% - 1.2rem);
}
.speakerName, .speakerJob, .speakerCompany {
    font-size: 0.28rem;
    line-height: 0.4rem;
}
.speakerChunkCaption {
    font-size: 0.28rem;
}
.speakerIntro {
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
    font-size: 0.28rem;
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
</style>

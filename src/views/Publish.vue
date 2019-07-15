<template>
    <div class="publish">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="publishBox">
            <div class="container">
                <div class="publishChunk clear">
                    <p class="publishChunkCaption lt">{{ $t("publish.postType") }}</p>
                    <p class="publishType rt">{{ publishType == 1 ? $t("publish.postSupply") : $t("publish.postRequirement") }}</p>
                </div>
                <div class="publishChunk">
                    <p class="publishChunkCaption">{{ $t("publish.offserLabel") }}</p>
                    <textarea class="publishInput" v-model.trim="publishContent" v-bind:placeholder="$t('publish.inputPlaceholder')"></textarea>
                </div>
                <div class="publishChunk">
                    <p class="publishChunkCaption">
                        {{ $t("publish.addTag") }}
                        <span class="publishChunkCaptionTip">（{{ $t("publish.tagTip") }}）</span>
                    </p>
                    <div class="publishTags">
                        <span class="publishTag" v-for="(tag, index) in tagList" :key="index"  v-bind:class="{ active: tagIndex == index }" v-on:click="tagIndex = index">                        
                            {{ tag.Name }}
                        </span>
                    </div>
                </div>
                <div class="publishChunk clear">
                    <p class="publishChunkCaption lt">{{ $t("publish.publishMobile") }}</p>
                    <span class="publishMobile lt">{{ mobile }}</span>
                    <label class="publishMobileLabel rt">
                        <input class="publishMobileCheckbox" type="checkbox" v-model="publicMobile">
                        <i class="publishMobileCaret"></i>
                    </label>
                </div>
            </div>
        </div>
        <button class="publishBtn" @click="publish" v-bind:disabled="isPublished">
            {{ $t("publish.publishBtn") }}
        </button>
    </div>
</template>
<script>
import { mapState } from "vuex";
import NavBar from "@/components/NavBar";
export default {
    name: "Publish",
    data: function() {
        return  {
            publishType: this.$route.query.type,
            publishContent: "",
            publicMobile: true,
            tagIndex: 1,
            isPublished: false
        }
    },
    components: {
        NavBar
    },
    computed: {
        navBarTitle: function() {
            return this.publishType == 1 ? this.$i18n.messages[this.lang].publish.navBarSupplyTitle : this.$i18n.messages[this.lang].publish.navBarRequirementTitle
        },
        tagList: function() {
            return this.$i18n.messages[this.lang].publish.tagList
        },
        ...mapState({
            apiDomain: state => state.ApiDomain,
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            myInfo: state => state.MyInfomation,
            mobile: state => state.MyInfomation.Mobile
		})
    },
    methods: {
        publish: function() {
            if(this.isPublished || this.publishContent == "" || this.publishContent.length == 0) {
                return false;
            }
            this.isPublished = true;
            let data = {
                Id: 0,
                Type: this.publishType,
                Intro: this.publishContent,
                Contact: {
                    Id: 0,
                    Name: this.mobile,
                    Value: this.publicMobile ? 1 : 9
                },
                Tag: [this.tagList[this.tagIndex]]
            }
            this.$http.post(`${this.apiDomain}/Plaza/SolutionSave`, {
                eventNo: this.eventNo,
                token: this.token,
                solution: data
            }).then(res => {
                let data = res.data;
                if(data.Code != 0) {
                    alert(data.Message)
                }
                this.$router.go(-1)
            }).catch(err => {
                console.log(err);
            })
        }
    }
}
</script>
<style>
.publish {
    position: relative;
    width: 100%;
    height: 100%;
}
.publishBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1.2rem 0;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.publishBox > .container {
    width: 95%;
}
.publishChunk {
    margin-bottom: 0.2rem;
    padding: 0.4rem 0.2rem;
    background-color: #fff;
}
.publishChunkCaption {
    font-size: 0.28rem;
}
.publishChunkCaptionTip {
    font-size: 0.24rem;
    color: #777
}
.publishType {
    font-size: 0.28rem;
    color: #777;
}
.publishInput {
    margin-top: 0.2rem;
    width: 100%;
    height: 1.2rem;
    border: 0;
    resize: none;
}
.publishTags {
    margin-top: 0.1rem;
    font-size: 0;
}
.publishTag {
    display: inline-block;
    margin: 0 0.1rem 0.1rem 0;
    padding: 0.04rem 0.2rem;
    font-size: 0.24rem;
    line-height: 0.3rem;
    background-color: #f0f1f2;
    border-radius: 0.4rem;
    color: var(--themeColor);
}
.publishTag.active {
    background-color: var(--themeColor);
    color: #fff;
}
.publishMobile {
    margin-left: 0.4rem;
    font-size: 0.24rem;
    line-height: 0.4rem;
    color: #999999;
}
.publishMobileCheckbox {
    display: none;
}
.publishMobileCaret {
    position: relative;
    display: block;
    width: 0.4rem;
    height: 0.4rem;
    border-radius: 100%;
    background: url(../assets/iconTick.svg) #999 center center/0.28rem no-repeat;
}
.publishMobileCheckbox:checked + .publishMobileCaret {
    background: url(../assets/iconTick.svg) var(--themeColor) center center/0.28rem no-repeat;
}
.publishBtn {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 1rem;
    font-size: 0.28rem;
    line-height: 1rem;
    text-align: center;
    background-color: var(--themeColor);
    color: #fff;
}
</style>

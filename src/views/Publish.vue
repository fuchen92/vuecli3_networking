<template>
    <div class="publish">
        <NavBar :showSearch="false" :backUrl="backUrl" :navBarTitle="navBarTitle"></NavBar>
        <div class="publishBox">
            <div class="container">
                <div class="publishChunk clear">
                    <p class="publishChunkCaption lt">{{ $t("publish.postType") }}</p>
                    <p class="publishType rt">{{ publishType == 1 ? $t("publish.postSupply") : $t("publish.postRequirement") }}</p>
                </div>
                <div class="publishChunk">
                    <p class="publishChunkCaption">{{ $t("publish.offserLabel") }}</p>
                    <textarea class="publishInput" v-model="publishContent" v-bind:placeholder="$t('publish.inputPlaceholder')"></textarea>
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
                    <span class="publishMobile lt">13988887777</span>
                    <label class="publishMobileLabel rt">
                        <input class="publishMobileCheckbox" type="checkbox" v-model="isChecked">
                        <i class="publishMobileCaret"></i>
                    </label>
                </div>
            </div>
        </div>
        <button class="publishBtn" @click="publish">
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
            backUrl: "/plaza",
            publishType: this.$route.query.type,
            publishContent: "",
            isChecked: true,
            tagIndex: 1,
            // tagList: [
            //     {
            //         Id: 1,
            //         Name: "资源互换",
            //         value: ""
            //     },
            //     {
            //         Id: 2,
            //         Name: "企业招聘",
            //         value: ""
            //     },
            //     {
            //         Id: 3,
            //         Name: "解决方案",
            //         value: ""
            //     },
            //     {
            //         Id: 4,
            //         Name: "项目合作",
            //         value: ""
            //     }
            // ]
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
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            myInfo: state => state.MyInfomation,
            contactList: state => state.MyInfomation.ContactList
		})
    },
    methods: {
        publish: function() {
            console.log(this.isChecked)
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

<template>
    <div class="publish">
        <NavBar :showSearch="false" :backUrl="backUrl" :navBarTitle="navBarTitle"></NavBar>
        <div class="publishBox">
            <div class="container">
                <div class="publishChunk clear">
                    <p class="publishChunkCaption lt">帖子类型</p>
                    <p class="publishType rt">{{ publishType == 1 ? "供应" : "需求" }}</p>
                </div>
                <div class="publishChunk">
                    <p class="publishChunkCaption">我们提供</p>
                    <textarea class="publishInput" v-model="publishContent" v-bind:placeholder="publishPlaceholder"></textarea>
                </div>
                <div class="publishChunk">
                    <p class="publishChunkCaption">
                        添加标签
                        <span class="publishChunkCaptionTip">（便于内容查找和定位）</span>
                    </p>
                    <div class="publishTags">
                        <span class="publishTag active">资源互换</span>
                        <span class="publishTag">企业招聘</span>
                        <span class="publishTag">解决方案</span>
                        <span class="publishTag">项目合作</span>
                    </div>
                </div>
                <div class="publishChunk clear">
                    <p class="publishChunkCaption lt">公开手机号</p>
                    <span class="publishMobile lt">13988887777</span>
                    <label class="publishMobileLabel rt">
                        <input class="publishMobileCheckbox" type="checkbox">
                        <i class="publishMobileCaret"></i>
                    </label>
                </div>
            </div>
        </div>
        <button class="publishBtn">
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
            publishPlaceholder: "例：我们专业做酒店云服务的，有很好的解决方案如有需要，请联系我们，我们在 C-20 展位。",
            publishContent: ""
        }
    },
    components: {
        NavBar
    },
    computed: {
        navBarTitle: function() {
            console.log(this)
            return this.publishType == 1 ? this.$i18n.messages[this.$store.state.Lang].publish.navBarSupplyTitle : this.$i18n.messages[this.$store.state.Lang].publish.navBarRequirementTitle
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            myInfo: state => state.MyInfomation,
            contactList: state => state.MyInfomation.ContactList
		})
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
    /* background-color: var(--themeColor);
    background-image: url(../assets/iconTick.svg); */
    background: url(../assets/iconTick.svg) var(--themeColor) center center/0.28rem no-repeat;
}
.publishMobileCheckbox:checked + .publishMobileCaret {
    background: url(../assets/iconTick.svg) #999 center center/0.28rem no-repeat;
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

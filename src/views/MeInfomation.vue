<template>
    <div class="meInfomation">
        <NavBar :showSearch="false" :backUrl="backUrl" :navBarTitle="navBarTitle"></NavBar>
        <div class="infomationWrapper">
            <div class="infomationCard">
                <div class="infomationAvatar">                
                    <img class="avatarPhoto" src="../assets/avatar.jpg" alt="">
                </div>
                <div class="infomationCardContent">
                    <button class="uploadBtn">点击上传</button>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">名字</p>
                        <p class="infomationItemValue rt">张三</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">公司</p>
                        <p class="infomationItemValue rt">公安局</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">职位</p>
                        <p class="infomationItemValue rt">警察</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">手机</p>
                        <p class="infomationItemValue rt">18811101110</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">邮箱</p>
                        <p class="infomationItemValue rt">110@qq.com</p>
                    </div>
                    <div class="infomationItem clear">
                        <p class="infomationItemLabel lt">微信</p>
                        <input class="wechatInput" type="text" placeholder="请输入微信号">
                    </div>
                </div>
            </div>
            <div class="infomationCard">
                <textarea class="infomationIntro" placeholder="请输入个人简介"></textarea>
            </div>
            <button class="saveInfomation">保存</button>        
        </div>
    </div>
</template>
<script>
import NavBar from "@/components/NavBar";
export default {
    name: "MeInfomation",
    data: function() {
        // console.log(this.$i18n.messages[this.$store.state.Lang].meinfomation.navBarTitle)
        return {
            backUrl: "/me",
            navBarTitle: this.$i18n.messages[this.$store.state.Lang].meinfomation.navBarTitle
        }
    },
    components: {
        NavBar
    }
}
</script>
<style scoped>
.meInfomation {
    position: relative;
    width: 100%;
    height: 100%;
}
.infomationWrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.infomationCard {
    box-sizing: border-box;
    width: 90%;
    margin: 0 auto 0.2rem;
    padding: 0.4rem 0.2rem 0.2rem;
    background-color: #ffffff;
}
.infomationCard:first-child {
    margin-top: 1.15rem;
}
.infomationAvatar {
    position: relative;
    top: -1.2rem;
    width: 1.6rem;
    height: 1.6rem;
    margin: 0 auto;
    border-radius: 100%;
    overflow: hidden;
}
.avatarPhoto {
    width: 100%;
}
.infomationCardContent {
    margin-top: -1.2rem;
    font-size: 0;
}
.uploadBtn {
    display: block;
    width: 1.6rem;
    height: 0.6rem;
    margin: 0.2rem auto 0.3rem;
    border-radius: 0.4rem;
    font-size: 0.24rem;
    text-align: center;
    line-height: 0.6rem;
    background-color: var(--themeColor);
    color: #ffffff;
}
.infomationItem:not(:last-child) {
    border-bottom: 1px solid #F0F1F2;
}
.infomationItemLabel, .infomationItemValue, .wechatInput {
    width: 1.2rem;
    font-size: 0.28rem;
    line-height: 0.8rem;
}
.infomationItemValue {
    width: calc(100% - 1.2rem);
    text-align: right;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.wechatInput {
    width: calc(100% - 1.2rem);
    border: 0;
    text-align: right;
}
.infomationIntro {
    width: 100%;
    height: 1rem;
    resize: none;
    border: 0;
}
.saveInfomation {
    display: block;
    width: 90%;
    height: 0.8rem;
    margin: 0 auto;
    font-size: 0.28rem;
    line-height: 0.8rem;
    text-align: center;
    background-color: var(--themeColor);
    color: #fff;
}
</style>



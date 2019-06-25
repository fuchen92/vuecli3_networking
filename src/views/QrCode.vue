<template>
    <div class="qrCode">
        <NavBar :showSearch="false" :backUrl="backUrl" :navBarTitle="navBarTitle"></NavBar>
        <div class="qrCodeWrapper">
            <div class="qrCodeBox">
                <img class="qrCodeImg" v-bind:src="qrcode" alt="">
                <p class="qrCodeName">{{ $t("qrcode.name") }}</p>
            </div>
            <p class="qrCodeDesc" v-html="$t('qrcode.qrcodeDesc')"></p>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar";
export default {
    name: "QrCode",
    data: function() {
        return {
            backUrl: "/me",
            navBarTitle: this.$i18n.messages[this.$store.state.Lang].qrcode.navBarTitle
        }
    },
    components: {
        NavBar
    },
    computed: {
        qrcode: function() {
            return this.$store.state.QrCode
        },
        ...mapState({
            lang: state => state.Lang,
            token: state => state.Account.Token
        })
    },
    methods: {
        ...mapActions([
            "getMyQrcode"
        ])
    },
    created: function() {
        this.getMyQrcode({ token: this.token, lang: this.lang == "zh" ? 1 : 2});
    }
}
</script>
<style scoped>
.qrCode {
    position: relative;
    width: 100%;
    height: 100%;
}
.qrCodeWrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.qrCodeBox {
    box-sizing: border-box;
    width: 90%;    
    margin: 0.6rem auto 0;
    padding: 0.6rem;
    background-color: #ffffff;
}
.qrCodeImg {
    margin: 0 auto;
}
.qrCodeName {
    margin-top: 0.2rem;
    font-size: 0.28rem;
    text-align: center;
}
.qrCodeDesc {
    width: 90%;
    margin: 0.4rem auto 0;
    font-size: 0.24rem;
    line-height: 0.4rem;
    text-align: center;
}
</style>



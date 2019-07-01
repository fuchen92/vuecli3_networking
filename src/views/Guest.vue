<template>
    <div class="guest">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="guestBox">
            <div class="guestChunk">
                <div class="guestAvatar">
                    <img class="guestPhoto" src="../assets/avatar.jpg" alt="">
                </div>
                <div class="guestInfo">
                    <h4 class="guestName">张三</h4>
                    <p class="guestJob">警察</p>
                    <p class="guestCompany">公安局</p>
                </div>
            </div>
            <div class="guestChunk">
                <h4 class="guestChunkCaption">简介</h4>
            </div>
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
            backUrl: "",
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
            token: state => state.Account.Token
        })
    }
}
</script>
<style>
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
    padding: 0.4rem 0.2rem;
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
</style>

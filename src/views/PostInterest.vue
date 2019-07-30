<template>
    <div class="postInterest">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="postInterestWrapper">
            <GuestCard v-for="(guest, index) in interestArr" :key="index" :guest="guest"></GuestCard>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
import NavBar from "@/components/NavBar";
import GuestCard from "@/components/GuestCard";
export default {
    name: "PostInterest",
    data: function() {
        return {
            postId: this.$route.query.postId,
            interestArr: []
        }
    },
    components: {
        NavBar,
        GuestCard
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].postInterest.navBarTitle
        },
        ...mapState({
            apiDomain: state => state.ApiDomain,
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token
        })
    },
    methods: {
        getInterest: function() {
            this.$http.post(`${this.apiDomain}/Plaza/LikeUserList`, {
                id: this.postId,
                eventNo: this.eventNo,
                token: this.token,
                lang: this.lang == "zh" ? 1 : 2
            }).then(res => {
                if(res.data.Code == 0) {
                    this.interestArr = res.data.Data
                } else {
                    alert(res.data.Message)
                }
            }).catch(err => {
                alert(err);
            })
        }
    },
    mounted: function() {
        this.getInterest();
    }
}
</script>
<style>
.postInterest {
    position: relative;
    width: 100%;
    height: 100%;
}
.postInterestWrapper {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1.2rem 0 1rem;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
</style>

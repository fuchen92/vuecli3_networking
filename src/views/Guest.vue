<template>
    <div class="guest">
        <NavBar :showSearch="false" :backUrl="'/'" :navBarTitle="navBarTitle"></NavBar>
        <div class="guestBox">
            <div class="container">
                <div class="guestChunk">
                    <div class="guestAvatar">
                        <img class="guestPhoto" src="../assets/avatar.jpg" alt="">
                    </div>
                </div>
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
}
.guestBox > .container {
    width: 95%;
}
.guestChunk {
    margin-bottom: 0.2rem;
    padding: 0.4rem 0.2rem;
    background-color: #fff;
}
</style>

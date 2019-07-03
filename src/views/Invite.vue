<template>
    <div class="invite">
        <NavBar :showSearch="false" :navBarTitle="navBarTitle"></NavBar>
        <div class="inviteBox">
            <div class="container">

            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
import NavBar from "@/components/NavBar";
export default {
    name: "Invite",
    data: function() {
        return {
            
        }
    },
    components: {
        NavBar
    },
    computed: {
        navBarTitle: function() {
            return this.$i18n.messages[this.lang].invite.navBarTitle
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
.invite {
    position: relative;
    width: 100%;
    height: 100%;
}
.inviteBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.inviteBox > .container {
    width: 95%;
}
</style>

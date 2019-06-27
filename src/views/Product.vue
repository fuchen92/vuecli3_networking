<template>
    <div class="product">
        <NavBar :showSearch="false" :backUrl="'/exhibitor?exhibitorId=' + backId" :navBarTitle="navBarTitle"></NavBar>
        <div class="productBox">
            <div class="container">
                <div class="productLogo">
                    <img class="productLogoImg" :src="product.Logo" alt="">
                </div>
                <div class="productIntro">
                    <h4 class="productName">{{ product.Name }}</h4>
                    <p class="productDesc">{{ product.Summary }}</p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex';
import NavBar from "@/components/NavBar";
export default {
    name: "Product",
    data: function() {
        return {
            productId: this.$route.query.productId,
            backId: this.$route.query.backId,
            navBarTitle: this.$i18n.messages[this.$store.state.Lang].product.navBarTitle
        }
    },
    components: {
        NavBar
    },
    computed: {
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            product: state => state.ProductDetail
		})
    },
    methods: {
        ...mapActions([
            "getProductDetail"
        ])
    },
    created: function() {
        console.log(this)
        this.getProductDetail({ eventNo: this.eventNo, id: this.productId, token: this.token, lang: this.lang == "zh" ? 1 : 2 })
    }
}
</script>
<style>
.product {
    position: relative;
    width: 100%;
    height: 100%;
}
.productBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1.2rem 0 0;
    overflow: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.productBox > .container {
    width: 95%;
}
.productLogo {
    margin-bottom: 0.2rem;
    padding: 0.6rem;
    background-color: #ffffff;
}
.productLogoImg {
    margin: 0 auto;
}
.productIntro {
    padding: 0.4rem 0.2rem;
    background-color: #ffffff;
}
.productName {
    margin-bottom: 0.1rem;
    font-size: 0.28rem;
}
.productDesc {
    font-size: 0.28rem;
    line-height: 0.4rem;
}
</style>

<template>
    <div class="loading" v-show="loading">
        <img class="loadingImg" src="../assets/loading.gif" alt="">
    </div>
</template>
<script>
export default {    
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    }
}
</script>
<style>
.loading {
    display: block;
    font-size: 0;
    text-align: center;
}
.loadingImg {
    display: inline-block;
    width: 0.6rem;
    height: auto;
    margin: 0.2rem 0;
}
</style>

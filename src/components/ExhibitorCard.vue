<template>
    <!-- <div class="exhibitorCard"> -->
        <router-link class="exhibitorLink" v-bind:key="exhibitor.Id" v-bind:to="'/exhibitor?exhibitorId=' + exhibitor.Id">
            <div class="exhibitorAvatar">
                <img class="exhibitorLogo" :src="exhibitor.Photo" alt="">
                <p class="exhibitorBooth">
                    <img class="exhibitorBoothImg" src="../assets/iconBooth.svg" alt="">
                    <span class="exhibitorBoothText">{{ exhibitor.Booth }}</span>
                </p>
            </div>
            <div class="exhibitorInfo">
                <h4 class="exhibitorName">{{ exhibitor.Name }}</h4>
                <div class="exhibitorTags">
                    <span class="exhibitorTag" v-for="(industry, index) in exhibitor.Industry" :key="index">{{ industry.Name }}</span>
                </div>
                <p class="exhibitorSlogan" v-if="exhibitor.Intro2 != ''">{{ exhibitor.Intro2 }}</p>
                <div class="interestList" v-if="exhibitor.AttendeesPhoto != null">
                    <template v-for="(attend, index) in exhibitor.AttendeesPhoto">
                        <template v-if="index < 3">
                            <img class="interestPeople" :src="attend[index]" :key="index" alt="">
                        </template>
                    </template>
                    <span class="interestSummary">
                        <!-- {{ $tc("plaza.attendExpected", {count: 5}) }} -->
                        {{ $tc("plaza.attendExpected", exhibitor.AttendeesPhoto.length) }}
                        <!-- 等{{ exhibitor.AttendeesPhoto.length }}人出席 -->
                    </span>
                </div>
            </div>
        </router-link>
    <!-- </div> -->
</template>
<script>
export default {
    props: {
        exhibitor: {
            type: Object
        }
    }
}
</script>
<style>
.exhibitorLink {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 0.2rem;
    padding: 0.4rem 0.2rem;
    font-size: 0;
    background-color: #fff;
}
.exhibitorLink:last-child {
    margin-bottom: 0;
}
.exhibitorAvatar, .exhibitorInfo {
    display: inline-block;
    vertical-align: top;
}
.exhibitorAvatar {
    width: 1.6rem;
    margin-right: 0.2rem;
}
.exhibitorLogo {
    width: 100%;
}
.exhibitorBooth {
    margin-top: 0.2rem;
    text-align: center;
}
.exhibitorBoothImg, .exhibitorBoothText {
    display: inline-block;
    vertical-align: middle;
}
.exhibitorBoothImg {
    width: 0.3rem;
    margin-right: 0.1rem;
}
.exhibitorBoothText {
    font-size: 0.24rem;
    color: #777;
}
.exhibitorInfo {
    width: calc(100% - 1.8rem);
}
.exhibitorName {
    font-size: 0.28rem;
    line-height: 0.4rem;
    color: var(--themeColor);
}
.exhibitorTags {
    margin: 0.15rem 0 0;
    font-size: 0;
    overflow: hidden;
}
.exhibitorTag {
    display: inline-block;
    margin: 0 0.1rem 0.1rem 0;
    padding: 0.04rem 0.2rem;
    font-size: 0.24rem;
    line-height: 0.3rem;
    background-color: #f0f1f2;
    border-radius: 0.4rem;
    color: var(--themeColor);
}
.exhibitorSlogan {
    font-size: 0.24rem;
    line-height: 0.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #666666;
}
.interestList {
    margin-top: 0.1rem;
}
.interestPeople, .interestSummary {
    display: inline-block;
    vertical-align: middle;
}
.interestPeople {
    width: 0.5rem;
    margin-right: 0.1rem;
    border-radius: 100%;
}
.interestSummary {
    width: calc(100% - 1.8rem);
    font-size: 0.24rem;
    color: #777;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>

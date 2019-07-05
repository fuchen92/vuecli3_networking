<template>
    <div class="program">
        <div class="programTabs">
            <div class="programTabsWrapper">                
                <div v-for="(tab, index) in tabs" v-bind:key="index" class="programTab" v-bind:class="{ active: currentIndex == index, en: lang == 'en' }" v-on:click="currentIndex = index">
                    <span class="programTabTime">{{ tab.time }}</span>
                    <span class="programTabName">{{ tab.name }}</span>
                </div>
            </div>
        </div>
        <div class="programBox">
            <div class="programList" v-bind:class="{ active: currentIndex == 0 }">
                <div class="container">
                    <div class="programItem programItemSite">
                        {{ lang == 'zh' ? '会场：上海国际会议中心7楼 【明珠厅】' : 'Venue: Pearl Hall, 7th Floor, Shanghai International Convention Center' }}
                    </div>
                    <div class="programItem">
                        <div class="programItemDesc">
                            <p class="programItemDescText">
                                {{ $t("program.awardDesc1") }}
                            </p>
                            <p class="programItemDescText" v-html="$t('program.awardDesc2')">
                            </p>
                            <p class="programItemDescText">
                                {{ $t("program.awardDesc3") }}
                            </p>
                        </div>
                    </div>
                    <div class="programItem">
                        <div class="programItemDesc">
                            <p class="programItemDescText">
                                <strong>【{{ $t("program.awardFlowCaption") }}】</strong>
                            </p>
                            <ul class="awardFlow">
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">{{ $t("program.awardFlowTime1") }}</span>
                                    <span class="awardFlowItemDesc">{{ $t("program.awardFlowTime1Desc") }}</span>
                                </li>
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">{{ $t("program.awardFlowTime2") }}</span>
                                    <span class="awardFlowItemDesc">{{ $t("program.awardFlowTime2Desc") }}</span>
                                </li>
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">{{ $t("program.awardFlowTime3") }}</span>
                                    <span class="awardFlowItemDesc">{{ $t("program.awardFlowTime3Desc") }}</span>
                                </li>
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">{{ $t("program.awardFlowTime4") }}</span>
                                    <span class="awardFlowItemDesc">{{ $t("program.awardFlowTime4Desc") }}</span>
                                </li>
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">{{ $t("program.awardFlowTime5") }}</span>
                                    <span class="awardFlowItemDesc" v-html="$t('program.awardFlowTime5Desc')">
                                    </span>
                                </li>
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">{{ $t("program.awardFlowTime6") }}</span>
                                    <span class="awardFlowItemDesc">
                                        {{ $t("program.awardFlowTime6Desc") }}
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="programItem">
                        <div class="programItemDesc">
                            <p class="programItemDescText">
                                <strong>【{{ $t("program.awardShowCaption") }}】</strong>
                            </p>
                            <p class="programItemDescText">
                                {{ $t("program.awardShowDesc") }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
			<template v-for="i in programList.length">
				<div class="programList" v-bind:key="i" v-bind:class="{ active: currentIndex == i }">
					<div class="container">
						<div class="programItem programItemSite">
                            <template v-if="lang == 'zh'">
							    {{ i == 1 ? "会场：上海国际会议中心7楼 【上海厅 2 & 3】" : (i == 2 ? "会场：上海国际会议中心7楼 【上海厅 2】" : "会场：上海国际会议中心7楼 【上海厅 3】") }}
                            </template>
                            <template v-else>
                                {{ i == 1 ? "Venue:the 7th floor of the Shanghai International Convention Center【Shanghai Hall 2 & 3】" : (i == 2 ? "Venue:the 7th floor of the Shanghai International Convention Center【Shanghai Hall 2】" : "Venue:the 7th floor of the Shanghai International Convention Center【Shanghai Hall 3】") }}
                            </template>
						</div>

						<template v-for="(prg, index) in programList[i - 1]">
							<div class="programItem" v-bind:key="index">
								<div class="programItemHead">
									<p class="programItemTime">{{ prg.Begin.split("T")[1].substr(0, 5) }} - {{ prg.End.split("T")[1].substr(0, 5) }}</p>
									<p class="programItemType">{{ prg.TypeName }}</p>
									<router-link v-if="prg.Topic != ''" class="programItemTitle" :to="'/programdetail?programId=' + prg.Id">
										{{ prg.Topic }}
									</router-link>
								</div>
								<template v-if="prg.Details.length != 0">
									<div class="programItemBody">
										<div class="programItemSpeakerList">
											<template v-for="(detail, idx) in prg.Details">
												<p v-if="detail.DataType != prg.Details[0].DataType || idx == 0" v-bind:key="idx" class="speakerType">{{ detail.DataType }}</p>
												<router-link class="programItemSpeaker" v-if="detail.Speaker.SocialId > 0" v-bind:to="'/guest?guestId=' + detail.Speaker.SocialId" v-bind:key="detail.Speaker.SocialId">
													<span class="programItemSpeakerAvatar">
														<img class="programItemSpeakerPhoto" v-bind:src="detail.Speaker.Photo" alt="">
													</span>
													<span class="programItemSpeakerName">{{ detail.Speaker.Company }} {{ detail.Speaker.JobTitle }} {{ detail.Speaker.Name }}</span>
												</router-link>
												<router-link class="programItemSpeaker" v-else v-bind:to="'/speaker?speakerId=' + detail.Speaker.Id" v-bind:key="detail.Speaker.Id">
													<span class="programItemSpeakerAvatar">
														<img class="programItemSpeakerPhoto" v-bind:src="detail.Speaker.Photo" alt="">
													</span>
													<span class="programItemSpeakerName">{{ detail.Speaker.Company }} {{ detail.Speaker.JobTitle }} {{ detail.Speaker.Name }}</span>
												</router-link>
											</template>
										</div>
									</div>
								</template>
							</div>
						</template>

					</div>
				</div>
			</template>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from "vuex";
export default {
    name: "Program",
    data: function() {
        return {
			isCurrent: true,
            currentIndex: 1, 
            timer: null,
        }
    },    
    computed: {
        tabs: function() {
            return this.$i18n.messages[this.lang].program.tabs
        },
        ...mapState({
            lang: state => state.Lang,
            eventNo: state => state.eventNo,
            token: state => state.Account.Token,
            programList: state => state.ProgramList
        })
    },
    methods: {
        // 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
		// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
		...mapActions({
			initProgram: "getProgramList"
        })
    },
    created: function() {
        console.log("created")
        let language = this.lang == "zh" ? 1 : 2;
        // if(this.programList.length == 0) {
            this.initProgram({ eventNo: this.eventNo, token: this.token, lang: language });
        // }
        // this.$http.post("http://192.168.1.21:89/Program/List", {
        //     eventNo: 63,
        //     token: "",
        //     lang: 2
        // }).then(res => {
        //     let data = res.data.Data;
        //     let arr = [];
        //     let firstDay = data[4]["2018-9-20"]
        //     let secondDay = data[5]["2018-9-21"]
        //     let thirdDay = data[6]["2018-9-21"]
        //     arr.push(firstDay, secondDay, thirdDay);
        //     this.programList.push(firstDay, secondDay, thirdDay)
        // })
    }
}
</script>
<style>
.program {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
}
.programTabs {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    height: 1rem;
    padding: 0 0.4rem 0 0.2rem;
    background-color: #fff;
}
.programTabsWrapper {
    font-size: 0;
    white-space: nowrap;
    overflow: hidden;
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
}
.programTabsWrapper::-webkit-scrollbar {
    display: none;
}
.programTabs::after {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    display: block;
    width: 0.4rem;
    height: 1rem;
    background-color: rgba(255, 255, 255, 0.5);
    box-shadow: -0.2rem 0 0.4rem #ccc;
    z-index: 900;
}
.programTabs::before {
    position: absolute;
    top: 0.4rem;
    right: 0.15rem;
    content: "";
    display: block;
    width: 0.2rem;
    height: 0.2rem;
    border-top: 1px solid #999;
    border-right: 1px solid #999;
    transform: rotate(45deg);
    z-index: 1000;
}
.programTab {
    box-sizing: border-box;
    display: inline-block;
    width: calc((100% - 0.4rem) / 3.2);
    height: 1rem;
    margin-right: 0.2rem;
    font-size: 0.28rem;
    text-align: center;
}
.programTab.en {
    width: auto;
    padding: 0 0.1rem;
}
.programTab:last-child {
    margin-right: 0;
}
.programTabTime, .programTabName {
    display: block;
}
.programTabTime {
    margin-top: 0.1rem;
    line-height: 0.4rem;
}
.programTabName {
    line-height: 0.4rem
}
.programTab.active {
    color: var(--themeColor);
}
.programBox {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    padding-top: 1.2rem;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.programList {
    display: none;
}
.programList.active {
    display: block;
}
.programList > .container {
    width: 95%;
    margin: 0 auto;
}
.programItem {
    box-sizing: border-box;
    margin-bottom: 0.2rem;
    padding: 0.4rem 0.2rem;
    font-size: 0.28rem;
	line-height: 0.4rem;
    background-color: #fff;
}
.programItemTime, .programItemType {
	display: inline-block;
}
.programItemType {
	margin-left: 0.4rem;
}
.programItemTitle {
	margin-top: 0.2rem;
	font-size: 0.32rem;
	line-height: 0.4rem;
	color: var(--themeColor);
}
.programItemDesc {
    overflow: hidden;
}
.programItemDescText:not(:last-child) {
    margin-bottom: 0.4rem;
}
.awardFlowItem:not(:last-child) {
    margin-bottom: 0.3rem;
}
.awardFlowLabel, .awardFlowItemDesc {
    display: inline-block;
    vertical-align: top;
}
.awardFlowLabel {
    width: 3rem;
    margin-right: 0.2rem;
}
.awardFlowItemDesc {
    width: calc(100% - 3.2rem);
}
.programItemBody {
	margin-top: 0.2rem;
}
.speakerType {
	margin-bottom: 0.2rem;
	font-size: 0.24rem;	
}
.programItemSpeaker {
	margin-bottom: 0.2rem;
	font-size: 0;
}
.programItemSpeakerAvatar, .programItemSpeakerName {
	display: inline-block;
	vertical-align: middle;
}
.programItemSpeakerAvatar {
	width: 0.6rem;
	overflow: hidden;
}
.programItemSpeakerPhoto {
	width: 100%;
}
.programItemSpeakerName {
    width: calc(100% - 0.9rem);
	margin-left: 0.3rem;
	font-size: 0.28rem;
	color: #2c3e50;
}
</style>

<template>
    <div class="program">
        <div class="programTabs">
            <div class="programTabsWrapper">                
                <div v-for="(tab, index) in tabs" v-bind:key="index" class="programTab" v-bind:class="{ active: currentIndex == index, en: lang == 'en' }" v-on:click=" currentIndex = index">
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
                                数字化转型浪潮席卷而至，大多数垂直领域的竞争格局都发生了变化，旅游业表现最为明显：未来20年，数字化将给旅游业带来怎样的影响？
                            </p>
                            <p class="programItemDescText">
                                来看一组来自世界旅游组织的预测数据：
                                <br>
                                通过提高盈利能力，为行业创造高达3050 亿美元的价值；
                                <br>
                                将传统企业1000 亿美元价值转移到新的竞争者手中；
                                <br>
                                通过提高安全性、节省时间和成本，为用户和企业带来价值7000 亿美元的效益。
                            </p>
                            <p class="programItemDescText">
                                最先进的旅游企业每天都在不断地利用数字技术，以前所未有的速度发展，这对其他企业意味着什么？
                                <br>
                                这即是，启航“<a href="/taward2019/" target="_blank" style="display: inline-block; color: #c30d23;">数字旅游奖</a>”的初衷。“2019数字旅游奖”将分设【数字营销奖】&amp;【产品创新奖】两个奖项，致力于鼓励数字化转型开拓者，评选当年度在数字化转型过程中有卓越表现的商业案例。“他山之石，可以攻玉”，希望通过该奖项，为业者明晰领先者的宝贵经验、方法论，从而指导自身的转型实践。
                            </p>
                        </div>
                    </div>
                    <div class="programItem">
                        <div class="programItemDesc">
                            <p class="programItemDescText">
                                <strong>【大赛流程】</strong>
                            </p>
                            <ul class="awardFlow">
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">2019年4月22日</span>
                                    <span class="awardFlowItemDesc">大赛启动</span>
                                </li>
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">2019年6月30日</span>
                                    <span class="awardFlowItemDesc">案例提交截止日期</span>
                                </li>
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">2019年7月1日-7月20日</span>
                                    <span class="awardFlowItemDesc">评审团案例初评</span>
                                </li>
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">2019年8月5日-8月25日</span>
                                    <span class="awardFlowItemDesc">入围案例公示</span>
                                </li>
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">2019年8月27日</span>
                                    <span class="awardFlowItemDesc">
                                        “入围奖”案例展示&amp;评审提问
                                        <br>
                                        现场评审会评出“数字营销奖”金奖，交由第三方机构封存结果
                                    </span>
                                </li>
                                <li class="awardFlowItem">
                                    <span class="awardFlowLabel">2019年8月28日</span>
                                    <span class="awardFlowItemDesc">
                                        颁奖晚宴，揭晓金奖名单
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="programItem">
                        <div class="programItemDesc">
                            <p class="programItemDescText">
                                <strong>【8.27入围奖案例展示】</strong>
                            </p>
                            <p class="programItemDescText">
                                “<a href="/taward2019/" target="_blank" style="display: inline-block; color: #c30d23;">2019数字旅游奖</a>”分设【数字营销奖】、【产品创新奖】两类奖项，每个奖项设“入围奖”和“金奖”。初评阶段，评审将依据【评审标准】对参赛作品进行打分，从参赛作品中遴选20%优秀案例作品评为“入围奖‘。”入围奖“案例将在8月27日全天进行现场展示，案例展示结束后参赛企业将回答来自现场评审的抛问。
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

						<template v-for="(prg, index) in programList">
							<div class="programItem" v-bind:key="index">
								<div class="programItemHead">
									<p class="programItemTime">{{ prg.Begin }} - {{ prg.End }}</p>
									<p class="programItemType">{{ prg.Type }}</p>
									<router-link v-if="prg.Topic != ''" class="programItemTitle" :to="'/programdetail?id=' + prg.Id">
										{{ prg.Topic }}
									</router-link>
								</div>
								<template v-if="prg.Details.length != 0">
									<div class="programItemBody">
										<div class="programItemSpeakerList">
											<template v-for="(detail, idx) in prg.Details">
												<p v-if="detail.DataType != prg.Details[0].DataType || idx == 0" v-bind:key="idx" class="speakerType">{{ detail.DataType }}</p>
												<router-link class="programItemSpeaker" v-bind:to="'/speaker?id=' + detail.Speaker.Id" v-bind:key="detail.Speaker.Id">
													<span class="programItemSpeakerPhoto">
														<img class="programItemSpeakerPhotoImg" v-bind:src="detail.Speaker.Photo" alt="">
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
            <!-- <div class="programList active">
                <div class="container">
                    <div class="programItem programItemSite">
                        会议地点：上海国际会议中心7楼-上海厅2 &amp; 3
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">09:00 - 09:15</p>
                            <p class="programItemType">主题演讲</p>
                            <router-link class="programItemTitle" v-bind:to="'/programdetail?id=' + 11 ">
                                弱冠之年，携程的新挑战
                            </router-link>
                        </div>
						<div class="programItemBody">
							<div class="programItemSpeakerList">
								<p class="speakerType">对话嘉宾</p>
								<router-link class="programItemSpeaker" v-bind:to="'/speaker?id=' + 22 ">
									<span class="programItemSpeakerPhoto">
										<img class="programItemSpeakerPhotoImg" src="../assets/jiqi.png" alt="">
									</span>
									<span class="programItemSpeakerName">携程集团 CEO 孙洁</span>
								</router-link>
								<router-link class="programItemSpeaker" v-bind:to="'/speaker?id=' + 22 ">
									<span class="programItemSpeakerPhoto">
										<img class="programItemSpeakerPhotoImg" src="../assets/jiqi.png" alt="">
									</span>
									<span class="programItemSpeakerName">携程集团 CEO 孙洁</span>
								</router-link>
								<p class="speakerType">主持嘉宾</p>
								<router-link class="programItemSpeaker" v-bind:to="'/speaker?id=' + 22 ">
									<span class="programItemSpeakerPhoto">
										<img class="programItemSpeakerPhotoImg" src="../assets/jiqi.png" alt="">
									</span>
									<span class="programItemSpeakerName">携程集团 CEO 孙洁</span>
								</router-link>
							</div>
						</div>
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">12:00-14:00</p>
                            <p class="programItemType">午餐交流</p>
                        </div>
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">09:00 - 09:15</p>
                            <p class="programItemType">主题演讲</p>
                            <router-link class="programItemTitle" v-bind:to="'/programdetail?id=' + 11 ">
                                弱冠之年，携程的新挑战
                            </router-link>
                        </div>
						<div class="programItemBody">
							<div class="programItemSpeakerList">
								<p class="speakerType">对话嘉宾</p>
								<router-link class="programItemSpeaker" v-bind:to="'/speaker?id=' + 22 ">
									<span class="programItemSpeakerPhoto">
										<img class="programItemSpeakerPhotoImg" src="../assets/jiqi.png" alt="">
									</span>
									<span class="programItemSpeakerName">携程集团 CEO 孙洁</span>
								</router-link>
								<router-link class="programItemSpeaker" v-bind:to="'/speaker?id=' + 22 ">
									<span class="programItemSpeakerPhoto">
										<img class="programItemSpeakerPhotoImg" src="../assets/jiqi.png" alt="">
									</span>
									<span class="programItemSpeakerName">携程集团 CEO 孙洁</span>
								</router-link>
								<p class="speakerType">主持嘉宾</p>
								<router-link class="programItemSpeaker" v-bind:to="'/speaker?id=' + 22 ">
									<span class="programItemSpeakerPhoto">
										<img class="programItemSpeakerPhotoImg" src="../assets/jiqi.png" alt="">
									</span>
									<span class="programItemSpeakerName">携程集团 CEO 孙洁</span>
								</router-link>
							</div>
						</div>
                    </div>
                    <div class="programItem">
                        <div class="programItemHead">
                            <p class="programItemTime">12:00-14:00</p>
                            <p class="programItemType">午餐交流</p>
                        </div>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>
<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
    name: "Program",
    data: function() {
        return {
			isCurrent: true,
            currentIndex: 1,
           
        }
    },
    created: function() {
        this.initProgram();
    },
    computed: {
        tabs: function() {
            return this.$i18n.messages[this.$store.state.Lang].program.tabs
        },
        ...mapGetters({
            programList: "getProgramListByLang"
        }),
        ...mapState({
            lang: state => state.Lang
        })
    },
    methods: {
        // 使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
		// 将 `this.add()` 映射为 `this.$store.dispatch('increment')`
		...mapActions({
			initProgram: "getProgramList"
		})
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
.programItemSpeakerPhoto, .programItemSpeakerName {
	display: inline-block;
	vertical-align: middle;
}
.programItemSpeakerPhoto {
	width: 0.6rem;
	overflow: hidden;
}
.programItemSpeakerPhotoImg {
	width: 100%;
}
.programItemSpeakerName {
	margin-left: 0.3rem;
	font-size: 0.28rem;
	color: #2c3e50;
}
</style>

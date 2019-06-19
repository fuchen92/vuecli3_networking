<template>
    <div class="program">
        <div class="programTabs">
            <div class="programTabsWrapper">
                <div class="programTab">
                    <span class="programTabTime">8月27日</span>
                    <span class="programTabName">创新论坛</span>
                </div>
                <div class="programTab" v-bind:class="{ active: isCurrent }">
                    <span class="programTabTime">8月28日</span>
                    <span class="programTabName">主论坛</span>
                </div>
                <div class="programTab">
                    <span class="programTabTime">8月29日</span>
                    <span class="programTabName">酒店论坛</span>
                </div>
                <div class="programTab">
                    <span class="programTabTime">8月30日</span>
                    <span class="programTabName">航空论坛</span>
                </div>
            </div>
        </div>
        <div class="programBox">
            <div class="programList">

            </div>
			<template v-for="i in programList.length">
				<div class="programList" v-bind:key="i" v-bind:class="{ active: currentIndex == i }">
					<div class="container">
						<div class="programItem programItemSite">
							{{ i == 0 ? "会场：上海国际会议中心7楼 【上海厅 2 & 3】" : (i == 1 ? "会场：上海国际会议中心7楼 【上海厅 2】" : "会场：上海国际会议中心7楼 【上海厅 3】") }}
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
											<template v-for="(speaker, idx) in prg.Details">
												<p v-if="speaker.DataType != prg.Details[0].DataType || idx == 0" v-bind:key="speaker.Id" class="speakerType">{{ speaker.DataType }}</p>
												<router-link class="programItemSpeaker" v-bind:to="'/speaker?id=' + speaker.Id" v-bind:key="speaker.Id">
													<span class="programItemSpeakerPhoto">
														<img class="programItemSpeakerPhotoImg" v-bind:src="speaker.Photo" alt="">
													</span>
													<span class="programItemSpeakerName">{{ speaker.Company }} {{ speaker.JotTitle }} {{ speaker.Name }}</span>
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
import { mapGetters } from "vuex";
export default {
    name: "Program",
    data: function() {
        return {
			isCurrent: true,
			currentIndex: 0
        }
    },
    computed: {
        ...mapGetters({
            programList: "getProgramListByLang"
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

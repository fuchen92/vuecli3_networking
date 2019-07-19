<template>
    <div class="message">
        <div class="noticeBar clear">
            <p class="noticeDesc lt">
                <!-- 新消息推送通知（离线短信+邮件提醒） -->
				{{ $t("message.noticeText") }}
            </p>
            <label class="noticeLabel rt">
                <input class="noticeCheckbox" type="checkbox" v-model="openNotice">
				<i class="noticeCaret"></i>            
            </label>
        </div>
		<div class="messageBox">
			<div class="messageList">
				<!-- <router-link class="messageItem clear" to="/chat?userid=110">
					<div class="messageUser lt">
						<div class="messageUserAvatar">
							<img class="messageUserPhoto" src="../assets/avatar.jpg" alt="">
							<span class="unReadMsgCount">10</span>
						</div>
						<div class="messageUserInfo">
							<p class="messageUserName">宇智波 ● 鼬</p>
							<p class="lastMessage">愚蠢的弟弟啊</p>
						</div>
					</div>
					<div class="messageSummary rt">
						<p class="messageDate">06-05</p>
						<p class="latestTime">22:00</p>
					</div>
				</router-link> -->
				<router-link class="messageItem clear" v-for="chat in chatList" v-bind:key="chat.id" v-bind:to="`/chat?chatId=${chat.Id}&uPhoto=${chat.Photo}`">
					<div class="messageUser lt">
						<div class="messageUserAvatar">
							<img class="messageUserPhoto" v-bind:src="chat.Photo" alt="">
							<span class="unReadMsgCount" v-if="chat.NewMessageCount > 0">{{ chat.NewMessageCount > 99 ? 99 : chat.NewMessageCount }}</span>
						</div>
						<div class="messageUserInfo">
							<p class="messageUserName">{{ chat.Name }}</p>
							<p class="lastMessage">{{ chat.LastMessage.Content }}</p>
						</div>
					</div>
					<div class="messageSummary rt">
						<p class="messageDate">{{ $pattern(chat.LastMessage.SentTime, 'MM-dd') }}</p>
						<p class="latestTime">{{ $pattern(chat.LastMessage.SentTime, 'HH:mm') }}</p>
					</div>
				</router-link>
			</div>
		</div>
    </div>
</template>
<script>
import { mapActions, mapMutations, mapState } from "vuex";
export default {
	name: "Message",
	data: function() {
		return  {
			
		}
	},
	computed: {
		openNotice: {
			get() {
				let notice = localStorage.getItem("openNotice");
				if(notice == "false") {
					return false;
				} else if(notice == "true") {
					return true;
				} else if(notice == null || notice == "" || notice == undefined) {
					return false;
				}
			},
			set(value) {
				let setting = [
					{ Id: 1, Name: "", Value: this.lang == "zh" ? 1 : 2 },
					{ Id: 2, Name: "", Value: value ? 1 : 0 },
					{ Id: 4, Name: "", Value: value ? 1 : 0 },
					{ Id: 6, Name: "", Value: value ? 1 : 0 }
				]
				localStorage.setItem("openNotice", value);
				this.$http.post(`${this.apiDomain}/Me/AlterUiSetting`, {
					setting: setting,
					token: this.token
				}).then(res => {
					if(res.data.Code != 0) {
						alert(res.data.Message)
					}
				})
			}
		},
		...mapState({
			apiDomain: state => state.ApiDomain,
			lang: state => state.Lang,
            eventNo: state => state.eventNo,
			token: state => state.Account.Token,
			chatList: state => state.ChatList
		})
	},
	methods: {
		...mapActions([
			"getChatList"
		]),
		...mapMutations([
			"SETREDDOT"
		])
	},
	created: function() {
		this.getChatList({ eventNo: this.eventNo, token: this.token, lang: this.lang == "zh" ? 1 : 2 });
		this.SETREDDOT("hide")
	}
}
</script>
<style>
.message {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
    padding: 1rem 0;
}
.noticeBar {
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 100%;
    height: 0.6rem;
    padding: 0 5%;
    background-color: #ffffff;
}
.noticeDesc {
    font-size: 0.24rem;
    line-height: 0.6rem;
}
.noticeLabel {
    margin-top: 0.1rem;
    font-size: 0;
}
.noticeCheckbox {
	display: none;
}
.noticeCaret {
	box-sizing: border-box;
	display: block;
	position: relative;
    width: 0.8rem;
    height: 0.4rem;
    border-radius: 0.2rem;
    background-color: #dfdfdf;
}
.noticeCheckbox:checked + .noticeCaret {     
    background-color: var(--themeColor);        
}
.noticeCaret:after {            
	content: " ";            
	position: absolute;            
	top: 0.02rem;            
	left: 0;            
	height: 0.36rem;   
	border-radius: 100%; 
	/* transition 用来设置动画的持续时间，这里的动画类型是transform，即位置偏移动画*/          
	transition: transform .2s;
}
.noticeCaret:after {            
	width: 0.36rem;            
	background-color: #fff;            
	box-shadow: 0 1px 3px rgba(0, 0, 0, .4);        
}
/*checked状态下，:after位置向右偏移20px*/        
.noticeCheckbox:checked + .noticeCaret:after {         
	transform: translateX(0.43rem);        
}
.messageBox {
	box-sizing: border-box;
	width: 100%;
	height: 100%;
	padding: 0.8rem 0 0.2rem;
	overflow: hidden;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.messageList {
	width: 95%;
	margin: 0 auto;
}
.messageItem {
	box-sizing: border-box;
	padding: 0.2rem;
	background-color: #fff;
	color: #2c3e50;
	border-bottom: 1px solid #f0f1f2;
}
.messageItem:last-child {
	border-bottom: 0;
}
.messageUser {
	width: 75%;
	font-size: 0;
}
.messageUserAvatar, .messageUserInfo {
	display: inline-block;
	vertical-align: middle;
}
.messageUserAvatar {
	position: relative;
	width: 1rem;
	height: 1rem;
	margin-right: 0.2rem;
}
.messageUserPhoto {
	width: 100%;
	border-radius: 100%;
}
.unReadMsgCount {
	position: absolute;
	top: 0;
	right: 0;
	width: 0.4rem;
	height: 0.4rem;
	font-size: 0.24rem;
	line-height: 0.4rem;
	text-align: center;
	border-radius: 100%;
	background-color: var(--themeColor);
	color: #fff;
}
.messageUserInfo {
	width: calc(100% - 1.2rem);
}
.messageUserName, .lastMessage {
	font-size: 0.28rem;
	line-height: 0.4rem;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.lastMessage {
	font-size: 0.24rem;
}
.messageUserName {
	margin-bottom: 0.1rem;
	font-weight: bold;
}
.messageSummary {
	width: 25%;
}
.messageDate, .latestTime {
	font-size: 0.24rem;
	line-height: 0.4rem;
	text-align: right;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	color: #9f9f9f;
}
.messageDate {
	margin-bottom: 0.1rem;
}
</style>


<template>
    <div id="app">
        <!-- <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div> -->
		<router-view></router-view>
    </div>
</template>
<script>
import { mapActions, mapState, mapMutations } from "vuex";
export default {
    data: function() {
        return {
            socket: null,
            timer: null,
        }
    },
    computed: {
        ...mapState({
			apiDomain: state => state.ApiDomain,
			eventNo: state => state.eventNo,
            lang: state => state.Lang,
            token: state => state.Account.Token,
            myInfo: state => state.MyInfomation,
		}),
    },
    watch: {
        token: function() {
            if(this.token != "" || this.token != null) {
                this.initSocket(this.token)
            }
        }
    },
    methods: {
        ...mapMutations([
            "SETREDDOT",
            "ADDNEWCHAT",
            "INITMESSAGELIST",
            "ADDUNREADLIST",
            "UPDATELASTMSG"
        ]),
        ...mapActions([
            "getMyInfo",
            "getMessageList"
        ]),
        initSocket(token) {
            const socketUrl = `wss://socialapi.traveldaily.cn/WebSocket/Index?token=${encodeURIComponent(token)}`
            this.socket = new WebSocket(socketUrl);
            this.socket.onopen = this.onOpen;
            this.socket.onmessage = this.onMessage;
            this.socket.onerror = this.onError;
            this.socket.onclose = this.onClose;
        },
        onOpen(){ //连接建立之后执行send方法发送数据
            console.log("socket链接打开");
        },
        onError(){//连接建立失败重连
            this.initSocket(this.token);
        },
        onMessage(e){ //数据接收
            const socketData = JSON.parse(e.data);
            let currentRoute = this.$route.path;
            var temp = null;
            if(this.$store.state.MessageList.hasOwnProperty(socketData.Sender)) {
                temp = {
                    Content: (socketData.Type == 1 ? socketData.Content : JSON.parse(socketData.Content)),
                    Id: socketData.MsgId,
                    NetUserId: socketData.Sender,
                    ReadTime: "0001-01-01T00:00:00",
                    SentTime: new Date().toJSON().replace("T", " ").substr(0, 19),
                    TargetNetUserId: this.myInfo.Id,
                    Type: (socketData.Type == 1 ? 0 : 1)
                }
                this.ADDNEWCHAT({ id: socketData.Sender, item: temp });
                if(currentRoute != "/chat") {
                    this.ADDUNREADLIST({ targetId: socketData.Sender, unReadMsgId: socketData.MsgId });
                }
            }
            if(currentRoute != "/message") {
                this.SETREDDOT("show")
            }
            if(currentRoute == "/message") {
                this.UPDATELASTMSG({ id: socketData.Sender, socketData: socketData })
            }
            if(currentRoute == "/chat") {
                let senderId = this.$route.query.chatId;
                if(socketData.Sender == senderId) {
                    this.$http.post(`${this.apiDomain}/Attendees/ChatRead`, {
                        id: socketData.MsgId,
                        token: this.token
                    }).then(res => {
                    })
                }
            }
        },
        socketSend(Data){//数据发送
            this.socket.send(Data);
        },
        onClose(e){  //关闭
            console.log('断开连接',e);
        },
    },
    created: function() {
        if(this.token != "") {
            this.getMyInfo({ eventNo: this.eventNo, token: this.token, lang: this.lang == 'zh' ? 1 : 2 });
            this.initSocket(this.token)
        }
        // vuex 页面刷新数据丢失解决问题参考https://juejin.im/post/5aa7d945518825558453ad8c
		//在页面加载时读取localStorage里的状态信息
		// localStorage.getItem("activityMsg") && this.$store.replaceState(Object.assign(this.$store.state,JSON.parse(localStorage.getItem("activityMsg"))));

		//在页面刷新时将vuex里的信息保存到localStorage里
		window.addEventListener("beforeunload",()=>{
            // localStorage.setItem("activityMsg",JSON.stringify(this.$store.state))
            localStorage.removeItem("exhibitorLoadIndex");		// 重置广场页展商列表加载页码
			localStorage.removeItem("exhibitorLoadAll");		// 重置广场页展商列表加载状态
		})
    },
}
</script>
<style>
:root {
	--themeColor: #c30d23;
}
html, body, header, section, aside, footer, div, p, h1, h2, h3, h4, h5, h6, ul, ol, li, dl, dt, dd {
    margin: 0;
    padding: 0;
}
html, body {
    width: 100%;
    height: 100%;
    font-family: "Helvetica Neue", Helvetica, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", "微软雅黑", "WenQuanYi Micro Hei", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
a {
    display: block;
    text-decoration: none;
}
img {
    display: block;
    border: 0;
    outline: none;
}
ul, ol, li {
    list-style: none;
}
input, button, textarea, select {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    outline: 0;
    border: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
}
input, select, textarea {
    border: 1px solid #BFBFBF;
}
select::-ms-expand {
    display: none;
}
input:disabled, select:disabled, button:disabled {
    background: #999 !important;
    cursor: not-allowed !important;
}
.container {
    margin: 0 auto;
    overflow: hidden;
}
.lt {
    float: left;
}
.rt {
    float: right;
}
.clear::after {
    display: block;
    content: "";
    clear: both;
}
.formGroup {
	min-height: 0.3rem;
	margin-bottom: 0.3rem;
	font-size: 0;
}
.formInput {
	width: 100%;
	height: 0.8rem;
	padding: 0 0.2rem;
}
.formTips {
	font-size: 0.24rem;
	line-height: 0.3rem;
	text-align: left;
	color: var(--themeColor);
}
.btn {
	width: 100%;
	height: 0.8rem;
	font-size: 0.28rem;
	text-align: center;
	cursor: pointer;
}
.btnRed {
	background-color: var(--themeColor);
	color: #fff;
}
#app {
    width: 100%;
    height: 100%;
    background-color: #f0f1f2;
    color: #2c3e50;
}
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>

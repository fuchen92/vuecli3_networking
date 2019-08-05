import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import {
    getProgramList,
    getProgramDetail,
    getSpeakerDetail,
    getGuestDetail,
    getAttendsList,
    getAttendsFilter,
    getRecommendList,
    getExhibitorList,
    getExhibitorFilter,
    getExhibitorDetail,
    getProductDetail,
    getPlazaList,
    getChatList,
    getNewChatCount,
    getMessageList,
    getInviteDetail,
    getMySolutionList,
    getMyInfo,
    saveMyInfo,
    getMyQrcode
} from "./api";

export default new Vuex.Store({
    state: {
        LocalApiDomain: "http://192.168.1.21:89",
        ApiDomain: "https://socialapi.traveldaily.cn",
        eventNo: 68,
        Lang: localStorage.getItem("localeLanguage") || "en",
        showRedDot: false,
        Account: {
            Token: localStorage.getItem("token") || "",
            IsFirstLogin: ""
        },
        ProgramList: [],
        ProgramDetail: {},
        SpeakerDetail: {
            ProgramList: []
        },
        GuestDetail: {
            ProgramList: [],
            ContactList: [],
            SolutionList: []
        },
        AttendsList: [],
        FilterMenu: [],
        RecommendList: [],
        ExhibitorList: [],
        ExhibitorFilterMenu: [],
        ExhibitorDetail: {
            Attendees: [],
            localContactList: [],
            Products: []
        },
        SupplyList: [
            
        ],
        DemandList: [

        ],
        MyInfomation: {},
        SolutionList: [],
        ProductDetail: {},
        QrCode: "",
        ChatList: [],
        MessageList: {

        },
        UnReadList: {

        },
        InviteDetail: {
            NetUserInfo: {
                ContactList: [
                    {},
                    {}
                ]
            },
            Time: ""
        },
    },
    mutations: {
        // 修改语言
        CHANGELANGUAGE(state, language) {
            state.Lang = language;
        },
        // 初始化（token）
        INITTOKEN(state, { account }) {
            Vue.set(state.Account, "Token", account.token);
            Vue.set(state.Account, "IsFirstLogin", account.isFirstLogin);
        },
        // 初始化日程列表
        INITPROGRAMLIST(state, { programList }) {
            let data = programList;
            let arr = [];
            let firstDay = data[7]["2019-8-27"];
            let secondDay = data[4]["2019-8-28"];
            let thirdDay = data[5]["2019-8-29"];
            let fourthDay = data[6]["2019-8-29"];
            arr.push(firstDay, secondDay, thirdDay, fourthDay);
            // let firstDay = data[4]["2019-8-28"];
            // let secondDay = data[5]["2019-8-29"];
            // let thirdDay = data[6]["2019-8-29"];
            // arr.push(firstDay, secondDay, thirdDay);
            state.ProgramList = arr;     
        },
        // 获取日程详情
        INITPROGRAMDETAIL(state, { programDetail }) {
            let detail = programDetail;
            let data = detail.Data;
            
            let isEnd = detail.Message.isEnd,
                isSpeaker = detail.Message.isSpeaker;

            let tempBegin = data.Begin,
                tempEnd = data.End;


            let begin = tempBegin.split("T")[1].substr(0, 5),
                end = tempEnd.split("T")[1].substr(0, 5);

            let date = tempBegin.split("T")[0].substr(5, 5);

            let time = date + "，" + begin + " - " + end;
            
            state.ProgramDetail = data;
            Vue.set(state.ProgramDetail, "IsEnd", isEnd);
            Vue.set(state.ProgramDetail, "IsSpeaker", isSpeaker);
            Vue.set(state.ProgramDetail, "LocalTime", time);
        },
        // 获取演讲嘉宾详情
        INITSPEAKERDETAIL(state, { speakerDetail }) {
            state.SpeakerDetail = speakerDetail;
        },
        // 获取参会嘉宾详情
        INITGUESTDETAIL(state, { guestDetail }) {
            state.GuestDetail = guestDetail;
        },
        // 获取人脉页所有嘉宾列表
        INITATTENDSLIST(state, { attendsList }) {
            if(state.AttendsList.length == 0) {
                state.AttendsList = attendsList;
            } else {
                state.AttendsList = state.AttendsList.concat(attendsList);
            }
        },
        // 当语言切换时清空人脉页所有嘉宾列表
        EMPTYATTENDSLIST(state) {
            state.AttendsList.length = 0;
        },
        // 人脉页推荐列表
        INITRECOMMENDLIST(state, { recommendList }) {
            if(state.RecommendList.length == 0) {
                state.RecommendList = recommendList
            } else {
                state.RecommendList = state.RecommendList.concat(recommendList)
            }
        },
        // 人脉页重新推荐时清空推荐列表
        EMPTYRECOMMENDLIST(state) {
            state.RecommendList.length = 0;
        },
        // 获取人脉页推荐面板筛选选项
        INITATTENDSFILTERMENU(state, { filterMenu }) {
            state.FilterMenu = filterMenu;
        },
        // 初始化展商列表
        INITEXHIBITORLIST(state, { exhibitorList }) {
            if(state.ExhibitorList.length == 0) {
                state.ExhibitorList = exhibitorList;
            } else {
                state.ExhibitorList = state.ExhibitorList.concat(exhibitorList)
            }
        },
        // 当语言切换时清空展商列表
        EMPTYEXHIBITORLIST(state) {
            state.ExhibitorList.length = 0;
        },
        // 获取展商详情
        INITEXHIBITORDETAIL(state, { detail }) {
            let ContactList = detail.ContactList,
                contactList = Array.from(new Array(10).keys()).map((i) => []);

            ContactList.map(item => {
                contactList[item.Id - 1] = item.Name
            });

            state.ExhibitorDetail = detail;
            Vue.set(state.ExhibitorDetail, "localContactList", contactList);
        },
        // 获取搜索页展商筛选选项
        INITEXHIBITORFILTERMENU(state, { filterMenu }) {
            state.ExhibitorFilterMenu = filterMenu;
        },
        // 获取产品详情
        INITPRODUCTDETAIL(state, { product }) {
            state.ProductDetail = product;
        },
        // 获取广场供应帖子
        INITSUPPLYLIST(state, { plazaList }) {
            state.SupplyList = plazaList;
        },
        // 获取广场需求帖子
        INITDEMANDLIST(state, { plazaList }) {
            state.DemandList = plazaList;
        },
        // 我的需求页面获取我的需求
        INITMYSOLUTIONLIST(state, { solutionList }) {
            state.SolutionList = solutionList;
        },
        // 根据帖子Id删除我的需求
        DELETESOLUTION(state, { id }) {
            var solutionList = state.SolutionList,
                len = solutionList.length;
            var index = 0;
            for(let i = 0; i < len; i++) {
                if(solutionList[i].Id == id) {
                    index = i;
                    break;
                }
            }
            state.SolutionList.splice(index, 1);
        },
        // 我的页面个人信息简要
        INITMYINFOMATION(state, { infomation }) {
            let Mobile = infomation.ContactList.filter(item => item.Id == 1)[0].Name;
            let Mail = infomation.ContactList.filter(item => item.Id == 2)[0].Name;
            let WeChat = infomation.ContactList.filter(item => item.Id == 3)[0].Name;
            state.MyInfomation = infomation;
            Vue.set(state.MyInfomation, "Mobile", Mobile);
            Vue.set(state.MyInfomation, "Mail", Mail);
            Vue.set(state.MyInfomation, "WeChat", WeChat);
        },
        // 修改个人资料页wechat
        CHANGEWECHAT(state, wechat) {
            Vue.set(state.MyInfomation, "WeChat", wechat)
        },
        // 修改个人资料页简介
        CHANGEINTRO(state, intro) {
            Vue.set(state.MyInfomation, "Intro", intro)
        },
        // 修改个人资料头像
        CHANGEAVATAR(state, avatar) {
            Vue.set(state.MyInfomation, "Photo", avatar)
        },
        GETMYQRCODE(state, code) {
            state.QrCode = code;
        },
        // 获取聊天用户列表
        INITCHATLIST(state, chatList) {
            state.ChatList = chatList;
        },
        // 获取用户聊天的消息
        INITMESSAGELIST(state, { targetId, msgList }) {
            // msgList.sort(function(a, b) {
            //     return a.Id - b.Id
            // });
            msgList.map(item => {
                if(item.Type == 1 || item.Type == 2) {
                    item.Content = JSON.parse(item.Content)
                    if(item.Type == 2) {
                        item.Content.Time = item.Content.Time.split("T")[0].substr(5, 5) + " " + item.Content.Time.split("T")[1].substr(0, 5)
                    }
                }
            });
            if(state.MessageList.hasOwnProperty(targetId)) {
                let newList = [...msgList, ...state.MessageList[targetId]]
                state.MessageList[targetId].unshift(...msgList)
                // Vue.set(state.MessageList, targetId, newList);
            } else {
                Vue.set(state.MessageList, targetId, msgList);
            }
        },
        // 向当前聊天对象添加新的聊天内容
        ADDNEWCHAT(state, { id, item }) {
            if (state.MessageList.hasOwnProperty(id)) {
                if(item.Type == 2) {
                    item.Content.Time = item.Content.Time.split("T")[0].substr(5, 5) + " " + item.Content.Time.split("T")[1].substr(0, 5)
                }
                state.MessageList[id].push(item)
            } else {
                // Vue.set(state.MessageList, targetId, msgList);
            }
        },
        // socket不在message页面时，用于添加用户的未读信息
        ADDUNREADLIST(state, { targetId, unReadMsgId }) {
            if(state.UnReadList.hasOwnProperty(targetId)) {
                state.UnReadList[targetId].push(unReadMsgId)
            } else {
                Vue.set(state.UnReadList, targetId, []);
                state.UnReadList[targetId].push(unReadMsgId)
            }
        },
        // socket在message页面时，实时更新用户头像红点和最新聊天信息
        UPDATELASTMSG(state, { id, socketData }) {
            let { Type, Sender, Content, MsgId } = socketData;
            var chatList = state.ChatList,
                len = chatList.length;
            var index = 0;
            for(var i = 0; i < len; i++) {
                if(chatList[i].Id == id) {
                    index = i;
                    break;
                }
            }
            let date = new Date().toJSON().substr(0, 10),
                time = new Date().toTimeString().substr(0, 8),
                sentTime = date + "T" + time;

            var content = "";
            if(Type == 2) {
                content = "这是我的名片，请查收";
            } else if(Type == 3) {
                content = "我向你发起了现场见面邀约，请查收";
            } else {
                content = Content;
            }
            Vue.set(state.ChatList[index]["LastMessage"], "Content", content );
            Vue.set(state.ChatList[index]["LastMessage"], "SentTime", sentTime );
            Vue.set(state.ChatList[index], "NewMessageCount", state.ChatList[index]["NewMessageCount"] + 1 );
        },
        // 清空用户未读消息
        RESETUNREADLIST(state, { targetId }) {
            state.UnReadList[targetId].length = 0;
        },
        // 获取邀约详情
        GETINVITEDETAIL(state, { inviteDetail }) {
            state.InviteDetail = inviteDetail;
        },
        // 设置tabBar组件红点
        SETREDDOT(state, type) {
            if(type == "show") {
                state.showRedDot = true;
            } else {
                state.showRedDot = false;
            }
        }
    },
    actions: {
        // 初始化Token
        initToken({ commit }, { account }) {
            commit("INITTOKEN", { account })
        },
        // 初始化日程列表
        getProgramList({ commit }, { eventNo, token, lang }) {
            getProgramList(eventNo, token, lang).then(res => {
                commit("INITPROGRAMLIST", { programList: res.data.Data })
            })
        },
        // 获取日程详情
        getProgramDetail({ commit }, { eventNo, id, token, lang }) {
            getProgramDetail(eventNo, id, token, lang).then(res => {
                commit("INITPROGRAMDETAIL", { programDetail: res.data })
            })
        },
        // 获取演讲嘉宾详情
        getSpeakerDetail({ commit }, { eventNo, id, token, lang}) {
            getSpeakerDetail(eventNo, id, token, lang).then(res => {
                commit("INITSPEAKERDETAIL", { speakerDetail: res.data.Data })
            })
        },
        // 获取参会嘉宾详情
        getGuestDetail({ commit }, { eventNo, id, token, lang }) {
            getGuestDetail(eventNo, id, token, lang).then(res => {
                commit("INITGUESTDETAIL", { guestDetail: res.data.Data })
            })
        },
        // 获取人脉页所有嘉宾列表
        getAttendsList({ commit }, { eventNo, index, size, token, lang }) {
            getAttendsList(eventNo, index, size, token, lang).then(res => {
                commit("INITATTENDSLIST", { attendsList: res.data.Data })
            })
        },        
        // 获取人脉页推荐面板筛选选项
        getAttendsFilter({ commit }, { eventNo, token, lang }) {
            getAttendsFilter(eventNo, token, lang).then(res => {
                commit("INITATTENDSFILTERMENU", { filterMenu: res.data.Data })
            })
        },
        // 人脉页推荐列表
        getRecommendList({ commit }, { eventNo, keyword, filter1, index, size, filter2, filter3, token, lang }) {
            getRecommendList(eventNo, keyword, filter1, index, size, filter2, filter3, token, lang).then(res => {
                commit("INITRECOMMENDLIST", { recommendList: res.data.Data })
            })
        },
        // 获取展商列表
        getExhibitorList({ commit }, { eventNo, index, size, token, lang }) {
            getExhibitorList(eventNo, index, size, token, lang).then(res => {
                commit("INITEXHIBITORLIST", { exhibitorList: res.data.Data })
            })
        },
        // 获取搜索页展商筛选选项
        getExhibitorFilter({ commit }, { eventNo, token, lang }) {
            getExhibitorFilter(eventNo, token, lang).then(res => {
                commit("INITEXHIBITORFILTERMENU", { filterMenu: res.data.Data })
            })
        },
        // 获取展商详情
        getExhibitorDetail({ commit }, { eventNo, id, token, lang }) {
            getExhibitorDetail(eventNo, id, token, lang).then(res => {
                commit("INITEXHIBITORDETAIL", { detail: res.data.Data })
            })
        },
        // 获取产品详情
        getProductDetail({ commit }, { eventNo, id, token, lang }) {
            getProductDetail(eventNo, id, token, lang).then(res => {
                commit("INITPRODUCTDETAIL", { product: res.data.Data })
            })
        },
        // 获取广场供需帖子
        getPlazaList({ commit }, { eventNo, index, size, type, token, lang }) {
            getPlazaList(eventNo, index, size, type, token, lang).then(res => {
                if(type == 1) {
                    commit("INITSUPPLYLIST", { plazaList: res.data.Data })
                } else if (type == 2) {
                    commit("INITDEMANDLIST", { plazaList: res.data.Data })
                }
            })
        },
        // 我的需求页面获取我的需求
        getMySolutionList({ commit }, { eventNo, index, size, token, lang }) {
            getMySolutionList(eventNo, index, size, token, lang).then(res => {
                commit("INITMYSOLUTIONLIST", { solutionList: res.data.Data })
            })
        },
        // 我的页面个人信息简要
        getMyInfo({ commit }, { eventNo, token, lang }) {
            getMyInfo(eventNo, token, lang).then(res => {
                commit("INITMYINFOMATION", { infomation: res.data.Data })
            })
        },
        saveMyInfo({ commit }, { intro, contactList, token, lang }) {
            saveMyInfo(intro, contactList, token, lang).then(res => {
                console.log("保存成功");
            })
        },
        getMyQrcode({ commit }, { token, lang }) {
            getMyQrcode(token, lang).then(res => {
                commit("GETMYQRCODE", res.data.Data);
            })
        },
        // 获取用户聊天列表
        getChatList({ commit }, { eventNo, token, lang }) {
            getChatList(eventNo, token, lang).then(res => {
                commit("INITCHATLIST", res.data.Data);
            })
        },
        // 获取tabBar新消息以控制显示红点
        getNewChatCount({ commit }, { eventNo, token, lang }) {
            getNewChatCount(eventNo, token, lang).then(res => {
                let resData = res.data;
                if(resData.Code == 0) {
                    if(resData.Data > 0) {
                        commit("SETREDDOT", "show");
                    } else {
                        commit("SETREDDOT", "hide");
                    }
                }
            })
        },
        // 获取用户聊天的消息列表
        getMessageList({ commit }, { eventNo, target, before, size, token, after, lang }) {
            getMessageList(eventNo, target, before, size, token, after, lang).then(res => {
                commit("INITMESSAGELIST", { targetId: target, msgList: res.data.Data })
            })
        },
        // 获取邀约详情
        getInviteDetail({ commit }, { eventNo, id, token, lang }) {
            getInviteDetail(eventNo, id, token, lang).then(res => {
                commit("GETINVITEDETAIL", { inviteDetail: res.data.Data })
            })
        }
    },
    getters: {
        // 根据语言获取我的页面个人资料简要
        getMyInfoByLang: (state) => (lang) => {
            var myInfo = {};
            if(lang == "zh") {
                myInfo = {
                    Name: state.MyInfomation.Name,
                    Company: state.MyInfomation.Company,
                    JobTitle: state.MyInfomation.JobTitle,
                    Photo: state.MyInfomation.Photo,
                    Mobile: state.MyInfomation.Mobile,
                    Mail: state.MyInfomation.Mail,
                    WeChat: state.MyInfomation.WeChat
                }
            }
            if(lang == "en") {
                myInfo = {
                    Name: state.MyInfomation.NameEn,
                    Company: state.MyInfomation.CompanyEn,
                    JobTitle: state.MyInfomation.JobTitleEn,
                    Photo: state.MyInfomation.Photo,
                    Mobile: state.MyInfomation.Mobile,
                    Mail: state.MyInfomation.Mail,
                    WeChat: state.MyInfomation.WeChat
                }
            }
            return myInfo;
        },
        // 根据用户Id获取对应的聊天记录
        getChatListById: (state) => (targetId) => {
            return state.MessageList[targetId]
        },
        // 根据用户Id获取对应的未读消息
        getUnReadListById: (state) => (targetId) => {
            return state.UnReadList[targetId]
        }
    }
});

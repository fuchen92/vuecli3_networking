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
    getExhibitorDetail,
    getProductDetail,
    getPlazaList,
    getChatList,
    getMessageList,
    getMySolutionList,
    getMyInfo,
    saveMyInfo,
    getMyQrcode
} from "./api";

export default new Vuex.Store({
    state: {
        eventNo: 68,
        Lang: localStorage.getItem("localeLanguage") || "zh",
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
        ExhibitorDetail: {
            Attendees: [],
            localContactList: []
        },
        SupplyList: [],
        DemandList: [],
        MyInfomation: {},
        SolutionList: [],
        ProductDetail: {},
        QrCode: "",
        ChatList: [],
        MessageList: [],
    },
    mutations: {
        // 修改语言
        CHANGELANGUAGE(state, language) {
            state.Lang = language;
        },
        // 初始化（token）
        INITTOKEN(state, { account }) {
            localStorage.setItem("token", account.token);
            Vue.set(state.Account, "Token", account.token);
            Vue.set(state.Account, "IsFirstLogin", account.isFirstLogin);
        },
        // 初始化日程列表
        INITPROGRAMLIST(state, { programList }) {
            // console.log(programList)
            let data = programList;
            let arr = [];
            let firstDay = data[4]["2019-8-28"];
            let secondDay = data[5]["2019-8-29"];
            let thirdDay = data[6]["2019-8-29"];
            arr.push(firstDay, secondDay, thirdDay);
            state.ProgramList = arr;     
            
            // console.log(state.ProgramList)
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
            state.AttendsList = attendsList;
        },
        // 人脉页推荐列表
        INITRECOMMENDLIST(state, { recommendList }) {
            state.RecommendList = recommendList
        },
        // 获取人脉页推荐面板筛选选项
        INITATTENDSFILTERMENU(state, { filterMenu }) {
            state.FilterMenu = filterMenu;
        },
        // 初始化展商列表
        INITEXHIBITORLIST(state, { exhibitorList }) {
            state.ExhibitorList = exhibitorList;
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
            state.DemandList = plazaList
        },
        // 我的需求页面获取我的需求
        INITMYSOLUTIONLIST(state, { solutionList }) {
            state.SolutionList = solutionList;
        },
        // 我的页面个人信息简要
        INITMYINFOMATION(state, { infomation }) {
            let Mobile = infomation.ContactList.filter(item => item.Id == 1)[0].Name;
            let Email = infomation.ContactList.filter(item => item.Id == 2)[0].Name;
            let WeChat = infomation.ContactList.filter(item => item.Id == 3)[0].Name;
            state.MyInfomation = infomation;
            Vue.set(state.MyInfomation, "Mobile", Mobile);
            Vue.set(state.MyInfomation, "Email", Email);
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
        GETMYQRCODE(state, code) {
            state.QrCode = code;
        },
        // 获取聊天用户列表
        INITCHATLIST(state, chatList) {
            console.log(chatList)
            state.ChatList = chatList;
        },
        // 获取用户聊天的消息
        INITMESSAGELIST(state, { msgList }) {
            console.log(msgList);
            msgList.sort(function(a, b) {
                return a.Id - b.Id
            });
            msgList.map(item => {
                if(item.Type == 1 || item.Type == 2) {
                    console.log(JSON.parse(item.Content))
                    item.Content = JSON.parse(item.Content)
                    if(item.Type == 2) {
                        item.Content.Time = item.Content.Time.split("T")[0].substr(5, 5) + " " + item.Content.Time.split("T")[1].substr(0, 5)
                    }
                }
            });
            state.MessageList = msgList;
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
                // console.log(res);
                // commit("GETMYQRCODE", res.data.)
            })
        },
        // 获取用户聊天列表
        getChatList({ commit }, { eventNo, token, lang }) {
            getChatList(eventNo, token, lang).then(res => {
                commit("INITCHATLIST", res.data.Data);
            })
        },
        // 获取用户聊天的消息列表
        getMessageList({ commit }, { eventNo, target, before, size, token, after, lang }) {
            getMessageList(eventNo, target, before, size, token, after, lang).then(res => {
                commit("INITMESSAGELIST", { msgList: res.data.Data })
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
                    // Mobile: state.MyInfomation.ContactList[0].Name,
                    // Email: state.MyInfomation.ContactList[1].Name,
                    // WeChat: state.MyInfomation.ContactList[2].Name
                    // Intro: state.MyInfomation.ContactList[2].Name,
                }
            }
            if(lang == "en") {
                myInfo = {
                    Name: state.MyInfomation.NameEn,
                    Company: state.MyInfomation.CompanyEn,
                    JobTitle: state.MyInfomation.JobTitleEn,
                    Photo: state.MyInfomation.Photo
                }
            }
            return myInfo;
        }
    }
});

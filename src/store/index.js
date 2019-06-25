import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { getProgramList, getMySolutionList, getMyInfo, saveMyInfo, getMyQrcode, getChatList } from "./api";

export default new Vuex.Store({
    state: {
        eventNo: 63,
        Lang: localStorage.getItem("localeLanguage") || "zh",
        Account: {
            Token: localStorage.getItem("token") || "",
            IsFirstLogin: ""
        },
        MyInfomation: {},
        ProgramList: [],
        SolutionList: [],
        QrCode: "",
        ChatList: [],
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
            let data = programList;
            let arr = [];
            let firstDay = data[4]["2018-9-20"];
            let secondDay = data[5]["2018-9-21"];
            let thirdDay = data[6]["2018-9-21"];
            arr.push(firstDay, secondDay, thirdDay);
            state.ProgramList = arr;          
        },
        // 我的需求页面获取我的需求
        INITMYSOLUTIONLIST(state, { solutionList }) {
            console.log(solutionList)
            state.SolutionList = solutionList;
        },
        // 我的页面个人信息简要
        INITMYINFOMATION(state, { infomation }) {
            // console.log(infomation)
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
            state.ChatList = chatList;
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
        getChatList({ commit }, { token, lang }) {
            getChatList(token, lang).then(res => {
                commit("INITCHATLIST", res.data.Data);
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

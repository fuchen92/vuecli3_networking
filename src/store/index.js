import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import { getProgramList, getMySolutionList, getMyInfo } from "./api";

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
        SolutionList: []
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
            state.MyInfomation = infomation;
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
        }
    },
    getters: {
        // 根据语言获取我的页面个人资料简要
        getMyInfoByLang: (state) => (lang) => {
            var myInfo = {};
            console.log(state.MyInfomation)
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
            console.log(myInfo)
            return myInfo;
        }
    }
});

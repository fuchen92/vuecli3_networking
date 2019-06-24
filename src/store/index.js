import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import {
    getProgramList
} from "./api";

export default new Vuex.Store({
    state: {
        eventNo: 63,
        Lang: localStorage.getItem("localeLanguage") || "zh",
        Account: {
            Token: localStorage.getItem("token") || "",
            IsFirstLogin: ""
        },
        ProgramList: []
    },
    mutations: {
        // 修改语言
        CHANGELANGUAGE(state, language) {
            state.Lang = language;
        },
        // 初始化账户（token）
        INITACCOUNT(state, { account }) {
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
    },
    actions: {
        // 初始化账户
        initAccount({ commit }, { account }) {
            commit("INITACCOUNT", { account })
        },
        // 初始化日程列表
        getProgramList({ commit }, { eventNo, token, lang }) {
            getProgramList(eventNo, token, lang).then(res => {
                commit("INITPROGRAMLIST", { programList: res.data.Data })
            })
        }
    },
    getters: {
        // 根据语言获取日程列表到底是中文还是英文
        // getProgramListByLang: (state) => {
        //     return state.ProgramList[state.Lang];
        // }
    }
});

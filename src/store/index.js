import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import {
    getProgramList
} from "./api";

export default new Vuex.Store({
    state: {
        // Lang: "zh",
        Lang: localStorage.getItem("localeLanguage") || "zh",
        ProgramList: []
    },
    mutations: {
        // 修改语言
        CHANGELANGUAGE(state, language) {
            state.Lang = language;
        },
        // 初始化日程列表
        INITPROGRAMLIST(state, { programList }) {
            let arr = [];
            let data = programList;
            arr.push(data[4]["2018-9-19"], data[5]["2018-9-21"], data[6]["2018-9-21"])
            state.ProgramList = arr;
        },
    },
    actions: {
        // 初始化日程列表
        getProgramList({ commit }, eventNo, token, lang) {
            getProgramList(eventNo, token, lang).then(res => {
                console.log(res)
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

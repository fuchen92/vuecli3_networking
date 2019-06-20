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
        ProgramList: {
            zh: [],
            en: []
        }
    },
    mutations: {
        // 修改语言
        CHANGELANGUAGE(state, language) {
            state.Lang = language;
        },
        // 初始化日程列表
        INITPROGRAMLIST(state, { programList }) {
            Vue.set(state.ProgramList, "zh", programList.zh);
            Vue.set(state.ProgramList, "en", programList.en);
        },
    },
    actions: {
        // 初始化日程列表
        getProgramList({ commit }) {
            getProgramList().then(res => {
                commit("INITPROGRAMLIST", { programList: res.data.ProgramList })
            })
        }
    },
    getters: {
        // 根据语言获取日程列表到底是中文还是英文
        getProgramListByLang: (state) => {
            return state.ProgramList[state.Lang];
        }
    }
});

import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import {
    getUserAccount,
    fetchActivities,
    getOrders,
    getAllots
} from "./api";

export default new Vuex.Store({
    state: {
        lang: "zh",
        Account: {},
        ActivityList: [],
        Orders: {},
        Allots: {}
    },
    mutations: {
        CHANGELANGUAGE(state, language) {
            state.lang = language;
            // Vue.set(state, "lang", language);
        },
        INITACCOUNT(state, { account }) {
            // Vue.set(state.Account, "Account", account)
            // console.log(state.Account)
            state.Account = account
        },
        INITACTIVITY(state, { activityList }) {
            // Vue.set(state.ActivityList, "ActivityList", activityList)
            // console.log(state.ActivityList)
            state.ActivityList = activityList
        },
        INITORDERS(state, { orders }) {
            state.Orders = orders
        },
        INITALLOTS(state, { allots }) {
            state.Allots = allots
        },
        CANCELORDERBYID(state, { no, willCancelOrderId }) {
            Vue.set(state.Orders[no].find(order => order.Id == willCancelOrderId), "PayStatus", 5)
        },
        SETACCOUNTMOBILE(state, { willChangeMobile }) {
            Vue.set(state.Account, "Mobile", willChangeMobile)
        },
        SETACCOUNT(state, newAccount) {
            Vue.set(state.Account, "Name", newAccount.name);
            Vue.set(state.Account, "Company", newAccount.company);
            Vue.set(state.Account, "Job", newAccount.job);
            Vue.set(state.Account, "Tel", newAccount.tel);
            Vue.set(state.Account, "Email", newAccount.email);
        }
    },
    actions: {
        // 初始化我的账户
        getUserAccount({ commit }, mobile) {
            getUserAccount(mobile).then(res => {
                commit("INITACCOUNT", { account: res.data.Account })
            })
        },
        // 初始化所有活动
        getActivities({ commit }) {
            fetchActivities().then(res => {
                commit("INITACTIVITY", { activityList: res.data.ActivityList })
            })
        },
        // 初始化所有订单
        getOrders({ commit }) {
            getOrders().then(res => {
                commit("INITORDERS", { orders: res.data.Orders })
            })
        },
        // 初始化所有已分配列表
        getAllots({ commit }) {
            getAllots().then(res => {
                commit("INITALLOTS", { allots: res.data.Allots })
            })
        },
        // 根据id取消订单
        cancelOrderById({ commit }, { no, willCancelOrderId }) {
            commit("CANCELORDERBYID", { no, willCancelOrderId })
        },
        // 修改我的账户--手机
        setAccountMobile({ commit }, { willChangeMobile }) {
            commit("SETACCOUNTMOBILE", { willChangeMobile })
        },
        // 修改我的账户
        setAccount({ commit }, newAccount) {
            commit("SETACCOUNT", newAccount)
        }
    },
    getters: {
        // 根据no获取当前活动
        getActivityByNo: (state) => (no) => {
            return state.ActivityList.find(activity => activity.No == no)
        },
        // 根据no获取当前活动的订单
        getCurrentOrderList: (state) => (no, filterKeyWord) => {
            if (filterKeyWord === "all") {	// 所有订单
                return state.Orders[no]
            } else {						// 已付款订单
                return state.Orders[no].filter(order => {
                    return order.PayStatus == 1
                })
            }
        },
        // 根据no获取当前活动分配的相关信息，已分配个数，未分配个数，分配列表
        getCurrentAllotsByNo: (state) => (no) => {
            return state.Allots[no]
        }
    }
});

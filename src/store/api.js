import axios from "axios";

let LocalApiDomain = "http://192.168.1.21:89",
    apiDomain = "https://socialapi.traveldaily.cn";

// 获取日程列表
export function getProgramList(eventNo, token, lang) {
    return axios.post(`${apiDomain}/Program/List`, {
        eventNo: eventNo,
        token: token,
        lang: lang
    })
}
// 获取日程详情
export function getProgramDetail(eventNo, id, token, lang) {
    return axios.post(`${apiDomain}/Program/Details`, {
        eventNo: eventNo,
        id: id,
        token: token,
        lang: lang
    })
}
// 获取演讲嘉宾详情
export function getSpeakerDetail(eventNo, id, token, lang) {
    return axios.post(`${apiDomain}/Program/SpeakerDetails`, {
        eventNo: eventNo,
        id: id,
        token: token,
        lang: lang
    })
}
// 获取参会嘉宾详情
export function getGuestDetail(eventNo, id, token, lang) {
    return axios.post(`${apiDomain}/Attendees/Details`, {
        eventNo: eventNo,
        id: id,
        token: token,
        lang: lang
    })
}
// 获取所有嘉宾列表
export function getAttendsList(eventNo, index, size, token, lang) {
    return axios.post(`${apiDomain}/Attendees/List`, {
        eventNo: eventNo,
        index: index,
        size: size,
        token: token,
        lang: lang
    })
}
// 获取推荐列表
export function getRecommendList(eventNo, keyword, filter1, index, size, filter2, filter3, token, lang) {
    return axios.post(`${apiDomain}/Attendees/Search`, {
        eventNo: eventNo,
        keyword: keyword,
        filter1: filter1,
        index: index,
        size: size,
        filter2: filter2,
        filter3: filter3,
        token: token,
        lang: lang
    })
}
// 获取人脉页筛选菜单列表
export function getAttendsFilter(eventNo, token, lang) {
    return axios.post(`${apiDomain}/Attendees/FilterMenu`, {
        eventNo: eventNo,
        token: token,
        lang: lang
    })
}
// 获取展商列表
export function getExhibitorList(eventNo, index, size, token, lang) {
    return axios.post(`${apiDomain}/Exhibitors/List`, {
        eventNo: eventNo,
        index: index,
        size: size,
        token: token,
        lang: lang
    })
}
// 获取展商筛选菜单
export function getExhibitorFilter(eventNo, token, lang) {
    return axios.post(`${apiDomain}/Exhibitors/FilterMenu`, {
        eventNo: eventNo,
        token: token,
        lang: lang
    })
}
// 获取展商详情
export function getExhibitorDetail(eventNo, id, token, lang) {
    return axios.post(`${apiDomain}/Exhibitors/Details`, {
        eventNo: eventNo,
        id: id,
        token: token,
        lang: lang
    })
}
// 获取展商产品详情
export function getProductDetail(eventNo, id, token, lang) {
    return axios.post(`${apiDomain}/Exhibitors/ProductDetail`, {
        eventNo: eventNo,
        id: id,
        token: token,
        lang: lang
    })
}
// 获取广场所有帖子列表
export function getPlazaList(eventNo, index, size, type, token, lang) {
    return axios.post(`${apiDomain}/Plaza/List`, {
        eventNo: eventNo,
        index: index,
        size: size,
        type: type,
        token: token,
        lang: lang
    })
}
// 获取所有聊天用户列表
export function getChatList(eventNo, token, lang) {
    return axios.post(`${apiDomain}/Message/ChatList`, {
        eventNo: eventNo,
        token: token,
        lang: lang
    })
}
// 获取新聊天数量，用于控制底部tabbar红点展示隐藏
export function getNewChatCount(eventNo, token, lang) {
    return axios.post(`${apiDomain}/Message/ChatCount`, {
        eventNo: eventNo,
        token: token,
        lang: lang
    })
}
// 获取和某一嘉宾或展商聊天消息列表
export function getMessageList(eventNo, target, before, size, token, after, lang) {
    return axios.post(`${apiDomain}/Attendees/UserChat`, {
        eventNo: eventNo,
        target: target,
        before: before,
        size: size,
        token: token,
        after: after,
        lang: lang
    })
}
// 获取邀约信息
export function getInviteDetail(eventNo, id, token, lang) {
    return axios.post(`${apiDomain}/Attendees/InviteInfo`, {
        eventNo: eventNo,
        id: id,
        token: token,
        lang: lang
    })
}
// 获取我的帖子列表
export function getMySolutionList(eventNo, index, size, token, lang) {
    return axios.post(`${apiDomain}/Me/SolutionList`, {
        eventNo: eventNo,
        index: index,
        size: size,
        token: token,
        lang: lang
    })
}
// 获取我的信息
export function getMyInfo(eventNo, token, lang) {
    return axios.post(`${apiDomain}/Me/UserInfo`, {
        eventNo: eventNo,
        token: token,
        lang: lang
    })
}
// 保存我的信息
export function saveMyInfo(intro, contactList, token, lang) {
    return axios.post(`http://192.168.1.21:89/Me/MeSave`, {
        Intro: intro,
        ContactList: contactList,
        token: token,
        lang: lang
    })
}
// 获取我的签到码
export function getMyQrcode(token, lang) {
    return axios.post(`${apiDomain}/Me/UserQRCode`, {
        token: token,
        lang: lang
    })
}

// export function getProgramList(no, token, lang) {
//     return axios.post(`http://localhost:8089/Program/List`, {
//         eventNo: no,
//         token: token,
//         lang: lang
//     })
// }
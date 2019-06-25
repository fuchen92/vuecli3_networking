import axios from "axios";

let LocalApiDomain = "http://192.168.1.21:89",
    apiDomain = "https://socialapi.traveldaily.cn";

export function getProgramList(eventNo, token, lang) {
    return axios.post(`${apiDomain}/Program/List`, {
        eventNo: eventNo,
        token: token,
        lang: lang
    })
}

export function getMySolutionList(eventNo, index, size, token, lang) {
    return axios.post(`http://192.168.1.21:89/Me/SolutionList`, {
        eventNo: eventNo,
        index: index,
        size: size,
        token: token,
        lang: lang
    })
}

export function getMyInfo(eventNo, token, lang) {
    return axios.post(`${apiDomain}/Me/UserInfo`, {
        eventNo: eventNo,
        token: token,
        lang: lang
    })
}

export function saveMyInfo(intro, contactList, token, lang) {
    return axios.post(`http://192.168.1.21:89/Me/MeSave`, {
        Intro: intro,
        ContactList: contactList,
        token: token,
        lang: lang
    })
}

export function getMyQrcode(token, lang) {
    return axios.post(`http://192.168.1.21:89/Me/UserQRCode`, {
        token: token,
        lang: lang
    })
}

export function getChatList(token, lang) {
    return axios.post(`http://192.168.1.21:89/Message/ChatList`, {
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
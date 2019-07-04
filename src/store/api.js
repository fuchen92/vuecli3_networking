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

export function getProgramDetail(eventNo, id, token, lang) {
    return axios.post(`${apiDomain}/Program/Details`, {
        eventNo: eventNo,
        id: id,
        token: token,
        lang: lang
    })
}

export function getSpeakerDetail(eventNo, id, token, lang) {
    return axios.post(`${apiDomain}/Program/SpeakerDetails`, {
        eventNo: eventNo,
        id: id,
        token: token,
        lang: lang
    })
}

export function getGuestDetail(eventNo, id, token, lang) {
    return axios.post(`${apiDomain}/Attendees/Details`, {
        eventNo: eventNo,
        id: id,
        token: token,
        lang: lang
    })
}

export function getAttendsList(eventNo, index, size, token, lang) {
    return axios.post(`${apiDomain}/Attendees/List`, {
        eventNo: eventNo,
        index: index,
        size: size,
        token: token,
        lang: lang
    })
}

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

export function getAttendsFilter(eventNo, token, lang) {
    return axios.post(`${apiDomain}/Attendees/FilterMenu`, {
        eventNo: eventNo,
        token: token,
        lang: lang
    })
}

export function getExhibitorList(eventNo, index, size, token, lang) {
    return axios.post(`${apiDomain}/Exhibitors/List`, {
        eventNo: eventNo,
        index: index,
        size: size,
        token: token,
        lang: lang
    })
}

export function getExhibitorDetail(eventNo, id, token, lang) {
    return axios.post(`${apiDomain}/Exhibitors/Details`, {
        eventNo: eventNo,
        id: id,
        token: token,
        lang: lang
    })
}

export function getProductDetail(eventNo, id, token, lang) {
    return axios.post(`${apiDomain}/Exhibitors/ProductDetail`, {
        eventNo: eventNo,
        id: id,
        token: token,
        lang: lang
    })
}

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
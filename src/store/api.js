import axios from "axios";

export function getProgramList(eventNo, token, lang) {
    return axios.post(`http://192.168.1.21:89/Program/List`, {
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
    return axios.post(`http://192.168.1.21:89/Me/UserInfo`, {
        eventNo: eventNo,
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
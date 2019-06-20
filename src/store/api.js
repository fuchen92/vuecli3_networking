import axios from "axios";

export function getProgramList(no, token, lang) {
    return axios.post(`http://localhost:8089/Program/List`, {
        eventNo: no,
        token: token,
        lang: lang
    })
}
// export function getProgramList(mobile) {
//     return axios.get(`http://192.168.1.22:8089/api/program`)
// }

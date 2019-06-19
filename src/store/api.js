import axios from "axios";

const apiDomain = "http://192.168.1.22:8089";

export function getProgramList(mobile) {
    return axios.get(`${apiDomain}/api/program`)
}

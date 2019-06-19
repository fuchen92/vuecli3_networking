import axios from "axios";

export function getProgramList(mobile) {
    return axios.get(`http://localhost:8089/api/program`)
}

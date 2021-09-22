import axios from "axios";
import { get, post } from "@/utils/request"

export const getInfo = (params) => {
    return get('app/user/userinfo.do', params);
}
export const getShops = (data) => {
    return post('app/list/accoutList.do', data);
}
export const getMock = () => {
    return axios.get('/mock/nativeMock.json')
}
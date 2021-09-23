import axios from "axios";
import { get, post } from "@/utils/request"
export const test = (params) => {
    return get('app/user/userinfo.do', params);
}
//首页获取城市ID及经纬度信息
export const getLocation = (data) => {
    return post('app/user/userinfo.do', data);
}
//首页获取商圈和地区的列表
export const getTradeAreaList = (params) => {
    return post('app/user/userinfo.do', params);
}
//首页获取商户列表
export const getShopsList = (params) => {
    return get('/dsmsmqsc/cgi.do', params);
}
export const getMock = () => {
    return axios.get('/mock/nativeMock.json')
}
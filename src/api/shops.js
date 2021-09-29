/*
 * @Author: your name
 * @Date: 2021-09-24 10:27:10
 * @LastEditTime: 2021-09-26 15:19:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \binfen_discountShops\src\api\shops.js
 */
import axios from "axios";
import { get, post } from "@/utils/request";
import { isMobile } from '@/utils/commonFn';

const mobileType = isMobile();
//首页获取商圈和地区的列表
export const getTradeAreaList = (data) => {
    return post(`/dsmsmqsc/cgi`, data);
}
//首页获取商户列表
export const getShopsList = (data) => {
    return post(`/dsmsmqsc/cgi`, data);
}
export const test = (params) => {
    return get('app/user/userinfo.do', params);
}
//首页获取城市ID及经纬度信息
export const getLocation = (data) => {
    return post('app/user/userinfo.do', data);
}
export const getMock = () => {
    return axios.get('/mock/nativeMock.json')
}
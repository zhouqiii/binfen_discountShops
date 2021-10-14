/*
 * @Author: your name
 * @Date: 2021-09-24 10:27:10
 * @LastEditTime: 2021-10-13 17:55:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \binfen_discountShops\src\api\shops.js
 */
import axios from "axios";
import { get, post } from "@/utils/request";
import { isMobile } from '@/utils/commonFn';

const mobileType = isMobile();
//首页城市Id
export const getCityId = (data) => {
    return post(`/dsmsmqsc/newShopList.do`, data);
}
//首页获取商圈和地区的列表
export const getTradeAreaList = (data) => {
    return post(`/dsmsmqsc/cgi`, data);
}
//首页获取商户列表
export const getShopsList = (data) => {
    return post(`/dsmsmqsc/cgi`, data);
}
export const getMock = () => {
    return axios.get('/mock/nativeMock.json')
}
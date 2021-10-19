/*
 * @Author: your name
 * @Date: 2021-09-24 10:27:10
 * @LastEditTime: 2021-10-18 17:15:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \binfen_discountShops\src\utils\request.js
 */
import axios from "axios";
import createDom from "@/utils/createDom";
import Loading from '@/components/Loading.vue';
import { Dialog } from 'vant';
const request = axios.create({
    baseURL: process.env.NODE_ENV === "development" ? "http://22.187.19.164:9081" : "http://22.187.19.164:9081",//http://21.123.75.119:9080
    timeout: 15000,
    withCredentials: true,
    // async: false
})
let ld;
let num = 0;
//请求拦截函数
function interceptorsRequest(config) {
  if (num === 0) {
    ld = createDom(Loading);
  }
  num += 1;
  return config;
}
//响应拦截函数
function interceptorsResponse(res) {
  num -= 1;
  if (num === 0) {
    ld.hide();
    ld = null;
  }
  if(res.status === 200) {
    if(res.data.stat) {
      if(res.data.stat === '00') {
        return res.data
      } else {
        Dialog.alert({
          message: res.data.result,
          confirmButtonText:'确定'
        })
      }
    }
  } else {
    Dialog.alert({
      message:'连接服务器出错了',
      confirmButtonText:'确定'
    })
  }
  return res//Promise.reject(res.data.message);
}
//请求异常处理
const errHandlerRequest = (error) => {
  ld.hide();
  ld = null;
  Dialog.alert({
    message:'连接服务器出错了',
    confirmButtonText:'确定'
  })
  return Promise.reject(error);
}
//响应异常处理
const errHandlerResponse = (error) => {
  num -= 1;
  if (num === 0) {
    ld.hide();
    ld = null;
  }
  Dialog.alert({
    message:'连接服务器出错了',
    confirmButtonText:'确定'
  })
  return Promise.reject(error);
}
request.interceptors.request.use(interceptorsRequest,errHandlerRequest);
request.interceptors.response.use(interceptorsResponse,errHandlerResponse);

function get(url,params) {
    return request({
        url,
        method:'get',
        params,
    })
}
function post(url,data) {
    return request({
        url,
        method:'post',
        data,
    })
}

export default request;
export {
    post,
    get
}
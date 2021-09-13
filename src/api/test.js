import { get, post } from "@/utils/request"

export const getInfo = (params) => {
    return get('app/user/userinfo.do', params);
}
export const getList = (data) => {
    return post('app/list/accoutList.do', data);
}
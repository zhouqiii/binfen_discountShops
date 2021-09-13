import { post } from "@/utils/request"

export const getVerCode = (data) => {
    return post('AppPrj4/cgi.do', data)
}

export const sendSign = (data) => {
    return post('AppPrj4/cgi.do', data)
}
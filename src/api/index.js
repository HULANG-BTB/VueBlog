// 请求数据方法
import ajax from './ajax'
import captcha from "./capache";

const BASE_URL = '/api'

// 请求验证码图片
export const reqCaptchaImg = (query) => captcha(BASE_URL + `/api/Login/captchaCode`, query)
// 请求文章列表
export const reqArticleList = (query) => ajax(BASE_URL + `/api/Article/getArticleList`, query, 'POST')
// 请求文章信息
export const reqArticleInfo = (query) => ajax(BASE_URL + `/api/Article/getArticleInfo`, query, 'POST')

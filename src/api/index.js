// 请求数据方法
import ajax from './ajax'
import captcha from "./capache";

const BASE_URL = '/data'

// 请求验证码图片
export const reqCaptchaImg = (query) => captcha(BASE_URL + `/api/Login/captchaCode`, query)
// 请求文章列表 分页查询
export const reqArticleListByPaginator = (query) => ajax(BASE_URL + `/api/Article/getArticleListByPaginator`, query, 'POST')
// 请求文章列表 标签查询
export const reqArticleListByTag = (query) => ajax(BASE_URL + `/api/Article/getArticleListByTag`, query, 'POST')
// 请求文章列表 日期查询
export const reqArticleListByTime = (query) => ajax(BASE_URL + `/api/Article/getArticleListByTime`, query, 'POST')
// 请求文章列表 分类查询
export const reqArticleListByCategory = (query) => ajax(BASE_URL + `/api/Article/getArticleListByCategory`, query, 'POST')
// 请求文章信息
export const reqArticleInfo = (query) => ajax(BASE_URL + `/api/Article/getArticleInfo`, query, 'POST')
// 请求标签列表
export const reqTagList = () => ajax(BASE_URL + `/api/Tag/getTagList`)
// 请求用户信息
export const reqUserInfo = (query) => ajax(BASE_URL + `/api/User/getUserInfo`, query, 'POST')
// 请求分类列表
export const reqCategoryList = () => ajax(BASE_URL + `/api/Category/getCategoryList`)
// 请求增加文章
export const reqArticleInsert = (query) => ajax(BASE_URL + `/api/Article/insertArticle`, query, 'POST')
// 请求修改文章
export const reqArticleUpdate = (query) => ajax(BASE_URL + `/api/Article/updateArticle`, query, 'POST')
// 请求删除文章
export const reqArticleDelete = (query) => ajax(BASE_URL + `/api/Article/deleteArticle`, query, 'POST')
// 请求分类删除
export const reqCategoryDelete = (query) => ajax(BASE_URL + `/api/Category/deleteCategory`, query, 'POST')
// 请求分类增加
export const reqCategoryInsert = (query) => ajax(BASE_URL + `/api/Category/insertCategory`, query, 'POST')
// 请求分类修改
export const reqCategoryUpdate = (query) => ajax(BASE_URL + `/api/Category/updateCategory`, query, 'POST')

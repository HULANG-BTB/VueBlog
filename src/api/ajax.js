/*
ajax请求函数模块
返回值 promise对象（response.data）
成功 返回 response.data
失败 返回 error
*/
import Vue from 'vue'
import {
  LoadingBar
} from 'view-design'
import axios from 'axios'

axios.defaults.withCredentials=true; //让ajax携带cookie
Vue.prototype.$axios = axios;

// 请求发起前拦截 设置进度条
// Add a request interceptor
axios.interceptors.request.use(function (config) {
  LoadingBar.start()
  return config;
}, function (error) {
  // Do something with request error
  LoadingBar.error()
  return Promise.reject(error);
});
// 请求结束后拦截 设置进度条
// Add a response interceptor
axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  LoadingBar.finish()
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  LoadingBar.error()
  return Promise.reject(error);
});

export default function ajax (url = '', data = {}, method = 'GET') {
  return new Promise(function (resolve, reject) {
    // 执行异步ajax请求
    let promise
    if (method === 'GET') {
      let query = ''
      Object.keys(data).forEach(key => {
        query += key + '=' + data[key] + '&'
      })
      if (query !== '') {
        query = query.substr(0, query.lastIndexOf('&'))
        url = url + '?' + query
      }
      promise = axios.get(url)
    } else {
      promise = axios.post(url, data)
    }
    promise.then(function (response) {
      // 成功调用resolve 返回数据
      resolve(response.data)
    }).catch(function (error) {
      // 失败返回错误
      reject(error)
    })
  })
}

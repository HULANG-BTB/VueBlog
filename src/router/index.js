// 路由文件 router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/Index/page/:page/limit/:limit',
      name: 'Index',
      component: () => import('@/views/main/Index/Index')
    },
    {
      path: '/',
      redirect: {
        name: 'Index',
        params: {
          page: 1,
          limit: 10
        }
      }
    },
    {
      'path': '/Article/:id',
      name: 'Article',
      component: () => import('@/views/main/Article/Index')
    }
  ]
})

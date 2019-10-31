// 路由文件 router.js
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Index/:page?/:limit?',
      name: 'Index',
      component: () => import('@/views/main/Index/Index'),
      meta: {
        title: '主页',
        breadcrumb: 'Index'
      }
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
      path: '/Article/:id?',
      name: 'Article',
      component: () => import('@/views/main/Article/Index'),
      meta: {
        title: '文章',
        breadcrumb: 'Article'
      }
    },
    {
      path: '/Tag/:tag?/:page?/:limit?',
      name: 'Tag',
      component: () => import('@/views/main/Tag/Tag'),
      meta: {
        title: '标签',
        breadcrumb: 'Tag'
      },
      params: {
        page: 1,
        limit: 10
      }
    },
    {
      path: '/Time/:keyword?/:page?/:limit?',
      name: 'Time',
      component: () => import('@/views/main/Index/Index'),
      meta: {
        title: '归档',
        breadcrumb: 'Time'
      },
      params: {
        page: 1,
        limit: 10
      }
    },
    {
      path: '/Category/:keyword?',
      name: 'Category',
      component: () => import('@/views/main/Index/Index'),
      meta: {
        title: '分类',
        breadcrumb: 'Category'
      },
      params: {
        page: 1,
        limit: 10
      }
    }
  ]
})

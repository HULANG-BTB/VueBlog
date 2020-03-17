// 直接更新多个 STATE 方法

import {
  RECEIVE_ARTICLE_LIST,
  RECEIVE_ARTICLE_INFO,
  RECEIVE_TAG_LIST,
  CLEAR_ARTICLE_LIST, RECEIVE_USER_INFO, RECEIVE_CATEGORY_LIST
} from './mutation-types'

export default {
  [RECEIVE_ARTICLE_LIST] (state, {ArticleList}) {
    if (state.ArticleList.data && ArticleList.data) {
      ArticleList.data = state.ArticleList.data.concat(ArticleList.data)
    }
    state.ArticleList = ArticleList
  },
  [RECEIVE_ARTICLE_INFO] (state, {ArticleInfo}) {
    state.ArticleInfo = ArticleInfo
  },
  [RECEIVE_TAG_LIST] (state, {TagList}) {
    state.TagList = TagList
  },
  [RECEIVE_CATEGORY_LIST] (state, {CategoryList}) {
    state.CategoryList = CategoryList
  },
  [CLEAR_ARTICLE_LIST] (state) {
    state.ArticleList = {}
  },
  [RECEIVE_USER_INFO] (state, {UserInfo}) {
    state.UserInfo = UserInfo
  }
}
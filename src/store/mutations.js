// 直接更新多个 STATE 方法

import {
  RECEIVE_ARTICLE_LIST,
  RECEIVE_ARTICLE_INFO
} from './mutation-types'

export default {
  [RECEIVE_ARTICLE_LIST] (state, {ArticleList}) {
    state.ArticleList = ArticleList
  },
  [RECEIVE_ARTICLE_INFO] (state, {ArticleInfo}) {
    state.ArticleInfo = ArticleInfo
  }
}
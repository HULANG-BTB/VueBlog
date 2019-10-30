// 简介更新对象方法

import {
  RECEIVE_ARTICLE_LIST,
  RECEIVE_ARTICLE_INFO
} from './mutation-types'

import {
  reqArticleList,
  reqArticleInfo
} from '../api'

export default {
  async getArticleList({commit}, query) {
    const result = await reqArticleList(query);
    if (result.code === 1) {
      const ArticleList = result.data.data
      commit(RECEIVE_ARTICLE_LIST, {ArticleList})
    }
  },
  async getArticleInfo({commit}, query) {
    const result = await reqArticleInfo(query);
    if (result.code === 1) {
      const ArticleInfo = result.data
      commit(RECEIVE_ARTICLE_INFO, {ArticleInfo})
    }
  }
}
// 简介更新对象方法

import {
  RECEIVE_ARTICLE_LIST,
  RECEIVE_ARTICLE_INFO,
  RECEIVE_TAG_LIST
} from './mutation-types'

import {
  reqArticleInfo,
  reqTagList,
  reqArticleListByTag,
  reqArticleListByPaginator
} from '../api'

export default {
  async getArticleListByPaginator({commit}, query) {
    const result = await reqArticleListByPaginator(query);
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
  },
  async getTagList({commit}) {
    const result = await reqTagList();
    if (result.code === 1) {
      const TagList = result.data
      commit(RECEIVE_TAG_LIST, {TagList})
    }
  },
  async getArticleListByTag({commit}, query) {
    const result = await reqArticleListByTag(query);
    if (result.code === 1) {
      const ArticleList = result.data.data
      commit(RECEIVE_ARTICLE_LIST, {ArticleList})
    }
  }
  
}
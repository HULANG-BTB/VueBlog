// 简介更新对象方法

import {
  RECEIVE_ARTICLE_LIST,
  RECEIVE_ARTICLE_INFO,
  RECEIVE_TAG_LIST,
  RECEIVE_CATEGORY_LIST,
  RECEIVE_USER_INFO
} from './mutation-types'

import {
  reqArticleInfo,
  reqTagList,
  reqArticleListByTag,
  reqCategoryList,
  reqArticleListByPaginator,
  reqArticleListByTime,
  reqUserInfo
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
  async getCategoryList({commit}) {
    const result = await reqCategoryList();
    if (result.code === 1) {
      const CategoryList = result.data
      commit(RECEIVE_CATEGORY_LIST, {CategoryList})
    }
  },
  async getArticleListByTag({commit}, query) {
    const result = await reqArticleListByTag(query);
    if (result.code === 1) {
      const ArticleList = result.data.data
      commit(RECEIVE_ARTICLE_LIST, {ArticleList})
    }
  },
  async getArticleListByTime({commit}, query) {
    const result = await reqArticleListByTime(query);
    if (result.code === 1) {
      const ArticleList = result.data.data
      commit(RECEIVE_ARTICLE_LIST, {ArticleList})
    }
  },
  async getUserInfo({commit}, query = null) {
    const result = await reqUserInfo(query);
    if (result.code === 1) {
      const UserInfo = result.data
      commit(RECEIVE_USER_INFO, {UserInfo})
    }
  }
}
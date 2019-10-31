<template>
  <div class="container">
    <div class="content">
      <template v-if="ArticleList">
        <Article v-for="(item, index) in ArticleList.data"
                 :key="index"
                 :info="item"
        >
        </Article>
      </template>
    </div>
    <div class="unselected more">
      <Spin size="large" v-if="loading"></Spin>
      <span v-else-if="page <= Math.floor(ArticleList.total / ArticleList.limit)" @click="loadMore">更多</span>
      <span v-else>没有更多了。。。</span>
    </div>
  </div>
</template>

<script>
  import Article from "../../../components/Article/Article";
  export default {
    name: "Tag",
    data () {
      return {
        loading: false,
        page: parseInt(this.$route.params.page) || 1,
        limit: parseInt(this.$route.params.limit) || 15,
      }
    },
    computed: {
      ArticleList () {
        return this.$store.state.ArticleList
      },
      tag () {
        return this.$route.params.tag
      }
    },
    created() {
      this.$store.commit('clear_article_list')
      this.fetchData()
    },
    methods: {
      async loadMore() {
        this.page += 1
        const {page, limit, tag} = this
        await this.$router.push({name: 'Tag', params: {page, limit, tag}})
      },
      async fetchData() {
        this.loading = true
        const {page, limit, tag} = this
        await this.$store.dispatch('getArticleListByTag', {page, limit, tag})
        this.loading = false
      }
    },
    components: {
      Article
    },
    watch: {
      tag () {
        this.$store.commit('clear_article_list')
      },
      $route () {
        this.fetchData()
      }
    }
  }
</script>

<style scoped>
  .main .ivu-layout-content .container {
    width: 100%;
    margin: 0 0;
  }
  .main .ivu-layout-content .banner img {
    width: 100%;
    height: 230px;
  }
  .main .ivu-layout-content .content {
    clear: both;
    position: relative;
  }
  .main .ivu-layout-content .more {
    margin-top: 1rem;
    position: relative;
    width: 45rem;
    height: 2rem;
    line-height: 2rem;
    background: #FFFFFF;
  }
</style>
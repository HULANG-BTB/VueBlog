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
      <span v-else-if="page < Math.floor(ArticleList.total / ArticleList.limit)" @click="loadMore">更多</span>
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
        page: 1,
        limit: 10,
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
      loadMore() {
        this.page += 1
        this.fetchData()
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
      $route () {
        this.page = 1
        this.limit = 10
        this.$store.commit('clear_article_list')
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